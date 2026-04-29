import { useSpaceCameraController } from '../../../hooks/useSpaceCameraController';
import { usePlanetInteraction } from '../../../hooks/usePlanetInteraction';
import { InteractivePlanet } from '../InteractivePlanet';
import { PlanetDetailPanel } from '../PlanetDetailPanel';
import { InteractionHints } from '../InteractionHints';
import { AmbientEffects } from '../AmbientEffects';
import { useGestureCamera } from '../../../hooks/useGestureCamera';
import { useCameraModes } from '../../../hooks/useCameraModes';
import { Html } from '@react-three/drei';

import { Earth, Saturn, Venus, Mars, Jupiter, Sun } from '../planets';
import { ReactiveStarfield } from '../ReactiveStarfield';
import NebulaCloud from '../procedural/NebulaCloud';
import { AsteroidField } from '../procedural/AsteroidField';
import { CometTrail } from '../procedural/CometTrail';

import { CameraEffects } from '../CameraEffects';
import { DynamicLighting } from '../DynamicLighting';
import { WarpEffect } from '../WarpEffect';
import { useCinematicOptimization } from '../../../utils/cinematicOptimization';
import { useUserPreferences } from '../../../hooks/useUserPreferences';

export function PlanetarySystem() {
  const { mode } = useCameraModes();
  const { enablePostProcessing: hardwareAllowsPostProcessing, particleCountMultiplier } = useCinematicOptimization();
  const { preferences } = useUserPreferences();

  const {
    selectedPlanet,
    hoveredPlanet,
    handlePlanetClick,
    handleClosePanel,
    handlePlanetHover,
  } = usePlanetInteraction();

  useSpaceCameraController(mode);
  useGestureCamera();

  return (
    <>
      {/* ═══════════════ RENDERING ═══════════════ */}
      {hardwareAllowsPostProcessing && preferences.enablePostProcessing && <CameraEffects />}
      <DynamicLighting />
      <AmbientEffects />
      {!preferences.reduceMotion && <WarpEffect />}

      {/* ═══════════════ ENVIRONMENT ═══════════════ */}
      <ReactiveStarfield count={Math.floor(3000 * particleCountMultiplier)} />
      <NebulaCloud position={[-30, 15, -60]} scale={3} color="#9D4EDD" pointCount={800} />
      <NebulaCloud position={[40, -10, -80]} scale={2.5} color="#3A86FF" pointCount={600} />

      {/* ═══════════════ SUN ═══════════════ */}
      <Sun position={[80, 30, 50]} scale={4} emitLight lightIntensity={1.2} interactive={false} />

      {/* ═══════════════ PLANETS (5 only — quality over quantity) ═══════════════ */}
      
      {/* Earth — Hero */}
      <InteractivePlanet
        info={{ id: 'earth', name: 'Earth', section: 'hero', color: '#00D4FF',
          description: 'Your origin point.', stats: { 'Section': 'Hero' } }}
        onClick={handlePlanetClick} onHover={handlePlanetHover}
        isHovered={hoveredPlanet === 'earth'} isSelected={selectedPlanet?.id === 'earth'}
      >
        <Earth position={[0, 0, 0]} scale={2} scrollProgress={0} />
      </InteractivePlanet>

      {/* Mars — Projects */}
      <InteractivePlanet
        info={{ id: 'mars', name: 'Mars', section: 'projects', color: '#FF4422',
          description: 'Featured projects.', stats: { 'Projects': '3+' } }}
        onClick={handlePlanetClick} onHover={handlePlanetHover}
        isHovered={hoveredPlanet === 'mars'} isSelected={selectedPlanet?.id === 'mars'}
      >
        <Mars position={[15, 2, -10]} scale={2.5} />
      </InteractivePlanet>

      {/* Venus — Skills */}
      <InteractivePlanet
        info={{ id: 'venus', name: 'Venus', section: 'skills', color: '#FFAA00',
          description: 'Technical proficiency.', stats: { 'Skills': '20+' } }}
        onClick={handlePlanetClick} onHover={handlePlanetHover}
        isHovered={hoveredPlanet === 'venus'} isSelected={selectedPlanet?.id === 'venus'}
      >
        <Venus position={[-15, -5, -25]} scale={3} />
      </InteractivePlanet>

      {/* Saturn — Certifications */}
      <InteractivePlanet
        info={{ id: 'saturn', name: 'Saturn', section: 'certs', color: '#EEDB9A',
          description: 'Credentials.', stats: { 'Verified': 'Yes' } }}
        onClick={handlePlanetClick} onHover={handlePlanetHover}
        isHovered={hoveredPlanet === 'saturn'} isSelected={selectedPlanet?.id === 'saturn'}
      >
        <Saturn position={[-20, 10, -35]} scale={2} scrollProgress={0} />
      </InteractivePlanet>

      {/* Jupiter — Contact */}
      <InteractivePlanet
        info={{ id: 'jupiter', name: 'Jupiter', section: 'contact', color: '#FFB973',
          description: 'Get in touch.', stats: { 'Status': 'Open' } }}
        onClick={handlePlanetClick} onHover={handlePlanetHover}
        isHovered={hoveredPlanet === 'jupiter'} isSelected={selectedPlanet?.id === 'jupiter'}
      >
        <Jupiter position={[0, 10, -40]} scale={4} />
      </InteractivePlanet>

      {/* ═══════════════ PROCEDURAL ═══════════════ */}
      <AsteroidField count={Math.floor(60 * particleCountMultiplier)} radius={40} />
      <CometTrail />

      {/* ═══════════════ HUD ═══════════════ */}
      <Html fullscreen zIndexRange={[100, 0]}>
        <InteractionHints mode={mode} hasSelection={!!selectedPlanet} />
        <PlanetDetailPanel planet={selectedPlanet} onClose={handleClosePanel} />
      </Html>
    </>
  );
}
