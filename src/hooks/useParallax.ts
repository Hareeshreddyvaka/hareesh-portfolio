import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight scroll-based parallax hook.
 * Uses requestAnimationFrame to read scrollY exactly once per frame.
 * Respects prefers-reduced-motion.
 */
export function useParallax(speed = 0.3) {
    const [offset, setOffset] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const handleScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(() => {
                    setOffset(window.scrollY * speed);
                    ticking.current = false;
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return offset;
}
