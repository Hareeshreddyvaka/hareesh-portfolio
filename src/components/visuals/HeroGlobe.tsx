import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Globe: React.FC = () => {
  const gradients = useMemo(
    () => [
      '#3b82f6',
      '#22d3ee',
      '#6366f1',
      '#8b5cf6',
      '#0ea5e9',
      '#14b8a6',
    ],
    [],
  );

  return (
    <group>
      <mesh rotation={[0.35, 0.6, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial color={gradients[0]} flatShading metalness={0.2} roughness={0.4} />
      </mesh>
      {gradients.map((color, index) => (
        <mesh key={color} rotation={[Math.random(), Math.random(), Math.random()]}>
          <torusGeometry args={[2.2 + index * 0.18, 0.02 + index * 0.005, 128, 128]} />
          <meshBasicMaterial color={color} opacity={0.18} transparent />
        </mesh>
      ))}
      <pointLight intensity={1.8} position={[4, 3, 6]} color="#60a5fa" />
      <pointLight intensity={1.2} position={[-5, -2, -2]} color="#22d3ee" />
      <ambientLight intensity={0.4} />
    </group>
  );
};

const HeroGlobe: React.FC = () => (
  <div className="relative h-full">
    <Suspense fallback={null}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="h-full"
      >
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.9} />
        <Globe />
      </Canvas>
    </Suspense>
    <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary-500/10 to-transparent opacity-60 blur-3xl" />
  </div>
);

export default HeroGlobe;

