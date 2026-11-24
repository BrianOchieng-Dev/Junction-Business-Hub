import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BARBER_SERVICES, HOTEL_SERVICES } from '../data/hubData';
import { AppPage } from './Navbar';
import { FluidRevealFrame, ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface BarberHotelSectionProps {
  onOpenServicePage: (page: AppPage) => void;
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

const BARBER_SCENES = [
  {
    id: 'barber-bay',
    title: 'Barber Grooming Bay',
    src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
    alt: 'Modern barber chairs and mirror station at The Junction Hub',
    fallback: 'Barber Grooming Bay',
    imgClass: 'w-full h-full object-cover',
  },
  {
    id: 'barber-tools',
    title: 'Sanitized Clippers',
    src: '/src/assets/images/barber_grooming_tools_1795528332042.jpg',
    alt: 'Sanitized hair clippers, shears, and folded towels',
    fallback: 'Sanitized Tools',
    imgClass: 'w-full h-full object-cover',
  },
  {
    id: 'barber-cuts',
    title: 'Walk-In Cuts',
    src: '/src/assets/images/team_barber_specialist_1795529814089.jpg',
    alt: 'Senior barber shaping a crisp fade haircut',
    fallback: 'Precision Fades',
    imgClass: 'w-full h-full object-cover object-top',
  },
];

const HOTEL_SCENES = [
  {
    id: 'hotel-dining',
    title: 'Dining Lounge & Tea',
    src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
    alt: 'Junction Highway Hotel dining hall with timber tables',
    fallback: 'Junction Highway Hotel',
    imgClass: 'w-full h-full object-cover',
  },
  {
    id: 'hotel-rooms',
    title: 'Overnight Rooms',
    src: '/src/assets/images/hotel_guest_room_1795528333616.jpg',
    alt: 'Clean guest bedroom at Junction Highway Hotel',
    fallback: 'Guest Rooms',
    imgClass: 'w-full h-full object-cover',
  },
  {
    id: 'hotel-kitchen',
    title: 'Fresh Kitchen Meals',
    src: '/src/assets/images/team_hotel_chef_1795529812533.jpg',
    alt: 'Hospitality host serving fresh Kenyan chai and chapati',
    fallback: 'Fresh Kenyan Meals',
    imgClass: 'w-full h-full object-cover object-top',
  },
];

export function BarberHotelSection({
  onOpenServicePage,
  onSelectServiceForEnquiry,
}: BarberHotelSectionProps) {
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [barberSceneIdx, setBarberSceneIdx] = useState<number>(0);
  const [hotelSceneIdx, setHotelSceneIdx] = useState<number>(0);

  const activeBarberScene = BARBER_SCENES[barberSceneIdx] ?? BARBER_SCENES[0];
  const activeHotelScene = HOTEL_SCENES[hotelSceneIdx] ?? HOTEL_SCENES[0];

  return (
    <section id="barber-hotel" className="py-20 lg:py-28 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-24">
        <div id="barber" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold text-dodger-600">Barber Services</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
                Precision Fades &amp; Shaves.
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {BARBER_SERVICES.slice(0, 4).map((item) => {
                const isSelected = selectedBarberId === item.id;
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
                        setSelectedBarberId((prev) => (prev === item.id ? null : item.id))
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
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
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
              aria-label={`Open Barber page — ${activeBarberScene.title}`}
              onClick={() => onOpenServicePage('barber')}
              className="w-full text-left cursor-pointer group rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={24} className="aspect-[16/10] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBarberScene.id}
                    initial={{ opacity: 0.25, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.25 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <ResilientImage
                      src={activeBarberScene.src}
                      alt={activeBarberScene.alt}
                      fallbackTitle={activeBarberScene.fallback}
                      className={activeBarberScene.imgClass}
                    />
                  </motion.div>
                </AnimatePresence>
              </ParallaxImageFrame>
            </button>

            <div className="grid grid-cols-3 gap-3.5">
              {BARBER_SCENES.map((scene, idx) => {
                const active = barberSceneIdx === idx;
                return (
                  <motion.button
                    key={scene.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBarberSceneIdx(idx)}
                    aria-label={scene.title}
                    aria-pressed={active}
                    className="group text-left cursor-pointer"
                  >
                    <FluidRevealFrame
                      delay={idx * 0.05}
                      className={`aspect-[4/3] rounded-lg border transition-colors bg-white ${
                        active
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
        </div>

        {/* 05 · Junction Highway Hotel */}
        <div
          id="hotel"
          className="pt-20 border-t border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-7 lg:sticky lg:top-24 order-2 lg:order-1 space-y-4">
            <button
              type="button"
              aria-label={`Open Hotel page — ${activeHotelScene.title}`}
              onClick={() => onOpenServicePage('hotel')}
              className="w-full text-left cursor-pointer group rounded-lg overflow-hidden border border-zinc-200 hover:border-dodger-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
            >
              <ParallaxImageFrame speed={24} className="aspect-[16/10] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHotelScene.id}
                    initial={{ opacity: 0.25, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.25 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <ResilientImage
                      src={activeHotelScene.src}
                      alt={activeHotelScene.alt}
                      fallbackTitle={activeHotelScene.fallback}
                      className={activeHotelScene.imgClass}
                    />
                  </motion.div>
                </AnimatePresence>
              </ParallaxImageFrame>
            </button>

            <div className="grid grid-cols-3 gap-3.5">
              {HOTEL_SCENES.map((scene, idx) => {
                const active = hotelSceneIdx === idx;
                return (
                  <motion.button
                    key={scene.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setHotelSceneIdx(idx)}
                    aria-label={scene.title}
                    aria-pressed={active}
                    className="group text-left cursor-pointer"
                  >
                    <FluidRevealFrame
                      delay={idx * 0.05}
                      className={`aspect-[4/3] rounded-lg border transition-colors bg-white ${
                        active
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

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-xs font-semibold text-dodger-600">
                Junction Highway Hotel
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
                Hot Meals &amp; Clean Rooms.
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {HOTEL_SERVICES.slice(0, 4).map((item) => {
                const isSelected = selectedHotelId === item.id;
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
                        setSelectedHotelId((prev) => (prev === item.id ? null : item.id))
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
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
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
