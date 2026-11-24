import { MouseEvent as ReactMouseEvent, ReactNode, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

interface FluidRevealFrameProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverZoom?: boolean;
  onClick?: () => void;
}

export function FluidRevealFrame({
  children,
  className = '',
  delay = 0,
  hoverZoom = true,
  onClick,
}: FluidRevealFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 280, damping: 24, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3.5, -3.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3.5, 3.5]), springConfig);

  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);
  const sheenBackground = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, rgba(30, 144, 255, 0.22), transparent 68%)`;

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0.85, y: 18, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={
        prefersReducedMotion
          ? undefined
          : {
              perspective: 900,
              rotateX: hovered ? rotateX : 0,
              rotateY: hovered ? rotateY : 0,
              transformStyle: 'preserve-3d',
            }
      }
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative overflow-hidden will-change-transform ${className}`}
    >
      {hoverZoom ? (
        <motion.div
          animate={{ scale: hovered && !prefersReducedMotion ? 1.055 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full will-change-transform"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: sheenBackground }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-0 z-10"
        />
      )}
    </motion.div>
  );
}

interface ParallaxImageFrameProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
  onClick?: () => void;
}

export function ParallaxImageFrame({
  children,
  className = '',
  speed = 26,
  delay = 0,
  onClick,
}: ParallaxImageFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 260, damping: 24, mass: 0.55 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);
  const sheenBackground = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(30, 144, 255, 0.24), transparent 65%)`;

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0.85, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={
        prefersReducedMotion
          ? undefined
          : {
              perspective: 1000,
              rotateX: hovered ? rotateX : 0,
              rotateY: hovered ? rotateY : 0,
              transformStyle: 'preserve-3d',
            }
      }
      whileTap={onClick ? { scale: 0.985 } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative overflow-hidden will-change-transform ${className}`}
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { y }}
        animate={{ scale: hovered && !prefersReducedMotion ? 1.055 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-[118%] -mt-[9%] will-change-transform"
      >
        {children}
      </motion.div>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: sheenBackground }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-0 z-10"
        />
      )}
    </motion.div>
  );
}

interface ParallaxHeroMediaProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxHeroMedia({ children, className = '' }: ParallaxHeroMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);

  return (
    <div ref={heroRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        style={prefersReducedMotion ? undefined : { y, scale }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface InteractiveTiltSurfaceProps {
  children: ReactNode;
  className?: string;
}

export function InteractiveTiltSurface({
  children,
  className = '',
}: InteractiveTiltSurfaceProps) {
  const prefersReducedMotion = useReducedMotion();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 320, damping: 26, mass: 0.45 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.5, -2.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.5, 2.5]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(30, 144, 255, 0.14), transparent 70%)`;

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !surfaceRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={surfaceRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? undefined
          : {
              perspective: 900,
              rotateX: hovered ? rotateX : 0,
              rotateY: hovered ? rotateY : 0,
              transformStyle: 'preserve-3d',
            }
      }
      className={`relative will-change-transform ${className}`}
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: glow }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function ScrollProgressRule() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-dodger-500 origin-left z-50 pointer-events-none"
    />
  );
}
