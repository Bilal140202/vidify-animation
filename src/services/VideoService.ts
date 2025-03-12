
import { Video } from '@/lib/data';

// This would normally use an API or backend storage
// Currently using localStorage for demo purposes
export const VideoService = {
  // Get all videos
  getVideos: (): Video[] => {
    const videosJson = localStorage.getItem('videos');
    if (!videosJson) return [];
    return JSON.parse(videosJson);
  },

  // Get a specific video by ID
  getVideo: (id: string): Video | undefined => {
    const videos = VideoService.getVideos();
    return videos.find(video => video.id === id);
  },

  // Get videos by user ID
  getUserVideos: (userId: string): Video[] => {
    const videos = VideoService.getVideos();
    return videos.filter(video => video.channel.id === userId);
  },

  // Add a new video
  addVideo: (video: Omit<Video, 'id'>): Video => {
    const videos = VideoService.getVideos();
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(), // Generate a simple ID
      uploadedAt: 'Just now', // This would be formatted properly in a real app
      views: '0',
    };
    
    localStorage.setItem('videos', JSON.stringify([...videos, newVideo]));
    return newVideo;
  },

  // Like a video
  likeVideo: (videoId: string, userId: string): void => {
    // This would update a likes table in a real database
    const likedVideosJson = localStorage.getItem(`likedVideos_${userId}`) || '[]';
    const likedVideos = JSON.parse(likedVideosJson);
    if (!likedVideos.includes(videoId)) {
      localStorage.setItem(`likedVideos_${userId}`, JSON.stringify([...likedVideos, videoId]));
    }
  },

  // Get liked videos
  getLikedVideos: (userId: string): Video[] => {
    const likedVideosJson = localStorage.getItem(`likedVideos_${userId}`) || '[]';
    const likedVideoIds = JSON.parse(likedVideosJson);
    const videos = VideoService.getVideos();
    return videos.filter(video => likedVideoIds.includes(video.id));
  }
};
