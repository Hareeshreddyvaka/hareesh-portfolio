// ============================================================================
// AssetContext — Global asset state for the entire app
// ============================================================================

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useAssetLoader } from '../hooks/useAssetLoader';
import { SPACE_ASSETS } from '../config/assetConfig';
import { AssetContext, type AssetContextValue } from './AssetContextShared';

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface AssetProviderProps {
  children: ReactNode;
  /** Preload all planet textures on mount? Default true */
  preloadPlanets?: boolean;
  /** Preload skybox? Default true */
  preloadSkybox?: boolean;
  /** Preload GLB models? Default false (lazy loaded) */
  preloadModels?: boolean;
}

export function AssetProvider({
  children,
  preloadPlanets = true,
  preloadSkybox = true,
  preloadModels = false,
}: AssetProviderProps) {
  const loader = useAssetLoader();
  const [isReady, setIsReady] = useState(false);
  const didLoad = useRef(false);

  const load = useCallback(async () => {
    if (didLoad.current) return;
    didLoad.current = true;

    const textures: { key: string; url: string }[] = [];
    const models: { key: string; url: string }[] = [];

    // Collect planet textures
    if (preloadPlanets) {
      for (const [planetName, planet] of Object.entries(SPACE_ASSETS.planets)) {
        for (const [texName, tex] of Object.entries(planet.textures)) {
          textures.push({ key: `${planetName}.${texName}`, url: tex.url });
        }
      }
    }

    // Collect skybox textures
    if (preloadSkybox) {
      textures.push({ key: 'skybox.starfield', url: SPACE_ASSETS.skybox.starfield.url });
      textures.push({ key: 'skybox.milkyway', url: SPACE_ASSETS.skybox.milkyway.url });
    }

    // Collect GLB models
    if (preloadModels) {
      for (const [modelName, model] of Object.entries(SPACE_ASSETS.spacecraft.models)) {
        models.push({ key: `spacecraft.${modelName}`, url: model.url });
      }
      for (const [modelName, model] of Object.entries(SPACE_ASSETS.asteroids.models)) {
        models.push({ key: `asteroid.${modelName}`, url: model.url });
      }
    }

    await loader.loadAll(textures, models);
    setIsReady(true);
  }, [loader, preloadPlanets, preloadSkybox, preloadModels]);

  useEffect(() => {
    load();
  }, [load]);

  const value: AssetContextValue = {
    assets: loader.assets,
    isLoading: loader.isLoading,
    progress: loader.progress,
    error: loader.error,
    getTexture: loader.getTexture,
    getModel: loader.getModel,
    isReady,
  };

  return (
    <AssetContext.Provider value={value}>
      {children}
    </AssetContext.Provider>
  );
}
