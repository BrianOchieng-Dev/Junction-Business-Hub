import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
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
  { id: 'digital', label: 'Typing & Online Help' },
];

export function CyberSection({
  onSelectServiceForEnquiry,
  onOpenCyberPage,
}: CyberSectionProps) {
  const { photos } = useGooglePlace();
  const [activeFilter, setActiveFilter] = useState<string>('all');

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
    <section id="cyber" className="py-20 lg:py-28 bg-sky-50/40 border-b border-sky-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-sky-200/80"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-sky-700">
              Chapter 03 · Midday Productivity · Cyber Café &amp; Digital
            </p>
            <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
              While clothes wash, finish printing, PDF scans, and online applications calmly.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Operating alongside our laundry department for students, professionals, and local
              businesses needing fast document turnaround.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start lg:self-auto">
            <div
              role="tablist"
              aria-label="Filter cyber café services"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-sky-200"
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
                    className={`relative px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      active ? 'text-white' : 'text-zinc-600 hover:text-sky-800'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="home-cyber-tab"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 bg-sky-700 z-0"
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
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCyberPage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap cursor-pointer"
            >
              <span>Open Cyber Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="divide-y divide-sky-200/70 border-t border-b border-sky-200/70">
              {filteredServices.map((service, index) => (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="py-5 px-3 -mx-3 hover:bg-white/90 transition-colors duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
                >
                  <div className="max-w-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-sky-600 tabular-nums">
                        0{index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-zinc-950 group-hover:text-sky-800 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed pl-7">
                      {service.description}
                    </p>
                    <p className="mt-1.5 text-xs text-zinc-500 pl-7">
                      {service.category} · {service.turnaround} · {service.pricingNote}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForEnquiry(`Cyber Café — ${service.title}`)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer pl-7 sm:pl-0 py-1"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-sky-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950">
                  Send documents ahead on WhatsApp
                </h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Send PDFs or Word files ahead so our desk prepares your prints before you arrive.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenCyberPage}
                  className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Open Cyber Services Page
                </motion.button>
                <a
                  href={buildWhatsAppUrl(
                    'Hello The Junction Hub Cyber Desk, I would like to send a document for printing/services.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap"
                >
                  Message Desk
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 order-1 lg:order-2 space-y-4">
            <button
              type="button"
              onClick={onOpenCyberPage}
              className="group w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              <ParallaxImageFrame
                speed={22}
                className="aspect-[16/10] border border-sky-200 group-hover:border-sky-600 transition-colors bg-white"
              >
                <ResilientImage
                  src={imgSrc}
                  alt={imgAlt}
                  fallbackTitle="Cyber Café Workstations"
                  fallbackSubtitle="Quiet desktop stations with reliable connectivity"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-slate-950/90 text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-sky-500">
                <span className="font-medium">Desktop Cyber Workstations</span>
                <span className="text-sky-300 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={onOpenCyberPage}
                className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <FluidRevealFrame
                  delay={0.08}
                  className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-white"
                >
                  <ResilientImage
                    src={secondarySrc}
                    alt={secondaryAlt}
                    fallbackTitle="Digital Assistance Desk"
                    fallbackSubtitle="Scanning & online applications"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-zinc-800 group-hover:text-sky-700 transition-colors">
                  Scanning &amp; Portal Desk
                </p>
              </button>

              <button
                type="button"
                onClick={onOpenCyberPage}
                className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <FluidRevealFrame
                  delay={0.14}
                  className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-white"
                >
                  <ResilientImage
                    src={printDeskSrc}
                    alt={printDeskAlt}
                    fallbackTitle="Print & Copy Desk"
                    fallbackSubtitle="B&W and color laser prints"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-zinc-800 group-hover:text-sky-700 transition-colors">
                  High-Speed Printing
                </p>
              </button>
            </div>

            {googleCyberPhoto && (
              <p className="text-[11px] text-zinc-500">
                Photo from Google Maps
                {attr && (
                  <>
                    {' · '}
                    {attr.uri ? (
                      <a
                        href={attr.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-sky-700"
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
