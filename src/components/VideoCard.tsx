
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Check } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
  }, true);

  return (
    <div 
      ref={ref} 
      className={cn(
        'video-card-hover rounded-lg overflow-hidden',
        isVisible ? 'animate-fade-in' : 'opacity-0',
        className
      )}
    >
      <Link to={`/video/${video.id}`} className="block">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          {isVisible ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-muted animate-pulse" />
          )}
          <div className="absolute bottom-2 right-2 bg-background/90 text-foreground text-xs px-1 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
        
        <div className="flex gap-3 mt-3">
          <div className="flex-shrink-0">
            <div className="h-9 w-9 rounded-full overflow-hidden">
              <img 
                src={video.channel.avatar} 
                alt={video.channel.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium line-clamp-2 text-foreground">
              {video.title}
            </h3>
            
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <p className="truncate">
                {video.channel.name}
                {video.channel.verified && (
                  <span className="inline-flex ml-1">
                    <Check size={14} className="text-primary" />
                  </span>
                )}
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground mt-0.5 flex items-center">
              <span>{video.views} views</span>
              <span className="mx-1">•</span>
              <span>{video.uploadedAt}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
