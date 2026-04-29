// ============================================================================
// Sun — Emissive sphere with corona glow and pulsing animation
// ============================================================================

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTextures } from '../../../contexts/useAssets';
import { SPACE_ASSETS } from '../../../config/assetConfig';

interface SunProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
  /** Adds a point light at the sun's position */
  emitLight?: boolean;
  lightIntensity?: number;
}

// Corona / glow shader
const coronaVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coronaFragment = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);

    // Pulsing corona
    float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
    float glow = pow(rim, 2.5) * uIntensity * pulse;

    // Orange-yellow corona color
    vec3 color = mix(vec3(1.0, 0.6, 0.1), vec3(1.0, 1.0, 0.4), rim);
    gl_FragColor = vec4(color, glow * 0.7);
  }
`;

export default function Sun({
  position = [0, 0, 0],
  scale = 1,
  scrollProgress = 0,
  interactive = true,
  emitLight = true,
  lightIntensity = 2,
}: SunProps) {
  const cfg = SPACE_ASSETS.planets.sun;
  const textures = usePlanetTextures('sun');

  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(scale);

  const coronaMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: coronaVertex,
        fragmentShader: coronaFragment,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state, delta) => {
    targetScale.current = hovered ? scale * 1.04 : scale;

    if (ref.current) {
      ref.current.rotation.y += cfg.animation.rotationSpeed;
      ref.current.rotation.x = scrollProgress * 0.05;

      ref.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        delta * 4,
      );
    }

    coronaMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const { radius, widthSegments, heightSegments } = cfg.geometry;

  return (
    <group position={position}>
      {/* Sun body — emissive material */}
      <mesh
        ref={ref}
        onPointerEnter={interactive ? () => setHovered(true) : undefined}
        onPointerLeave={interactive ? () => setHovered(false) : undefined}
      >
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshBasicMaterial
          map={textures.dayMap ?? null}
          color={textures.dayMap ? undefined : new THREE.Color(1, 0.8, 0.3)}
        />
      </mesh>

      {/* Corona glow */}
      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <primitive object={coronaMaterial} attach="material" />
      </mesh>

      {/* Inner glow halo */}
      <mesh scale={[1.08, 1.08, 1.08]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(1, 0.7, 0.2)}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light */}
      {emitLight && (
        <pointLight
          color={new THREE.Color(1, 0.95, 0.8)}
          intensity={lightIntensity}
          distance={100}
          decay={2}
        />
      )}
    </group>
  );
}
