import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 text-zinc-700 p-6 text-center ${className}`}
      >
        <div className="w-10 h-10 bg-white border border-zinc-200 rounded-md flex items-center justify-center mb-3 text-zinc-700">
          <ImageOff className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="font-semibold text-sm text-zinc-900">{fallbackTitle}</p>
        {fallbackSubtitle && (
          <p className="text-xs text-zinc-500 mt-1 max-w-xs">{fallbackSubtitle}</p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
