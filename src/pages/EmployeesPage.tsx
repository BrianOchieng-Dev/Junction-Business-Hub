import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FluidRevealFrame, ParallaxImageFrame } from '../components/FluidVisual';
import { ResilientImage } from '../components/ResilientImage';
import {
  BUSINESS_INFO,
  EMPLOYEE_ROLES,
  EmployeeRole,
  OPERATING_HOURS,
  buildWhatsAppUrl,
} from '../data/hubData';

interface EmployeesPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onEnquireRole: (serviceLabel: string) => void;
}

const DEPARTMENT_TABS: Array<{
  id: 'all' | 'management' | 'laundry' | 'cyber' | 'barber' | 'hotel' | 'carwash';
  label: string;
}> = [
  { id: 'all', label: 'All Roles' },
  { id: 'management', label: 'Management' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'cyber', label: 'Cyber Café' },
  { id: 'barber', label: 'Barber' },
  { id: 'hotel', label: 'Highway Hotel' },
  { id: 'carwash', label: 'Carwash' },
];

const DEPARTMENT_VISUALS = [
  {
    id: 'dept-laundry',
    label: 'Laundry Care',
    src: '/src/assets/images/laundry_ironing_care_1795526442689.jpg',
    alt: 'Crisp steam-pressed shirts and garment finishing station',
  },
  {
    id: 'dept-cyber',
    label: 'Cyber & Print Counter',
    src: '/src/assets/images/cyber_digital_desk_1795527988780.jpg',
    alt: 'Document scanning and cyber portal assistance desk',
  },
  {
    id: 'dept-barber',
    label: 'Barber Grooming Bay',
    src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
    alt: 'Clean modern barbershop chairs and mirrors',
  },
  {
    id: 'dept-hotel',
    label: 'Junction Highway Hotel',
    src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
    alt: 'Junction Highway Hotel dining room and hospitality lounge',
  },
  {
    id: 'dept-carwash',
    label: 'Drive-In Carwash Bay',
    src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
    alt: 'SUV receiving high-pressure wash inside the roadside carwash bay',
  },
];

export function EmployeesPage({ onNavigateHome, onEnquireRole }: EmployeesPageProps) {
  const [departmentFilter, setDepartmentFilter] = useState<
    'all' | 'management' | 'laundry' | 'cyber' | 'barber' | 'hotel' | 'carwash'
  >('all');
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(
    EMPLOYEE_ROLES[0]?.id ?? null
  );

  const visibleRoles: EmployeeRole[] =
    departmentFilter === 'all'
      ? EMPLOYEE_ROLES
      : EMPLOYEE_ROLES.filter((role) => role.department === departmentFilter);

  return (
    <div className="bg-white min-h-[75vh]">
      <section className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
          <motion.button
            type="button"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigateHome()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 transition-colors cursor-pointer mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </motion.button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-semibold text-dodger-600">
                Team &amp; Roles · {BUSINESS_INFO.locationShort}
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-black text-balance">
                Meet the Bay Crew.
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                Every bay staffed daily from 7:00 AM.
              </p>
            </div>

            <motion.a
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              href={buildWhatsAppUrl(
                'Hello The Junction Laundry And Services Hub, I would like to speak with the hub supervisor.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp Supervisor</span>
            </motion.a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DEPARTMENT_VISUALS.map((item, idx) => (
              <div key={item.id} className="group">
                <FluidRevealFrame
                  delay={idx * 0.06}
                  className="aspect-[16/10] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-white"
                >
                  <ResilientImage
                    src={item.src}
                    alt={item.alt}
                    fallbackTitle={item.label}
                    className="w-full h-full object-cover"
                  />
                </FluidRevealFrame>
                <p className="mt-2 text-xs font-medium text-black group-hover:text-dodger-600 transition-colors">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-12 lg:py-16 border-b border-zinc-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-zinc-200">
          <div
            role="tablist"
            aria-label="Filter employee roles by department"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-md bg-white border border-zinc-200"
          >
            {DEPARTMENT_TABS.map((tab) => {
              const active = departmentFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDepartmentFilter(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-white' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="team-page-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-[4px] bg-dodger-500 z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-zinc-500 font-mono tabular-nums">
            {visibleRoles.length} {visibleRoles.length === 1 ? 'role' : 'roles'}
          </span>
        </div>

        <motion.div layout className="divide-y divide-zinc-200">
          <AnimatePresence mode="popLayout">
            {visibleRoles.map((role, idx) => {
              const isExpanded = expandedRoleId === role.id;
              return (
                <motion.article
                  key={role.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="py-7 px-3 -mx-3 rounded-md hover:bg-dodger-50/40 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-4">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedRoleId((prev) => (prev === role.id ? null : role.id))
                        }
                        className="w-full text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-600 rounded-lg"
                      >
                        <ParallaxImageFrame
                          speed={idx % 2 === 0 ? 12 : -12}
                          className="aspect-[4/3] rounded-lg border border-zinc-200 group-hover:border-dodger-500 transition-colors bg-black"
                        >
                          <ResilientImage
                            src={role.image.src}
                            alt={role.image.alt}
                            fallbackTitle={role.title}
                            fallbackSubtitle={role.departmentLabel}
                            className="w-full h-full object-cover object-top"
                          />
                        </ParallaxImageFrame>
                      </button>
                    </div>

                    <div className="lg:col-span-4">
                      <div>
                        <p className="text-xs font-medium text-dodger-600">{role.departmentLabel}</p>
                        <h2 className="mt-1 text-lg font-semibold text-black">{role.title}</h2>
                        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{role.summary}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedRoleId((prev) => (prev === role.id ? null : role.id))
                        }
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Duties' : 'What They Do'}</span>
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        >
                          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-1.5 space-y-2">
                              <ul className="space-y-1.5 text-xs text-zinc-700">
                                {role.responsibilities.map((duty, dutyIdx) => (
                                  <motion.li
                                    key={duty}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: dutyIdx * 0.045 }}
                                    className="flex items-start gap-2"
                                  >
                                    <Check
                                      className="w-3.5 h-3.5 text-dodger-600 shrink-0 mt-0.5"
                                      aria-hidden="true"
                                    />
                                    <span>{duty}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="lg:col-span-2 flex lg:flex-col lg:items-end justify-between gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ y: -1.5, scale: 1.015 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onEnquireRole(`General Enquiry — ${role.title}`)}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Contact Desk</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-dodger-600">Hub Coverage</p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-black text-balance">
              All five bays covered daily.
            </h2>
            <p className="mt-2.5 text-sm text-zinc-600">
              Junction-Kodoyo, Homa Bay–Rongo Road.
            </p>
            <div className="mt-6">
              <motion.button
                type="button"
                whileHover={{ y: -1.5, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onEnquireRole('Team, Roles & Staffing Enquiry')}
                className="px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer"
              >
                Enquire About Team
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-7 border-t border-b border-zinc-200 divide-y divide-zinc-200">
            {OPERATING_HOURS.map((row) => (
              <div
                key={row.day}
                className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm"
              >
                <span className="font-medium text-zinc-900">{row.day}</span>
                <span
                  className={`font-mono tabular-nums ${
                    row.confirmed ? 'text-zinc-600' : 'text-amber-700 font-sans'
                  }`}
                >
                  {row.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
