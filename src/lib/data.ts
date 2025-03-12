
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploadedAt: string;
  views: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  description?: string;
  videoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "all", name: "All" },
  { id: "music", name: "Music" },
  { id: "gaming", name: "Gaming" },
  { id: "javascript", name: "JavaScript" },
  { id: "react", name: "React" },
  { id: "design", name: "Design" },
  { id: "live", name: "Live" },
  { id: "apple", name: "Apple" },
  { id: "concerts", name: "Concerts" },
  { id: "podcasts", name: "Podcasts" },
  { id: "movies", name: "Movies" },
  { id: "travel", name: "Travel" },
  { id: "sports", name: "Sports" },
  { id: "news", name: "News" },
  { id: "technology", name: "Technology" },
  { id: "education", name: "Education" }
];

// This is just a fallback - we'll use the real videos from localStorage
export const videos: Video[] = [];
