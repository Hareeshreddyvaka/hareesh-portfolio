import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AmbientEffects — God rays and cosmic dust only.
 * Lighting and fog are now handled exclusively by DynamicLighting.tsx
 * to prevent conflicts and duplicate draw calls.
 */
export function AmbientEffects() {
  const dustRef = useRef<THREE.Points>(null);
  const godRayRef = useRef<THREE.Mesh>(null);

  // Cosmic dust — reduced to 1500 from 3000 for perf
  const dustGeometry = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  // God ray shader material
  const godRayMaterial = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#9D4EDD') },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;

      void main() {
        float centerDist = length(vUv - vec2(0.5));
        float ray = smoothstep(0.5, 0.0, centerDist);
        float pulse = 0.5 + 0.5 * sin(uTime * 0.3);
        float beam = pow(ray, 3.0) * pulse * 0.15;
        float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
        float beamPattern = abs(sin(angle * 6.0 + uTime * 0.2));
        beam *= (0.5 + 0.5 * beamPattern);
        gl_FragColor = vec4(uColor, beam);
      }
    `,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.008;
      dustRef.current.rotation.x = Math.sin(t * 0.003) * 0.05;
    }
    godRayMaterial.uniforms.uTime.value = t;
  });

  return (
    <>
      {/* God rays from a distant "star" */}
      <mesh ref={godRayRef} position={[30, 15, -50]} material={godRayMaterial}>
        <planeGeometry args={[60, 60]} />
      </mesh>

      {/* Cosmic Dust Particles */}
      <points ref={dustRef} geometry={dustGeometry}>
        <pointsMaterial
          size={0.06}
          color="#aabbcc"
          transparent
          opacity={0.2}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
