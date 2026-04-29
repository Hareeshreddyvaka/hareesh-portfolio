import { useState, useCallback } from 'react';

export type InteractionMode = 'EXPLORE' | 'ORBIT' | 'INSPECT';

export interface PlanetInfo {
  id: string;
  name: string;
  description: string;
  section: 'hero' | 'projects' | 'skills' | 'certs' | 'contact' | 'about';
  stats?: Record<string, string | number>;
  color: string;
}

export function usePlanetInteraction() {
  const [mode, setMode] = useState<InteractionMode>('EXPLORE');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  const handlePlanetClick = useCallback((info: PlanetInfo) => {
    setSelectedPlanet(info);
    setMode('ORBIT');
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedPlanet(null);
    setMode('EXPLORE');
  }, []);

  const handlePlanetHover = useCallback((id: string | null) => {
    setHoveredPlanet(id);
    // Change cursor
    document.body.style.cursor = id ? 'pointer' : 'auto';
  }, []);

  return {
    mode,
    selectedPlanet,
    hoveredPlanet,
    handlePlanetClick,
    handleClosePanel,
    handlePlanetHover
  };
}
