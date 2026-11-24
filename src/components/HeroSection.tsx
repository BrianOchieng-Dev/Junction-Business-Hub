import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, MessageCircle, Play } from 'lucide-react';
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
import { ParallaxHeroMedia } from './FluidVisual';
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

export function HeroSection({ onEnquireClick, onOpenServicePage }: HeroSectionProps) {
  const { photos } = useGooglePlace();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
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
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[activeSlideIndex % slides.length] ?? slides[0];

  return (
    <section id="top" className="bg-white border-b border-sky-200">
      <div className="relative w-full min-h-[560px] lg:min-h-[650px] flex items-center overflow-hidden bg-slate-900">
        <ParallaxHeroMedia>
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{
                opacity: 1,
                scale: [1.04, 1.09, 1.04],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <ResilientImage
                src={currentSlide.src}
                alt={currentSlide.alt}
                fallbackTitle={BUSINESS_INFO.fullName}
                fallbackSubtitle="Laundry · Cyber Café · Barber · Junction Highway Hotel"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </ParallaxHeroMedia>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/65 to-slate-950/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/20"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20 lg:py-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs sm:text-sm font-medium text-sky-300">
              Prologue · {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference}
            </p>

            <h1 className="mt-4 text-[clamp(2.1rem,3.9vw,3.35rem)] leading-[1.08] font-bold tracking-tight text-white text-balance">
              Laundry, cyber café, barber, hotel &amp; carwash under one roof.
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-200 max-w-xl">
              Scroll along our Homa Bay–Rongo Road story: start with our video welcome, explore
              garment care, digital workstations, barber grooming, Junction Highway Hotel, and our
              drive-in carwash bay.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#video"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <Play className="w-4 h-4 shrink-0 fill-current" aria-hidden="true" />
                <span>Watch Hub Video</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappGreeting}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white border border-white/35 hover:border-sky-300 hover:text-sky-200 transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp Desk</span>
              </motion.a>

              <button
                type="button"
                onClick={onEnquireClick}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-200 hover:text-white underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0 py-2"
              >
                <span>Enquiry Form</span>
                <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-5 right-5 sm:left-8 sm:right-8 z-10 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {slides.length > 1 && (
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
                    className="py-2 px-0.5 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  >
                    <span
                      className={`block h-1 transition-all duration-300 ${
                        isActive
                          ? 'w-9 bg-sky-400'
                          : 'w-4 bg-white/45 group-hover:bg-white/85'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {currentSlide.isGooglePhoto && (
            <div className="text-[11px] text-slate-300/90 ml-auto">
              Google Maps photo
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

      {/* Sharp Architectural 5-Division Quick Switcher */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {DIVISION_KEYS.map((key) => {
          const div = SERVICE_DIVISIONS[key];
          return (
            <motion.button
              key={key}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onOpenServicePage(key)}
              className="text-left p-4 border border-sky-200 hover:border-sky-600 bg-sky-50/40 hover:bg-sky-50 transition-colors cursor-pointer group flex items-center justify-between gap-3"
            >
              <div>
                <p className="text-xs font-medium text-sky-700">
                  {div.number} · {div.title}
                </p>
                <p className="mt-1 text-xs text-zinc-700 font-medium">{div.tagline}</p>
              </div>
              <ArrowRight
                className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform shrink-0"
                aria-hidden="true"
              />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
