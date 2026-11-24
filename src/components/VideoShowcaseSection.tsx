import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, PROMO_VIDEO, buildWhatsAppUrl } from '../data/hubData';

interface VideoShowcaseSectionProps {
  onOpenGalleryPage?: () => void;
}

export function VideoShowcaseSection({ onOpenGalleryPage }: VideoShowcaseSectionProps) {
  return (
    <section
      id="video"
      className="py-20 lg:py-28 bg-slate-950 text-white border-b border-sky-900/50"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-slate-800"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-sky-400">
              Chapter 01 · Inside Junction-Kodoyo
            </p>
            <h2 className="mt-2.5 text-2xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Welcome to The Junction Business Hub.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Before exploring each department below, watch our video introduction from{' '}
              {BUSINESS_INFO.locationShort} along the Homa Bay–Rongo Road—where laundry, digital
              cyber work, barber grooming, Junction Highway Hotel, and carwash services meet in one
              stop.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={buildWhatsAppUrl(
                'Hello The Junction Hub, I just watched your video tour and would like to enquire.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </motion.a>

            {onOpenGalleryPage && (
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenGalleryPage}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-white border border-slate-700 hover:border-sky-400 hover:text-sky-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Open Photo Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.9, y: 20, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <div className="w-full aspect-video border-2 border-sky-500/70 bg-black shadow-2xl overflow-hidden">
            <iframe
              width="830"
              height="467"
              src={PROMO_VIDEO.src}
              title={PROMO_VIDEO.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              Homa Bay Town · Junction-Kodoyo Corridor · Telephone:{' '}
              <a
                href={BUSINESS_INFO.phoneHref}
                className="text-sky-300 font-mono hover:underline"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </p>
            <a
              href="#laundry"
              className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white font-medium transition-colors"
            >
              <span>Continue story below</span>
              <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
