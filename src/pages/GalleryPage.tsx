import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GooglePhotoAttribution, useGooglePlace } from '../context/GooglePlaceContext';
import { BUSINESS_INFO, GALLERY_ITEMS, HERO_IMAGE, PROMO_VIDEO } from '../data/hubData';
import { ParallaxImageFrame } from '../components/FluidVisual';
import { ResilientImage } from '../components/ResilientImage';

interface GalleryPageProps {
  onNavigateHome: (sectionId?: string) => void;
}

type GalleryFilter = 'all' | 'google' | 'laundry' | 'cyber' | 'barber' | 'hotel' | 'carwash';

interface GalleryPhotoEntry {
  id: string;
  src: string;
  fullSrc: string;
  alt: string;
  title: string;
  category: Exclude<GalleryFilter, 'all'>;
  categoryLabel: string;
  caption: string;
  attributions: GooglePhotoAttribution[];
}

function resolveGalleryCategory(department: string): Exclude<GalleryFilter, 'all'> {
  const lower = department.toLowerCase();
  if (lower.includes('cyber')) return 'cyber';
  if (lower.includes('barber')) return 'barber';
  if (lower.includes('hotel')) return 'hotel';
  if (lower.includes('carwash')) return 'carwash';
  return 'laundry';
}

export function GalleryPage({ onNavigateHome }: GalleryPageProps) {
  const { photos, place, status } = useGooglePlace();
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const googleEntries: GalleryPhotoEntry[] = photos.map((p, idx) => ({
    id: p.id,
    src: p.thumbnailUrl,
    fullSrc: p.url,
    alt: `${BUSINESS_INFO.fullName} — Google Business Profile photo ${idx + 1}`,
    title: `Google Profile Photo 0${idx + 1}`,
    category: 'google',
    categoryLabel: 'Google Business Profile',
    caption: p.attributions[0]?.displayName
      ? `Contributed by ${p.attributions[0].displayName} on Google Maps`
      : 'Published on Google Maps listing',
    attributions: p.attributions,
  }));

  const workspaceEntries: GalleryPhotoEntry[] = [
    {
      id: 'ws-hero',
      src: HERO_IMAGE.src,
      fullSrc: HERO_IMAGE.src,
      alt: HERO_IMAGE.alt,
      title: 'Main Service Floor Preview',
      category: 'laundry',
      categoryLabel: 'Workspace Preview · Combined Hub',
      caption: 'Combined laundry shelf counter and sunlit desktop workstation layout.',
      attributions: [],
    },
    ...GALLERY_ITEMS.map((item) => ({
      id: item.id,
      src: item.src,
      fullSrc: item.src,
      alt: item.alt,
      title: item.title,
      category: resolveGalleryCategory(item.department),
      categoryLabel: `Workspace Preview · ${item.department}`,
      caption: item.caption,
      attributions: [],
    })),
  ];

  const allEntries = [...googleEntries, ...workspaceEntries];

  const visibleEntries =
    filter === 'all' ? allEntries : allEntries.filter((entry) => entry.category === filter);

  const selectedPhoto =
    activeIndex !== null && visibleEntries[activeIndex] ? visibleEntries[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleEntries.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleEntries.length) % visibleEntries.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, visibleEntries.length]);

  const filterTabs: Array<{ id: GalleryFilter; label: string }> = [
    { id: 'all', label: `All (${allEntries.length})` },
    ...(googleEntries.length > 0
      ? [{ id: 'google' as const, label: `Google Profile (${googleEntries.length})` }]
      : []),
    { id: 'laundry', label: 'Laundry & Premises' },
    { id: 'cyber', label: 'Cyber Café' },
    { id: 'barber', label: 'Barber Services' },
    { id: 'hotel', label: 'Highway Hotel' },
    { id: 'carwash', label: 'Carwash' },
  ];

  return (
    <div className="bg-white min-h-[75vh]">
      <section className="border-b border-sky-200 bg-sky-50/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
          <button
            type="button"
            onClick={() => onNavigateHome()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-sky-700">
                Gallery · {BUSINESS_INFO.fullName}
              </p>
              <h1 className="mt-2.5 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
                Premises, equipment, video tour, and workspace gallery.
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                {googleEntries.length > 0
                  ? 'Browse live photographs retrieved from our Google Business Profile alongside illustrative previews across Laundry, Cyber Café, Barber Services, Junction Highway Hotel, and Carwash.'
                  : status === 'loading'
                    ? 'Checking Google Business Profile for live listing photos...'
                    : 'Watch our hub tour and browse visuals across our Laundry, Cyber Café, Barber Services, Junction Highway Hotel, and Carwash bays.'}
              </p>
            </div>

            {place?.googleMapsURI && (
              <a
                href={place.googleMapsURI}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-sky-800 bg-white border border-sky-200 hover:border-sky-600 transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
              >
                <span>Open Google Maps Profile</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white border-b border-sky-900/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-semibold text-sky-400">Featured Video Tour</p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white text-balance">
                Welcome to The Junction Business Hub
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Video introduction showcasing our location in Homa Bay Town / Junction-Kodoyo along
                the Rongo corridor.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0.9, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <div className="w-full max-w-[830px] aspect-video border-2 border-sky-500/70 bg-black overflow-hidden">
                <iframe
                  width="830"
                  height="467"
                  src={PROMO_VIDEO.src}
                  title={PROMO_VIDEO.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-zinc-200">
          <div
            role="tablist"
            aria-label="Filter gallery images"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-sky-50 border border-sky-200"
          >
            {filterTabs.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(tab.id);
                    setActiveIndex(null);
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-white' : 'text-zinc-600 hover:text-sky-800'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gallery-page-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-sky-700 z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-zinc-500 font-mono tabular-nums">
            Showing {visibleEntries.length} {visibleEntries.length === 1 ? 'photo' : 'photos'}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleEntries.map((item, idx) => {
            const firstAttr = item.attributions[0];
            return (
              <article key={item.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
                >
                  <ParallaxImageFrame
                    speed={idx % 2 === 0 ? 16 : -16}
                    delay={Math.min(idx * 0.04, 0.2)}
                    className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
                  >
                    <ResilientImage
                      src={item.src}
                      alt={item.alt}
                      fallbackTitle={item.title}
                      fallbackSubtitle={item.categoryLabel}
                      className="w-full h-full object-cover"
                    />
                  </ParallaxImageFrame>
                </button>

                <div className="mt-3.5 pt-2.5 border-t border-sky-100">
                  <p className="text-xs font-medium text-sky-700">{item.categoryLabel}</p>
                  <h2 className="mt-0.5 text-sm font-semibold text-zinc-950">{item.title}</h2>
                  <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{item.caption}</p>
                  {firstAttr && (
                    <p className="mt-1 text-[11px] text-zinc-500">
                      Google Maps attribution:{' '}
                      {firstAttr.uri ? (
                        <a
                          href={firstAttr.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-sky-700"
                        >
                          {firstAttr.displayName}
                        </a>
                      ) : (
                        <span>{firstAttr.displayName}</span>
                      )}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {selectedPhoto && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-page-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white max-w-4xl w-full overflow-hidden border border-sky-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-sky-100">
                <div>
                  <p className="text-xs font-medium text-sky-700">{selectedPhoto.categoryLabel}</p>
                  <h3 id="gallery-page-modal-title" className="text-sm font-semibold text-zinc-950">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + visibleEntries.length) % visibleEntries.length
                      )
                    }
                    className="w-9 h-9 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-sky-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => setActiveIndex((activeIndex + 1) % visibleEntries.length)}
                    className="w-9 h-9 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-sky-50 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Close photo preview"
                    onClick={() => setActiveIndex(null)}
                    className="w-9 h-9 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-sky-50 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="aspect-[16/10] bg-slate-950">
                <ResilientImage
                  src={selectedPhoto.fullSrc}
                  alt={selectedPhoto.alt}
                  fallbackTitle={selectedPhoto.title}
                  fallbackSubtitle={selectedPhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="px-5 py-3.5 bg-sky-50/40 border-t border-sky-100 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600">
                <span>{selectedPhoto.caption}</span>
                <span className="font-mono tabular-nums text-sky-700 font-medium">
                  {activeIndex + 1} / {visibleEntries.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
