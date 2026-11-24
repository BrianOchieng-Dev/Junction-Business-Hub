import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SOCIAL_PROFILES, SocialProfile } from '../data/hubData';

export function SocialPlatformIcon({
  id,
  className = 'w-4 h-4',
}: {
  id: SocialProfile['id'];
  className?: string;
}) {
  if (id === 'tiktok') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.81a8.23 8.23 0 0 0 4.76 1.5V6.86a4.8 4.8 0 0 1-1-.17Z" />
      </svg>
    );
  }

  if (id === 'instagram') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

interface SocialCardsGridProps {
  variant?: 'light' | 'dark';
}

export function SocialProfilesStrip({ variant = 'light' }: SocialCardsGridProps) {
  const isDark = variant === 'dark';

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {SOCIAL_PROFILES.map((profile) => (
        <motion.a
          key={profile.id}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          aria-label={`${profile.name} — ${profile.handle}`}
          className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold border transition-colors whitespace-nowrap ${
            isDark
              ? 'bg-black text-white border-zinc-700 hover:border-dodger-500 hover:text-dodger-400'
              : 'bg-white text-black border-zinc-200 hover:border-dodger-500 hover:text-dodger-600'
          }`}
        >
          <SocialPlatformIcon
            id={profile.id}
            className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
              isDark ? 'text-dodger-400' : 'text-dodger-500'
            }`}
          />
          <span>{profile.name}</span>
          <ArrowUpRight
            className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            aria-hidden="true"
          />
        </motion.a>
      ))}
    </div>
  );
}
