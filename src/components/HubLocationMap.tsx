/// <reference types="google.maps" />
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, Navigation, RotateCcw } from 'lucide-react';
import { useGooglePlace } from '../context/GooglePlaceContext';
import { BUSINESS_INFO } from '../data/hubData';

interface RouteSummary {
  originLabel: string;
  distanceKm: string;
  durationMins: number;
}

function isQuotaError(err: unknown): boolean {
  const text = err instanceof Error ? err.message : String(err);
  return (
    text.includes('429') ||
    text.includes('RESOURCE_EXHAUSTED') ||
    text.includes('OVER_QUERY_LIMIT') ||
    text.includes('QuotaExceededError')
  );
}

function RouteController({
  destination,
  selectedOrigin,
  onRouteResult,
  onRouteError,
}: {
  destination: google.maps.LatLngLiteral;
  selectedOrigin: { label: string; query: string } | null;
  onRouteResult: (summary: RouteSummary | null) => void;
  onRouteError: (msg: string | null) => void;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
    onRouteResult(null);
    onRouteError(null);

    if (!routesLib || !map || !selectedOrigin) return;

    let cancelled = false;

    const request = {
      origin: selectedOrigin.query,
      destination,
      travelMode: 'DRIVING',
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
    };

    // Uses modern Routes API SDK wrapper (Route.computeRoutes) via useMapsLibrary('routes')
    (routesLib.Route as unknown as {
      computeRoutes: (req: typeof request) => Promise<{
        routes?: Array<{
          distanceMeters?: number;
          durationMillis?: number;
          viewport?: google.maps.LatLngBounds;
          createPolylines: () => google.maps.Polyline[];
        }>;
      }>;
    })
      .computeRoutes(request)
      .then((response) => {
        if (cancelled) return;
        const primaryRoute = response?.routes?.[0];
        if (!primaryRoute) {
          onRouteError('Could not calculate a driving route right now.');
          return;
        }

        const newPolylines = primaryRoute.createPolylines();
        newPolylines.forEach((polyline) => {
          polyline.setOptions({
            strokeColor: '#1E90FF',
            strokeWeight: 5,
            strokeOpacity: 0.92,
          });
          polyline.setMap(map);
        });
        polylinesRef.current = newPolylines;

        if (primaryRoute.viewport) {
          map.fitBounds(primaryRoute.viewport, 48);
        }

        const distanceKm = ((primaryRoute.distanceMeters ?? 0) / 1000).toFixed(1);
        const durationMins = Math.max(1, Math.round((primaryRoute.durationMillis ?? 0) / 60000));

        onRouteResult({
          originLabel: selectedOrigin.label,
          distanceKm,
          durationMins,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onRouteError('Route preview unavailable. Open Google Maps for live turn-by-turn directions.');
      });

    return () => {
      cancelled = true;
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, [routesLib, map, destination, selectedOrigin, onRouteResult, onRouteError]);

  return null;
}

function InteractiveMapInner({
  location,
  displayName,
  formattedAddress,
  googleMapsURI,
}: {
  location: google.maps.LatLngLiteral;
  displayName: string;
  formattedAddress: string;
  googleMapsURI: string;
}) {
  const map = useMap();
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [selectedOrigin, setSelectedOrigin] = useState<{ label: string; query: string } | null>(
    null
  );
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);

  const handleResetView = useCallback(() => {
    setSelectedOrigin(null);
    setRouteSummary(null);
    setRouteError(null);
    if (map) {
      map.setCenter(location);
      map.setZoom(14);
    }
  }, [map, location]);

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

  return (
    <div className="space-y-3">
      <div className="h-[380px] sm:h-[420px] w-full overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <GoogleMap
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          defaultCenter={location}
          defaultZoom={14}
          gestureHandling="cooperative"
          mapTypeControl={false}
          streetViewControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <AdvancedMarker
            ref={markerRef}
            position={location}
            title={displayName}
            onClick={() => setInfoOpen(true)}
          >
            <Pin background="#1E90FF" borderColor="#0E60B5" glyphColor="#ffffff" />
          </AdvancedMarker>

          {infoOpen && marker && (
            <InfoWindow
              anchor={marker}
              maxWidth={260}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div className="p-1 text-zinc-900">
                <p className="font-semibold text-xs">{displayName}</p>
                <p className="text-xs text-zinc-600 mt-1">
                  {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference}
                </p>
                <p className="text-xs text-zinc-500 mt-1">{formattedAddress}</p>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-dodger-600 underline underline-offset-2"
                >
                  <span>Directions in Google Maps</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </InfoWindow>
          )}

          <RouteController
            destination={location}
            selectedOrigin={selectedOrigin}
            onRouteResult={setRouteSummary}
            onRouteError={setRouteError}
          />
        </GoogleMap>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-b border-zinc-200 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-500 mr-1 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-dodger-500" aria-hidden="true" />
            Route:
          </span>
          <button
            type="button"
            onClick={() =>
              setSelectedOrigin({ label: 'Homa Bay Town', query: 'Homa Bay Town, Kenya' })
            }
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              selectedOrigin?.label === 'Homa Bay Town'
                ? 'bg-dodger-500 text-white border-dodger-500'
                : 'bg-white text-black border-zinc-200 hover:border-dodger-500'
            }`}
          >
            From Homa Bay
          </button>
          <button
            type="button"
            onClick={() =>
              setSelectedOrigin({ label: 'Rongo Town', query: 'Rongo Town, Kenya' })
            }
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              selectedOrigin?.label === 'Rongo Town'
                ? 'bg-dodger-500 text-white border-dodger-500'
                : 'bg-white text-black border-zinc-200 hover:border-dodger-500'
            }`}
          >
            From Rongo
          </button>
          {selectedOrigin && (
            <button
              type="button"
              onClick={handleResetView}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-500 hover:text-dodger-600 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <a
          href={googleMapsURI || directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-dodger-600 hover:text-dodger-800 underline underline-offset-4 whitespace-nowrap"
        >
          <span>Open Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      {routeSummary && (
        <div className="text-xs text-dodger-950 bg-dodger-50 border border-dodger-200 rounded-md px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>
            Drive from <strong className="font-semibold">{routeSummary.originLabel}</strong>
          </span>
          <span className="font-mono tabular-nums font-semibold text-dodger-700">
            {routeSummary.distanceKm} km · ~{routeSummary.durationMins} mins
          </span>
        </div>
      )}

      {routeError && (
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3.5 py-2.5">
          {routeError}
        </p>
      )}
    </div>
  );
}

export function HubLocationMap() {
  const { status, place } = useGooglePlace();

  if (status === 'loading') {
    return (
      <div className="h-[380px] sm:h-[420px] w-full rounded-lg border border-zinc-200 bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-6 h-6 rounded-full border-2 border-dodger-500 border-t-transparent animate-spin mb-3" />
        <p className="text-xs font-medium text-zinc-600">
          Locating Junction-Kodoyo on Google Maps...
        </p>
      </div>
    );
  }

  if (status !== 'ready' || !place) {
    return (
      <div className="h-[380px] sm:h-[420px] w-full rounded-lg border border-zinc-200 bg-white p-6 flex flex-col items-center justify-center text-center">
        <MapPin className="w-6 h-6 text-dodger-500 mb-3" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-black">{BUSINESS_INFO.fullName}</h3>
        <p className="mt-1 text-xs text-zinc-600 max-w-sm">
          {BUSINESS_INFO.locationShort} · {BUSINESS_INFO.locationReference}, {BUSINESS_INFO.county}
        </p>
        <a
          href={BUSINESS_INFO.mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-dodger-500 hover:bg-dodger-600 rounded-md transition-colors"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <InteractiveMapInner
      location={place.location}
      displayName={place.displayName}
      formattedAddress={place.formattedAddress}
      googleMapsURI={place.googleMapsURI}
    />
  );
}
