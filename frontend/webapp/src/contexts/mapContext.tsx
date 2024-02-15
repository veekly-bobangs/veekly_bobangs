"use client"
import React from 'react';
import { Map } from 'leaflet';

interface MapContextType {
  map: Map | null;
  setMap: (map: Map) => void;
}

const MapContext = React.createContext<MapContextType | null>(null);

interface MapProviderProps {
  children: React.ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const [map, setMap] = React.useState<Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext(): MapContextType {
  const context = React.useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
}
