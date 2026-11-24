import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CARWASH_SERVICES } from '../data/hubData';
import { FluidRevealFrame, ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface CarwashSectionProps {
  onOpenCarwashPage: () => void;
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

const CARWASH_SCENES = [
  {
    id: 'bay',
    title: 'Drive-In Pressure Bay',
    src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
    alt: 'SUV receiving high-pressure wash and foam rinse at The Junction Hub Carwash bay',
    fallback: 'Carwash Bay',
    imgClass: 'w-full h-full object-cover',
  },
  {
    id: 'cabin',
    title: 'Cabin Vacuum & Mats',
    src: '/src/assets/images/carwash_interior_detailing_1795529235741.jpg',
    alt: 'Clean vehicle interior beside folded microfiber detailing cloths',
    fallback: 'Cabin Detailing',
    imgClass: 'w-full h-full object-cover',
  },
  {
    id: 'finish',
    title: 'Microfiber Finishing',
    src: '/src/assets/images/team_carwash_specialist_1795529811588.jpg',
    alt: 'Carwash specialist drying a sparkling clean hood with microfiber towel',
    fallback: 'Microfiber Dry Finish',
    imgClass: 'w-full h-full object-cover object-top',
  },
];

export function CarwashSection({
  onOpenCarwashPage,
  onSelectServiceForEnquiry,
}: CarwashSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeVisualIdx, setActiveVisualIdx] = useState<number>(0);

  const spotlightScene = CARWASH_SCENES[activeVisualIdx] ?? CARWASH_SCENES[0];

  return (
    <section
      id="carwash"
      className="py-20 lg:py-28 bg-white border-b border-zinc-200"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 7 cols Interactive Photography */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <button
              type="button"
              aria-label={`Open Carwash page — ${spotlightScene.title}`}
              onClick={onOpenCarwashPage}
              className="w-full text-left cursor-pointer group rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={24} className="aspect-[16/10] bg-black">
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
                      className={spotlightScene.imgClass}
                    />
                  </motion.div>
                </AnimatePresence>
              </ParallaxImageFrame>
            </button>

            <div className="grid grid-cols-3 gap-3.5">
              {CARWASH_SCENES.map((scene, idx) => {
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
                    className="group text-left cursor-pointer"
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
                        className={scene.imgClass}
                      />
                    </FluidRevealFrame>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 5 cols Minimal Text & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold text-dodger-600">Carwash Services</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
                Pressure Wash &amp; Detail.
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {CARWASH_SERVICES.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`py-4 px-3 -mx-3 rounded-md transition-colors duration-200 ${
                      isSelected ? 'bg-dodger-50/50' : 'hover:bg-dodger-50/40'
                    }`}
                  >
                    <motion.button
                      type="button"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.16 }}
                      onClick={() =>
                        setSelectedId((prev) => (prev === item.id ? null : item.id))
                      }
                      aria-expanded={isSelected}
                      className="w-full text-left flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-black group-hover:text-dodger-600 truncate block transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-zinc-500 whitespace-nowrap">
                          {item.turnaround}
                        </span>
                        <motion.span
                          animate={{ rotate: isSelected ? 180 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                          className="text-dodger-500"
                        >
                          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                        </motion.span>
                      </div>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2.5 space-y-2">
                            <p className="text-xs text-zinc-600">{item.description}</p>
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
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
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
