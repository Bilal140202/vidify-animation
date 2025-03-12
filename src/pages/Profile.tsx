
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Settings, Share2 } from 'lucide-react';
import { videos } from '@/lib/data';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock data - in a real app, these would come from an API
  const userVideos = videos.slice(0, 3); // First 3 videos as mock user videos
  const likedVideos = videos.slice(3, 6); // Next 3 videos as mock liked videos
  const playlistVideos = videos.slice(6, 9); // Next 3 videos as mock playlist videos
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  // Redirect to home if not authenticated
  if (!isAuthenticated || !user) {
    navigate('/');
    return null;
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      
      <main className="container mx-auto pt-20 px-4">
        <div className="mb-8">
          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg mb-6"></div>
          
          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center px-4">
            <Avatar className="h-24 w-24 border-4 border-background -mt-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}'s Channel</h1>
              <p className="text-muted-foreground">@{user.name.toLowerCase().replace(' ', '')}</p>
              <p className="text-sm mt-1">120 subscribers • 24 videos</p>
            </div>
            
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Edit size={16} />
                <span>Edit Channel</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings size={16} />
                <span>Manage</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 size={16} />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for different content */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="space-y-6">
            <h2 className="text-xl font-medium mb-4">Uploaded Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
              {userVideos.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No videos uploaded yet</p>
                  <Button className="mt-4">Upload a Video</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="playlists" className="space-y-6">
            <h2 className="text-xl font-medium mb-4">Your Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {playlistVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
              {playlistVideos.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No playlists created yet</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="liked" className="space-y-6">
            <h2 className="text-xl font-medium mb-4">Liked Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {likedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
              {likedVideos.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No liked videos yet</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="max-w-3xl mx-auto">
            <h2 className="text-xl font-medium mb-4">About</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  Welcome to my channel! I create videos about technology, coding, and design.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Details</h3>
                <div className="space-y-1 text-sm">
                  <p>Joined: January 2023</p>
                  <p>Total views: 24,853</p>
                  <p>Location: New York, USA</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Links</h3>
                <div className="space-y-1 text-sm">
                  <a href="#" className="text-primary hover:underline block">Website</a>
                  <a href="#" className="text-primary hover:underline block">Twitter</a>
                  <a href="#" className="text-primary hover:underline block">Instagram</a>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
