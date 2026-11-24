import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
            <p className="text-xs font-semibold text-dodger-600">03 · Cyber Café &amp; Digital</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
              Printing, PDF scans &amp; online portals.
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
              whileHover={{ x: 2 }}
              onClick={onOpenCyberPage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 whitespace-nowrap cursor-pointer"
            >
              <span>Cyber Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        {/* Visual-First Split: 5 cols Concise List + 7 cols Photography */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {filteredServices.map((service, index) => {
                const isExpanded = expandedId === service.id;
                return (
                  <div
                    key={service.id}
                    className={`py-4 px-3 -mx-3 rounded-md transition-colors duration-200 ${
                      isExpanded ? 'bg-dodger-50/50' : 'hover:bg-dodger-50/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId((prev) => (prev === service.id ? null : service.id))
                      }
                      aria-expanded={isExpanded}
                      className="w-full text-left flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="text-xs font-mono text-dodger-500 tabular-nums shrink-0">
                          0{index + 1}
                        </span>
                        <span className="text-sm font-semibold text-black group-hover:text-dodger-600 truncate">
                          {service.title}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 whitespace-nowrap shrink-0">
                        {service.turnaround}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2.5 pl-7 space-y-2">
                            <p className="text-xs text-zinc-600 leading-relaxed">
                              {service.pricingNote}
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
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
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
              onClick={onOpenCyberPage}
              className="group w-full text-left cursor-pointer rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={22} className="aspect-[16/10] bg-black">
                <ResilientImage
                  src={imgSrc}
                  alt={imgAlt}
                  fallbackTitle="Cyber Workstations"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-dodger-500">
                <span className="font-medium">Desktop Workstations</span>
                <span className="text-dodger-400 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={onOpenCyberPage}
                className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-500"
              >
                <FluidRevealFrame
                  delay={0.08}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src={secondarySrc}
                    alt={secondaryAlt}
                    fallbackTitle="Scanning Desk"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Scanning &amp; Portals
                </p>
              </button>

              <button
                type="button"
                onClick={onOpenCyberPage}
                className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-500"
              >
                <FluidRevealFrame
                  delay={0.14}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src={printDeskSrc}
                    alt={printDeskAlt}
                    fallbackTitle="Laser Printing"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Laser Print Desk
                </p>
              </button>
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
