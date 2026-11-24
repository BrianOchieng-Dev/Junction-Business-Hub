import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useGooglePlace } from '../context/GooglePlaceContext';
import {
  BUSINESS_INFO,
  LAUNDRY_SERVICES,
  ServiceItem,
  buildWhatsAppUrl,
} from '../data/hubData';
import { FluidRevealFrame, ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface LaundrySectionProps {
  onSelectServiceForEnquiry: (serviceName: string) => void;
  onOpenLaundryPage: () => void;
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'daily', label: 'Daily' },
  { id: 'bedding', label: 'Duvets & Bulk' },
  { id: 'express', label: 'Express' },
];

export function LaundrySection({
  onSelectServiceForEnquiry,
  onOpenLaundryPage,
}: LaundrySectionProps) {
  const { photos } = useGooglePlace();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeVisualIdx, setActiveVisualIdx] = useState<number>(0);

  const filteredServices: ServiceItem[] =
    activeFilter === 'all'
      ? LAUNDRY_SERVICES
      : LAUNDRY_SERVICES.filter((item) => item.filterGroup === activeFilter);

  const primaryGooglePhoto = photos[1] ?? photos[0];
  const secondaryGooglePhoto = photos[2];

  const primaryImgSrc = primaryGooglePhoto
    ? primaryGooglePhoto.thumbnailUrl
    : '/src/assets/images/laundry_washing_folding_1795526442152.jpg';
  const primaryImgAlt = primaryGooglePhoto
    ? `${BUSINESS_INFO.fullName} laundry area — Google Maps photo`
    : 'Clean front-loading washers and freshly folded white laundry stacks';
  const primaryAttr = primaryGooglePhoto?.attributions?.[0];

  const secondaryImgSrc = secondaryGooglePhoto
    ? secondaryGooglePhoto.thumbnailUrl
    : '/src/assets/images/laundry_duvet_care_1795527972203.jpg';
  const secondaryImgAlt = secondaryGooglePhoto
    ? `${BUSINESS_INFO.fullName} bedding care — Google Maps photo`
    : 'Freshly laundered white duvets and towels arranged on wooden shelving';

  const tertiaryImgSrc = '/src/assets/images/laundry_ironing_care_1795526442689.jpg';
  const tertiaryImgAlt = 'Steam pressing station with crisp collared shirts on hangers';

  const scenes = [
    {
      id: 'bay',
      title: 'Washing & Sorting Bay',
      src: primaryImgSrc,
      alt: primaryImgAlt,
      fallback: 'Laundry Care',
    },
    {
      id: 'duvet',
      title: 'Duvets & Blankets',
      src: secondaryImgSrc,
      alt: secondaryImgAlt,
      fallback: 'Duvet Care',
    },
    {
      id: 'steam',
      title: 'Steam Pressing',
      src: tertiaryImgSrc,
      alt: tertiaryImgAlt,
      fallback: 'Steam Ironing',
    },
  ];

  const spotlightScene = scenes[activeVisualIdx] ?? scenes[0];

  return (
    <section id="laundry" className="py-20 lg:py-28 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200"
        >
          <div>
            <p className="text-xs font-semibold text-dodger-600">02 · Laundry Services</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
              Clean washing, pressing &amp; duvet care.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start lg:self-auto">
            <div
              role="tablist"
              aria-label="Filter laundry services"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-md bg-white border border-zinc-200"
            >
              {FILTERS.map((tab) => {
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
                        layoutId="home-laundry-tab"
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
              onClick={onOpenLaundryPage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 whitespace-nowrap cursor-pointer"
            >
              <span>Laundry Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        {/* Interactive Visual-First Split */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 lg:sticky lg:top-24 flex flex-col gap-4">
            <button
              type="button"
              onClick={onOpenLaundryPage}
              className="group relative text-left cursor-pointer rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
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
                      fallbackSubtitle="Washing & Folding"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </ParallaxImageFrame>
              <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-dodger-500">
                <span className="font-medium">{spotlightScene.title}</span>
                <span className="text-dodger-400 group-hover:translate-x-1 transition-transform duration-200">
                  Explore Laundry →
                </span>
              </div>
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
                    <p
                      className={`mt-2 text-xs font-medium transition-colors truncate ${
                        isSelected ? 'text-dodger-600' : 'text-black group-hover:text-dodger-600'
                      }`}
                    >
                      {scene.title}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {primaryGooglePhoto && (
              <p className="text-[11px] text-zinc-500">
                Google Maps
                {primaryAttr && (
                  <>
                    {' · '}
                    {primaryAttr.uri ? (
                      <a
                        href={primaryAttr.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-dodger-600"
                      >
                        {primaryAttr.displayName}
                      </a>
                    ) : (
                      <span>{primaryAttr.displayName}</span>
                    )}
                  </>
                )}
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <motion.div layout className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => {
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
                        <div className="flex items-baseline gap-3 min-w-0">
                          <span className="text-xs font-mono text-dodger-500 tabular-nums shrink-0">
                            0{index + 1}
                          </span>
                          <span className="text-sm font-semibold text-black group-hover:text-dodger-600 truncate transition-colors">
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
                            <div className="mt-2.5 pl-7 space-y-2">
                              <p className="text-xs text-zinc-600 leading-relaxed">
                                {service.pricingNote}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  onSelectServiceForEnquiry(`Laundry — ${service.title}`)
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
                onClick={onOpenLaundryPage}
                className="px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer"
              >
                Open Laundry Page
              </motion.button>
              <a
                href={buildWhatsAppUrl(
                  'Hello The Junction Hub, I would like to ask about laundry rates.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 whitespace-nowrap"
              >
                WhatsApp Rates
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
