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

const TESTIMONIAL_DURATION_MS = 5500;

export function AboutWhySection({ onOpenTeamPage }: AboutWhySectionProps) {
  const { photos } = useGooglePlace();
  const googleStorePhoto = photos[4] ?? photos[0];
  const visualSrc = googleStorePhoto ? googleStorePhoto.url : ABOUT_IMAGE.src;
  const visualAlt = googleStorePhoto
    ? `${BUSINESS_INFO.fullName} — Google Business Profile photo`
    : ABOUT_IMAGE.alt;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const totalTestimonials = SAMPLE_TESTIMONIALS.length;
  const activeTestimonial = SAMPLE_TESTIMONIALS[activeIndex] ?? SAMPLE_TESTIMONIALS[0];

  useEffect(() => {
    if (isPaused || totalTestimonials <= 1) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalTestimonials);
    }, TESTIMONIAL_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, totalTestimonials]);

  const handleStep = (delta: number) => {
    setDirection(delta >= 0 ? 1 : -1);
    setActiveIndex((prev) => (prev + delta + totalTestimonials) % totalTestimonials);
  };

  const handleSelectIndex = (idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-sky-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-sky-200 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-semibold text-sky-700">
                Chapter 06 · Built for the Corridor · About &amp; Why Choose Us
              </p>
              <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
                Practical everyday convenience at Junction-Kodoyo.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                {BUSINESS_INFO.fullName} combines garment care, digital cyber services, barber
                grooming, carwash detailing, and hospitality at Junction Highway Hotel along the Homa
                Bay–Rongo Road.
              </p>

              {onOpenTeamPage && (
                <div className="mt-6">
                  <motion.button
                    type="button"
                    whileHover={{ x: 2 }}
                    onClick={onOpenTeamPage}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 cursor-pointer"
                  >
                    <span>Meet our employees &amp; operational roles</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </motion.button>
                </div>
              )}
            </div>

            <div>
              <ParallaxImageFrame
                speed={22}
                className="aspect-[16/10] border border-sky-200 hover:border-sky-600 transition-colors bg-white"
              >
                <ResilientImage
                  src={visualSrc}
                  alt={visualAlt}
                  fallbackTitle={BUSINESS_INFO.fullName}
                  fallbackSubtitle="Junction-Kodoyo · Homa Bay–Rongo Road"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <p className="mt-2 text-xs text-zinc-500">
                Street-level access directly along the Homa Bay–Rongo Road
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-sky-200/80 border-t border-b border-sky-200/80">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="py-7 px-3 -mx-3 hover:bg-sky-50/50 transition-colors duration-200 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6"
              >
                <div className="sm:col-span-5 flex items-baseline gap-3">
                  <span className="text-xs font-mono font-semibold text-sky-600 tabular-nums">
                    {item.number}
                  </span>
                  <h3 className="text-sm font-semibold text-zinc-950">{item.title}</h3>
                </div>
                <p className="sm:col-span-7 text-sm text-zinc-600 leading-relaxed pl-7 sm:pl-0">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Customer Perspectives / Testimonials Showcase */}
        <div
          className="pt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="max-w-xl">
              <h3 className="text-lg font-semibold text-zinc-950">Community perspectives</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Illustrative customer scenarios representing daily needs along the Homa Bay–Rongo
                Road.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono tabular-nums text-sky-700 mr-2">
                0{activeIndex + 1} / 0{totalTestimonials}
              </span>
              <button
                type="button"
                aria-label={isPaused ? 'Resume testimonial rotation' : 'Pause testimonial rotation'}
                onClick={() => setIsPaused((prev) => !prev)}
                className="w-9 h-9 border border-sky-200 bg-white hover:bg-sky-50 hover:border-sky-500 flex items-center justify-center text-sky-800 transition-colors cursor-pointer"
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => handleStep(-1)}
                className="w-9 h-9 border border-sky-200 bg-white hover:bg-sky-50 hover:border-sky-500 flex items-center justify-center text-zinc-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => handleStep(1)}
                className="w-9 h-9 border border-sky-200 bg-white hover:bg-sky-50 hover:border-sky-500 flex items-center justify-center text-zinc-700 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Primary Animated Testimonial Stage */}
          <div className="relative border border-sky-200 bg-sky-50/40 overflow-hidden">
            <div className="p-6 sm:p-10 min-h-[210px] flex flex-col justify-between">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={activeTestimonial.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -28 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-8 flex items-start gap-4">
                    <Quote
                      className="w-6 h-6 text-sky-500 shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <blockquote className="text-base sm:text-xl font-medium leading-relaxed text-zinc-900">
                      &ldquo;{activeTestimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="lg:col-span-4 lg:border-l lg:border-sky-200 lg:pl-8 space-y-1">
                    <p className="text-sm font-bold text-zinc-950">{activeTestimonial.author}</p>
                    <p className="text-xs font-medium text-sky-700">{activeTestimonial.role}</p>
                    <p className="text-xs text-zinc-500">{activeTestimonial.context}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Smooth Progress Rule */}
            <div className="h-1 w-full bg-sky-100 overflow-hidden">
              {!isPaused ? (
                <motion.div
                  key={`progress-${activeTestimonial.id}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: TESTIMONIAL_DURATION_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: '0% 50%' }}
                  className="h-full bg-sky-600 will-change-transform"
                />
              ) : (
                <div className="h-full w-full bg-sky-400/70" />
              )}
            </div>
          </div>

          {/* Interactive Perspective Selector Cards */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {SAMPLE_TESTIMONIALS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectIndex(idx)}
                  aria-pressed={isActive}
                  className={`relative text-left p-4 border transition-colors cursor-pointer ${
                    isActive
                      ? 'border-sky-600 bg-white'
                      : 'border-sky-200 bg-sky-50/30 hover:bg-white hover:border-sky-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-semibold text-sky-700 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] text-zinc-500 truncate">
                      {item.role.split('·')[1]?.trim() || 'Hub Visit'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-zinc-950 truncate">
                    {item.author}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-600 line-clamp-2 leading-relaxed">
                    {item.quote}
                  </p>

                  {isActive && (
                    <motion.span
                      layoutId="testimonial-active-bar"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-sky-600"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
