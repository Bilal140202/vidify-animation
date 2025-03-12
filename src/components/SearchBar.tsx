
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'flex items-center relative transition-all duration-300',
        isFocused ? 'ring-2 ring-primary/20' : '',
        className
      )}
    >
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full pl-10 pr-10 py-2 rounded-full border border-border bg-muted/50',
            'focus:outline-none transition-all duration-300',
            'placeholder:text-muted-foreground/70'
          )}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-200"
          >
            <X size={18} className="text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
