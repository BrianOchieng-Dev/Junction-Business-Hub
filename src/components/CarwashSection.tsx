import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CARWASH_SERVICES } from '../data/hubData';
import { FluidRevealFrame, ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface CarwashSectionProps {
  onOpenCarwashPage: () => void;
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

export function CarwashSection({
  onOpenCarwashPage,
  onSelectServiceForEnquiry,
}: CarwashSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="carwash"
      className="py-20 lg:py-28 bg-white border-b border-zinc-200"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 7 cols Photography */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <button
              type="button"
              onClick={onOpenCarwashPage}
              className="w-full text-left cursor-pointer group rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={24} className="aspect-[16/10] bg-black">
                <ResilientImage
                  src="/src/assets/images/carwash_bay_exterior_1795529235094.jpg"
                  alt="SUV receiving high-pressure wash and foam rinse at The Junction Hub Carwash bay"
                  fallbackTitle="Carwash Bay"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-dodger-500">
                <span className="font-medium">Drive-In Pressure Bay</span>
                <span className="text-dodger-400 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={onOpenCarwashPage}
                className="group text-left cursor-pointer"
              >
                <FluidRevealFrame
                  delay={0.08}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src="/src/assets/images/carwash_interior_detailing_1795529235741.jpg"
                    alt="Clean vehicle interior beside folded microfiber detailing cloths"
                    fallbackTitle="Cabin Detailing"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Cabin Vacuum &amp; Mats
                </p>
              </button>

              <button
                type="button"
                onClick={onOpenCarwashPage}
                className="group text-left cursor-pointer"
              >
                <FluidRevealFrame
                  delay={0.14}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src="/src/assets/images/team_carwash_specialist_1795529811588.jpg"
                    alt="Carwash specialist drying a sparkling clean hood with microfiber towel"
                    fallbackTitle="Microfiber Dry Finish"
                    className="w-full h-full object-cover object-top"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Microfiber Finishing
                </p>
              </button>
            </div>
          </div>

          {/* 5 cols Minimal Text & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold text-dodger-600">06 · Carwash Services</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
                Pressure wash, chassis flush &amp; cabin detailing.
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {CARWASH_SERVICES.map((item, idx) => {
                const isSelected = selectedId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`py-4 px-3 -mx-3 rounded-md transition-colors duration-200 ${
                      isSelected ? 'bg-dodger-50/50' : 'hover:bg-dodger-50/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedId((prev) => (prev === item.id ? null : item.id))
                      }
                      aria-expanded={isSelected}
                      className="w-full text-left flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="text-xs font-mono text-dodger-500 tabular-nums shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-black group-hover:text-dodger-600 truncate">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 whitespace-nowrap shrink-0">
                        {item.turnaround}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2.5 pl-7 space-y-2">
                            <p className="text-xs text-zinc-600">{item.pricingNote}</p>
                            <button
                              type="button"
                              onClick={() =>
                                onSelectServiceForEnquiry(`Carwash Services — ${item.title}`)
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

            <div className="pt-1">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenCarwashPage}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer"
              >
                <span>Open Carwash Page</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
