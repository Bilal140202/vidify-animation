
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CategoryPills from '@/components/CategoryPills';
import VideoCard from '@/components/VideoCard';
import { categories, videos } from '@/lib/data';

const Index: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto pt-20 px-4">
        <div className="sticky top-[72px] pt-4 pb-2 z-10 bg-background">
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
