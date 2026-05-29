import { useEffect, useRef } from "react";

const NODE_COUNT = 120;
const CONNECTION_DIST = 150;
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 0.025;
const SPEED_SCALE = 0.4;

const CYAN = "0,245,255";
const VIOLET = "124,58,237";

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * SPEED_SCALE,
    vy: (Math.random() - 0.5) * SPEED_SCALE,
    radius: Math.random() * 1.8 + 0.8,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.02 + 0.01,
  };
}

const NeuralCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
      // Re-initialize particles in new bounds
      particlesRef.current = Array.from({ length: NODE_COUNT }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let frame = 0;

    const animate = () => {
      const { width, height } = canvas;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);
      frame++;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < MOUSE_RADIUS && distToMouse > 0) {
          const force = (MOUSE_RADIUS - distToMouse) / MOUSE_RADIUS;
          p.vx += (dx / distToMouse) * force * MOUSE_FORCE;
          p.vy += (dy / distToMouse) * force * MOUSE_FORCE;
        }

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > SPEED_SCALE * 2) {
          p.vx = (p.vx / speed) * SPEED_SCALE * 2;
          p.vy = (p.vy / speed) * SPEED_SCALE * 2;
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse phase
        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;

        // Draw node
        const isNearMouse = distToMouse < MOUSE_RADIUS;
        const glowIntensity = isNearMouse
          ? 0.9 + (1 - distToMouse / MOUSE_RADIUS) * 0.1
          : pulse * 0.8;

        const nodeGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        nodeGradient.addColorStop(0, `rgba(${CYAN},${glowIntensity})`);
        nodeGradient.addColorStop(0.5, `rgba(${CYAN},${glowIntensity * 0.4})`);
        nodeGradient.addColorStop(1, `rgba(${CYAN},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN},${glowIntensity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.35;
            // Blend between violet and cyan based on distance to mouse
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mdx = mouse.x - midX;
            const mdy = mouse.y - midY;
            const midDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const isMidNear = midDist < MOUSE_RADIUS;

            const lineColor = isMidNear
              ? `rgba(${CYAN},${opacity * 1.5})`
              : `rgba(${VIOLET},${opacity})`;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = isMidNear ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
};

export default NeuralCanvas;
