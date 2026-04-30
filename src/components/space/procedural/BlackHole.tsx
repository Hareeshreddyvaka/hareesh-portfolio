// ============================================================================
// BlackHole — Event horizon + accretion disk + particle jets
// ============================================================================

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BlackHoleProps {
  position?: [number, number, number];
  scale?: number;
  scrollProgress?: number;
  interactive?: boolean;
}

// ---- Accretion disk shaders ------------------------------------------------

const diskVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const diskFragment = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;

  varying vec2 vUv;

  void main() {
    // Polar coordinates from ring UVs
    float angle = vUv.x * 6.2831853; // 2π
    float radius = vUv.y;

    // Rotating flow pattern
    float flow = sin(angle * 8.0 - uTime * 3.0 + radius * 12.0) * 0.5 + 0.5;
    float flow2 = sin(angle * 5.0 + uTime * 2.0 - radius * 8.0) * 0.5 + 0.5;

    // Hot inner, cooler outer
    vec3 innerColor = vec3(1.0, 1.0, 0.9);  // white-hot
    vec3 midColor   = vec3(1.0, 0.6, 0.1);  // orange
    vec3 outerColor = vec3(0.6, 0.2, 0.8);  // purple edge

    vec3 color = mix(innerColor, midColor, smoothstep(0.0, 0.5, radius));
    color = mix(color, outerColor, smoothstep(0.4, 1.0, radius));

    // Flow brightness
    float brightness = mix(0.6, 1.0, flow * flow2);

    // Fade at edges
    float edgeFade = smoothstep(0.0, 0.1, radius) * smoothstep(1.0, 0.8, radius);

    float alpha = brightness * edgeFade * uIntensity;
    gl_FragColor = vec4(color * brightness, alpha * 0.85);
  }
`;

// ---- Event horizon glow shader --------------------------------------------

const glowVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    float glow = pow(rim, 4.0) * 1.5;

    // Subtle pulsing
    glow *= 0.8 + 0.2 * sin(uTime * 2.0);

    vec3 color = mix(vec3(1.0, 0.4, 0.0), vec3(0.6, 0.2, 1.0), rim);
    gl_FragColor = vec4(color, glow * 0.5);
  }
`;

export default function BlackHole({
  position = [0, 0, 0],
  scale = 1,
  scrollProgress = 0,
}: BlackHoleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const diskRef  = useRef<THREE.Mesh>(null);

  // ---- Ring geometry with radial UVs ---------------------------------------
  const ringGeo = useMemo(() => {
    const inner = 1.5;
    const outer = 4.0;
    const segs  = 128;
    const geo = new THREE.RingGeometry(inner, outer, segs, 1);

    // Remap UVs: x = angle (0..1), y = radius (0=inner, 1=outer)
    const pos = geo.attributes.position;
    const uv  = geo.attributes.uv;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const angle = Math.atan2(v.y, v.x) / (Math.PI * 2) + 0.5;
      const dist  = v.length();
      const t     = (dist - inner) / (outer - inner);
      uv.setXY(i, angle, t);
    }

    return geo;
  }, []);

  // ---- Materials -----------------------------------------------------------
  const diskMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: diskVertex,
        fragmentShader: diskFragment,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: glowVertex,
        fragmentShader: glowFragment,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // ---- Particle jet geometry -----------------------------------------------
  const jetGeo = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);
    const phases    = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const sign = i < count / 2 ? 1 : -1;
      const t = Math.random();

      // Particles along polar jets (y-axis)
      positions[i3]     = (Math.random() - 0.5) * 0.3 * (1 - t);
      positions[i3 + 1] = sign * (0.5 + t * 8.0);
      positions[i3 + 2] = (Math.random() - 0.5) * 0.3 * (1 - t);

      sizes[i]  = 0.02 + Math.random() * 0.08;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('aSize',    new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute('aPhase',   new THREE.Float32BufferAttribute(phases, 1));
    return geo;
  }, []);

  const jetMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color(0.5, 0.6, 1.0),
        size: 0.08,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      ringGeo.dispose();
      diskMaterial.dispose();
      glowMaterial.dispose();
      jetGeo.dispose();
      jetMaterial.dispose();
    };
  }, [ringGeo, diskMaterial, glowMaterial, jetGeo, jetMaterial]);

  // ---- Animation loop ------------------------------------------------------
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    diskMaterial.uniforms.uTime.value = t;
    glowMaterial.uniforms.uTime.value = t;

    if (diskRef.current) {
      diskRef.current.rotation.z += 0.003;
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = scrollProgress * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Event horizon — perfect black sphere */}
      <mesh>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Event horizon rim glow */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* Accretion disk */}
      <mesh
        ref={diskRef}
        geometry={ringGeo}
        material={diskMaterial}
        rotation={[Math.PI * 0.42, 0, 0]}
      />

      {/* Polar particle jets */}
      <points geometry={jetGeo} material={jetMaterial} />
    </group>
  );
}
