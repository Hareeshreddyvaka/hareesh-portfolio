import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // We defer the declarations to let children mount safely
    const timer = setTimeout(() => {
      // 1. PROJECTS FADE IN
      const projectCards = gsap.utils.toArray('.project-card');
      if (projectCards.length) {
        gsap.fromTo(projectCards, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#projects-section',
              start: 'top 70%',
              end: 'top 30%',
              scrub: false,
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 2. SKILL BARS
      const skillBars = gsap.utils.toArray('.skill-bar-fill');
      if (skillBars.length) {
        gsap.fromTo(skillBars,
          { width: '0%' },
          {
            width: (i, el) => `${(el as HTMLElement).dataset.width}%`,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: '#skills-section',
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 3. CERTIFICATES STAGGER
      const certCards = gsap.utils.toArray('.cert-card');
      if (certCards.length) {
        gsap.fromTo(certCards,
          { opacity: 0, scale: 0.9, rotationY: -15 },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: '#certifications-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 4. CONTACT FADE IN
      gsap.fromTo('#contact-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '#contact-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}
