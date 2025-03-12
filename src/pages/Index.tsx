
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CategoryPills from '@/components/CategoryPills';
import VideoCard from '@/components/VideoCard';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { VideoService } from '@/services/VideoService';
import { Video } from '@/lib/data';

const Index: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load videos from the service
    const loadVideos = () => {
      setIsLoading(true);
      const allVideos = VideoService.getVideos();
      setVideos(allVideos);
      setIsLoading(false);
    };

    loadVideos();

    // Set up an event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'videos') {
        loadVideos();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Filter videos by category if a category is selected
  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => {
        // This is a simple implementation. In a real app, videos would have a category field
        // For now, we'll just check if the title includes the category name
        return video.title.toLowerCase().includes(selectedCategory.toLowerCase());
      });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      
      <main className={cn(
        "transition-all duration-300",
        isSidebarOpen ? "ml-0 lg:ml-64" : "ml-0",
        "container mx-auto pt-20 px-4"
      )}>
        <div className="sticky top-[72px] pt-4 pb-2 z-10 bg-background">
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-video bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <h2 className="text-xl font-medium mb-2">No videos found</h2>
                <p className="text-muted-foreground mb-4">
                  {selectedCategory !== 'all' 
                    ? `No videos found in the ${selectedCategory} category`
                    : "There are no videos uploaded yet"}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
