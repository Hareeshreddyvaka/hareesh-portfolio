import { useState, useEffect, RefObject } from 'react';

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options = { threshold: 0, root: null, rootMargin: '0px' },
  triggerOnce = true
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) observer.unobserve(el);
      } else {
        if (!triggerOnce) setIsVisible(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [elementRef, options, triggerOnce]);

  return isVisible;
}
