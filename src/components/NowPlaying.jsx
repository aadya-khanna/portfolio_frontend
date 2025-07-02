import React, { useState, useEffect } from 'react';
import useMarquee from './UseMarquee';

const NowPlaying = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [displayMode, setDisplayMode] = useState('currently-playing');
  const [rotation, setRotation] = useState(0);

  const { containerRef: trackNameContainerRef, textRef: trackNameTextRef, shouldMarquee: shouldMarqueeTrackName } = useMarquee(track?.name);
  const { containerRef: artistNameContainerRef, textRef: artistNameTextRef, shouldMarquee: shouldMarqueeArtistName } = useMarquee(track?.artists.map(artist => artist.name).join(', '));


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

  // Initialize Spotify authentication
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    const token = params.get('access_token');
    const refresh = params.get('refresh_token');
    
    if (token) {
      setAccessToken(token);
      setRefreshToken(refresh);
      window.history.pushState({}, document.title, window.location.pathname);
    } else if (!localStorage.getItem('spotify_access_token')) {
      window.location.href = 'http://localhost:8888/login';
    } else {
      setAccessToken(localStorage.getItem('spotify_access_token'));
      setRefreshToken(localStorage.getItem('spotify_refresh_token'));
    }
  }, []);

  // Store tokens in localStorage when they change
  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('spotify_access_token', accessToken);
      localStorage.setItem('spotify_refresh_token', refreshToken);
    }
  }, [accessToken, refreshToken]);

  // Fetch currently playing track
  const fetchNowPlaying = async () => {
    try {
      console.log('Fetching currently playing track...');
      if (!accessToken) {
        console.log('No access token, returning.');
        return;
      }
      console.log('Access Token:', accessToken);

      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8888/currently-playing?access_token=${accessToken}`
      );
      
      console.log('Currently playing response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Currently playing data:', data);
        if (data.item) {
          setTrack(data.item);
          setIsPlaying(data.is_playing);
          setDisplayMode('currently-playing');
        } else {
          console.log('No currently playing item, fetching recently played.');
          fetchRecentlyPlayed();
        }
      } else if (response.status === 401) {
        console.log('401 received, refreshing token.');
        await refreshAccessToken();
      } else {
        console.error('Failed to fetch currently playing track. Status:', response.status);
        setError(`Failed to fetch currently playing track: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching currently playing track:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recently played tracks
  const fetchRecentlyPlayed = async () => {
    try {
      console.log('Fetching recently played tracks...');
      if (!accessToken) {
        console.log('No access token, returning.');
        return;
      }
      console.log('Access Token:', accessToken);

      const response = await fetch(
        `http://localhost:8888/recently-played?access_token=${accessToken}`
      );
      
      console.log('Recently played response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Recently played data:', data);
        if (data.items && data.items.length > 0) {
          setTrack(data.items[0].track);
          setIsPlaying(false);
          setDisplayMode('last-played');
        } else {
          console.log('No recently played items found.');
        }
      } else {
        console.error('Failed to fetch recently played tracks. Status:', response.status);
      }
    } catch (err) {
      console.error('Error fetching recently played:', err);
    }
  };

  // Refresh access token
  const refreshAccessToken = async () => {
    try {
      console.log('Refreshing access token...');
      if (!refreshToken) {
        console.log('No refresh token, redirecting to login.');
        window.location.href = 'http://localhost:8888/login';
        return;
      }
      console.log('Refresh Token:', refreshToken);

      const response = await fetch(
        `http://localhost:8888/refresh_token?refresh_token=${refreshToken}`
      );
      
      console.log('Refresh token response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Refreshed token data:', data);
        setAccessToken(data.access_token);
        await fetchNowPlaying();
      } else {
        console.error('Failed to refresh token. Status:', response.status);
        window.location.href = 'http://localhost:8888/login';
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
      window.location.href = 'http://localhost:8888/login';
    }
  };

  // Poll for updates
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

  // vinyl
  return (
    <div className="w-full flex justify-center md:block"> 
      <div className="flex items-center p-3  border border-gray-600 rounded-full w-80 hover:border-gray-500 text-foreground  dark:text-foreground-dark transition-colors">
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3  bg-gray-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 w-0.5 bg-white rounded-full"></div>
        </a>
        
        {/* Track info */}
        <div className="ml-3 overflow-hidden flex-1 min-w-0">
          <div className="flex items-center">
            <div ref={trackNameContainerRef} className="overflow-hidden">
              <p ref={trackNameTextRef} className={`text-sm font-plein font-medium ${shouldMarqueeTrackName ? 'marquee' : 'truncate'}`}>
                {track.name}
              </p>
            </div>
          </div>
          <div ref={artistNameContainerRef} className="overflow-hidden">
            <p ref={artistNameTextRef} className={`flex text-xs font-plein ${shouldMarqueeArtistName ? 'marquee' : 'truncate'}`}>
              {track.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className={`ml-2 text-xs font-plein px-1.5 py-0.5 animate-pulse rounded-full ${
          displayMode === 'currently-playing'
            ? 'bg-green-400 dark:bg-green-600 text-foreground  dark:text-foreground-dark'
            : 'bg-gray-800 text-gray-400'
        }`}>
          {displayMode === 'currently-playing' ? 'Now' : 'Last'}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;