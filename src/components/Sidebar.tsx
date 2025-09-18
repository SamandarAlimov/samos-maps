import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  Filter,
  Coffee,
  Car,
  ShoppingBag,
  Hospital,
  School,
  Building,
  Fuel,
  Users,
  X
} from 'lucide-react';

interface POICategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  active: boolean;
}

const poiCategories: POICategory[] = [
  { id: 'restaurants', name: 'Restaurants', icon: <Coffee className="w-5 h-5" />, count: 245, active: false },
  { id: 'gas-stations', name: 'Gas Stations', icon: <Fuel className="w-5 h-5" />, count: 89, active: false },
  { id: 'shopping', name: 'Shopping', icon: <ShoppingBag className="w-5 h-5" />, count: 156, active: false },
  { id: 'hospitals', name: 'Hospitals', icon: <Hospital className="w-5 h-5" />, count: 34, active: false },
  { id: 'schools', name: 'Schools', icon: <School className="w-5 h-5" />, count: 78, active: false },
  { id: 'hotels', name: 'Hotels', icon: <Building className="w-5 h-5" />, count: 92, active: false },
  { id: 'parking', name: 'Parking', icon: <Car className="w-5 h-5" />, count: 167, active: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (categoryId: string) => {
    setActiveCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = poiCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Samos Maps</h1>
                <p className="text-sm text-muted-foreground">maps.samos.uz</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="default" size="sm" className="justify-start gap-2">
                <MapPin className="w-4 h-4" />
                Explore
              </Button>
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <Navigation className="w-4 h-4" />
                Directions
              </Button>
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <Star className="w-4 h-4" />
                Saved
              </Button>
            </div>
          </div>

          {/* Filter Search */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter categories..."
                className="pl-10"
              />
            </div>
            
            {/* Active Filters */}
            {activeCategories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {activeCategories.map(categoryId => {
                  const category = poiCategories.find(c => c.id === categoryId);
                  return category ? (
                    <Badge 
                      key={categoryId} 
                      variant="secondary" 
                      className="text-xs gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => toggleCategory(categoryId)}
                    >
                      {category.name}
                      <X className="w-3 h-3" />
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* POI Categories */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold mb-3 text-sidebar-foreground">Points of Interest</h3>
              <div className="space-y-1">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`poi-category ${
                      activeCategories.includes(category.id) ? 'poi-category-active' : ''
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="text-current">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-4 border-t border-sidebar-border bg-muted/30">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Recent Activity</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Navigation className="w-3 h-3" />
                <span>Route to Tashkent Airport</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Saved: Chorsu Bazaar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;