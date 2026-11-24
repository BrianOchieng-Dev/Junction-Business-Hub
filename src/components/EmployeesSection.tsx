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
  { id: 'all', label: 'All Team Roles' },
  { id: 'management', label: 'Management' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'cyber', label: 'Cyber Café' },
  { id: 'barber', label: 'Barber' },
  { id: 'hotel', label: 'Highway Hotel' },
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
      className="py-20 lg:py-28 bg-sky-50/40 border-b border-sky-200"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-sky-200"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-sky-700">
              Chapter 07 · People Behind Every Bay · Employees &amp; What They Do
            </p>
            <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
              Meet the operational roles running our five service hubs.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Hover over any team member visual to preview their station focus, or click to inspect
              their full daily duties across Laundry, Cyber Café, Barber Shop, Junction Highway Hotel,
              and Carwash.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.985 }}
            onClick={onOpenTeamPage}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <span>Open Full Team &amp; Hours Page</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </motion.button>
        </motion.div>

        {/* Department Filter Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter employees by service bay"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-sky-200"
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
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-white' : 'text-zinc-600 hover:text-sky-800'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="home-team-filter-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-sky-700 z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-zinc-500">
            Illustrative MVP role directory · Named staff confirmed by management
          </p>
        </div>

        {/* Visual Animated Employee Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-start">
          {visibleRoles.map((role, idx) => {
            const isExpanded = activeRoleId === role.id;
            const isHovered = hoveredRoleId === role.id;

            return (
              <motion.article
                key={role.id}
                initial={{ opacity: 0.9, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredRoleId(role.id)}
                onMouseLeave={() => setHoveredRoleId((prev) => (prev === role.id ? null : prev))}
                className={`border bg-white transition-colors duration-200 flex flex-col ${
                  isExpanded || isHovered ? 'border-sky-600 shadow-sm' : 'border-sky-200'
                }`}
              >
                {/* Interactive Scroll-Parallax + Hover-Reveal Photo Header */}
                <button
                  type="button"
                  onClick={() => setActiveRoleId((prev) => (prev === role.id ? '' : role.id))}
                  aria-expanded={isExpanded}
                  className="relative w-full text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                >
                  <ParallaxImageFrame
                    speed={idx % 2 === 0 ? 16 : -16}
                    delay={idx * 0.04}
                    className="aspect-[4/3] bg-slate-900 border-b border-sky-200"
                  >
                    <ResilientImage
                      src={role.image.src}
                      alt={role.image.alt}
                      fallbackTitle={role.title}
                      fallbackSubtitle={role.departmentLabel}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Scrim + Hover Action Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent transition-opacity duration-200 flex flex-col justify-end p-4 ${
                        isHovered || isExpanded ? 'opacity-100' : 'opacity-85'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-sky-300">
                        <span>
                          {role.code} · {role.departmentLabel}
                        </span>
                        <span className="text-white/90 group-hover:text-sky-200 transition-colors">
                          {isExpanded ? 'Hide duties' : 'Click to inspect'}
                        </span>
                      </div>

                      {/* Hover reveal duty spotlight */}
                      <motion.p
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0.9,
                          y: isHovered ? 0 : 2,
                        }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 text-xs font-medium text-white line-clamp-2"
                      >
                        {role.responsibilities[0]}
                      </motion.p>
                    </div>
                  </ParallaxImageFrame>
                </button>

                {/* Role Title, Summary & Click-to-Expand Duties */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-zinc-950 leading-snug">
                        {role.title}
                      </h3>
                      <button
                        type="button"
                        aria-label={`Toggle duties for ${role.title}`}
                        onClick={() =>
                          setActiveRoleId((prev) => (prev === role.id ? '' : role.id))
                        }
                        className="w-7 h-7 border border-sky-200 hover:border-sky-600 flex items-center justify-center text-sky-700 shrink-0 cursor-pointer"
                      >
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" aria-hidden="true" />
                        </motion.span>
                      </button>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {role.summary}
                    </p>
                  </div>

                  {/* Expandable "What They Do" Responsibilities */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-sky-100 space-y-3">
                          <p className="text-xs font-semibold text-sky-800">What they do daily</p>
                          <ul className="space-y-2 text-xs text-zinc-700">
                            {role.responsibilities.map((duty) => (
                              <li key={duty} className="flex items-start gap-2">
                                <Check
                                  className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                                <span>{duty}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-[11px] text-zinc-500 pt-1">
                            Station: <span className="text-zinc-800">{role.customerTouchpoint}</span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Card Actions */}
                  <div className="pt-3 border-t border-sky-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onEnquireRole(`General Enquiry — ${role.title}`)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 cursor-pointer"
                    >
                      <span>Contact Desk</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    {role.servicePage ? (
                      <button
                        type="button"
                        onClick={() => onOpenServicePage(role.servicePage!)}
                        className="text-xs font-medium text-zinc-600 hover:text-sky-800 transition-colors cursor-pointer"
                      >
                        View Service Page →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenTeamPage}
                        className="text-xs font-medium text-zinc-600 hover:text-sky-800 transition-colors cursor-pointer"
                      >
                        Hours &amp; Roster →
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
