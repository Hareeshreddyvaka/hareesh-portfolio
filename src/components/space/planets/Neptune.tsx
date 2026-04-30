import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeptuneProps {
  position?: [number, number, number];
  scale?: number;
}

/**
 * Neptune — Deep blue ice giant with atmospheric shimmer
 */
export function Neptune({ position = [-10, 5, -20], scale = 2.0 }: NeptuneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Atmospheric shader for Neptune's blue glow
  const atmosphereMaterial = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
        float pulse = 0.9 + 0.1 * sin(uTime * 0.5);
        vec3 color = mix(vec3(0.1, 0.25, 0.6), vec3(0.2, 0.4, 0.9), intensity);
        gl_FragColor = vec4(color, intensity * 0.6 * pulse);
      }
    `,
  }), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
    }
    atmosphereMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      {/* Neptune body */}
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1a3a7a"
          roughness={0.35}
          metalness={0.15}
          emissive="#0a1540"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Atmospheric glow shell */}
      <mesh ref={atmosphereRef} position={position} scale={scale * 1.15} material={atmosphereMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
    </group>
  );
}
