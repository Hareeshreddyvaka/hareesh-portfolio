import { useContext } from 'react';
import type * as THREE from 'three';
import { SPACE_ASSETS } from '../config/assetConfig';
import { AssetContext, type AssetContextValue } from './AssetContextShared';

export function useAssets(): AssetContextValue {
  const ctx = useContext(AssetContext);
  if (!ctx) {
    throw new Error('useAssets must be used within an <AssetProvider>');
  }
  return ctx;
}

export function usePlanetTextures(planetName: string) {
  const { getTexture } = useAssets();
  const planet = SPACE_ASSETS.planets[planetName];
  if (!planet) return {};

  const result: Record<string, THREE.Texture | undefined> = {};
  for (const texName of Object.keys(planet.textures)) {
    result[texName] = getTexture(`${planetName}.${texName}`);
  }
  return result;
}
