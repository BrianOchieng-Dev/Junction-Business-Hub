import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useGooglePlace } from '../context/GooglePlaceContext';
import {
  BUSINESS_INFO,
  CYBER_SERVICES,
  ServiceItem,
  buildWhatsAppUrl,
} from '../data/hubData';
import { FluidRevealFrame, ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface CyberSectionProps {
  onSelectServiceForEnquiry: (serviceName: string) => void;
  onOpenCyberPage: () => void;
}

const CYBER_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'print', label: 'Printing & Scanning' },
  { id: 'digital', label: 'Typing & Online' },
];

export function CyberSection({
  onSelectServiceForEnquiry,
  onOpenCyberPage,
}: CyberSectionProps) {
  const { photos } = useGooglePlace();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeVisualIdx, setActiveVisualIdx] = useState<number>(0);

  const filteredServices: ServiceItem[] =
    activeFilter === 'all'
      ? CYBER_SERVICES
      : CYBER_SERVICES.filter((item) => item.filterGroup === activeFilter);

  const googleCyberPhoto = photos[2] ?? photos[1] ?? photos[0];
  const imgSrc = googleCyberPhoto
    ? googleCyberPhoto.thumbnailUrl
    : '/src/assets/images/cyber_cafe_workstations_1795526442794.jpg';
  const imgAlt = googleCyberPhoto
    ? `${BUSINESS_INFO.fullName} workspace — Google Maps photo`
    : 'Bright desktop computer workstations inside the cyber café';
  const attr = googleCyberPhoto?.attributions?.[0];

  const secondaryCyberPhoto = photos[3];
  const secondarySrc = secondaryCyberPhoto
    ? secondaryCyberPhoto.thumbnailUrl
    : '/src/assets/images/cyber_digital_desk_1795527988780.jpg';
  const secondaryAlt = secondaryCyberPhoto
    ? `${BUSINESS_INFO.fullName} document counter — Google Maps photo`
    : 'Document scanning and digital portal assistance counter';

  const printDeskSrc = '/src/assets/images/cyber_printing_documents_1795526444880.jpg';
  const printDeskAlt = 'Multifunction laser printer and crisp printed reports';

  const scenes = [
    {
      id: 'workstations',
      title: 'Desktop Workstations',
      src: imgSrc,
      alt: imgAlt,
      fallback: 'Cyber Workstations',
    },
    {
      id: 'scanning',
      title: 'Scanning & Portals',
      src: secondarySrc,
      alt: secondaryAlt,
      fallback: 'Scanning Desk',
    },
    {
      id: 'printing',
      title: 'Laser Print Desk',
      src: printDeskSrc,
      alt: printDeskAlt,
      fallback: 'Laser Printing',
    },
  ];

  const spotlightScene = scenes[activeVisualIdx] ?? scenes[0];

  return (
    <section id="cyber" className="py-20 lg:py-28 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200"
        >
          <div>
            <p className="text-xs font-semibold text-dodger-600">Cyber Café &amp; Digital</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
              Print, Scan &amp; Portals.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start lg:self-auto">
            <div
              role="tablist"
              aria-label="Filter cyber café services"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-md bg-white border border-zinc-200"
            >
              {CYBER_FILTERS.map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`relative px-3 py-1.5 rounded-sm text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      active ? 'text-white' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="home-cyber-tab"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 bg-dodger-500 rounded-sm z-0"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <motion.button
              type="button"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenCyberPage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 whitespace-nowrap cursor-pointer"
            >
              <span>Cyber Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        {/* Visual-First Split: 5 cols Concise List + 7 cols Interactive Photography */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div layout className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service) => {
                  const isExpanded = expandedId === service.id;
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className={`py-4 px-3 -mx-3 rounded-md transition-colors duration-200 ${
                        isExpanded ? 'bg-dodger-50/50' : 'hover:bg-dodger-50/40'
                      }`}
                    >
                      <motion.button
                        type="button"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.16 }}
                        onClick={() =>
                          setExpandedId((prev) => (prev === service.id ? null : service.id))
                        }
                        aria-expanded={isExpanded}
                        className="w-full text-left flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="min-w-0">
                          <span className="text-sm font-semibold text-black group-hover:text-dodger-600 truncate block transition-colors">
                            {service.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-zinc-500 whitespace-nowrap">
                            {service.turnaround}
                          </span>
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className="text-dodger-500"
                          >
                            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                          </motion.span>
                        </div>
                      </motion.button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2.5 space-y-2">
                              <p className="text-xs text-zinc-600 leading-relaxed">
                                {service.description}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  onSelectServiceForEnquiry(`Cyber Café — ${service.title}`)
                                }
                                className="inline-flex items-center gap-1 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 cursor-pointer"
                              >
                                <span>Enquire</span>
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenCyberPage}
                className="px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer"
              >
                Open Cyber Page
              </motion.button>
              <a
                href={buildWhatsAppUrl(
                  'Hello The Junction Hub Cyber Desk, I would like to send a file for printing.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 whitespace-nowrap"
              >
                Send File on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-24 order-1 lg:order-2 space-y-4">
            <button
              type="button"
              aria-label={`Open Cyber page — ${spotlightScene.title}`}
              onClick={onOpenCyberPage}
              className="group w-full text-left cursor-pointer rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={22} className="aspect-[16/10] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={spotlightScene.id}
                    initial={{ opacity: 0.25, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.25 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <ResilientImage
                      src={spotlightScene.src}
                      alt={spotlightScene.alt}
                      fallbackTitle={spotlightScene.fallback}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </ParallaxImageFrame>
            </button>

            <div className="grid grid-cols-3 gap-3.5">
              {scenes.map((scene, idx) => {
                const isSelected = activeVisualIdx === idx;
                return (
                  <motion.button
                    key={scene.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveVisualIdx(idx)}
                    aria-label={scene.title}
                    aria-pressed={isSelected}
                    className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-500"
                  >
                    <FluidRevealFrame
                      delay={idx * 0.05}
                      className={`aspect-[4/3] rounded-lg border transition-colors bg-white ${
                        isSelected
                          ? 'border-dodger-500 ring-2 ring-dodger-500/20'
                          : 'border-zinc-200 group-hover:border-dodger-500'
                      }`}
                    >
                      <ResilientImage
                        src={scene.src}
                        alt={scene.alt}
                        fallbackTitle={scene.fallback}
                        className="w-full h-full object-cover"
                      />
                    </FluidRevealFrame>
                  </motion.button>
                );
              })}
            </div>

            {googleCyberPhoto && (
              <p className="text-[11px] text-zinc-500">
                Google Maps
                {attr && (
                  <>
                    {' · '}
                    {attr.uri ? (
                      <a
                        href={attr.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-dodger-600"
                      >
                        {attr.displayName}
                      </a>
                    ) : (
                      <span>{attr.displayName}</span>
                    )}
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
