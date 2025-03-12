
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploadedAt: string;
  views: string;
  channel: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  description?: string;
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

export const videos: Video[] = [
  {
    id: "1",
    title: "Creating a Beautiful UI Design System from Scratch",
    thumbnail: "https://picsum.photos/id/110/640/360",
    duration: "18:22",
    uploadedAt: "3 days ago",
    views: "254K",
    channel: {
      name: "DesignLabs",
      avatar: "https://picsum.photos/id/1005/40/40",
      verified: true
    },
    description: "Learn how to create a comprehensive UI design system that can scale across multiple platforms. In this tutorial, we'll cover the fundamentals of design systems, including typography, color palettes, component libraries, and design tokens."
  },
  {
    id: "2",
    title: "The Future of JavaScript in 2023",
    thumbnail: "https://picsum.photos/id/119/640/360",
    duration: "24:15",
    uploadedAt: "1 week ago",
    views: "412K",
    channel: {
      name: "CodeMasters",
      avatar: "https://picsum.photos/id/1012/40/40",
      verified: true
    },
    description: "Dive into the latest features and improvements coming to JavaScript in 2023. We'll explore new language proposals, tooling advancements, and how the ecosystem continues to evolve. Whether you're a beginner or advanced developer, this overview will keep you up-to-date."
  },
  {
    id: "3",
    title: "Building Interactive Animations with React",
    thumbnail: "https://picsum.photos/id/237/640/360",
    duration: "15:42",
    uploadedAt: "2 weeks ago",
    views: "189K",
    channel: {
      name: "ReactNinja",
      avatar: "https://picsum.photos/id/1011/40/40",
      verified: true
    },
    description: "Discover powerful techniques for creating fluid, interactive animations in your React applications. We'll cover libraries like Framer Motion and React Spring, explain animation principles, and build several practical examples you can use in your own projects."
  },
  {
    id: "4",
    title: "Minimalist Product Photography at Home",
    thumbnail: "https://picsum.photos/id/96/640/360",
    duration: "12:35",
    uploadedAt: "3 weeks ago",
    views: "723K",
    channel: {
      name: "PhotoCraft",
      avatar: "https://picsum.photos/id/1027/40/40",
      verified: false
    },
    description: "Learn how to take stunning product photos with minimal equipment right in your home. This tutorial walks through lighting setups, composition techniques, and post-processing tips that will make your products look professional without an expensive studio."
  },
  {
    id: "5",
    title: "Machine Learning Explained Simply",
    thumbnail: "https://picsum.photos/id/60/640/360",
    duration: "22:18",
    uploadedAt: "1 month ago",
    views: "1.2M",
    channel: {
      name: "TechSimplified",
      avatar: "https://picsum.photos/id/1025/40/40",
      verified: true
    },
    description: "Demystifying machine learning concepts for beginners. This video breaks down complex algorithms and processes into easy-to-understand explanations, with visual demonstrations and real-world examples that show how machine learning is transforming various industries."
  },
  {
    id: "6",
    title: "Morning Routine for Productivity",
    thumbnail: "https://picsum.photos/id/116/640/360",
    duration: "10:28",
    uploadedAt: "2 months ago",
    views: "3.4M",
    channel: {
      name: "LifeOptimized",
      avatar: "https://picsum.photos/id/1074/40/40",
      verified: true
    },
    description: "Transform your mornings and set yourself up for a productive day with this science-backed routine. Learn how small adjustments to your morning habits can dramatically improve focus, creativity, and energy levels throughout your entire day."
  },
  {
    id: "7",
    title: "Advanced CSS Layouts with Grid",
    thumbnail: "https://picsum.photos/id/216/640/360",
    duration: "16:53",
    uploadedAt: "3 months ago",
    views: "421K",
    channel: {
      name: "CSSWizard",
      avatar: "https://picsum.photos/id/1062/40/40",
      verified: false
    },
    description: "Master CSS Grid with this in-depth tutorial covering everything from basic grid concepts to complex, responsive layouts. You'll learn how to create magazine-style designs, asymmetrical grids, and dynamic layouts that adapt beautifully across all screen sizes."
  },
  {
    id: "8",
    title: "Making Electronic Music: Beginner's Guide",
    thumbnail: "https://picsum.photos/id/142/640/360",
    duration: "28:42",
    uploadedAt: "4 months ago",
    views: "1.8M",
    channel: {
      name: "SoundLab",
      avatar: "https://picsum.photos/id/1082/40/40",
      verified: true
    },
    description: "Start your journey into electronic music production with this comprehensive guide. We'll cover the essential equipment, software, basic music theory, and production techniques to help you create your first track, even if you have no prior musical experience."
  },
  {
    id: "9",
    title: "Zero Waste Home: Practical Tips",
    thumbnail: "https://picsum.photos/id/197/640/360",
    duration: "14:27",
    uploadedAt: "5 months ago",
    views: "892K",
    channel: {
      name: "EcoLiving",
      avatar: "https://picsum.photos/id/64/40/40",
      verified: false
    },
    description: "Transform your home into an environmentally friendly space with these accessible zero waste strategies. This video provides practical solutions for reducing waste in every room of your house, sustainable product alternatives, and simple habits that make a big difference."
  },
  {
    id: "10",
    title: "The Art of Cinematic Storytelling",
    thumbnail: "https://picsum.photos/id/65/640/360",
    duration: "32:14",
    uploadedAt: "6 months ago",
    views: "2.1M",
    channel: {
      name: "FilmCraft",
      avatar: "https://picsum.photos/id/1080/40/40",
      verified: true
    },
    description: "Learn the principles of visual storytelling that make films emotionally powerful. This masterclass examines techniques used by renowned directors, exploring how camera movement, lighting, editing, and sound design work together to create immersive cinematic experiences."
  }
];
