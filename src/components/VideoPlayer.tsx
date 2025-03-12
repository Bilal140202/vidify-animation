
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoId: string;
  thumbnail: string;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  thumbnail,
  onPlay,
  onPause,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const previousVolume = useRef(volume);

  // Mock video URL based on ID (in a real app, you'd get this from an API)
  const videoUrl = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      if (onPause) onPause();
    } else {
      videoRef.current.play();
      if (onPlay) onPlay();
    }
    
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume.current);
    } else {
      previousVolume.current = volume;
      setVolume(0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const enterFullScreen = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleUserActivity = () => {
    setShowControls(true);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    if (isPlaying) {
      timeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Set up event listeners and handle cleanup
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update volume effect
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  // Set up controls timeout
  useEffect(() => {
    resetControlsTimeout();
    
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-lg bg-black aspect-video w-full',
        className
      )}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video overlay for click to play/pause */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={togglePlay}
      />

      {/* Controls overlay */}
      <div 
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent',
          'flex flex-col justify-end transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Progress bar */}
        <div className="px-4 mb-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={() => setIsScrubbing(true)}
            onMouseUp={() => setIsScrubbing(false)}
            onTouchStart={() => setIsScrubbing(true)}
            onTouchEnd={() => setIsScrubbing(false)}
            className={cn(
              'w-full h-1 rounded-full appearance-none bg-gray-500/50',
              'accent-primary cursor-pointer transition-all',
              'focus:outline-none hover:h-2'
            )}
          />
        </div>

        {/* Main controls */}
        <div className="px-4 pb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
            
            <button 
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip 10 seconds backward"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip 10 seconds forward"
            >
              <SkipForward size={20} />
            </button>

            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMute}
                className="text-white hover:text-primary transition-colors"
                aria-label={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0 ? (
                  <VolumeX size={20} />
                ) : volume < 0.5 ? (
                  <Volume1 size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 rounded-full appearance-none bg-gray-500/50 accent-primary cursor-pointer"
                aria-label="Volume"
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={enterFullScreen}
              className="text-white hover:text-primary transition-colors"
              aria-label="Full screen"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Big play button when video is paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rounded-full bg-black/30 backdrop-blur-sm p-6 animate-scale">
            <Play size={48} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
