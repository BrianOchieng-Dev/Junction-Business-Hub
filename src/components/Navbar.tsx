import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS_INFO, SERVICE_DIVISIONS, ServiceDivisionKey } from '../data/hubData';

export type AppPage = 'home' | ServiceDivisionKey | 'gallery' | 'team';

interface NavbarProps {
  currentPage: AppPage;
  onNavigatePage: (page: AppPage, sectionId?: string) => void;
}

const SERVICE_KEYS: ServiceDivisionKey[] = ['laundry', 'cyber', 'barber', 'hotel', 'carwash'];

export function Navbar({ currentPage, onNavigatePage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isServicePage =
    currentPage === 'laundry' ||
    currentPage === 'cyber' ||
    currentPage === 'barber' ||
    currentPage === 'hotel' ||
    currentPage === 'carwash';

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleLinkClick = (page: AppPage, sectionId?: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    onNavigatePage(page, sectionId);
  };

  const activeNavKey = isServicePage ? 'services' : currentPage;
  const indicatorKey = hoveredNav ?? activeNavKey;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <motion.button
          type="button"
          whileHover={{ x: 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleLinkClick('home', 'top')}
          className="text-base font-bold tracking-tight text-black hover:text-dodger-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-500"
        >
          {BUSINESS_INFO.shortName}
        </motion.button>

        <nav
          aria-label="Primary Navigation"
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden md:flex items-center gap-7 text-sm"
        >
          <button
            type="button"
            onMouseEnter={() => setHoveredNav('home')}
            onClick={() => handleLinkClick('home', 'top')}
            className={`relative transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
              currentPage === 'home'
                ? 'text-dodger-600 font-semibold'
                : 'text-zinc-600 hover:text-dodger-600'
            }`}
          >
            <span>Home</span>
            {indicatorKey === 'home' && (
              <motion.span
                layoutId="navbar-active-indicator"
                transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-dodger-500"
              />
            )}
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onMouseEnter={() => setHoveredNav('services')}
              onClick={() => setServicesOpen((prev) => !prev)}
              className={`relative inline-flex items-center gap-1 transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
                isServicePage || servicesOpen
                  ? 'text-dodger-600 font-semibold'
                  : 'text-zinc-600 hover:text-dodger-600'
              }`}
            >
              <span>Services</span>
              <motion.span
                animate={{ rotate: servicesOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.span>
              {indicatorKey === 'services' && (
                <motion.span
                  layoutId="navbar-active-indicator"
                  transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-dodger-500"
                />
              )}
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 mt-3 w-72 bg-white border border-dodger-200 rounded-lg shadow-xl p-1.5 z-50"
                >
                  {SERVICE_KEYS.map((key, idx) => {
                    const div = SERVICE_DIVISIONS[key];
                    const active = currentPage === key;
                    return (
                      <motion.button
                        key={key}
                        type="button"
                        role="menuitem"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.16, delay: idx * 0.025 }}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleLinkClick(key)}
                        className={`group w-full text-left px-3 py-2.5 rounded-md transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                          active
                            ? 'bg-dodger-50 text-black'
                            : 'hover:bg-zinc-50 text-black'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-black group-hover:text-dodger-600 transition-colors">
                            {div.title}
                          </p>
                          <p className="text-[11px] text-zinc-500 mt-0.5">{div.shortTitle}</p>
                        </div>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-all duration-150 ${
                            active
                              ? 'text-dodger-600 opacity-100'
                              : 'text-dodger-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                          }`}
                          aria-hidden="true"
                        />
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onMouseEnter={() => setHoveredNav('gallery')}
            onClick={() => handleLinkClick('gallery')}
            className={`relative transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
              currentPage === 'gallery'
                ? 'text-dodger-600 font-semibold'
                : 'text-zinc-600 hover:text-dodger-600'
            }`}
          >
            <span>Gallery</span>
            {indicatorKey === 'gallery' && (
              <motion.span
                layoutId="navbar-active-indicator"
                transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-dodger-500"
              />
            )}
          </button>

          <button
            type="button"
            onMouseEnter={() => setHoveredNav('team')}
            onClick={() => handleLinkClick('team')}
            className={`relative transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
              currentPage === 'team'
                ? 'text-dodger-600 font-semibold'
                : 'text-zinc-600 hover:text-dodger-600'
            }`}
          >
            <span>Team</span>
            {indicatorKey === 'team' && (
              <motion.span
                layoutId="navbar-active-indicator"
                transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-dodger-500"
              />
            )}
          </button>

          <button
            type="button"
            onMouseEnter={() => setHoveredNav('contact')}
            onClick={() => handleLinkClick('home', 'contact')}
            className="relative text-zinc-600 hover:text-dodger-600 transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600"
          >
            <span>Contact</span>
            {indicatorKey === 'contact' && (
              <motion.span
                layoutId="navbar-active-indicator"
                transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-dodger-500"
              />
            )}
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleLinkClick('home', 'contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-500 min-h-[38px]"
          >
            Enquire Now
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-zinc-200 text-black hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.14 }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-dodger-100 bg-white px-5 py-4 space-y-2 overflow-hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              <button
                type="button"
                onClick={() => handleLinkClick('home', 'top')}
                className="text-left px-2 py-2.5 text-sm font-medium text-zinc-800 hover:text-dodger-600 cursor-pointer"
              >
                Home
              </button>

              <div className="pl-3 border-l border-dodger-200 space-y-1 my-1">
                {SERVICE_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleLinkClick(key)}
                    className={`block w-full text-left px-2 py-2 text-xs font-medium cursor-pointer ${
                      currentPage === key
                        ? 'text-dodger-600 font-semibold'
                        : 'text-zinc-600 hover:text-dodger-600'
                    }`}
                  >
                    {SERVICE_DIVISIONS[key].title}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleLinkClick('gallery')}
                className="text-left px-2 py-2.5 text-sm text-zinc-700 hover:text-dodger-600 cursor-pointer"
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('team')}
                className="text-left px-2 py-2.5 text-sm text-zinc-700 hover:text-dodger-600 cursor-pointer"
              >
                Team
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('home', 'contact')}
                className="text-left px-2 py-2.5 text-sm text-zinc-700 hover:text-dodger-600 cursor-pointer"
              >
                Contact
              </button>
            </nav>
            <div className="pt-3 border-t border-dodger-100">
              <button
                type="button"
                onClick={() => handleLinkClick('home', 'contact')}
                className="w-full py-2.5 px-4 rounded-md text-sm font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
