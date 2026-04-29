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
    // We temporarily hide the UI to take a clean screenshot of the canvas
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'space-portfolio-screenshot.png';
      a.click();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {isPhotoHUDVisible && (
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10 pointer-events-auto">
          <button 
            onClick={takeScreenshot}
            className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-[#00D9FF]/20 rounded-lg transition-colors flex items-center gap-2"
            title="Take Screenshot"
          >
            <Download size={16} /> <span className="text-xs font-mono">SAVE</span>
          </button>
        </div>
      )}

      <button
        onClick={togglePhotoMode}
        className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white/80 hover:text-white hover:border-[#9D4EDD] transition-all shadow-lg pointer-events-auto"
        title={mode === 'CINEMATIC' ? "Enter Photo Mode" : "Resume Cinematic"}
      >
        {mode === 'CINEMATIC' ? <Camera size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
}
