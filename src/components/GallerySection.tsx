import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GooglePhotoAttribution, useGooglePlace } from '../context/GooglePlaceContext';
import { BUSINESS_INFO, GALLERY_ITEMS } from '../data/hubData';
import { ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface DisplayPhoto {
  id: string;
  src: string;
  fullSrc: string;
  alt: string;
  title: string;
  subtitle: string;
  isGooglePhoto: boolean;
  attributions: GooglePhotoAttribution[];
}

interface GallerySectionProps {
  onOpenGalleryPage?: () => void;
}

export function GallerySection({ onOpenGalleryPage }: GallerySectionProps) {
  const { photos, place } = useGooglePlace();
  const [selectedItem, setSelectedItem] = useState<DisplayPhoto | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const hasGooglePhotos = photos.length > 0;

  const googleItems: DisplayPhoto[] = photos.slice(0, 6).map((p, index) => ({
    id: p.id,
    src: p.thumbnailUrl,
    fullSrc: p.url,
    alt: `${BUSINESS_INFO.fullName} — Google Profile photo ${index + 1}`,
    title: `Google Profile ${index + 1}`,
    subtitle: p.attributions[0]?.displayName
      ? `By ${p.attributions[0].displayName}`
      : 'Google Maps',
    isGooglePhoto: true,
    attributions: p.attributions,
  }));

  const workspaceItems: DisplayPhoto[] = GALLERY_ITEMS.map((item) => ({
    id: item.id,
    src: item.src,
    fullSrc: item.src,
    alt: item.alt,
    title: item.title,
    subtitle: item.department,
    isGooglePhoto: false,
    attributions: [],
  }));

  const featuredIndices = [0, 11, 1, 3, 5, 8];
  const diverseWorkspaceItems = featuredIndices
    .map((idx) => workspaceItems[idx])
    .filter((item): item is DisplayPhoto => Boolean(item));

  const displayItems: DisplayPhoto[] =
    googleItems.length >= 6
      ? googleItems
      : [...googleItems, ...diverseWorkspaceItems].slice(0, 6);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white border-b border-dodger-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-dodger-200"
        >
          <div>
            <p className="text-xs font-semibold text-dodger-600">09 · Visual Gallery</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
              {hasGooglePhotos ? 'Google Profile & Hub Spaces.' : 'Inside Every Hub Bay.'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-5 shrink-0">
            {onOpenGalleryPage && (
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                onClick={onOpenGalleryPage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 whitespace-nowrap cursor-pointer"
              >
                <span>Open Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            )}

            {place?.googleMapsURI && (
              <a
                href={place.googleMapsURI}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-dodger-600 underline underline-offset-4 whitespace-nowrap"
              >
                <span>Google Profile</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, idx) => {
            const firstAttr = item.attributions[0];
            return (
              <div key={item.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="group relative text-left cursor-pointer rounded-lg overflow-hidden border border-dodger-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600"
                >
                  <ParallaxImageFrame
                    speed={idx % 2 === 0 ? 18 : -18}
                    delay={idx * 0.05}
                    className="aspect-[4/3] bg-dodger-50"
                  >
                    <ResilientImage
                      src={item.src}
                      alt={item.alt}
                      fallbackTitle={item.title}
                      fallbackSubtitle={item.subtitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end justify-between p-3.5">
                      <span className="text-xs font-semibold text-white">{item.title}</span>
                      <span className="text-[11px] text-dodger-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </span>
                    </div>
                  </ParallaxImageFrame>
                </button>

                <div className="mt-2 px-1 flex items-center justify-between text-xs text-zinc-500">
                  {item.isGooglePhoto ? (
                    <span>
                      Google Maps
                      {firstAttr && (
                        <>
                          {' · '}
                          {firstAttr.uri ? (
                            <a
                              href={firstAttr.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-dodger-600"
                            >
                              {firstAttr.displayName}
                            </a>
                          ) : (
                            <span>{firstAttr.displayName}</span>
                          )}
                        </>
                      )}
                    </span>
                  ) : (
                    <span>{item.subtitle}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white max-w-3xl w-full rounded-lg overflow-hidden border border-dodger-200 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-dodger-100">
                <div>
                  <p className="text-xs text-dodger-600 font-medium">
                    {selectedItem.isGooglePhoto ? 'Google Business Profile' : 'Hub Preview'}
                  </p>
                  <h3 id="gallery-modal-title" className="text-sm font-semibold text-zinc-950">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close photo preview"
                  onClick={() => setSelectedItem(null)}
                  className="w-9 h-9 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-700 hover:bg-dodger-50 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-[4/3] bg-zinc-100">
                <ResilientImage
                  src={selectedItem.fullSrc}
                  alt={selectedItem.alt}
                  fallbackTitle={selectedItem.title}
                  fallbackSubtitle={selectedItem.subtitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-5 py-3.5 bg-dodger-50/40 border-t border-dodger-100 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-zinc-600">{selectedItem.subtitle}</p>
                {selectedItem.attributions[0]?.uri && (
                  <a
                    href={selectedItem.attributions[0].uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-dodger-600 underline"
                  >
                    Contributor profile
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
