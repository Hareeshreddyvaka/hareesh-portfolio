import React, { useState } from 'react';
import { Camera, Play, Download } from 'lucide-react';
import { useCameraModes } from '../../hooks/useCameraModes';

export function PhotoMode() {
  const { mode, setMode } = useCameraModes();
  const [isPhotoHUDVisible, setIsPhotoHUDVisible] = useState(false);

  const togglePhotoMode = () => {
    if (mode === 'CINEMATIC') {
      setMode('FREE_ROAM');
      setIsPhotoHUDVisible(true);
    } else {
      setMode('CINEMATIC');
      setIsPhotoHUDVisible(false);
    }
  };

  const takeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'space-portfolio-screenshot.png';
      a.click();
    }
  };

  const isPhotoMode = mode !== 'CINEMATIC';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {isPhotoHUDVisible && (
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10 pointer-events-auto">
          <button
            onClick={takeScreenshot}
            aria-label="Save screenshot"
            className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-[#00D9FF]/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download size={16} aria-hidden="true" />
            <span className="text-xs font-mono">SAVE</span>
          </button>
        </div>
      )}

      <button
        onClick={togglePhotoMode}
        aria-label={isPhotoMode ? 'Resume cinematic mode' : 'Enter photo mode'}
        aria-pressed={isPhotoMode}
        className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white/80 hover:text-white hover:border-[#9D4EDD] transition-all shadow-lg pointer-events-auto"
      >
        {isPhotoMode ? <Play size={20} aria-hidden="true" /> : <Camera size={20} aria-hidden="true" />}
      </button>
    </div>
  );
}
