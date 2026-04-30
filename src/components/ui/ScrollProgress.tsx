import { useEffect, useState } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export default function ScrollProgress() {
  const scrollPos = useScrollPosition();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const prog = totalHeight > 0 ? (scrollPos / totalHeight) * 100 : 0;
    setProgress(Math.min(100, Math.max(0, prog)));
  }, [scrollPos]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#9D4EDD] via-[#3A86FF] to-[#00D9FF] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
