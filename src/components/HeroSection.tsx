import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useGooglePlace } from '../context/GooglePlaceContext';
import {
  ABOUT_IMAGE,
  BUSINESS_INFO,
  HERO_IMAGE,
  SERVICE_DIVISIONS,
  ServiceDivisionKey,
  buildWhatsAppUrl,
} from '../data/hubData';
import { AppPage } from './Navbar';
import { InteractiveTiltSurface, ParallaxHeroMedia } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onEnquireClick: () => void;
  onOpenServicePage: (page: AppPage) => void;
}

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  isGooglePhoto: boolean;
  attrName?: string;
  attrUri?: string | null;
}

const DIVISION_KEYS: ServiceDivisionKey[] = ['laundry', 'cyber', 'barber', 'hotel', 'carwash'];
const SLIDE_DURATION_MS = 6500;

export function HeroSection({ onEnquireClick, onOpenServicePage }: HeroSectionProps) {
  const { photos } = useGooglePlace();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<ServiceDivisionKey | null>(null);

  const whatsappGreeting = buildWhatsAppUrl(
    'Hello The Junction Laundry And Services Hub, I would like to enquire about your services.'
  );

  const fallbackSlides: HeroSlide[] = [
    {
      id: 'hero-hub',
      src: HERO_IMAGE.src,
      alt: HERO_IMAGE.alt,
      isGooglePhoto: false,
    },
    {
      id: 'hero-hotel',
      src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
      alt: 'Junction Highway Hotel dining hall and tea lounge',
      isGooglePhoto: false,
    },
    {
      id: 'hero-barber',
      src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
      alt: 'Modern Barber Services grooming bay at The Junction Hub',
      isGooglePhoto: false,
    },
    {
      id: 'hero-carwash',
      src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
      alt: 'Drive-in Carwash bay at The Junction Hub along the Homa Bay–Rongo Road',
      isGooglePhoto: false,
    },
    {
      id: 'hero-exterior',
      src: ABOUT_IMAGE.src,
      alt: ABOUT_IMAGE.alt,
      isGooglePhoto: false,
    },
  ];

  const slides: HeroSlide[] =
    photos.length > 0
      ? [
          ...photos.slice(0, 4).map((p, idx) => ({
            id: p.id,
            src: p.url,
            alt: `${BUSINESS_INFO.fullName} — Google Business Profile photo ${idx + 1}`,
            isGooglePhoto: true,
            attrName: p.attributions[0]?.displayName,
            attrUri: p.attributions[0]?.uri ?? null,
          })),
          fallbackSlides[1],
          fallbackSlides[3],
        ]
      : fallbackSlides;

  useEffect(() => {
    setActiveSlideIndex(0);
  }, [photos.length]);

  useEffect(() => {
    if (slides.length <= 1 || heroPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, heroPaused]);

  const stepSlide = (delta: number) => {
    setActiveSlideIndex((prev) => (prev + delta + slides.length) % slides.length);
  };

  const currentSlide = slides[activeSlideIndex % slides.length] ?? slides[0];

  return (
    <section id="top" className="bg-white border-b border-zinc-200">
      <div
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        className="relative w-full min-h-[580px] lg:min-h-[670px] flex items-end overflow-hidden bg-black"
      >
        <ParallaxHeroMedia>
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{
                opacity: 1,
                scale: [1.03, 1.08, 1.03],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <ResilientImage
                src={currentSlide.src}
                alt={currentSlide.alt}
                fallbackTitle={BUSINESS_INFO.fullName}
                fallbackSubtitle="Laundry · Cyber · Barber · Hotel · Carwash"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </ParallaxHeroMedia>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pb-16 pt-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs sm:text-sm font-medium text-dodger-300">
              {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference}
            </p>

            <h1 className="mt-3 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08] font-bold tracking-tight text-white text-balance">
              Laundry, Cyber, Barber, Hotel &amp; Carwash.
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-200">
              All five bays in one stop · Open 7:00 AM.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <motion.a
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.16 }}
                href="#video"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-300"
              >
                <Play className="w-4 h-4 shrink-0 fill-current" aria-hidden="true" />
                <span>Watch Hub Video</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.16 }}
                href={whatsappGreeting}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-white bg-black/75 hover:bg-black border border-white/30 hover:border-dodger-400 transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onEnquireClick}
                className="px-3 py-2 text-sm font-medium text-dodger-200 hover:text-white underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
              >
                Enquire
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-5 right-5 sm:left-8 sm:right-8 z-10 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {slides.length > 1 && (
            <div className="flex items-center gap-3">
              <div
                role="group"
                aria-label="Hero background scenes"
                className="flex items-center gap-2"
              >
                {slides.map((slide, index) => {
                  const isActive = index === activeSlideIndex % slides.length;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`View scene ${index + 1}: ${slide.alt}`}
                      aria-pressed={isActive}
                      onClick={() => setActiveSlideIndex(index)}
                      className="py-2 px-0.5 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-300"
                    >
                      <span
                        className={`relative block h-1 rounded-sm overflow-hidden transition-all duration-300 ${
                          isActive ? 'w-11 bg-white/30' : 'w-4 bg-white/40 group-hover:bg-white/80'
                        }`}
                      >
                        {isActive && !heroPaused && (
                          <motion.span
                            key={`hero-prog-${currentSlide.id}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: SLIDE_DURATION_MS / 1000, ease: 'linear' }}
                            style={{ transformOrigin: '0% 50%' }}
                            className="absolute inset-0 bg-dodger-400"
                          />
                        )}
                        {isActive && heroPaused && (
                          <span className="absolute inset-0 bg-dodger-400" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-1.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous hero scene"
                  onClick={() => stepSlide(-1)}
                  className="w-7 h-7 rounded-md bg-black/60 hover:bg-dodger-500 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next hero scene"
                  onClick={() => stepSlide(1)}
                  className="w-7 h-7 rounded-md bg-black/60 hover:bg-dodger-500 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          )}

          {currentSlide.isGooglePhoto && (
            <div className="text-[11px] text-zinc-300/90 ml-auto">
              Google Maps
              {currentSlide.attrName && (
                <>
                  {' · '}
                  {currentSlide.attrUri ? (
                    <a
                      href={currentSlide.attrUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      {currentSlide.attrName}
                    </a>
                  ) : (
                    <span>{currentSlide.attrName}</span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Interactive 5-Division Quick Switcher */}
      <div
        onMouseLeave={() => setHoveredCard(null)}
        className="max-w-6xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 bg-white"
      >
        {DIVISION_KEYS.map((key, idx) => {
          const div = SERVICE_DIVISIONS[key];
          const isHovered = hoveredCard === key;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + idx * 0.045, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCard(key)}
            >
              <InteractiveTiltSurface className="rounded-lg">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenServicePage(key)}
                  className={`relative w-full text-left p-2.5 rounded-lg border bg-white transition-colors cursor-pointer group flex items-center gap-3 overflow-hidden ${
                    isHovered ? 'border-dodger-500' : 'border-zinc-200'
                  }`}
                >
                  {isHovered && (
                    <motion.span
                      layoutId="hero-switcher-highlight"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute top-0 left-0 right-0 h-0.5 bg-dodger-500"
                    />
                  )}
                  <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 border border-zinc-200 bg-black">
                    <ResilientImage
                      src={div.heroImage.src}
                      alt={div.shortTitle}
                      fallbackTitle={div.shortTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-black truncate group-hover:text-dodger-600 transition-colors">
                      {div.shortTitle}
                    </p>
                    <p className="text-[11px] text-dodger-600 font-medium mt-0.5">
                      Open Daily
                    </p>
                  </div>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-dodger-500 group-hover:translate-x-1 transition-transform duration-200 shrink-0"
                    aria-hidden="true"
                  />
                </motion.button>
              </InteractiveTiltSurface>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
