import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-dodger-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => handleLinkClick('home', 'top')}
          className="text-base font-bold tracking-tight text-dodger-900 hover:text-dodger-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600"
        >
          {BUSINESS_INFO.shortName}
        </button>

        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7 text-sm">
          <button
            type="button"
            onClick={() => handleLinkClick('home', 'top')}
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
              currentPage === 'home'
                ? 'text-dodger-600 font-semibold border-dodger-500'
                : 'text-zinc-600 hover:text-dodger-600 border-transparent'
            }`}
          >
            Home
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 transition-colors duration-150 whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
                isServicePage
                  ? 'text-dodger-600 font-semibold border-dodger-500'
                  : 'text-zinc-600 hover:text-dodger-600 border-transparent'
              }`}
            >
              <span>Services</span>
              <motion.span
                animate={{ rotate: servicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.span>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 mt-3 w-72 bg-white border border-dodger-200 rounded-lg shadow-lg p-1.5 z-50"
                >
                  {SERVICE_KEYS.map((key) => {
                    const div = SERVICE_DIVISIONS[key];
                    const active = currentPage === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="menuitem"
                        onClick={() => handleLinkClick(key)}
                        className={`w-full text-left px-3 py-2.5 rounded-md transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                          active
                            ? 'bg-dodger-50 text-dodger-900'
                            : 'hover:bg-dodger-50/80 text-zinc-800'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-zinc-950">{div.title}</p>
                          <p className="text-[11px] text-zinc-500 mt-0.5">{div.shortTitle}</p>
                        </div>
                        <span className="text-[11px] font-mono text-dodger-600">
                          {div.number}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('gallery')}
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
              currentPage === 'gallery'
                ? 'text-dodger-600 font-semibold border-dodger-500'
                : 'text-zinc-600 hover:text-dodger-600 border-transparent'
            }`}
          >
            Gallery
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('team')}
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600 ${
              currentPage === 'team'
                ? 'text-dodger-600 font-semibold border-dodger-500'
                : 'text-zinc-600 hover:text-dodger-600 border-transparent'
            }`}
          >
            Team
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('home', 'contact')}
            className="text-zinc-600 hover:text-dodger-600 border-b-2 border-transparent transition-colors duration-150 whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dodger-600"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('home', 'contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-dodger-600 hover:bg-dodger-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dodger-600 min-h-[38px]"
          >
            Enquire Now
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-dodger-200 text-dodger-900 hover:bg-dodger-50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
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
                    {SERVICE_DIVISIONS[key].number} · {SERVICE_DIVISIONS[key].title}
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
                className="w-full py-2.5 px-4 rounded-md text-sm font-semibold text-white bg-dodger-600 hover:bg-dodger-700 transition-colors cursor-pointer"
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
