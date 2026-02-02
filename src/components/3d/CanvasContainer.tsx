import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Preload } from '@react-three/drei';

interface CanvasContainerProps {
    children: React.ReactNode;
    className?: string;
    cameraPosition?: [number, number, number];
    fov?: number;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({
    children,
    className = 'absolute inset-0 -z-10',
    cameraPosition = [0, 0, 6],
    fov = 50,
}) => {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: cameraPosition, fov }}
                dpr={[1, 2]} // Optimize for high DPI screens
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    {children}
                    <Preload all />
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
};

export default CanvasContainer;
