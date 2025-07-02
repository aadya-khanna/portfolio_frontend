import React, { useState, useEffect } from 'react';
import useMarquee from './UseMarquee';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8888';

const NowPlaying = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [displayMode, setDisplayMode] = useState('currently-playing');
  const [rotation, setRotation] = useState(0);

  const {
    containerRef: trackNameContainerRef,
    textRef: trackNameTextRef,
    shouldMarquee: shouldMarqueeTrackName,
  } = useMarquee(track?.name);
  const {
    containerRef: artistNameContainerRef,
    textRef: artistNameTextRef,
    shouldMarquee: shouldMarqueeArtistName,
  } = useMarquee(track?.artists?.map(artist => artist.name).join(', '));

  // Rotate vinyl when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Initialize Spotify tokens from URL hash or localStorage
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const token = params.get('access_token');
    const refresh = params.get('refresh_token');

    if (token) {
      setAccessToken(token);
      setRefreshToken(refresh);
      // Clean URL
      window.history.pushState({}, document.title, window.location.pathname);
    } else {
      // Try localStorage tokens
      const storedAccessToken = localStorage.getItem('spotify_access_token');
      const storedRefreshToken = localStorage.getItem('spotify_refresh_token');

      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      } else {
        // No tokens found — don't redirect, just show no recent activity
        console.log('No Spotify tokens found. Not redirecting.');
      }
    }
  }, []);

  // Store tokens in localStorage when they change
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('spotify_access_token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('spotify_refresh_token', refreshToken);
    }
  }, [accessToken, refreshToken]);

  // Fetch currently playing track
  const fetchNowPlaying = async () => {
    if (!accessToken) {
      setIsLoading(false);
      return; // no token, skip fetch
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/currently-playing?access_token=${accessToken}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.item) {
          setTrack(data.item);
          setIsPlaying(data.is_playing);
          setDisplayMode('currently-playing');
        } else {
          // fallback to recently played if no current track
          fetchRecentlyPlayed();
        }
      } else if (response.status === 401) {
        // Unauthorized, try refresh token
        await refreshAccessToken();
      } else {
        setError('Failed to fetch currently playing track');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Fetch recently played tracks fallback
  const fetchRecentlyPlayed = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/recently-played?access_token=${accessToken}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setTrack(data.items[0].track);
          setIsPlaying(false);
          setDisplayMode('last-played');
        } else {
          setTrack(null);
        }
      }
    } catch (err) {
      console.error('Error fetching recently played:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh access token
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      // no refresh token, cannot refresh, just stop here
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/refresh_token?refresh_token=${refreshToken}`
      );
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
        await fetchNowPlaying();
      } else {
        // refresh failed, clear tokens
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
      setIsLoading(false);
    }
  };

  // Poll every 30 seconds
  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 30000);

    return () => clearInterval(interval);
  }, [accessToken]);

  if (isLoading && !track) {
    return (
      <div className="flex items-center p-3 border border-gray-600 rounded-full w-64">
        <div className="animate-pulse h-10 w-10 bg-gray-700 rounded-full"></div>
        <div className="ml-3 space-y-1">
          <div className="h-3 w-24 bg-gray-700 rounded"></div>
          <div className="h-2 w-20 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="flex items-center p-3 border border-gray-600 rounded-full w-64 text-gray-400 text-sm">
        No recent activity
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center md:block">
      <div className="flex items-center p-3 border border-gray-600 rounded-full w-80 hover:border-gray-500 text-foreground dark:text-foreground-dark transition-colors">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-10 w-10 block"
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-gray-700 bg-gray-900 overflow-hidden"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {track.album.images[0] && (
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-gray-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-0.5 bg-white rounded-full"></div>
        </a>

        {/* Track info */}
        <div className="ml-3 overflow-hidden flex-1 min-w-0">
          <div className="flex items-center">
            <div ref={trackNameContainerRef} className="overflow-hidden">
              <p
                ref={trackNameTextRef}
                className={`text-sm font-plein font-medium ${
                  shouldMarqueeTrackName ? 'marquee' : 'truncate'
                }`}
              >
                {track.name}
              </p>
            </div>
          </div>
          <div ref={artistNameContainerRef} className="overflow-hidden">
            <p
              ref={artistNameTextRef}
              className={`flex text-xs font-plein ${
                shouldMarqueeArtistName ? 'marquee' : 'truncate'
              }`}
            >
              {track.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div
          className={`ml-2 text-xs font-plein px-1.5 py-0.5 animate-pulse rounded-full ${
            displayMode === 'currently-playing'
              ? 'bg-green-400 dark:bg-green-600 text-foreground dark:text-foreground-dark'
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          {displayMode === 'currently-playing' ? 'Now' : 'Last'}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
