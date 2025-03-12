
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, Download, PlusCircle, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import VideoPlayer from '@/components/VideoPlayer';
import VideoCard from '@/components/VideoCard';
import { VideoService } from '@/services/VideoService';
import { Video as VideoType } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Video: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  useEffect(() => {
    // Scroll to top when video page is loaded
    window.scrollTo(0, 0);
    
    // Load the video and related videos
    if (id) {
      setIsLoading(true);
      const foundVideo = VideoService.getVideo(id);
      
      if (foundVideo) {
        setVideo(foundVideo);
        // Get all videos except current one for related videos
        const allVideos = VideoService.getVideos();
        setRelatedVideos(allVideos.filter(v => v.id !== id).slice(0, 5));
      }
      
      setIsLoading(false);
    }
  }, [id]);

  const handleLikeVideo = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like videos",
        variant: "destructive"
      });
      return;
    }

    if (video) {
      VideoService.likeVideo(video.id, user.id);
      toast({
        title: "Video liked",
        description: "This video has been added to your liked videos"
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onMenuClick={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <main className="container mx-auto pt-20 px-4">
          <div className="animate-pulse">
            <div className="h-[60vh] bg-muted rounded-lg mb-4"></div>
            <div className="h-8 bg-muted rounded-lg w-3/4 mb-4"></div>
            <div className="h-6 bg-muted rounded-lg w-1/2 mb-4"></div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      
      <main className="container mx-auto pt-20 px-4">
        <div className="lg:flex lg:gap-6">
          <div className="lg:flex-grow">
            <div className="mb-4 animate-fade-in">
              <Link 
                to="/" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                <ChevronLeft size={16} />
                <span>Back to Home</span>
              </Link>
              
              <VideoPlayer 
                videoId={video.id} 
                thumbnail={video.thumbnail}
                videoUrl={video.videoUrl}
              />
            </div>
            
            <div className="animate-slide-up">
              <h1 className="text-xl md:text-2xl font-semibold mt-4">{video.title}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={video.channel.avatar} 
                      alt={video.channel.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{video.channel.name}</h3>
                    <p className="text-sm text-muted-foreground">{video.views} views</p>
                  </div>
                  
                  <button className="ml-4 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    onClick={handleLikeVideo}
                  >
                    <ThumbsUp size={18} />
                    <span>Like</span>
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                    <ThumbsDown size={18} />
                    <span>Dislike</span>
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                    <Download size={18} />
                    <span>Download</span>
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                    <PlusCircle size={18} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="font-medium">{video.views} views</span>
                  <span>•</span>
                  <span>{video.uploadedAt}</span>
                </div>
                
                <p className="text-muted-foreground">
                  {video.description || "No description available for this video."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-80 xl:w-96 mt-8 lg:mt-0">
            <h3 className="font-semibold mb-4">Recommended videos</h3>
            
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <VideoCard 
                  key={relatedVideo.id} 
                  video={relatedVideo} 
                  className="!opacity-100" 
                />
              ))}
              
              {relatedVideos.length === 0 && (
                <p className="text-muted-foreground">No related videos found</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Video;
