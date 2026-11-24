import { BUSINESS_INFO } from '../data/hubData';
import { AppPage } from './Navbar';

interface FooterProps {
  onNavigatePage: (page: AppPage, sectionId?: string) => void;
}

export function Footer({ onNavigatePage }: FooterProps) {
  return (
    <footer className="bg-white text-zinc-600 border-t border-dodger-200/70">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-dodger-200/70">
          <div className="md:col-span-4">
            <p className="text-sm font-semibold text-dodger-950">{BUSINESS_INFO.fullName}</p>
            <p className="mt-1.5 text-xs text-zinc-600">
              {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference}
            </p>
            <p className="mt-2.5 text-xs font-mono text-dodger-700 tabular-nums">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="hover:text-dodger-900 underline underline-offset-4"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold text-dodger-600">Services</p>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('laundry')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Laundry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('cyber')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Cyber Café
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('barber')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Barber
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('hotel')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Highway Hotel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('carwash')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Carwash
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold text-dodger-600">Hub</p>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('gallery')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('team')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Team &amp; Roles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('home', 'contact')}
                  className="hover:text-dodger-700 transition-colors cursor-pointer"
                >
                  Contact &amp; Map
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-dodger-600">Note</p>
            <p className="mt-2.5 text-xs text-zinc-600 leading-relaxed">
              Rates, menus, Saturday hours, and named staff roles are confirmed directly via{' '}
              {BUSINESS_INFO.phoneDisplay}.
            </p>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.fullName}.
          </p>
          <p>{BUSINESS_INFO.county}</p>
        </div>
      </div>
    </footer>
  );
}
