import React, { useState, useEffect } from 'react';
import useMarquee from './UseMarquee';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8888';

const NowPlaying = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Removed client-side token initialization and storage effects

  // Fetch currently playing track from backend
  const fetchNowPlaying = async () => {
    // console.log('NowPlaying: Attempting to fetch currently playing from backend...'); // Removed log
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/currently-playing`);
 
      // console.log('NowPlaying: Currently playing backend response status:', response.status); // Removed log
      if (response.ok) {
        const data = await response.json();
        // console.log('NowPlaying: Currently playing backend data:', data); // Removed log
        if (data.item) {
          setTrack(data.item);
          setIsPlaying(data.is_playing);
          setDisplayMode('currently-playing');
        } else {
          // console.log('NowPlaying: No currently playing item from backend, falling back to recently played.'); // Removed log
          // fallback to recently played if no current track
           fetchRecentlyPlayed();
        }
      } else {
        console.error('NowPlaying: Failed to fetch currently playing track from backend. Status:', response.status);
        // If backend returns an error (e.g., 401 if no valid tokens server-side)
        // we should still try recently played as a fallback
         fetchRecentlyPlayed();
      }
    } catch (err) {
      console.error('NowPlaying: Error fetching currently playing from backend:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };
 
  // Fetch recently played tracks from backend fallback
  const fetchRecentlyPlayed = async () => {
    // console.log('NowPlaying: Attempting to fetch recently played from backend...'); // Removed log
    try {
      const response = await fetch(`${BACKEND_URL}/recently-played`);
      // console.log('NowPlaying: Recently played backend response status:', response.status); // Removed log
      if (response.ok) {
        const data = await response.json();
        // console.log('NowPlaying: Recently played backend data:', data); // Removed log
        if (data.items && data.items.length > 0) {
          // console.log('NowPlaying: Recently played track found.'); // Removed log
          setTrack(data.items[0].track);
          setIsPlaying(false);
          setDisplayMode('last-played');
        } else {
          // console.log('NowPlaying: No recently played tracks found from backend.'); // Removed log
          setTrack(null);
        }
      } else {
         console.error('NowPlaying: Failed to fetch recently played track from backend. Status:', response.status);
         setTrack(null); // Ensure track is null if both fail
       }
    } catch (err) {
      console.error('NowPlaying: Error fetching recently played from backend:', err);
      setTrack(null); // Ensure track is null on error
    } finally {
      setIsLoading(false);
    }
  };

  // Removed client-side refreshAccessToken function

  // Poll every 30 seconds
  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 30000);

    return () => clearInterval(interval);
  }, []); // Dependency array is now empty as it doesn't depend on accessToken

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
