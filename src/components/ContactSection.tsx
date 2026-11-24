import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import {
  BARBER_SERVICES,
  BUSINESS_INFO,
  CARWASH_SERVICES,
  CYBER_SERVICES,
  HOTEL_SERVICES,
  LAUNDRY_SERVICES,
  OPERATING_HOURS,
  buildWhatsAppUrl,
} from '../data/hubData';
import { HubLocationMap } from './HubLocationMap';

interface ContactSectionProps {
  preselectedService: string;
}

const BASE_SERVICE_OPTIONS = [
  'General Enquiry',
  ...LAUNDRY_SERVICES.map((s) => `Laundry — ${s.title}`),
  ...CYBER_SERVICES.map((s) => `Cyber Café — ${s.title}`),
  ...BARBER_SERVICES.map((s) => `Barber Services — ${s.title}`),
  ...HOTEL_SERVICES.map((s) => `Junction Highway Hotel — ${s.title}`),
  ...CARWASH_SERVICES.map((s) => `Carwash Services — ${s.title}`),
  'Multiple Hub Services',
  'Team & Staffing Enquiry',
];

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('General Enquiry');

  const serviceOptions =
    preselectedService && !BASE_SERVICE_OPTIONS.includes(preselectedService)
      ? [preselectedService, ...BASE_SERVICE_OPTIONS]
      : BASE_SERVICE_OPTIONS;
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    service: string;
    message: string;
  } | null>(null);

  const todayIndex = new Date().getDay();

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      setSubmittedData(null);
    }
  }, [preselectedService]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your name.');
      return;
    }

    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      setFormError('Please enter a valid phone or WhatsApp number.');
      return;
    }

    if (trimmedMessage.length < 5) {
      setFormError('Please share a brief note.');
      return;
    }

    setSubmittedData({
      name: trimmedName,
      phone: trimmedPhone,
      service,
      message: trimmedMessage,
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-dodger-50/40 border-b border-dodger-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0.9, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl pb-8 border-b border-dodger-200"
        >
          <p className="text-xs font-semibold text-dodger-600">10 · Location &amp; Contact</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 text-balance">
            Find us at Junction-Kodoyo.
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-8">
            <HubLocationMap />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
              <div>
                <p className="text-xs font-medium text-dodger-600">Address</p>
                <p className="mt-1 text-sm font-semibold text-zinc-950">
                  {BUSINESS_INFO.locationShort}
                </p>
                <p className="mt-0.5 text-xs text-zinc-600">
                  {BUSINESS_INFO.locationReference} · {BUSINESS_INFO.county}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-dodger-600">Telephone &amp; WhatsApp</p>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="mt-1 block text-sm font-semibold text-zinc-950 hover:text-dodger-600 font-mono tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
                <a
                  href={buildWhatsAppUrl(
                    'Hello The Junction Laundry And Services Hub, I have a question about your services.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="pt-5 border-t border-dodger-200">
              <div className="flex items-center justify-between gap-2 pb-2">
                <h3 className="text-xs font-semibold text-zinc-950">Operating Hours</h3>
                <span className="text-[11px] text-zinc-400">Subject to confirmation</span>
              </div>

              <dl className="divide-y divide-dodger-100 text-sm">
                {OPERATING_HOURS.map((row) => {
                  const isToday = row.dayIndex === todayIndex;
                  return (
                    <div
                      key={row.day}
                      className={`py-2 flex items-center justify-between gap-4 ${
                        isToday ? 'font-semibold text-zinc-950' : 'text-zinc-600'
                      }`}
                    >
                      <dt className="flex items-center gap-2 text-xs">
                        <span>{row.day}</span>
                        {isToday && <span className="text-xs text-dodger-600">· Today</span>}
                      </dt>
                      <dd
                        className={`font-mono tabular-nums text-xs text-right ${
                          row.confirmed ? '' : 'text-amber-700 font-sans'
                        }`}
                      >
                        {row.hours}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-lg border border-dodger-200 bg-white">
              <h3 className="text-lg font-semibold text-zinc-950">Quick Enquiry</h3>

              {submittedData ? (
                <div className="mt-5 p-5 rounded-md bg-dodger-50/50 border border-dodger-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-dodger-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-950">
                        Ready for {submittedData.name}
                      </h4>
                      <p className="mt-1 text-xs text-zinc-600">
                        Send directly via WhatsApp or call us.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-md bg-white border border-dodger-100 text-xs text-zinc-700 space-y-1">
                    <p>
                      <span className="font-medium text-zinc-950">Service:</span>{' '}
                      {submittedData.service}
                    </p>
                    <p>
                      <span className="font-medium text-zinc-950">Phone:</span>{' '}
                      {submittedData.phone}
                    </p>
                    <p>
                      <span className="font-medium text-zinc-950">Note:</span>{' '}
                      {submittedData.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={buildWhatsAppUrl(
                        `Hello The Junction Hub, my name is ${submittedData.name} (${submittedData.phone}). Service enquiry: ${submittedData.service}. Details: ${submittedData.message}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold text-white bg-dodger-600 hover:bg-dodger-700 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-medium text-dodger-900 bg-white border border-dodger-200 hover:bg-dodger-50 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Call</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedData(null);
                        setMessage('');
                      }}
                      className="text-xs text-zinc-500 hover:text-dodger-700 underline underline-offset-4 cursor-pointer px-1 py-2"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Grace Achieng"
                      required
                      className="w-full px-3.5 py-2.5 rounded-md text-sm bg-white border border-dodger-200 text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-dodger-500 focus:ring-2 focus:ring-dodger-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0712 345 678"
                      required
                      className="w-full px-3.5 py-2.5 rounded-md text-sm bg-white border border-dodger-200 text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-dodger-500 focus:ring-2 focus:ring-dodger-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-service"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Service
                    </label>
                    <select
                      id="enquiry-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md text-sm bg-white border border-dodger-200 text-zinc-950 focus:outline-none focus:border-dodger-500 focus:ring-2 focus:ring-dodger-500/20"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs font-medium text-zinc-700 mb-1.5"
                    >
                      Note
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Brief details..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-md text-sm bg-white border border-dodger-200 text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-dodger-500 focus:ring-2 focus:ring-dodger-500/20"
                    />
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2"
                    >
                      {formError}
                    </p>
                  )}

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-md text-xs sm:text-sm font-semibold text-white bg-dodger-600 hover:bg-dodger-700 transition-colors cursor-pointer min-h-[44px]"
                    >
                      Prepare Enquiry
                    </motion.button>

                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="text-xs font-mono text-dodger-700 hover:underline"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
