import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CARWASH_SERVICES, SERVICE_DIVISIONS } from '../data/hubData';
import { ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface CarwashSectionProps {
  onOpenCarwashPage: () => void;
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

export function CarwashSection({
  onOpenCarwashPage,
  onSelectServiceForEnquiry,
}: CarwashSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(CARWASH_SERVICES[0].id);
  const carwashMeta = SERVICE_DIVISIONS.carwash;

  return (
    <section
      id="carwash"
      className="py-20 lg:py-28 bg-sky-50/40 border-b border-sky-200"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Storytelling Visuals */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <button
              type="button"
              onClick={onOpenCarwashPage}
              className="w-full text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              <ParallaxImageFrame
                speed={26}
                className="aspect-[16/10] border border-sky-200 group-hover:border-sky-600 transition-colors bg-white"
              >
                <ResilientImage
                  src="/src/assets/images/carwash_bay_exterior_1795529235094.jpg"
                  alt="SUV receiving high-pressure wash and foam rinse at The Junction Hub Carwash bay"
                  fallbackTitle="Carwash Services"
                  fallbackSubtitle="High-pressure wash & cabin detailing"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-slate-950/90 text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-sky-500">
                <span className="font-medium">Drive-In Carwash Pressure Bay</span>
                <span className="text-sky-300 group-hover:translate-x-0.5 transition-transform">
                  Open Carwash Page →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4 items-stretch">
              <button
                type="button"
                onClick={onOpenCarwashPage}
                className="group text-left cursor-pointer"
              >
                <ParallaxImageFrame
                  speed={-15}
                  delay={0.08}
                  className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-white"
                >
                  <ResilientImage
                    src="/src/assets/images/carwash_interior_detailing_1795529235741.jpg"
                    alt="Clean vehicle interior beside folded sky-blue and white microfiber detailing cloths"
                    fallbackTitle="Interior Cabin Detailing"
                    className="w-full h-full object-cover"
                  />
                </ParallaxImageFrame>
              </button>

              <div className="p-5 bg-white border border-sky-200 flex flex-col justify-center space-y-2.5">
                <p className="text-xs font-semibold text-sky-800">Roadside Bay Advantage</p>
                <ul className="space-y-1.5 text-xs text-zinc-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>High-pressure mud &amp; chassis flush</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Fresh microfiber towel dry</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Grab tea or print while waiting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Narrative & Interactive Service List */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold text-sky-700">
                Chapter 05 · Along the Driveway · Carwash Services
              </p>
              <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
                {carwashMeta.heroHeading}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                {carwashMeta.heroSubtitle}
              </p>
            </div>

            <div className="divide-y divide-sky-200/80 border-t border-b border-sky-200/80">
              {CARWASH_SERVICES.slice(0, 4).map((item, idx) => {
                const isSelected = selectedId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`py-4 px-3 -mx-3 transition-colors duration-200 ${
                      isSelected ? 'bg-white' : 'hover:bg-white/80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      aria-expanded={isSelected}
                      className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs font-mono text-sky-600 tabular-nums">
                          0{idx + 1}
                        </span>
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            isSelected
                              ? 'text-sky-800'
                              : 'text-zinc-950 group-hover:text-sky-700'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        {item.turnaround}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pl-7 space-y-2.5">
                            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                              <span className="text-xs text-zinc-500">{item.pricingNote}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  onSelectServiceForEnquiry(`Carwash Services — ${item.title}`)
                                }
                                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 cursor-pointer"
                              >
                                <span>Enquire</span>
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenCarwashPage}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer"
              >
                <span>Open Carwash Services Page</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
