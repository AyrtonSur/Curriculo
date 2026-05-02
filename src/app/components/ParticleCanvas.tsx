import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number; // velocity the star always returns to
  baseVy: number;
  radius: number;
  opacity: number;
}

interface ParticleCanvasProps {
  isDark: boolean;
  isMobile: boolean;
}

export function ParticleCanvas({ isDark, isMobile }: ParticleCanvasProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const starsRef   = useRef<Particle[]>([]);
  const animRef    = useRef<number>(0);
  const isDarkRef  = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT        = isMobile ? 50 : 130;
    const CONNECT_DIST = isMobile ? 80 : 130;
    const MOUSE_RADIUS = 150;
    const MOUSE_REPEL  = 3.5;   // impulse strength
    const RETURN_LERP  = 0.04;  // how quickly stars return to base velocity

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Make a single star ─────────────────────────────────────── */
    const makeStar = (randomPos = true): Particle => {
      // Each star gets a random direction and a speed that gives a
      // "depth" feel — faster = closer, brighter; slower = farther, dimmer
      const speed  = Math.random() * 0.55 + 0.12;        // 0.12 – 0.67 px/frame
      const angle  = Math.random() * Math.PI * 2;
      const bvx    = Math.cos(angle) * speed;
      const bvy    = Math.sin(angle) * speed;
      const depth  = speed / 0.67;                        // 0..1  (normalised speed)
      return {
        x:       randomPos ? Math.random() * canvas.width  : canvas.width  / 2,
        y:       randomPos ? Math.random() * canvas.height : canvas.height / 2,
        vx:      bvx,
        vy:      bvy,
        baseVx:  bvx,
        baseVy:  bvy,
        radius:  depth * 1.6 + 0.4,                       // 0.4 – 2.0
        opacity: depth * 0.5 + 0.12,                      // 0.12 – 0.62
      };
    };

    starsRef.current = Array.from({ length: COUNT }, () => makeStar(true));

    /* ── Mouse events ───────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    /* ── Draw loop ──────────────────────────────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark   = isDarkRef.current;
      const stars  = starsRef.current;
      const mouse  = mouseRef.current;

      for (const s of stars) {
        /* Mouse repulsion — instant impulse, then lerp back */
        const dx   = s.x - mouse.x;
        const dy   = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0.5) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_REPEL;
          s.vx += (dx / dist) * force * 0.06;
          s.vy += (dy / dist) * force * 0.06;
        }

        /* Smoothly return to base velocity (steady drift) */
        s.vx += (s.baseVx - s.vx) * RETURN_LERP;
        s.vy += (s.baseVy - s.vy) * RETURN_LERP;

        s.x += s.vx;
        s.y += s.vy;

        /* Wrap: when a star exits one edge it re-enters the other */
        if (s.x < -4)                   s.x = canvas.width  + 4;
        else if (s.x > canvas.width + 4)  s.x = -4;
        if (s.y < -4)                   s.y = canvas.height + 4;
        else if (s.y > canvas.height + 4) s.y = -4;

        /* Draw star dot */
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(200,180,255,${s.opacity})`
          : `rgba(100,40,200,${s.opacity * 0.7})`;
        ctx.fill();
      }

      /* ── Constellation lines ────────────────────────────────── */
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx   = stars[i].x - stars[j].x;
          const dy   = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = dark
              ? `rgba(160,180,255,${alpha})`
              : `rgba(100,40,200,${alpha * 0.55})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* ── Mouse glow + spoke lines ───────────────────────────── */
      if (mouse.x > -500) {
        const spokeMax = MOUSE_RADIUS * 1.35;
        for (const s of stars) {
          const dx   = s.x - mouse.x;
          const dy   = s.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < spokeMax) {
            const a = (1 - dist / spokeMax) * 0.5;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = dark
              ? `rgba(180,140,255,${a})`
              : `rgba(120,50,220,${a * 0.7})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 20);
        g.addColorStop(0, dark ? "rgba(180,140,255,0.75)" : "rgba(120,50,220,0.65)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
