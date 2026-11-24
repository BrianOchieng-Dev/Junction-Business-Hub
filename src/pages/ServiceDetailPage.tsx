import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ParallaxHeroMedia, ParallaxImageFrame } from '../components/FluidVisual';
import { ResilientImage } from '../components/ResilientImage';
import { useGooglePlace } from '../context/GooglePlaceContext';
import {
  BUSINESS_INFO,
  SERVICE_DIVISIONS,
  ServiceDivisionKey,
  ServiceItem,
  buildWhatsAppUrl,
  getServicesForDivision,
} from '../data/hubData';
import { AppPage } from '../components/Navbar';

interface ServiceDetailPageProps {
  divisionKey: ServiceDivisionKey;
  onNavigatePage: (page: AppPage, sectionId?: string) => void;
  onEnquireService: (serviceLabel: string) => void;
}

const OTHER_DIVISIONS: ServiceDivisionKey[] = ['laundry', 'cyber', 'barber', 'hotel', 'carwash'];

export function ServiceDetailPage({
  divisionKey,
  onNavigatePage,
  onEnquireService,
}: ServiceDetailPageProps) {
  const { photos } = useGooglePlace();
  const division = SERVICE_DIVISIONS[divisionKey];
  const allItems = getServicesForDivision(divisionKey);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    allItems[0]?.id ?? null
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveFilter('all');
    const items = getServicesForDivision(divisionKey);
    setExpandedServiceId(items[0]?.id ?? null);
    setLightboxIndex(null);
  }, [divisionKey]);

  const filteredItems: ServiceItem[] =
    activeFilter === 'all'
      ? allItems
      : allItems.filter((item) => item.filterGroup === activeFilter);

  const galleryPhotos = [
    ...division.galleryImages.map((img) => ({
      ...img,
      isGoogle: false,
      attrName: undefined as string | undefined,
    })),
    ...(divisionKey === 'laundry' || divisionKey === 'cyber'
      ? photos.slice(0, 3).map((p, idx) => ({
          id: `google-${divisionKey}-${p.id}`,
          title: `Google Business Profile Photo 0${idx + 1}`,
          subtitle: p.attributions[0]?.displayName
            ? `Photo by ${p.attributions[0].displayName}`
            : 'Google Maps listing photo',
          src: p.thumbnailUrl,
          alt: `${BUSINESS_INFO.fullName} — Google Profile photo ${idx + 1}`,
          isGoogle: true,
          attrName: p.attributions[0]?.displayName,
        }))
      : []),
  ];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight')
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryPhotos.length));
      if (e.key === 'ArrowLeft')
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + galleryPhotos.length) % galleryPhotos.length
        );
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, galleryPhotos.length]);

  const activeLightboxPhoto =
    lightboxIndex !== null && galleryPhotos[lightboxIndex] ? galleryPhotos[lightboxIndex] : null;

  return (
    <div className="bg-white min-h-[80vh]">
      {/* Parallax Full-Width Hero */}
      <section className="relative w-full min-h-[420px] lg:min-h-[490px] flex items-end overflow-hidden bg-black border-b border-zinc-200">
        <ParallaxHeroMedia>
          <ResilientImage
            src={division.heroImage.src}
            alt={division.heroImage.alt}
            fallbackTitle={division.title}
            fallbackSubtitle={division.tagline}
            className="w-full h-full object-cover"
          />
        </ParallaxHeroMedia>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-14 lg:py-20 w-full">
          <button
            type="button"
            onClick={() => onNavigatePage('home', 'top')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-300 hover:text-white transition-colors cursor-pointer mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          <motion.div
            key={divisionKey}
            initial={{ opacity: 0.9, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-medium text-dodger-300">
              {division.number} · {division.title} · {BUSINESS_INFO.locationShort}
            </p>
            <h1 className="mt-2.5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              {division.heroHeading}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-200 leading-relaxed max-w-xl">
              {division.tagline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={buildWhatsAppUrl(division.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-xs sm:text-sm font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp {division.shortTitle}</span>
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEnquireService(`${division.title} — General Enquiry`)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Enquire</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll-Driven Parallax Image Visuals (Clickable Lightbox) */}
      <section className="py-16 lg:py-20 bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
            <div>
              <p className="text-xs font-semibold text-dodger-600">Visuals</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-black">
                Inside {division.title}.
              </h2>
            </div>
            <p className="text-xs text-zinc-500">Click any photo to expand</p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
            {galleryPhotos.slice(0, 6).map((photo, idx) => (
              <div key={photo.id} className={idx % 3 === 1 ? 'md:mt-6' : ''}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="w-full text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500 rounded-lg"
                >
                  <ParallaxImageFrame
                    speed={idx % 2 === 0 ? 22 : -22}
                    delay={idx * 0.06}
                    className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                  >
                    <ResilientImage
                      src={photo.src}
                      alt={photo.alt}
                      fallbackTitle={photo.title}
                      fallbackSubtitle={photo.subtitle}
                      className="w-full h-full object-cover"
                    />
                  </ParallaxImageFrame>
                </button>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-black">{photo.title}</h3>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="text-xs font-semibold text-dodger-600 hover:text-dodger-800 cursor-pointer shrink-0"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Filter Tabs + Click-to-Expand Services List */}
      <section className="py-16 lg:py-22 max-w-6xl mx-auto px-5 sm:px-8 border-b border-zinc-200 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-dodger-600">Offerings</p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
              Select an item for details.
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-500">
              Rates confirmed at our Junction-Kodoyo desk or +254 766 768617.
            </p>
          </div>

          <div
            role="tablist"
            aria-label={`Filter ${division.title}`}
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-md bg-white border border-zinc-200 self-start lg:self-auto"
          >
            {division.filters.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-white' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={`filter-pill-${divisionKey}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-[4px] bg-dodger-500 z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="divide-y divide-zinc-200">
          {filteredItems.map((service, idx) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0.9, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`py-5 px-3 -mx-3 rounded-md transition-colors duration-200 ${
                  isExpanded ? 'bg-dodger-50/40' : 'hover:bg-dodger-50/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedServiceId((prev) => (prev === service.id ? null : service.id))
                  }
                  aria-expanded={isExpanded}
                  className="w-full text-left grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600"
                >
                  <div className="md:col-span-5 flex items-baseline gap-4">
                    <span className="text-xs font-mono text-dodger-600 tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-black group-hover:text-dodger-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {service.category} · {service.turnaround}
                      </p>
                    </div>
                  </div>

                  <p className="md:col-span-5 text-sm text-zinc-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="md:col-span-2 flex md:justify-end items-center gap-1.5 text-xs font-semibold text-dodger-600">
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 md:ml-8 p-5 rounded-lg bg-white border border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2.5">
                          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-700">
                            {service.highlights.map((pt) => (
                              <li key={pt} className="flex items-start gap-2">
                                <Check
                                  className="w-3.5 h-3.5 text-dodger-500 shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-zinc-500">{service.pricingNote}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          <motion.a
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            href={buildWhatsAppUrl(
                              `Hello The Junction Hub, I would like to enquire about ${division.title}: ${service.title}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors whitespace-nowrap"
                          >
                            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>WhatsApp</span>
                          </motion.a>

                          <motion.button
                            type="button"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onEnquireService(`${division.title} — ${service.title}`)}
                            className="px-4 py-2 rounded-md text-xs font-semibold text-black bg-white border border-zinc-200 hover:border-dodger-500 transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Enquire
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Process Steps + Explore Other 4 Services */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-14">
          <div>
            <h2 className="text-xl font-bold text-black">{division.processTitle}</h2>
            <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-7">
              {division.steps.map((s, idx) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0.9, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="border-t-2 border-dodger-500 pt-4"
                >
                  <p className="text-xs font-mono font-semibold text-dodger-600 tabular-nums">
                    {s.step}
                  </p>
                  <h3 className="mt-1.5 text-sm font-semibold text-black">{s.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-200">
            <p className="text-xs font-semibold text-dodger-600">Other Departments</p>
            <h2 className="mt-1 text-xl font-bold text-black">More at Junction-Kodoyo</h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {OTHER_DIVISIONS.filter((k) => k !== divisionKey).map((otherKey) => {
                const other = SERVICE_DIVISIONS[otherKey];
                return (
                  <motion.button
                    key={other.key}
                    type="button"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => onNavigatePage(other.key)}
                    className="text-left p-5 rounded-lg bg-white border border-zinc-200 hover:border-dodger-500 transition-colors cursor-pointer group flex flex-col justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-mono text-dodger-600 tabular-nums">
                        {other.number} · {other.shortTitle}
                      </p>
                      <h3 className="mt-1.5 text-base font-semibold text-black group-hover:text-dodger-600">
                        {other.title}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">{other.tagline}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-dodger-600">
                      <span>Explore</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxPhoto && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-lg max-w-4xl w-full overflow-hidden border border-zinc-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
                <div>
                  <p className="text-xs font-medium text-dodger-600">{division.title}</p>
                  <h3 id="service-lightbox-title" className="text-sm font-semibold text-black">
                    {activeLightboxPhoto.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length
                      )
                    }
                    className="w-9 h-9 rounded-md border border-zinc-200 flex items-center justify-center text-black hover:bg-zinc-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length)}
                    className="w-9 h-9 rounded-md border border-zinc-200 flex items-center justify-center text-black hover:bg-zinc-50 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Close photo preview"
                    onClick={() => setLightboxIndex(null)}
                    className="w-9 h-9 rounded-md border border-zinc-200 flex items-center justify-center text-black hover:bg-zinc-50 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="aspect-[16/10] bg-black">
                <ResilientImage
                  src={activeLightboxPhoto.src}
                  alt={activeLightboxPhoto.alt}
                  fallbackTitle={activeLightboxPhoto.title}
                  fallbackSubtitle={activeLightboxPhoto.subtitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-5 py-3.5 bg-white border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
                <span>{activeLightboxPhoto.subtitle}</span>
                <span className="font-mono tabular-nums text-dodger-600 font-medium">
                  {lightboxIndex + 1} / {galleryPhotos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
