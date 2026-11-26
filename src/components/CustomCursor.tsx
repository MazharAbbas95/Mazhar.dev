import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop devices with a mouse
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth lerp movement matching reference video
    const render = () => {
      // Linear interpolation for buttery smooth trailing
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Track hoverable targets
    const handleElementOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover]');
      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleElementOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleElementOver);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`cursor pointer-events-none fixed left-0 top-0 z-[99999] rounded-full will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isHovered
          ? 'cursor--hover h-16 w-16 bg-[#C084FC]/25 border-2 border-[#D8B4FE] shadow-[0_0_35px_rgba(168,85,247,0.7)]'
          : isActive
          ? 'cursor--active h-9 w-9 bg-[#9B5CFF]/60 border border-white/60 shadow-[0_0_20px_rgba(155,92,255,0.8)]'
          : 'h-12 w-12 bg-[#C084FC]/30 border border-[#A855F7]/80 shadow-[0_0_25px_rgba(155,92,255,0.45)]'
      } mix-blend-screen transition-[width,height,background-color,border-color,opacity] duration-200 ease-out`}
    >
      {/* Inner glowing core dot */}
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
    </div>
  );
}
