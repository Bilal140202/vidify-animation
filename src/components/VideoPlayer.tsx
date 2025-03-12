
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoId: string;
  thumbnail: string;
  videoUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, thumbnail, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Set up event listeners for video element
    const videoElement = videoRef.current;
    
    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', () => {
        setDuration(videoElement.duration);
      });
      
      videoElement.addEventListener('timeupdate', () => {
        setCurrentTime(videoElement.currentTime);
        setProgress((videoElement.currentTime / videoElement.duration) * 100);
      });
      
      videoElement.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
    
    // Clean up event listeners
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', () => {});
        videoElement.removeEventListener('timeupdate', () => {});
        videoElement.removeEventListener('ended', () => {});
      }
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [videoId]);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const clickPercentage = clickPosition / progressBar.clientWidth;
      const newTime = clickPercentage * duration;
      
      videoRef.current.currentTime = newTime;
      setProgress(clickPercentage * 100);
    }
  };
  
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };
  
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };
  
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  return (
    <div 
      ref={playerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={thumbnail}
        onClick={togglePlay}
        controlsList="nodownload"
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Custom video controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Progress bar */}
        <div 
          className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            
            <button
              onClick={skipBackward}
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={skipForward}
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleMute}
              className="text-white hover:text-primary transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-primary transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Play button overlay (only shown when not playing) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="bg-black/30 rounded-full p-4">
            <Play className="w-10 h-10 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
