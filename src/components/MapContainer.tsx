import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, Navigation, Minus, Plus, RotateCcw } from 'lucide-react';

const MapContainer = () => {
  return (
    <div className="relative w-full h-full bg-map-bg rounded-lg overflow-hidden">
      {/* Map Placeholder - This will be replaced with actual map integration */}
      <div className="absolute inset-0 bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-card rounded-lg shadow-md max-w-md">
          <MapPin className="w-16 h-16 text-primary mx-auto" />
          <h3 className="text-lg font-semibold">Samos Maps</h3>
          <p className="text-muted-foreground">
            Professional mapping platform ready for integration with Mapbox or OpenStreetMap
          </p>
          <div className="text-sm text-muted-foreground border-t pt-4">
            <p>To activate the interactive map:</p>
            <p>1. Connect to Supabase for backend features</p>
            <p>2. Add your Mapbox API key</p>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        {/* Zoom Controls */}
        <div className="flex flex-col bg-card rounded-lg shadow-md overflow-hidden">
          <Button variant="ghost" size="icon" className="map-control rounded-none border-0">
            <Plus className="w-4 h-4" />
          </Button>
          <div className="w-full h-px bg-border" />
          <Button variant="ghost" size="icon" className="map-control rounded-none border-0">
            <Minus className="w-4 h-4" />
          </Button>
        </div>

        {/* Additional Controls */}
        <Button variant="ghost" size="icon" className="map-control">
          <Navigation className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="map-control">
          <Layers className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="map-control">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Type Selector */}
      <div className="absolute bottom-4 right-4">
        <div className="flex bg-card rounded-lg shadow-md overflow-hidden">
          <Button variant="ghost" size="sm" className="map-control-active rounded-none border-0 px-3">
            Map
          </Button>
          <div className="w-px h-full bg-border" />
          <Button variant="ghost" size="sm" className="map-control rounded-none border-0 px-3">
            Satellite
          </Button>
          <div className="w-px h-full bg-border" />
          <Button variant="ghost" size="sm" className="map-control rounded-none border-0 px-3">
            Terrain
          </Button>
        </div>
      </div>

      {/* Current Location Button */}
      <div className="absolute bottom-4 left-4">
        <Button variant="default" size="icon" className="shadow-md">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MapContainer;