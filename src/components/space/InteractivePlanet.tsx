import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetInfo } from '../../hooks/usePlanetInteraction';
import { useUserPreferences } from '../../hooks/useUserPreferences';

interface InteractivePlanetProps {
  children: React.ReactNode;
  info: PlanetInfo;
  onClick: (info: PlanetInfo) => void;
  onHover: (id: string | null) => void;
  isHovered: boolean;
  isSelected: boolean;
}

export function InteractivePlanet({
  children,
  info,
  onClick,
  onHover,
  isHovered,
  isSelected,
}: InteractivePlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [clickTime, setClickTime] = useState(0);
  const { preferences } = useUserPreferences();

  // Glow material — additive blended sphere around the planet
  const glowMaterial = useMemo(() => {
    const color = new THREE.Color(info.color);
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: color },
        uIntensity: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uIntensity;
        varying vec3 vNormal;
        void main() {
          float rim = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(uColor, rim * uIntensity);
        }
      `,
    });
  }, [info.color]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth scale transition with click bounce
      let targetScale = isSelected ? 1.15 : isHovered ? 1.06 : 1.0;
      
      // Ripple / Bounce effect on click
      const timeSinceClick = state.clock.elapsedTime - clickTime;
      if (!preferences.reduceMotion && clickTime > 0 && timeSinceClick < 0.5) {
        // Simple sine bounce: expands slightly then settles
        const bounce = Math.sin(timeSinceClick * Math.PI * 4) * 0.1 * (1 - timeSinceClick * 2);
        targetScale += bounce;
      }
      
      // Subtle float animation
      if (!preferences.reduceMotion) {
        const floatOffset = Math.sin(state.clock.elapsedTime * 2 + info.id.length) * 0.05;
        groupRef.current.position.y += (floatOffset - groupRef.current.position.y) * delta;
      }

      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6 // Faster lerp for snappier interactions
      );
    }

    // Animate glow intensity
    const targetIntensity = isSelected ? 0.8 : isHovered ? 0.5 : 0;
    glowMaterial.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      glowMaterial.uniforms.uIntensity.value,
      targetIntensity,
      delta * 6
    );
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        setClickTime(performance.now() / 1000); // Trigger bounce
        onClick(info);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(info.id);
      }}
      onPointerOut={() => {
        onHover(null);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setClickTime(performance.now() / 1000); // Trigger bounce
        onClick(info);
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault(); // prevent browser context menu
        // Trigger custom context menu here
      }}
    >
      {/* Children (the actual planet mesh) */}
      {children}

      {/* Glow sphere — slightly larger, renders behind planet */}
      <mesh ref={glowRef} material={glowMaterial}>
        <sphereGeometry args={[2.2, 32, 32]} />
      </mesh>

      {/* Hover orbit ring indicator */}
      {(isHovered || isSelected) && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.55, 64]} />
          <meshBasicMaterial
            color={info.color}
            transparent
            opacity={isSelected ? 0.6 : 0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}
