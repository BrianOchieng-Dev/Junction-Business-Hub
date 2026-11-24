import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

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
  return (
    <motion.div
      initial={{ opacity: 0.85, y: 18, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      onClick={onClick}
      className={`group overflow-hidden ${className}`}
    >
      {hoverZoom ? (
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full will-change-transform"
        >
          {children}
        </motion.div>
      ) : (
        children
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0.85, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      onClick={onClick}
      className={`group overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-[118%] -mt-[9%] will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface ParallaxHeroMediaProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxHeroMedia({ children, className = '' }: ParallaxHeroMediaProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);

  return (
    <div ref={heroRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
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
