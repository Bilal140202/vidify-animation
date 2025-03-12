
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Clock, 
  ThumbsUp, 
  Flame, 
  Music, 
  Film, 
  Gamepad2, 
  Newspaper, 
  Lightbulb, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { isAuthenticated } = useAuth();
  
  const mainItems: SidebarItem[] = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <Compass size={20} />, label: 'Explore', path: '/explore' },
    { icon: <Clock size={20} />, label: 'History', path: '/history' },
  ];
  
  const authItems: SidebarItem[] = [
    { icon: <ThumbsUp size={20} />, label: 'Liked Videos', path: '/liked' },
    { icon: <Flame size={20} />, label: 'Your Videos', path: '/your-videos' },
  ];
  
  const categoriesItems: SidebarItem[] = [
    { icon: <Music size={20} />, label: 'Music', path: '/?category=music' },
    { icon: <Film size={20} />, label: 'Movies', path: '/?category=movies' },
    { icon: <Gamepad2 size={20} />, label: 'Gaming', path: '/?category=gaming' },
    { icon: <Newspaper size={20} />, label: 'News', path: '/?category=news' },
    { icon: <Lightbulb size={20} />, label: 'Learning', path: '/?category=education' },
  ];
  
  const footerItems: SidebarItem[] = [
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Help', path: '/help' },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-[72px] bottom-0 bg-background z-40 w-64 border-r border-border transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col h-full p-3 overflow-y-auto thin-scrollbar">
        <div className="py-2">
          {mainItems.map((item) => (
            <SidebarLink key={item.path} item={item} />
          ))}
        </div>
        
        {isAuthenticated && (
          <div className="py-2 border-t border-border mt-2">
            {authItems.map((item) => (
              <SidebarLink key={item.path} item={item} />
            ))}
          </div>
        )}
        
        <div className="py-2 border-t border-border mt-2">
          <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">Explore</h3>
          {categoriesItems.map((item) => (
            <SidebarLink key={item.path} item={item} />
          ))}
        </div>
        
        <div className="py-2 border-t border-border mt-auto">
          {footerItems.map((item) => (
            <SidebarLink key={item.path} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

const SidebarLink: React.FC<{ item: SidebarItem }> = ({ item }) => {
  return (
    <Link
      to={item.path}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );
};

export default Sidebar;
