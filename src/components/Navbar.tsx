
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, User, Video } from 'lucide-react';
import SearchBar from './SearchBar';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-2 bg-background/90 backdrop-blur-md shadow-sm' 
          : 'py-4 bg-background'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-muted/80 transition-colors duration-200"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link to="/" className="flex items-center gap-1.5">
            <Video className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold tracking-tight">Vidify</span>
          </Link>
        </div>
        
        <div className="flex-1 max-w-xl mx-8">
          <SearchBar className="w-full" />
        </div>
        
        <div className="flex items-center gap-1">
          <button
            className="p-2.5 rounded-full hover:bg-muted/80 transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          
          <button
            className="p-2.5 rounded-full hover:bg-muted/80 transition-colors duration-200"
            aria-label="User profile"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
