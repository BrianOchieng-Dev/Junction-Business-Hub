import { BUSINESS_INFO } from '../data/hubData';
import { AppPage } from './Navbar';
import { SocialProfilesStrip } from './SocialLinks';

interface FooterProps {
  onNavigatePage: (page: AppPage, sectionId?: string) => void;
}

export function Footer({ onNavigatePage }: FooterProps) {
  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-zinc-800">
          <div className="md:col-span-6 space-y-3">
            <div>
              <p className="text-sm font-semibold text-white">{BUSINESS_INFO.fullName}</p>
              <p className="mt-1.5 text-xs text-zinc-400">
                {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference}
              </p>
              <p className="mt-2.5 text-xs font-mono text-dodger-400 tabular-nums">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="hover:text-white underline underline-offset-4"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
            </div>
            <SocialProfilesStrip variant="dark" />
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-dodger-400">Services</p>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('laundry')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Laundry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('cyber')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cyber Café
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('barber')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Barber
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('hotel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Highway Hotel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('carwash')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Carwash
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-dodger-400">Hub</p>
            <ul className="mt-2.5 space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('team')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Team &amp; Roles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('home', 'contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Map
                </button>
              </li>
            </ul>
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
