import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function CursorSystem() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as Element;
      const cursorState = target.closest('[data-cursor]')?.getAttribute('data-cursor') ?? 'default';
      
      if (ring.dataset.state !== cursorState) {
        ring.dataset.state = cursorState;
      }
    };

    const onMouseDown = () => document.body.classList.add('cursor-clicking');
    const onMouseUp = () => document.body.classList.remove('cursor-clicking');

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    let animationFrameId: number;

    const render = () => {
      // Dot is exact tracking
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;

      // Ring lerps towards mouse
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mutation observer for dynamic elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button').forEach(el => {
        if (!el.hasAttribute('data-cursor')) {
          el.setAttribute('data-cursor', 'link');
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial pass
    document.querySelectorAll('a, button').forEach(el => {
      if (!el.hasAttribute('data-cursor')) {
        el.setAttribute('data-cursor', 'link');
      }
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.classList.remove('cursor-clicking');
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return createPortal(
    <>
      <style>{`
        /* Cursor specific styles */
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          will-change: transform;
          z-index: 99999;
        }

        .cursor-dot-inner {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          opacity: 1;
          transition: transform 150ms ease;
          transform: scale(1);
        }

        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          will-change: transform;
          z-index: 99998;
        }
        
        .cursor-ring-scale-wrapper {
          transition: transform 150ms ease;
          transform: scale(1);
        }

        .cursor-ring-inner {
          width: 32px;
          height: 32px;
          border: 2px solid white;
          border-radius: 50%;
          transition: all 150ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        /* States */
        .cursor-ring[data-state="planet"] .cursor-ring-inner {
          width: 48px;
          height: 48px;
          animation: cursor-spin 2s linear infinite;
        }

        .cursor-ring[data-state="link"] .cursor-ring-inner {
          width: 64px;
          height: 28px;
          border-radius: 14px;
        }

        /* Clicking */
        body.cursor-clicking .cursor-dot-inner { 
          transform: scale(0.5); 
        }
        body.cursor-clicking .cursor-ring-scale-wrapper { 
          transform: scale(0.85); 
        }

        @keyframes cursor-spin { 
          to { transform: rotate(360deg) } 
        }
      `}</style>
      <div ref={ringRef} className="cursor-ring" data-state="default">
        <div className="cursor-ring-scale-wrapper">
          <div ref={ringInnerRef} className="cursor-ring-inner"></div>
        </div>
      </div>
      <div ref={dotRef} className="cursor-dot">
        <div className="cursor-dot-inner"></div>
      </div>
    </>,
    document.body
  );
}
