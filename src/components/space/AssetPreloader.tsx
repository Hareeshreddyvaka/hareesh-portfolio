// ============================================================================
// AssetPreloader — Cinematic boot sequence
// ============================================================================

import { useEffect, useState, useMemo } from 'react';

interface AssetPreloaderProps {
  progress: number;
  isLoading: boolean;
  onComplete?: () => void;
}

const BOOT_STAGES = [
  'Initializing quantum core...',
  'Calibrating stellar navigation...',
  'Loading planetary data...',
  'Rendering atmosphere shaders...',
  'Establishing orbit parameters...',
  'Systems nominal.',
];

export default function AssetPreloader({
  progress,
  isLoading,
  onComplete,
}: AssetPreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [ready, setReady] = useState(false);

  // Generate stars once
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 1.5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    []
  );

  const stageIndex = Math.min(
    Math.floor((progress / 100) * BOOT_STAGES.length),
    BOOT_STAGES.length - 1
  );

  useEffect(() => {
    if (!isLoading && progress >= 100) {
      const timer = setTimeout(() => setReady(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  const handleEngage = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1800);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020205',
        transition: 'opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1), transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? 'scale(1.15)' : 'scale(1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Star field background */}
      <div style={{ position: 'absolute', inset: 0, opacity: fadeOut ? 0.8 : 0.4, transition: 'opacity 1s' }}>
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: 'white',
              borderRadius: '50%',
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: `preloader-twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          transition: 'opacity 0.5s',
          opacity: fadeOut ? 0 : 1,
        }}
      >
        {/* Orbiting rings */}
        <div style={{ width: '90px', height: '90px', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '1.5px solid transparent',
              borderTopColor: '#9D4EDD',
              borderRadius: '50%',
              animation: 'preloader-spin 1.5s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '8px',
              border: '1.5px solid transparent',
              borderTopColor: '#3A86FF',
              borderRadius: '50%',
              animation: 'preloader-spin 2.2s linear infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '16px',
              border: '1.5px solid transparent',
              borderTopColor: '#00D9FF',
              borderRadius: '50%',
              animation: 'preloader-spin 3s linear infinite',
            }}
          />
          {/* Core dot */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '4px',
              height: '4px',
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0 0 15px 5px rgba(157, 78, 221, 0.5)',
            }}
          />
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              color: '#fff',
              fontSize: '13px',
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '6px',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: 300,
            }}
          >
            {ready ? 'SYSTEMS ONLINE' : 'INITIALIZING'}
          </p>
        </div>

        {/* Boot log or engage button */}
        {!ready ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {/* Progress bar */}
            <div
              style={{
                width: '280px',
                height: '1px',
                background: 'rgba(255,255,255,0.05)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent 0%, #9D4EDD 40%, #00D9FF 100%)',
                  transition: 'width 0.3s ease-out',
                  boxShadow: '0 0 8px rgba(0, 217, 255, 0.5)',
                }}
              />
            </div>

            {/* Boot stage text */}
            <p
              style={{
                color: '#555',
                fontSize: '10px',
                fontFamily: "'Fira Code', monospace",
                letterSpacing: '1px',
                margin: 0,
                textAlign: 'center',
                height: '14px',
              }}
            >
              {BOOT_STAGES[stageIndex]}
            </p>
          </div>
        ) : (
          <button
            onClick={handleEngage}
            style={{
              padding: '14px 48px',
              background: 'transparent',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              color: '#00D9FF',
              fontSize: '12px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.4s',
              animation: 'pulse-border 2.5s infinite',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 217, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.6)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ENGAGE
          </button>
        )}
      </div>

      <style>{`
        @keyframes preloader-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes preloader-twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(0, 217, 255, 0.2); }
          50% { border-color: rgba(0, 217, 255, 0.5); }
        }
      `}</style>
    </div>
  );
}
