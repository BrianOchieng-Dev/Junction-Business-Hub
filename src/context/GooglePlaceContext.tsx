/// <reference types="google.maps" />
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  APILoadingStatus,
  APIProvider,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { BUSINESS_INFO } from '../data/hubData';

export interface GooglePhotoAttribution {
  displayName: string;
  uri: string | null;
}

export interface GooglePlacePhotoItem {
  id: string;
  url: string;
  thumbnailUrl: string;
  attributions: GooglePhotoAttribution[];
}

export interface GooglePlaceData {
  location: google.maps.LatLngLiteral;
  displayName: string;
  formattedAddress: string;
  googleMapsURI: string;
  matchedBusinessListing: boolean;
}

interface GooglePlaceContextValue {
  status: 'loading' | 'ready' | 'error' | 'unavailable';
  place: GooglePlaceData | null;
  photos: GooglePlacePhotoItem[];
}

const DEFAULT_VALUE: GooglePlaceContextValue = {
  status: 'unavailable',
  place: null,
  photos: [],
};

const GooglePlaceContext = createContext<GooglePlaceContextValue>(DEFAULT_VALUE);

function isQuotaError(err: unknown): boolean {
  const text = err instanceof Error ? err.message : String(err);
  return (
    text.includes('429') ||
    text.includes('RESOURCE_EXHAUSTED') ||
    text.includes('OVER_QUERY_LIMIT') ||
    text.includes('QuotaExceededError')
  );
}

function GooglePlaceLoader({ children }: { children: ReactNode }) {
  const apiStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');

  const [state, setState] = useState<GooglePlaceContextValue>({
    status: 'loading',
    place: null,
    photos: [],
  });

  useEffect(() => {
    if (apiStatus === APILoadingStatus.FAILED || apiStatus === APILoadingStatus.AUTH_FAILURE) {
      setState({ status: 'error', place: null, photos: [] });
      return;
    }
    if (!placesLib) return;

    let cancelled = false;

    const searchQueries: Array<{ query: string; isBusinessQuery: boolean }> = [
      {
        query: 'The Junction Laundry And Services Hub, Junction-Kodoyo, Homa Bay, Kenya',
        isBusinessQuery: true,
      },
      {
        query: 'The Junction Laundry And Services Hub, Homa Bay, Kenya',
        isBusinessQuery: true,
      },
      {
        query: 'Junction Kodoyo, Homa Bay, Kenya',
        isBusinessQuery: false,
      },
      {
        query: 'Homa Bay, Kenya',
        isBusinessQuery: false,
      },
    ];

    async function loadGoogleBusinessProfile() {
      let fallbackAreaPlace: GooglePlaceData | null = null;

      for (const item of searchQueries) {
        try {
          const { places } = await placesLib!.Place.searchByText({
            textQuery: item.query,
            fields: [
              'id',
              'displayName',
              'formattedAddress',
              'location',
              'photos',
              'googleMapsURI',
            ],
            maxResultCount: 1,
          });

          const match = places?.[0];
          if (!match || !match.location) continue;

          const resolvedPlace: GooglePlaceData = {
            location: {
              lat: match.location.lat(),
              lng: match.location.lng(),
            },
            displayName: match.displayName || BUSINESS_INFO.fullName,
            formattedAddress:
              match.formattedAddress ||
              `${BUSINESS_INFO.locationShort}, ${BUSINESS_INFO.locationReference}`,
            googleMapsURI: match.googleMapsURI ?? BUSINESS_INFO.mapsSearchUrl,
            matchedBusinessListing: item.isBusinessQuery,
          };

          const rawPhotos = match.photos ?? [];
          if (item.isBusinessQuery && rawPhotos.length > 0) {
            const mappedPhotos: GooglePlacePhotoItem[] = rawPhotos
              .slice(0, 8)
              .map((photo, idx) => ({
                id: `gbp-photo-${idx}`,
                url: photo.getURI({ maxWidth: 1600 }),
                thumbnailUrl: photo.getURI({ maxWidth: 900 }),
                attributions: (photo.authorAttributions ?? []).map((attr) => ({
                  displayName: attr.displayName || 'Google Maps contributor',
                  uri: attr.uri ?? null,
                })),
              }));

            if (!cancelled) {
              setState({
                status: 'ready',
                place: resolvedPlace,
                photos: mappedPhotos,
              });
            }
            return;
          }

          if (!fallbackAreaPlace) {
            fallbackAreaPlace = resolvedPlace;
          }

          if (item.isBusinessQuery && rawPhotos.length === 0) {
            // Matched the business listing, keep looking only if a more specific query has photos,
            // otherwise remember this listing as the location match.
            fallbackAreaPlace = resolvedPlace;
          }
        } catch (err) {
          if (isQuotaError(err)) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
            if (!cancelled) {
              setState({ status: 'error', place: null, photos: [] });
            }
            return;
          }
        }
      }

      if (!cancelled) {
        if (fallbackAreaPlace) {
          setState({
            status: 'ready',
            place: fallbackAreaPlace,
            photos: [],
          });
        } else {
          setState({ status: 'error', place: null, photos: [] });
        }
      }
    }

    loadGoogleBusinessProfile();

    return () => {
      cancelled = true;
    };
  }, [placesLib, apiStatus]);

  const contextValue = useMemo(() => state, [state]);

  return (
    <GooglePlaceContext.Provider value={contextValue}>
      {children}
    </GooglePlaceContext.Provider>
  );
}

export function GooglePlaceProvider({ children }: { children: ReactNode }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  if (!apiKey) {
    return (
      <GooglePlaceContext.Provider value={DEFAULT_VALUE}>
        {children}
      </GooglePlaceContext.Provider>
    );
  }

  return (
    <APIProvider apiKey={apiKey} region="KE" language="en">
      <GooglePlaceLoader>{children}</GooglePlaceLoader>
    </APIProvider>
  );
}

export function useGooglePlace() {
  return useContext(GooglePlaceContext);
}
