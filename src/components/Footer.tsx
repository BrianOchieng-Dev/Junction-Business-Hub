import { BUSINESS_INFO } from '../data/hubData';
import { AppPage } from './Navbar';

interface FooterProps {
  onNavigatePage: (page: AppPage, sectionId?: string) => void;
}

export function Footer({ onNavigatePage }: FooterProps) {
  return (
    <footer className="bg-white text-zinc-600 border-t border-sky-200/70">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-sky-200/70">
          <div className="md:col-span-4">
            <p className="text-sm font-semibold text-sky-950">{BUSINESS_INFO.fullName}</p>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed max-w-sm">
              {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference},{' '}
              {BUSINESS_INFO.county}.
            </p>
            <p className="mt-3 text-xs font-mono text-sky-800 tabular-nums">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="hover:text-sky-950 underline underline-offset-4"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold text-sky-700">Service Pages</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('laundry')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Laundry Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('cyber')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Cyber Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('barber')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Barber Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('hotel')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Junction Highway Hotel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('carwash')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Carwash Services
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-semibold text-sky-700">Explore Hub</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('gallery')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Gallery Page
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('team')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Employees &amp; Roles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('home', 'contact')}
                  className="hover:text-sky-800 transition-colors cursor-pointer"
                >
                  Contact &amp; Map
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-sky-700">Information Note</p>
            <p className="mt-3 text-xs text-zinc-600 leading-relaxed">
              Specific rates, hotel menus, room availability, Saturday opening hours, and staff
              assignments are confirmed directly at Junction-Kodoyo or via{' '}
              {BUSINESS_INFO.phoneDisplay}. Sample scenarios and workspace previews are
              illustrative.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.fullName}.
          </p>
          <p>Junction-Kodoyo, Homa Bay County, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
