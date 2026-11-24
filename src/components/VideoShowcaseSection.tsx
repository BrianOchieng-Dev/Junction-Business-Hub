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
      className="py-16 lg:py-24 bg-slate-950 text-white border-b border-dodger-900/50"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-slate-800"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-dodger-400">
              01 · Video Tour · {BUSINESS_INFO.locationShort}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              Welcome to The Junction Hub.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={buildWhatsAppUrl(
                'Hello The Junction Hub, I just watched your video tour and would like to enquire.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </motion.a>

            {onOpenGalleryPage && (
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenGalleryPage}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold text-white border border-slate-700 hover:border-dodger-400 hover:text-dodger-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.9, y: 20, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <div className="w-full aspect-video rounded-lg border-2 border-dodger-500/80 bg-black shadow-2xl overflow-hidden">
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

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <a href={BUSINESS_INFO.phoneHref} className="text-dodger-400 font-mono hover:underline">
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <a
              href="#laundry"
              className="inline-flex items-center gap-1.5 text-dodger-300 hover:text-white font-medium transition-colors"
            >
              <span>Explore services</span>
              <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
