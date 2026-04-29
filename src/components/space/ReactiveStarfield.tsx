import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCinematicTimeline } from '../../hooks/useCinematicTimeline';
import { useUserPreferences } from '../../hooks/useUserPreferences';

export function ReactiveStarfield({ count = 8000 }) {
  const { currentSection } = useCinematicTimeline();
  const { preferences } = useUserPreferences();
  const pointsRef = useRef<THREE.Points>(null);
  
  // Custom shader for reactive stars
  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uVelocity: { value: 0.0 }
    },
    vertexShader: /* glsl */ `
      attribute float aSize;
      attribute vec3 aColor;
      
      uniform float uTime;
      uniform float uVelocity;
      
      varying vec3 vColor;
      varying float vAlpha;
      
      void main() {
        // Doppler shift: slightly blue shift when velocity is high
        vec3 shiftedColor = mix(aColor, vec3(0.5, 0.8, 1.0), uVelocity * 0.5);
        vColor = shiftedColor;
        
        // Stretch along Z based on velocity
        vec3 pos = position;
        pos.z += uVelocity * 10.0 * sin(uTime * 10.0 + pos.x);
        
        vAlpha = 0.5 + 0.5 * sin(uTime * 2.0 + pos.x);
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        
        // Stars stretch out radially when moving fast
        if (uVelocity > 0.1) {
           mvPosition.xy *= (1.0 + uVelocity * 0.2);
        }
        
        gl_PointSize = aSize * (200.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        
        float glow = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor, glow * vAlpha);
      }
    `
  }), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for(let i=0; i<count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 400;
      positions[i3+1] = (Math.random() - 0.5) * 400;
      positions[i3+2] = -Math.random() * 400;
      
      colors[i3] = 0.8 + Math.random() * 0.2;
      colors[i3+1] = 0.8 + Math.random() * 0.2;
      colors[i3+2] = 0.8 + Math.random() * 0.2;
      
      sizes[i] = Math.random() * 2.0 + 0.5;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count]);

  useFrame((state, delta) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    
    const isTravel = currentSection.current === 'travel';
    const targetVel = (isTravel && !preferences.reduceMotion) ? 1.0 : 0.0;
    
    material.uniforms.uVelocity.value = THREE.MathUtils.lerp(
      material.uniforms.uVelocity.value,
      targetVel,
      delta * 2
    );
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
