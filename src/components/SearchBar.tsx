import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock, Star } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  address: string;
  type: 'place' | 'business' | 'address';
  rating?: number;
  distance?: string;
}

const mockResults: SearchResult[] = [
  { id: '1', name: 'Tashkent International Airport', address: 'Tashkent, Uzbekistan', type: 'place', rating: 4.2 },
  { id: '2', name: 'Amir Timur Square', address: 'Central Tashkent', type: 'place', rating: 4.7 },
  { id: '3', name: 'Chorsu Bazaar', address: 'Old City, Tashkent', type: 'business', rating: 4.5 },
  { id: '4', name: 'Samos Global Technologies', address: '123 Business Street, Tashkent', type: 'business', rating: 4.8 },
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      setResults(mockResults.filter(r => 
        r.name.toLowerCase().includes(value.toLowerCase()) ||
        r.address.toLowerCase().includes(value.toLowerCase())
      ));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.name);
    setIsOpen(false);
    // Here you would center the map on the selected location
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for places, addresses, or businesses..."
          className="pl-12 pr-4 py-3 text-base bg-card shadow-md border-border focus:ring-primary focus:border-primary rounded-xl"
          onFocus={() => query.length > 2 && setIsOpen(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
          >
            ×
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="search-result border-b border-border last:border-b-0"
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{result.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{result.address}</p>
                  {result.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-warning fill-current" />
                      <span className="text-xs text-muted-foreground">{result.rating}</span>
                    </div>
                  )}
                </div>
                {result.distance && (
                  <div className="text-xs text-muted-foreground">
                    {result.distance}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Recent Searches */}
          <div className="p-3 border-t border-border bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              Recent searches
            </div>
            <div className="space-y-1">
              <div className="search-result py-2">
                <span className="text-sm">Tashkent City Mall</span>
              </div>
              <div className="search-result py-2">
                <span className="text-sm">Independence Square</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;