import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * useFocusTrap — traps keyboard focus inside a container while active.
 * On deactivation it restores focus to the element that was focused before
 * the trap was enabled, supporting Escape-to-close / Tab-cycle patterns.
 *
 * Usage:
 *   const trapRef = useFocusTrap(isOpen);
 *   <div ref={trapRef} role="dialog" aria-modal="true"> … </div>
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const savedFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return undefined;

    // Remember who had focus before we opened
    savedFocusRef.current = document.activeElement as HTMLElement;

    // Move focus to the first focusable child after a short tick so CSS
    // transitions have started (avoids visible jump on slow transitions)
    const focusTimer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const first = container.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
      first?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the element that triggered the dialog
      savedFocusRef.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}
