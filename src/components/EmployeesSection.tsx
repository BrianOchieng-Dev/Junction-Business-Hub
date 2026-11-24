import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EMPLOYEE_ROLES, EmployeeRole, ServiceDivisionKey } from '../data/hubData';
import { ParallaxImageFrame } from './FluidVisual';
import { ResilientImage } from './ResilientImage';

interface EmployeesSectionProps {
  onOpenTeamPage: () => void;
  onOpenServicePage: (page: ServiceDivisionKey) => void;
  onEnquireRole: (serviceLabel: string) => void;
}

const FILTER_TABS: Array<{
  id: 'all' | EmployeeRole['department'];
  label: string;
}> = [
  { id: 'all', label: 'All' },
  { id: 'management', label: 'Management' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'cyber', label: 'Cyber' },
  { id: 'barber', label: 'Barber' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'carwash', label: 'Carwash' },
];

export function EmployeesSection({
  onOpenTeamPage,
  onOpenServicePage,
  onEnquireRole,
}: EmployeesSectionProps) {
  const [filter, setFilter] = useState<'all' | EmployeeRole['department']>('all');
  const [activeRoleId, setActiveRoleId] = useState<string>(EMPLOYEE_ROLES[0].id);
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);

  const visibleRoles =
    filter === 'all'
      ? EMPLOYEE_ROLES
      : EMPLOYEE_ROLES.filter((role) => role.department === filter);

  return (
    <section
      id="employees"
      className="py-20 lg:py-28 bg-white border-b border-zinc-200"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-zinc-200"
        >
          <div>
            <p className="text-xs font-semibold text-dodger-600">
              Team &amp; Daily Roles
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black text-balance">
              People at Every Bay.
            </h2>
          </div>

          <motion.button
            type="button"
            whileHover={{ x: 2, scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenTeamPage}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>Full Team &amp; Hours</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </motion.button>
        </motion.div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter employees by service bay"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-md bg-white border border-zinc-200"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`relative px-3 py-1.5 rounded-sm text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-white' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="home-team-filter-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-dodger-500 rounded-sm z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fluid Filterable Staff Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-start"
        >
          <AnimatePresence mode="popLayout">
            {visibleRoles.map((role, idx) => {
              const isExpanded = activeRoleId === role.id;
              const isHovered = hoveredRoleId === role.id;

              return (
                <motion.article
                  key={role.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredRoleId(role.id)}
                  onMouseLeave={() => setHoveredRoleId((prev) => (prev === role.id ? null : prev))}
                  className={`rounded-lg border bg-white overflow-hidden transition-colors duration-200 flex flex-col ${
                    isExpanded || isHovered ? 'border-dodger-500 shadow-sm' : 'border-zinc-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveRoleId((prev) => (prev === role.id ? '' : role.id))}
                    aria-expanded={isExpanded}
                    className="relative w-full text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-500"
                  >
                    <ParallaxImageFrame
                      speed={idx % 2 === 0 ? 16 : -16}
                      delay={idx * 0.04}
                      className="aspect-[4/3] bg-black border-b border-zinc-200"
                    >
                      <ResilientImage
                        src={role.image.src}
                        alt={role.image.alt}
                        fallbackTitle={role.title}
                        fallbackSubtitle={role.departmentLabel}
                        className="w-full h-full object-cover object-top"
                      />

                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity duration-200 flex flex-col justify-end p-4 ${
                          isHovered || isExpanded ? 'opacity-100' : 'opacity-80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-dodger-400">
                          <span>{role.departmentLabel}</span>
                          <span className="text-white/90 group-hover:text-dodger-300 transition-colors">
                            {isExpanded ? 'Hide' : 'Duties ↓'}
                          </span>
                        </div>
                        <motion.p
                          initial={false}
                          animate={{
                            opacity: isHovered ? 1 : 0.9,
                            y: isHovered ? 0 : 2,
                          }}
                          transition={{ duration: 0.2 }}
                          className="mt-1 text-xs font-medium text-white line-clamp-1"
                        >
                          {role.responsibilities[0]}
                        </motion.p>
                      </div>
                    </ParallaxImageFrame>
                  </button>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-black leading-snug">
                          {role.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-zinc-500">{role.customerTouchpoint}</p>
                      </div>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Toggle duties for ${role.title}`}
                        onClick={() =>
                          setActiveRoleId((prev) => (prev === role.id ? '' : role.id))
                        }
                        className="w-7 h-7 rounded-md border border-dodger-200 hover:border-dodger-500 flex items-center justify-center text-dodger-600 shrink-0 cursor-pointer"
                      >
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        >
                          <ChevronDown className="w-4 h-4" aria-hidden="true" />
                        </motion.span>
                      </motion.button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="pt-3 border-t border-dodger-100 space-y-1.5 text-xs text-zinc-700">
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
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="pt-2.5 border-t border-dodger-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onEnquireRole(`General Enquiry — ${role.title}`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 cursor-pointer"
                      >
                        <span>Contact</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      {role.servicePage ? (
                        <button
                          type="button"
                          onClick={() => onOpenServicePage(role.servicePage!)}
                          className="text-xs font-medium text-zinc-600 hover:text-dodger-700 transition-colors cursor-pointer"
                        >
                          Bay Page →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onOpenTeamPage}
                          className="text-xs font-medium text-zinc-600 hover:text-dodger-700 transition-colors cursor-pointer"
                        >
                          Roster →
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
