import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BARBER_SERVICES, HOTEL_SERVICES, SERVICE_DIVISIONS } from '../data/hubData';
import { AppPage } from './Navbar';
import { ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface BarberHotelSectionProps {
  onOpenServicePage: (page: AppPage) => void;
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

export function BarberHotelSection({
  onOpenServicePage,
  onSelectServiceForEnquiry,
}: BarberHotelSectionProps) {
  const [selectedBarberId, setSelectedBarberId] = useState<string>(BARBER_SERVICES[0].id);
  const [selectedHotelId, setSelectedHotelId] = useState<string>(HOTEL_SERVICES[0].id);

  const barberMeta = SERVICE_DIVISIONS.barber;
  const hotelMeta = SERVICE_DIVISIONS.hotel;

  return (
    <section id="barber-hotel" className="py-20 lg:py-28 bg-white border-b border-sky-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-24">
        {/* Chapter 04A · Barber Services */}
        <div id="barber" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold text-sky-700">
                Chapter 04 · Afternoon Refresh · Barber Services
              </p>
              <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
                {barberMeta.heroHeading}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                {barberMeta.heroSubtitle}
              </p>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {BARBER_SERVICES.slice(0, 4).map((item, idx) => {
                const isSelected = selectedBarberId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`py-4 px-3 -mx-3 transition-colors duration-200 ${
                      isSelected ? 'bg-sky-50/70' : 'hover:bg-sky-50/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedBarberId(item.id)}
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
                                  onSelectServiceForEnquiry(`Barber Services — ${item.title}`)
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
                onClick={() => onOpenServicePage('barber')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer"
              >
                <span>Open Barber Services Page</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <button
              type="button"
              onClick={() => onOpenServicePage('barber')}
              className="w-full text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              <ParallaxImageFrame
                speed={24}
                className="aspect-[16/10] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
              >
                <ResilientImage
                  src="/src/assets/images/barber_salon_chairs_1795528332331.jpg"
                  alt="Modern barber chairs and mirror station at The Junction Hub"
                  fallbackTitle="Barber Services"
                  fallbackSubtitle="Precision haircuts, fades & grooming"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-slate-950/90 text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-sky-500">
                <span className="font-medium">Modern Barber Grooming Bay</span>
                <span className="text-sky-300 group-hover:translate-x-0.5 transition-transform">
                  Open Barber Page →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4 items-stretch">
              <button
                type="button"
                onClick={() => onOpenServicePage('barber')}
                className="group text-left cursor-pointer"
              >
                <ParallaxImageFrame
                  speed={-14}
                  delay={0.08}
                  className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
                >
                  <ResilientImage
                    src="/src/assets/images/barber_grooming_tools_1795528332042.jpg"
                    alt="Sanitized hair clippers, shears, and folded sky-blue cotton towels"
                    fallbackTitle="Grooming Hygiene"
                    className="w-full h-full object-cover"
                  />
                </ParallaxImageFrame>
              </button>

              <div className="p-5 bg-sky-50/60 border border-sky-200 flex flex-col justify-center space-y-2.5">
                <p className="text-xs font-semibold text-sky-800">Walk-in Grooming Care</p>
                <ul className="space-y-1.5 text-xs text-zinc-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Sterilized clippers &amp; blades</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Fresh warm cotton towels</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Quick roadside stopover trims</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 04B · Junction Highway Hotel */}
        <div
          id="hotel"
          className="pt-20 border-t border-sky-200 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <div className="lg:col-span-6 lg:sticky lg:top-24 order-2 lg:order-1 space-y-4">
            <button
              type="button"
              onClick={() => onOpenServicePage('hotel')}
              className="w-full text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              <ParallaxImageFrame
                speed={26}
                className="aspect-[16/10] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
              >
                <ResilientImage
                  src="/src/assets/images/hotel_highway_dining_1795528332703.jpg"
                  alt="Junction Highway Hotel dining hall with timber tables and sky-blue runners"
                  fallbackTitle="Junction Highway Hotel"
                  fallbackSubtitle="Fresh meals, Kenyan tea & guest rooms"
                  className="w-full h-full object-cover"
                />
              </ParallaxImageFrame>
              <div className="bg-slate-950/90 text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-sky-500">
                <span className="font-medium">Junction Highway Hotel Dining Lounge</span>
                <span className="text-sky-300 group-hover:translate-x-0.5 transition-transform">
                  Open Hotel Page →
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4 items-stretch">
              <div className="p-5 bg-sky-50/60 border border-sky-200 flex flex-col justify-center space-y-2.5">
                <p className="text-xs font-semibold text-sky-800">Traveller Hospitality</p>
                <ul className="space-y-1.5 text-xs text-zinc-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Fresh daily Kenyan meals</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Crisp in-house laundered linens</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                    <span>Direct Homa Bay–Rongo access</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onOpenServicePage('hotel')}
                className="group text-left cursor-pointer"
              >
                <ParallaxImageFrame
                  speed={-14}
                  delay={0.08}
                  className="aspect-[4/3] border border-sky-200 group-hover:border-sky-600 transition-colors bg-sky-50"
                >
                  <ResilientImage
                    src="/src/assets/images/hotel_guest_room_1795528333616.jpg"
                    alt="Clean guest bedroom at Junction Highway Hotel with crisp white sheets and sky-blue runner"
                    fallbackTitle="Guest Accommodation"
                    className="w-full h-full object-cover"
                  />
                </ParallaxImageFrame>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-xs font-semibold text-sky-700">
                Chapter 04 · Dining &amp; Rest · Junction Highway Hotel
              </p>
              <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
                {hotelMeta.heroHeading}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                {hotelMeta.heroSubtitle}
              </p>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {HOTEL_SERVICES.slice(0, 4).map((item, idx) => {
                const isSelected = selectedHotelId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`py-4 px-3 -mx-3 transition-colors duration-200 ${
                      isSelected ? 'bg-sky-50/70' : 'hover:bg-sky-50/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedHotelId(item.id)}
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
                                  onSelectServiceForEnquiry(
                                    `Junction Highway Hotel — ${item.title}`
                                  )
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
                onClick={() => onOpenServicePage('hotel')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer"
              >
                <span>Open Junction Highway Hotel Page</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
