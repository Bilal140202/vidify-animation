
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    onSelect(categoryId);
  };

  const updateArrows = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Check if scrolled at all to the right
    setShowLeftArrow(container.scrollLeft > 0);
    
    // Check if we can scroll further right
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    
    // Initial check
    updateArrows();
    
    return () => {
      container.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div 
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full flex items-center",
          "transition-opacity duration-300",
          showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          onClick={() => scroll('left')}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-none py-2 gap-2 px-2 scroll-smooth"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'pill whitespace-nowrap transition-all duration-300',
              selectedCategory === category.id ? 'pill-active' : 'pill-inactive'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div 
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full flex items-center",
          "transition-opacity duration-300",
          showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          onClick={() => scroll('right')}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CategoryPills;
