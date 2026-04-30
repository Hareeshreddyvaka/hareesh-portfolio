import { createContext } from 'react';
import type * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import type { LoadedAssets } from '../hooks/useAssetLoader';

export interface AssetContextValue {
  assets: LoadedAssets;
  isLoading: boolean;
  progress: number;
  error: string | null;
  getTexture: (key: string) => THREE.Texture | undefined;
  getModel: (key: string) => GLTF | undefined;
  isReady: boolean;
}

export const AssetContext = createContext<AssetContextValue | null>(null);
