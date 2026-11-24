import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
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
  { id: 'daily', label: 'Everyday Garments' },
  { id: 'bedding', label: 'Bedding & Bulk' },
  { id: 'express', label: 'Express' },
];

const LAUNDRY_STEPS = [
  {
    step: '01',
    title: 'Drop Off & Sort',
    body: 'Bring clothes, uniforms, or duvets to the Junction-Kodoyo counter for color and fabric sorting.',
  },
  {
    step: '02',
    title: 'Wash, Dry & Press',
    body: 'Garments undergo clean wash cycles, thorough drying, and careful steam ironing.',
  },
  {
    step: '03',
    title: 'Folded & Ready',
    body: 'Collected neatly folded or hung, wrapped cleanly for your journey home.',
  },
];

export function LaundrySection({
  onSelectServiceForEnquiry,
  onOpenLaundryPage,
}: LaundrySectionProps) {
  const { photos } = useGooglePlace();
  const [activeFilter, setActiveFilter] = useState<string>('all');

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
    : 'Freshly laundered white duvets and sky-blue towels arranged on wooden shelving';

  const tertiaryImgSrc = '/src/assets/images/laundry_ironing_care_1795526442689.jpg';
  const tertiaryImgAlt = 'Steam pressing station with crisp collared shirts on hangers';

  return (
    <section id="laundry" className="py-20 lg:py-28 bg-white border-b border-sky-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-zinc-200"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-sky-700">
              Chapter 02 · Morning Drop-Off · Laundry Services
            </p>
            <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
              Leave everyday clothes and heavy duvets in fresh hands while your day moves forward.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Rates are confirmed per load or item at the counter or via WhatsApp prior to service.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start lg:self-auto">
            <div
              role="tablist"
              aria-label="Filter laundry services"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-sky-50 border border-sky-200"
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
                    className={`relative px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      active ? 'text-white' : 'text-zinc-600 hover:text-sky-800'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="home-laundry-tab"
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
              onClick={onOpenLaundryPage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap cursor-pointer"
            >
              <span>Open Laundry Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        {/* Prominent Visual + Sticky Narrative Split */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-4">
            <button
              type="button"
              onClick={onOpenLaundryPage}
              className="group relative text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              <ParallaxImageFrame
                speed={22}
                className="aspect-[16/10] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
              >
                <ResilientImage
                  src={primaryImgSrc}
                  alt={primaryImgAlt}
                  fallbackTitle="Laundry Care Workflow"
                  fallbackSubtitle="Sorted washing, steam pressing, and protective packaging"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-slate-950/90 text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-sky-500">
                <span className="font-medium">Washing &amp; Sorting Counter</span>
                <span className="text-sky-300 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={onOpenLaundryPage}
                className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <FluidRevealFrame
                  delay={0.08}
                  className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
                >
                  <ResilientImage
                    src={secondaryImgSrc}
                    alt={secondaryImgAlt}
                    fallbackTitle="Duvet & Bedding Care"
                    fallbackSubtitle="Deep-cycle wash and drying"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-zinc-800 group-hover:text-sky-700 transition-colors">
                  Duvet &amp; Blanket Care
                </p>
              </button>

              <button
                type="button"
                onClick={onOpenLaundryPage}
                className="group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                <FluidRevealFrame
                  delay={0.14}
                  className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
                >
                  <ResilientImage
                    src={tertiaryImgSrc}
                    alt={tertiaryImgAlt}
                    fallbackTitle="Steam Pressing"
                    fallbackSubtitle="Crisp shirt & uniform finishing"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-zinc-800 group-hover:text-sky-700 transition-colors">
                  Steam Ironing Bay
                </p>
              </button>
            </div>

            {primaryGooglePhoto && (
              <p className="text-[11px] text-zinc-500">
                Photo from Google Maps
                {primaryAttr && (
                  <>
                    {' · '}
                    {primaryAttr.uri ? (
                      <a
                        href={primaryAttr.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-sky-700"
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

          <div className="lg:col-span-7">
            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {filteredServices.map((service, index) => (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0.9, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="py-6 px-3 -mx-3 hover:bg-sky-50/60 transition-colors duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
                >
                  <div className="max-w-lg">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-sky-600 tabular-nums shrink-0">
                        0{index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-zinc-950 group-hover:text-sky-800 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed pl-7">
                      {service.description}{' '}
                      <span className="text-zinc-400">({service.pricingNote})</span>
                    </p>
                    <p className="mt-1.5 text-xs text-zinc-500 pl-7">
                      {service.category} · {service.turnaround}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForEnquiry(`Laundry — ${service.title}`)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer pl-7 sm:pl-0 py-1"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </motion.article>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-zinc-200">
              <h3 className="text-sm font-semibold text-zinc-950">How drop-off works</h3>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {LAUNDRY_STEPS.map((item) => (
                  <div key={item.step} className="border-t-2 border-sky-300 pt-3">
                    <p className="text-xs font-mono font-semibold text-sky-700 tabular-nums">
                      {item.step}
                    </p>
                    <h4 className="mt-1.5 text-sm font-semibold text-zinc-950">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-600">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenLaundryPage}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer"
                >
                  Explore Full Laundry Services Page
                </motion.button>
                <a
                  href={buildWhatsAppUrl(
                    'Hello The Junction Hub, I would like to ask about laundry pricing and turnaround times.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  Ask laundry rates on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
