import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BARBER_SERVICES, HOTEL_SERVICES } from '../data/hubData';
import { AppPage } from './Navbar';
import { FluidRevealFrame, ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface BarberHotelSectionProps {
  onOpenServicePage: (page: AppPage) => void;
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

export function BarberHotelSection({
  onOpenServicePage,
  onSelectServiceForEnquiry,
}: BarberHotelSectionProps) {
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  return (
    <section id="barber-hotel" className="py-20 lg:py-28 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-24">
        {/* 04 · Barber Services (5 cols text, 7 cols photos) */}
        <div id="barber" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold text-dodger-600">04 · Barber Services</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
                Precision fades, clean trims &amp; hot towels.
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {BARBER_SERVICES.slice(0, 4).map((item, idx) => {
                const isSelected = selectedBarberId === item.id;
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
                        setSelectedBarberId((prev) => (prev === item.id ? null : item.id))
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
                                onSelectServiceForEnquiry(`Barber Services — ${item.title}`)
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

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenServicePage('barber')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer"
            >
              <span>Open Barber Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <button
              type="button"
              onClick={() => onOpenServicePage('barber')}
              className="w-full text-left cursor-pointer group rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={24} className="aspect-[16/10] bg-black">
                <ResilientImage
                  src="/src/assets/images/barber_salon_chairs_1795528332331.jpg"
                  alt="Modern barber chairs and mirror station at The Junction Hub"
                  fallbackTitle="Barber Grooming Bay"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-dodger-500">
                <span className="font-medium">Barber Grooming Bay</span>
                <span className="text-dodger-400 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => onOpenServicePage('barber')}
                className="group text-left cursor-pointer"
              >
                <FluidRevealFrame
                  delay={0.08}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src="/src/assets/images/barber_grooming_tools_1795528332042.jpg"
                    alt="Sanitized hair clippers, shears, and folded towels"
                    fallbackTitle="Sanitized Tools"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Sanitized Clippers
                </p>
              </button>

              <button
                type="button"
                onClick={() => onOpenServicePage('barber')}
                className="group text-left cursor-pointer"
              >
                <FluidRevealFrame
                  delay={0.14}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src="/src/assets/images/team_barber_specialist_1795529814089.jpg"
                    alt="Senior barber shaping a crisp fade haircut"
                    fallbackTitle="Precision Fades"
                    className="w-full h-full object-cover object-top"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Walk-In Cuts
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* 05 · Junction Highway Hotel (7 cols photos, 5 cols text) */}
        <div
          id="hotel"
          className="pt-20 border-t border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-7 lg:sticky lg:top-24 order-2 lg:order-1 space-y-4">
            <button
              type="button"
              onClick={() => onOpenServicePage('hotel')}
              className="w-full text-left cursor-pointer group rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={24} className="aspect-[16/10] bg-black">
                <ResilientImage
                  src="/src/assets/images/hotel_highway_dining_1795528332703.jpg"
                  alt="Junction Highway Hotel dining hall with timber tables"
                  fallbackTitle="Junction Highway Hotel"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-dodger-500">
                <span className="font-medium">Dining Lounge &amp; Tea</span>
                <span className="text-dodger-400 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => onOpenServicePage('hotel')}
                className="group text-left cursor-pointer"
              >
                <FluidRevealFrame
                  delay={0.08}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src="/src/assets/images/hotel_guest_room_1795528333616.jpg"
                    alt="Clean guest bedroom at Junction Highway Hotel"
                    fallbackTitle="Guest Rooms"
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Overnight Rooms
                </p>
              </button>

              <button
                type="button"
                onClick={() => onOpenServicePage('hotel')}
                className="group text-left cursor-pointer"
              >
                <FluidRevealFrame
                  delay={0.14}
                  className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src="/src/assets/images/team_hotel_chef_1795529812533.jpg"
                    alt="Hospitality host serving fresh Kenyan chai and chapati"
                    fallbackTitle="Fresh Kenyan Meals"
                    className="w-full h-full object-cover object-top"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  Fresh Kitchen Meals
                </p>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-xs font-semibold text-dodger-600">
                05 · Junction Highway Hotel
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
                Warm Kenyan meals, tea &amp; clean rooms.
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {HOTEL_SERVICES.slice(0, 4).map((item, idx) => {
                const isSelected = selectedHotelId === item.id;
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
                        setSelectedHotelId((prev) => (prev === item.id ? null : item.id))
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
                                onSelectServiceForEnquiry(
                                  `Junction Highway Hotel — ${item.title}`
                                )
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

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenServicePage('hotel')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer"
            >
              <span>Open Hotel Page</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
