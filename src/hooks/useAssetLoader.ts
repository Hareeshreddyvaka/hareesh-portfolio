// ============================================================================
// useAssetLoader — Texture & GLB loading hook with progress tracking
// ============================================================================

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { GLTFLoader, type GLTF } from 'three-stdlib';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoadedAssets {
  textures: Map<string, THREE.Texture>;
  models: Map<string, GLTF>;
}

interface AssetLoaderState {
  isLoading: boolean;
  progress: number; // 0-100
  loaded: number;
  total: number;
  error: string | null;
  assets: LoadedAssets;
}

type Action =
  | { type: 'START'; total: number }
  | { type: 'LOADED_ONE' }
  | { type: 'DONE' }
  | { type: 'ERROR'; message: string }
  | { type: 'TEXTURE'; key: string; texture: THREE.Texture }
  | { type: 'MODEL'; key: string; gltf: GLTF };

function reducer(state: AssetLoaderState, action: Action): AssetLoaderState {
  switch (action.type) {
    case 'START':
      return { ...state, isLoading: true, total: action.total, loaded: 0, progress: 0, error: null };

    case 'LOADED_ONE': {
      const loaded = state.loaded + 1;
      const progress = state.total > 0 ? Math.round((loaded / state.total) * 100) : 0;
      return { ...state, loaded, progress };
    }

    case 'DONE':
      return { ...state, isLoading: false, progress: 100 };

    case 'ERROR':
      return { ...state, error: action.message };

    case 'TEXTURE': {
      const textures = new Map(state.assets.textures);
      textures.set(action.key, action.texture);
      return { ...state, assets: { ...state.assets, textures } };
    }

    case 'MODEL': {
      const models = new Map(state.assets.models);
      models.set(action.key, action.gltf);
      return { ...state, assets: { ...state.assets, models } };
    }

    default:
      return state;
  }
}

const initialState: AssetLoaderState = {
  isLoading: false,
  progress: 0,
  loaded: 0,
  total: 0,
  error: null,
  assets: {
    textures: new Map(),
    models: new Map(),
  },
};

// ---------------------------------------------------------------------------
// Singletons — shared across hook instances for caching
// ---------------------------------------------------------------------------

const textureCache = new Map<string, THREE.Texture>();
const modelCache = new Map<string, GLTF>();
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const supportsWebP = (): boolean => {
  if (typeof document === 'undefined') return false;
  const c = document.createElement('canvas');
  return c.toDataURL('image/webp').startsWith('data:image/webp');
};

const hasWebP = supportsWebP();

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface UseAssetLoaderReturn {
  assets: LoadedAssets;
  isLoading: boolean;
  progress: number;
  error: string | null;
  loadTextures: (entries: { key: string; url: string }[]) => Promise<void>;
  loadModels: (entries: { key: string; url: string }[]) => Promise<void>;
  loadAll: (
    textures: { key: string; url: string }[],
    models: { key: string; url: string }[],
  ) => Promise<void>;
  getTexture: (key: string) => THREE.Texture | undefined;
  getModel: (key: string) => GLTF | undefined;
}

export function useAssetLoader(): UseAssetLoaderReturn {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // ---- texture loading -----------------------------------------------------

  const loadSingleTexture = useCallback(
    (key: string, originalUrl: string): Promise<void> => {
      // Use WebP if supported, else use original URL
      let url = originalUrl;
      if (hasWebP && url.includes('/planets/') && (url.endsWith('.jpg') || url.endsWith('.png'))) {
        url = url.substring(0, url.lastIndexOf('.')) + '.webp';
      }

      // Return cached
      if (textureCache.has(url)) {
        const cached = textureCache.get(url)!;
        if (mountedRef.current) {
          dispatch({ type: 'TEXTURE', key, texture: cached });
          dispatch({ type: 'LOADED_ONE' });
        }
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        textureLoader.load(
          url,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            textureCache.set(url, texture);

            if (mountedRef.current) {
              dispatch({ type: 'TEXTURE', key, texture });
              dispatch({ type: 'LOADED_ONE' });
            }
            resolve();
          },
          undefined,
          () => {
            // On error — continue loading, log warning
            console.warn(`[AssetLoader] Failed to load texture: ${url}`);
            if (mountedRef.current) {
              dispatch({ type: 'LOADED_ONE' });
            }
            resolve(); // resolve anyway so we don't block
          },
        );
      });
    },
    [],
  );

  const loadTextures = useCallback(
    async (entries: { key: string; url: string }[]) => {
      await Promise.all(entries.map(({ key, url }) => loadSingleTexture(key, url)));
    },
    [loadSingleTexture],
  );

  // ---- model loading -------------------------------------------------------

  const loadSingleModel = useCallback(
    (key: string, url: string): Promise<void> => {
      if (modelCache.has(url)) {
        const cached = modelCache.get(url)!;
        if (mountedRef.current) {
          dispatch({ type: 'MODEL', key, gltf: cached });
          dispatch({ type: 'LOADED_ONE' });
        }
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        gltfLoader.load(
          url,
          (gltf) => {
            modelCache.set(url, gltf);
            if (mountedRef.current) {
              dispatch({ type: 'MODEL', key, gltf });
              dispatch({ type: 'LOADED_ONE' });
            }
            resolve();
          },
          undefined,
          () => {
            console.warn(`[AssetLoader] Failed to load model: ${url}`);
            if (mountedRef.current) {
              dispatch({ type: 'LOADED_ONE' });
            }
            resolve();
          },
        );
      });
    },
    [],
  );

  const loadModels = useCallback(
    async (entries: { key: string; url: string }[]) => {
      await Promise.all(entries.map(({ key, url }) => loadSingleModel(key, url)));
    },
    [loadSingleModel],
  );

  // ---- load all ------------------------------------------------------------

  const loadAll = useCallback(
    async (
      textures: { key: string; url: string }[],
      models: { key: string; url: string }[],
    ) => {
      const total = textures.length + models.length;
      if (total === 0) {
        dispatch({ type: 'DONE' });
        return;
      }

      dispatch({ type: 'START', total });

      await Promise.all([
        loadTextures(textures),
        loadModels(models),
      ]);

      if (mountedRef.current) {
        dispatch({ type: 'DONE' });
      }
    },
    [loadTextures, loadModels],
  );

  // ---- accessors -----------------------------------------------------------

  const getTexture = useCallback(
    (key: string) => state.assets.textures.get(key),
    [state.assets.textures],
  );

  const getModel = useCallback(
    (key: string) => state.assets.models.get(key),
    [state.assets.models],
  );

  return {
    assets: state.assets,
    isLoading: state.isLoading,
    progress: state.progress,
    error: state.error,
    loadTextures,
    loadModels,
    loadAll,
    getTexture,
    getModel,
  };
}
