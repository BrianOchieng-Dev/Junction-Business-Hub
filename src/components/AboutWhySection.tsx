import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useGooglePlace } from '../context/GooglePlaceContext';
import {
  ABOUT_IMAGE,
  BUSINESS_INFO,
  SAMPLE_TESTIMONIALS,
  WHY_CHOOSE_ITEMS,
} from '../data/hubData';
import { ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface AboutWhySectionProps {
  onOpenTeamPage?: () => void;
}

const TESTIMONIAL_DURATION_MS = 4800;

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function AboutWhySection({ onOpenTeamPage }: AboutWhySectionProps) {
  const { photos } = useGooglePlace();
  const googleStorePhoto = photos[4] ?? photos[0];
  const visualSrc = googleStorePhoto ? googleStorePhoto.url : ABOUT_IMAGE.src;
  const visualAlt = googleStorePhoto
    ? `${BUSINESS_INFO.fullName} — Google Business Profile photo`
    : ABOUT_IMAGE.alt;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalTestimonials = SAMPLE_TESTIMONIALS.length;
  const activeTestimonial = SAMPLE_TESTIMONIALS[activeIndex] ?? SAMPLE_TESTIMONIALS[0];

  useEffect(() => {
    if (isPaused || totalTestimonials <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalTestimonials);
    }, TESTIMONIAL_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, totalTestimonials]);

  const handleStep = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + totalTestimonials) % totalTestimonials);
  };

  const handleSelectIndex = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-zinc-200 items-start">
          {/* 6 cols Prominent Storefront Photo */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div>
              <p className="text-xs font-semibold text-dodger-600">07 · About The Hub</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
                Everyday convenience along the Homa Bay–Rongo Road.
              </h2>
            </div>

            <ParallaxImageFrame
              speed={22}
              className="aspect-[16/10] rounded-lg border border-zinc-200 hover:border-dodger-500 transition-colors bg-white"
            >
              <ResilientImage
                src={visualSrc}
                alt={visualAlt}
                fallbackTitle={BUSINESS_INFO.fullName}
                fallbackSubtitle="Junction-Kodoyo"
                className="w-full h-full object-cover"
              />
            </ParallaxImageFrame>

            {onOpenTeamPage && (
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                onClick={onOpenTeamPage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 cursor-pointer"
              >
                <span>Meet our team</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            )}
          </div>

          {/* 6 cols Concise Why Choose Rows */}
          <div className="lg:col-span-6 divide-y divide-zinc-200 border-t border-b border-zinc-200 lg:mt-16">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="py-6 px-3 -mx-3 rounded-md hover:bg-dodger-50/45 transition-colors duration-200 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4"
              >
                <div className="sm:col-span-5 flex items-baseline gap-3">
                  <span className="text-xs font-mono font-semibold text-dodger-500 tabular-nums">
                    {item.number}
                  </span>
                  <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                </div>
                <p className="sm:col-span-7 text-sm text-zinc-600 leading-relaxed pl-7 sm:pl-0">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Redesigned Auto-Fading Testimonials Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="pt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-dodger-600">Community Voices</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-black">
                Stories from every stop.
              </h3>
              <p className="mt-1 text-xs text-zinc-500">Illustrative customer scenarios</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
                onClick={() => setIsPaused((prev) => !prev)}
                className="w-10 h-10 rounded-md border border-zinc-200 bg-white hover:border-dodger-500 flex items-center justify-center text-dodger-500 transition-colors cursor-pointer"
              >
                {isPaused ? (
                  <Play className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Pause className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => handleStep(-1)}
                className="w-10 h-10 rounded-md border border-zinc-200 bg-white hover:border-dodger-500 flex items-center justify-center text-black transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => handleStep(1)}
                className="w-10 h-10 rounded-md border border-zinc-200 bg-white hover:border-dodger-500 flex items-center justify-center text-black transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Primary Crossfade Stage */}
          <div className="relative rounded-lg border border-zinc-200 bg-white shadow-xs overflow-hidden">
            <div className="p-6 sm:p-10 min-h-[210px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 10, scale: 0.992 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.992 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full grid grid-cols-1 lg:grid-cols-12 gap-7 items-center"
                >
                  <div className="lg:col-span-8 space-y-4">
                    <Quote
                      className="w-6 h-6 text-dodger-500"
                      aria-hidden="true"
                    />
                    <blockquote className="text-lg sm:text-2xl font-medium tracking-tight leading-snug text-black text-balance">
                      &ldquo;{activeTestimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="lg:col-span-4 rounded-md bg-black text-white p-5 flex items-center gap-4">
                    <div
                      aria-hidden="true"
                      className="w-11 h-11 rounded-md bg-dodger-500 text-white text-sm font-bold flex items-center justify-center shrink-0"
                    >
                      {getInitials(activeTestimonial.author)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {activeTestimonial.author}
                      </p>
                      <p className="text-xs font-medium text-dodger-400 truncate">
                        {activeTestimonial.role}
                      </p>
                      <p className="mt-0.5 text-[11px] text-zinc-400 truncate">
                        {activeTestimonial.context}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Smooth Auto-Cycle Progress Line */}
            <div className="h-1 w-full bg-zinc-100 overflow-hidden">
              {!isPaused ? (
                <motion.div
                  key={`progress-${activeTestimonial.id}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: TESTIMONIAL_DURATION_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: '0% 50%' }}
                  className="h-full bg-dodger-500 will-change-transform"
                />
              ) : (
                <div className="h-full w-full bg-dodger-500/50" />
              )}
            </div>
          </div>

          {/* Interactive Fade Strip */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {SAMPLE_TESTIMONIALS.map((item, idx) => {
              const isActive = idx === activeIndex;
              const serviceFocus = item.role.split('·')[1]?.trim() || 'Hub';
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  animate={{ opacity: isActive ? 1 : 0.65 }}
                  whileHover={{ opacity: 1, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => handleSelectIndex(idx)}
                  aria-pressed={isActive}
                  className={`relative text-left p-3.5 rounded-md border transition-colors cursor-pointer ${
                    isActive
                      ? 'border-dodger-500 bg-white'
                      : 'border-zinc-200 bg-white hover:border-dodger-400'
                  }`}
                >
                  <p className="text-[11px] font-medium text-dodger-600 truncate">
                    {serviceFocus}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-black truncate">
                    {item.author}
                  </p>

                  {isActive && (
                    <motion.span
                      layoutId="testimonial-active-bar"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-dodger-500"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
