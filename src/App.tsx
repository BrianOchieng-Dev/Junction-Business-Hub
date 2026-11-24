/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AboutWhySection } from './components/AboutWhySection';
import { BarberHotelSection } from './components/BarberHotelSection';
import { CarwashSection } from './components/CarwashSection';
import { ContactSection } from './components/ContactSection';
import { CyberSection } from './components/CyberSection';
import { EmployeesSection } from './components/EmployeesSection';
import { ScrollProgressRule } from './components/FluidVisual';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { LaundrySection } from './components/LaundrySection';
import { AppPage, Navbar } from './components/Navbar';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { GooglePlaceProvider } from './context/GooglePlaceContext';
import { ServiceDivisionKey } from './data/hubData';
import { EmployeesPage } from './pages/EmployeesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';

function resolvePageFromHash(hash: string): AppPage {
  if (hash === '#/laundry') return 'laundry';
  if (hash === '#/cyber') return 'cyber';
  if (hash === '#/barber') return 'barber';
  if (hash === '#/hotel') return 'hotel';
  if (hash === '#/carwash') return 'carwash';
  if (hash === '#/gallery') return 'gallery';
  if (hash === '#/team') return 'team';
  return 'home';
}

function isServiceDivisionPage(page: AppPage): page is ServiceDivisionKey {
  return (
    page === 'laundry' ||
    page === 'cyber' ||
    page === 'barber' ||
    page === 'hotel' ||
    page === 'carwash'
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    resolvePageFromHash(window.location.hash)
  );
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(resolvePageFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl;
  }, []);

  const navigatePage = useCallback((page: AppPage, sectionId?: string) => {
    setCurrentPage(page);

    if (page !== 'home') {
      window.location.hash = `#/${page}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = sectionId || 'top';
    window.location.hash = `#${targetId}`;
    requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }, []);

  const scrollToContact = useCallback(
    (serviceName?: string) => {
      if (serviceName) {
        setPreselectedService(serviceName);
      }
      navigatePage('home', 'contact');
    },
    [navigatePage]
  );

  return (
    <MotionConfig reducedMotion="user">
      <GooglePlaceProvider>
        <div className="min-h-screen flex flex-col bg-white text-black">
          <ScrollProgressRule />

          {mapsQuotaExceeded && (
            <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
              <span>
                Google Maps Platform quota reached. If you are the app owner, visit{' '}
                <a
                  href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-amber-950 hover:text-amber-800"
                >
                  maps developer site
                </a>{' '}
                for instructions to update your account.
              </span>
            </div>
          )}

          <Navbar currentPage={currentPage} onNavigatePage={navigatePage} />

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                {isServiceDivisionPage(currentPage) && (
                  <ServiceDetailPage
                    divisionKey={currentPage}
                    onNavigatePage={navigatePage}
                    onEnquireService={(label) => scrollToContact(label)}
                  />
                )}

                {currentPage === 'gallery' && (
                  <GalleryPage onNavigateHome={(sec) => navigatePage('home', sec)} />
                )}

                {currentPage === 'team' && (
                  <EmployeesPage
                    onNavigateHome={(sec) => navigatePage('home', sec)}
                    onEnquireRole={(label) => scrollToContact(label)}
                  />
                )}

                {currentPage === 'home' && (
                  <>
                    <HeroSection
                      onEnquireClick={() => scrollToContact()}
                      onOpenServicePage={(page) => navigatePage(page)}
                    />
                    <VideoShowcaseSection onOpenGalleryPage={() => navigatePage('gallery')} />
                    <LaundrySection
                      onSelectServiceForEnquiry={(name) => scrollToContact(name)}
                      onOpenLaundryPage={() => navigatePage('laundry')}
                    />
                    <CyberSection
                      onSelectServiceForEnquiry={(name) => scrollToContact(name)}
                      onOpenCyberPage={() => navigatePage('cyber')}
                    />
                    <BarberHotelSection
                      onOpenServicePage={(page) => navigatePage(page)}
                      onSelectServiceForEnquiry={(name) => scrollToContact(name)}
                    />
                    <CarwashSection
                      onOpenCarwashPage={() => navigatePage('carwash')}
                      onSelectServiceForEnquiry={(name) => scrollToContact(name)}
                    />
                    <AboutWhySection onOpenTeamPage={() => navigatePage('team')} />
                    <EmployeesSection
                      onOpenTeamPage={() => navigatePage('team')}
                      onOpenServicePage={(page) => navigatePage(page)}
                      onEnquireRole={(label) => scrollToContact(label)}
                    />
                    <GallerySection onOpenGalleryPage={() => navigatePage('gallery')} />
                    <ContactSection preselectedService={preselectedService} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onNavigatePage={navigatePage} />
        </div>
      </GooglePlaceProvider>
    </MotionConfig>
  );
}
