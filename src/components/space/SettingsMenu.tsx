import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useUserPreferences } from '../../hooks/useUserPreferences';

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
        title="Settings"
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0A0D12] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-outfit text-white font-bold mb-6 flex items-center gap-2">
              <Settings size={20} className="text-[#00D9FF]" />
              System Settings
            </h2>

            <div className="space-y-6">
              {/* Post-Processing Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">Cinematic Effects</h3>
                  <p className="text-xs text-white/50">Bloom, Vignette, Chromatic Aberration</p>
                </div>
                <button 
                  onClick={() => updatePreference('enablePostProcessing', !preferences.enablePostProcessing)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${preferences.enablePostProcessing ? 'bg-[#9D4EDD]' : 'bg-white/20'}`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${preferences.enablePostProcessing ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Reduce Motion Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">Reduce Motion</h3>
                  <p className="text-xs text-white/50">Disables intense warps and camera shaking</p>
                </div>
                <button 
                  onClick={() => updatePreference('reduceMotion', !preferences.reduceMotion)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${preferences.reduceMotion ? 'bg-[#00D9FF]' : 'bg-white/20'}`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${preferences.reduceMotion ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Tooltips Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">Show Tooltips</h3>
                  <p className="text-xs text-white/50">Display interaction hints during flight</p>
                </div>
                <button 
                  onClick={() => updatePreference('showTooltips', !preferences.showTooltips)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${preferences.showTooltips ? 'bg-[#3A86FF]' : 'bg-white/20'}`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${preferences.showTooltips ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-sm text-[#00D9FF] hover:text-white transition-colors"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
