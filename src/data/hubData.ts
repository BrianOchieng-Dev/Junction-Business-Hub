export type ServiceDivisionKey = 'laundry' | 'cyber' | 'barber' | 'hotel' | 'carwash';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  department: ServiceDivisionKey;
  filterGroup: string;
  description: string;
  highlights: string[];
  turnaround: string;
  pricingNote: string;
  featured?: boolean;
}

export interface ServiceDivisionMeta {
  key: ServiceDivisionKey;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  heroHeading: string;
  heroSubtitle: string;
  heroImage: { src: string; alt: string };
  galleryImages: Array<{ id: string; title: string; subtitle: string; src: string; alt: string }>;
  filters: Array<{ id: string; label: string }>;
  processTitle: string;
  steps: Array<{ step: string; title: string; body: string }>;
  whatsappMessage: string;
}

export interface OperatingHour {
  dayIndex: number; // 0 = Sunday ... 6 = Saturday
  day: string;
  hours: string;
  confirmed: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  department: string;
  caption: string;
  src: string;
  alt: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
}

export interface EmployeeRole {
  id: string;
  code: string;
  title: string;
  department: 'management' | 'laundry' | 'cyber' | 'barber' | 'hotel' | 'carwash';
  departmentLabel: string;
  placeholderHolder: string;
  summary: string;
  responsibilities: string[];
  customerTouchpoint: string;
  servicePage?: ServiceDivisionKey;
  image: { src: string; alt: string };
}

export interface SocialProfile {
  id: 'tiktok' | 'instagram' | 'facebook';
  name: string;
  handle: string;
  ctaLabel: string;
  url: string;
}

export const BUSINESS_INFO = {
  shortName: 'The Junction Hub',
  fullName: 'The Junction Laundry And Services Hub',
  locationShort: 'Junction-Kodoyo, Homa Bay',
  locationReference: 'Homa Bay–Rongo Road',
  county: 'Homa Bay County, Kenya',
  phoneDisplay: '+254 766 768617',
  phoneHref: 'tel:+254766768617',
  whatsappNumber: '254766768617',
  category: 'Laundry · Cyber · Barber · Hotel · Carwash',
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Junction-Kodoyo+Homa+Bay+Rongo+Road+Kenya',
};

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: 'The Junction Business Hub',
    ctaLabel: 'TikTok Profile',
    url: 'https://www.tiktok.com/search?q=The%20Junction%20Business%20Hub%20Homa%20Bay',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: 'The Junction Hub',
    ctaLabel: 'Instagram Profile',
    url: 'https://www.instagram.com/explore/search/keyword/?q=The%20Junction%20Business%20Hub%20Homa%20Bay',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'The Junction Business Hub',
    ctaLabel: 'Facebook Page',
    url: 'https://www.facebook.com/search/top?q=The%20Junction%20Business%20Hub%20Homa%20Bay',
  },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_service_hub_1795526442226.jpg',
  alt: 'Interior of The Junction Laundry And Services Hub featuring neatly folded linens and bright desktop cyber workstations',
};

export const ABOUT_IMAGE = {
  src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
  alt: 'Street-level exterior view of The Junction Laundry And Services Hub along the Homa Bay–Rongo Road',
};

export const PROMO_VIDEO = {
  src: 'https://www.youtube.com/embed/MWBQt7tEaFI',
  title: 'WELCOME TO THE JUNCTION BUSINESS HUB // HOMA BAY TOWN // JUNCTION KODOYO',
};

export const OPERATING_HOURS: OperatingHour[] = [
  { dayIndex: 1, day: 'Monday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 2, day: 'Tuesday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 3, day: 'Wednesday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 4, day: 'Thursday', hours: '7:00 AM – 8:30 PM', confirmed: true },
  { dayIndex: 5, day: 'Friday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 6, day: 'Saturday', hours: 'Call ahead to confirm', confirmed: false },
  { dayIndex: 0, day: 'Sunday', hours: '8:00 AM – 8:00 PM', confirmed: true },
];

export const LAUNDRY_SERVICES: ServiceItem[] = [
  {
    id: 'clothes-washing',
    title: 'Everyday Clothes Washing',
    category: 'Garment Care',
    department: 'laundry',
    filterGroup: 'daily',
    description: 'Sorted wash for daily wear, uniforms, and delicates.',
    highlights: ['Color-sorted intake', 'Fabric-safe rinse', 'Tagged per bag'],
    turnaround: 'Next-Day',
    pricingNote: 'Priced per load or piece at drop-off.',
    featured: true,
  },
  {
    id: 'clothes-ironing',
    title: 'Steam Pressing & Ironing',
    category: 'Garment Care',
    department: 'laundry',
    filterGroup: 'daily',
    description: 'Crisp steam finish for shirts, trousers, and uniforms.',
    highlights: ['Collar & crease care', 'Hanger or flat fold', 'Ready to wear'],
    turnaround: 'Same-Day',
    pricingNote: 'Per-garment rates at counter.',
  },
  {
    id: 'folding-packaging',
    title: 'Folding & Protective Wrap',
    category: 'Finishing',
    department: 'laundry',
    filterGroup: 'daily',
    description: 'Neat folding and clean wrapping for easy travel.',
    highlights: ['Moisture-shielded wrap', 'Sorted by item', 'Quick counter pickup'],
    turnaround: 'Included',
    pricingNote: 'Included with every wash.',
  },
  {
    id: 'bedding-duvets',
    title: 'Duvets, Blankets & Curtains',
    category: 'Heavy Items',
    department: 'laundry',
    filterGroup: 'bedding',
    description: 'Deep-cycle wash and full dry for bulky bedding.',
    highlights: ['High-capacity drums', 'Fresh thorough dry', 'Clean storage pack'],
    turnaround: '24–48 Hrs',
    pricingNote: 'Quoted by duvet size at counter.',
    featured: true,
  },
  {
    id: 'bulk-laundry',
    title: 'Family & Bulk Loads',
    category: 'Volume Care',
    department: 'laundry',
    filterGroup: 'bedding',
    description: 'Weekly washing for homes, lodges, and local teams.',
    highlights: ['Weekly drop-off slots', 'Volume coordination', 'WhatsApp pickup alert'],
    turnaround: 'Scheduled',
    pricingNote: 'Custom quote via +254 766 768617.',
  },
  {
    id: 'express-laundry',
    title: 'Express Same-Day',
    category: 'Priority',
    department: 'laundry',
    filterGroup: 'express',
    description: 'Priority wash, dry, and press for urgent trips.',
    highlights: ['Morning priority queue', 'Wash, dry & press', 'Ideal for travellers'],
    turnaround: 'Same-Day',
    pricingNote: 'Drop off early for same-day finish.',
  },
];

export const CYBER_SERVICES: ServiceItem[] = [
  {
    id: 'document-printing',
    title: 'B&W & Color Printing',
    category: 'Print Desk',
    department: 'cyber',
    filterGroup: 'print',
    description: 'Sharp laser prints from USB, email, or WhatsApp.',
    highlights: ['Send PDFs on WhatsApp', 'Color & B&W laser', 'Single or double-sided'],
    turnaround: 'Instant',
    pricingNote: 'Per-page rate at desk.',
    featured: true,
  },
  {
    id: 'photocopying',
    title: 'High-Speed Photocopying',
    category: 'Print Desk',
    department: 'cyber',
    filterGroup: 'print',
    description: 'Clean copies for IDs, certificates, and study packets.',
    highlights: ['ID & certificate copies', 'Bulk handouts', 'Crisp legibility'],
    turnaround: 'Instant',
    pricingNote: 'Single & bulk rates at counter.',
  },
  {
    id: 'document-scanning',
    title: 'PDF Scanning & Email',
    category: 'Digital Capture',
    department: 'cyber',
    filterGroup: 'print',
    description: 'High-resolution PDF scans sent straight to your phone.',
    highlights: ['Multi-page PDF merge', 'Phone or email delivery', 'Portal-ready sizing'],
    turnaround: 'Instant',
    pricingNote: 'Per-page scan & digital send.',
  },
  {
    id: 'typing-formatting',
    title: 'Typing & CV Formatting',
    category: 'Office Support',
    department: 'cyber',
    filterGroup: 'digital',
    description: 'Clean CVs, letters, projects, and spreadsheets.',
    highlights: ['CVs & cover letters', 'Project layout', 'Fast proofreading'],
    turnaround: 'Walk-In',
    pricingNote: 'Quoted by page count.',
  },
  {
    id: 'internet-access',
    title: 'Desktop Computer Access',
    category: 'Workstations',
    department: 'cyber',
    filterGroup: 'digital',
    description: 'Quiet workstations with reliable web access.',
    highlights: ['Sunlit desk seating', 'Reliable web speed', 'Privacy wipe after use'],
    turnaround: 'Walk-In',
    pricingNote: 'Timed session rates at desk.',
  },
  {
    id: 'online-applications',
    title: 'Online Portals & Forms',
    category: 'Guided Support',
    department: 'cyber',
    filterGroup: 'digital',
    description: '1-on-1 help with uploads, forms, and e-services.',
    highlights: ['Guided submissions', 'Document resizing', 'Printed receipts'],
    turnaround: 'Assisted',
    pricingNote: 'Message ahead on WhatsApp.',
    featured: true,
  },
];

export const BARBER_SERVICES: ServiceItem[] = [
  {
    id: 'executive-haircut',
    title: 'Precision Cuts & Fades',
    category: 'Hair Styling',
    department: 'barber',
    filterGroup: 'haircut',
    description: 'Sharp skin fades, tapers, and clean scissor trims.',
    highlights: ['Sanitized clippers', 'Custom fade height', 'Clean aftershave finish'],
    turnaround: '30 Mins',
    pricingNote: 'Standard rates confirmed at chair.',
    featured: true,
  },
  {
    id: 'beard-grooming',
    title: 'Beard Sculpt & Shave',
    category: 'Beard Care',
    department: 'barber',
    filterGroup: 'grooming',
    description: 'Crisp beard line-ups and soothing close shaves.',
    highlights: ['Sharp jawline lines', 'Fresh single blades', 'Soothing balm finish'],
    turnaround: '20 Mins',
    pricingNote: 'Solo or paired with haircut.',
    featured: true,
  },
  {
    id: 'student-kids-cuts',
    title: 'Student & Kids Cuts',
    category: 'Family Grooming',
    department: 'barber',
    filterGroup: 'haircut',
    description: 'Neat school-ready cuts in a calm chair.',
    highlights: ['Patient kids care', 'School regulation cuts', 'Walk-in friendly'],
    turnaround: '25 Mins',
    pricingNote: 'Student & kids rates at chair.',
  },
  {
    id: 'hot-towel-refresh',
    title: 'Hot Towel Facial Refresh',
    category: 'Relaxation',
    department: 'barber',
    filterGroup: 'grooming',
    description: 'Warm steamed towel and gentle cleanse after travel.',
    highlights: ['Steamed cotton towels', 'Gentle pore cleanse', 'Cooling lotion'],
    turnaround: '15 Mins',
    pricingNote: 'Add-on or solo refresh.',
  },
  {
    id: 'express-traveller-trim',
    title: 'Express Line-Up',
    category: 'Priority',
    department: 'barber',
    filterGroup: 'express',
    description: 'Quick neckline and beard tidy for road stops.',
    highlights: ['Minimal wait time', 'Pair with carwash', 'Call ahead for queue'],
    turnaround: '15 Mins',
    pricingNote: 'Walk-in or WhatsApp queue check.',
  },
];

export const HOTEL_SERVICES: ServiceItem[] = [
  {
    id: 'morning-tea-breakfast',
    title: 'Kenyan Tea & Breakfast',
    category: 'Dining',
    department: 'hotel',
    filterGroup: 'dining',
    description: 'Hot spiced chai, fresh chapati, mandazi, and eggs.',
    highlights: ['Fresh from 7:00 AM', 'Bright dining seating', 'Quick takeaway'],
    turnaround: 'Walk-In',
    pricingNote: 'Daily kitchen menu at counter.',
    featured: true,
  },
  {
    id: 'highway-lunch-dinner',
    title: 'Hot Kenyan Meals',
    category: 'Dining',
    department: 'hotel',
    filterGroup: 'dining',
    description: 'Fresh fish, grilled meats, ugali, rice, and greens.',
    highlights: ['Highway stopover tables', 'Cold drinks & water', 'Dine-in or takeaway'],
    turnaround: 'Dine-In',
    pricingNote: 'Fresh daily plates at counter.',
    featured: true,
  },
  {
    id: 'overnight-guest-rooms',
    title: 'Clean Guest Rooms',
    category: 'Accommodation',
    department: 'hotel',
    filterGroup: 'rooms',
    description: 'Quiet bedrooms with freshly pressed cotton linens.',
    highlights: ['In-house pressed sheets', 'Meals & laundry steps away', 'Easy roadside stay'],
    turnaround: 'Overnight',
    pricingNote: 'Call or WhatsApp to hold a room.',
    featured: true,
  },
  {
    id: 'day-rest-rooms',
    title: 'Traveller Day-Rest',
    category: 'Accommodation',
    department: 'hotel',
    filterGroup: 'travellers',
    description: 'Clean daytime rest between Homa Bay and Rongo trips.',
    highlights: ['Private quiet rest', 'Shower & hot meal', 'Flexible check-in'],
    turnaround: 'Daytime',
    pricingNote: 'Subject to room availability.',
  },
  {
    id: 'group-stopover-hospitality',
    title: 'Group Meals & Travel Packs',
    category: 'Groups',
    department: 'hotel',
    filterGroup: 'travellers',
    description: 'Pre-booked meals and packed boxes for travel crews.',
    highlights: ['WhatsApp pre-order', 'Neatly packed boxes', 'Zero wait on arrival'],
    turnaround: 'Pre-Booked',
    pricingNote: 'Group orders via +254 766 768617.',
  },
];

export const CARWASH_SERVICES: ServiceItem[] = [
  {
    id: 'carwash-exterior-foam',
    title: 'Pressure & Foam Wash',
    category: 'Exterior',
    department: 'carwash',
    filterGroup: 'exterior',
    description: 'High-pressure rinse, thick foam scrub, and microfiber dry.',
    highlights: ['Mud & dust removal', 'Clean microfiber dry', 'Rim & tire shine'],
    turnaround: '30 Mins',
    pricingNote: 'Priced by vehicle size.',
    featured: true,
  },
  {
    id: 'carwash-interior-vacuum',
    title: 'Cabin Vacuum & Mats',
    category: 'Interior',
    department: 'carwash',
    filterGroup: 'interior',
    description: 'Deep seat vacuum, mat wash, dash wipe, and clear glass.',
    highlights: ['Crevice vacuuming', 'Mat wash & dry', 'Clean dash finish'],
    turnaround: '35 Mins',
    pricingNote: 'Solo or full wash package.',
    featured: true,
  },
  {
    id: 'carwash-underbody-chassis',
    title: 'Underbody & Chassis Flush',
    category: 'Deep Exterior',
    department: 'carwash',
    filterGroup: 'exterior',
    description: 'Targeted pressure spray clearing caked road mud.',
    highlights: ['Wheel-well flush', 'Suspension rinse', 'Post-rain road care'],
    turnaround: '25 Mins',
    pricingNote: 'Confirmed on bay arrival.',
  },
  {
    id: 'carwash-engine-upholstery',
    title: 'Engine Wipe & Seat Care',
    category: 'Detailing',
    department: 'carwash',
    filterGroup: 'interior',
    description: 'Low-moisture engine dust clean and fabric seat spot care.',
    highlights: ['Covered electrical care', 'Seat & boot spot clean', 'Fresh cabin scent'],
    turnaround: '45 Mins',
    pricingNote: 'Quoted at carwash bay.',
  },
  {
    id: 'carwash-express-rinse',
    title: 'Express Dust Rinse',
    category: 'Priority',
    department: 'carwash',
    filterGroup: 'express',
    description: 'Quick rinse and dry while you grab tea or print files.',
    highlights: ['Windshield & mirror clear', 'Fast drive-in bay', 'Park once for all hubs'],
    turnaround: '15 Mins',
    pricingNote: 'Fast walk-in pricing.',
  },
];

export const SERVICE_DIVISIONS: Record<ServiceDivisionKey, ServiceDivisionMeta> = {
  laundry: {
    key: 'laundry',
    number: '',
    title: 'Laundry Services',
    shortTitle: 'Laundry',
    tagline: 'Wash, steam press & duvets',
    heroHeading: 'Clean washing, crisp pressing & duvet care.',
    heroSubtitle: 'Drop off at Junction-Kodoyo and pick up folded and ready.',
    heroImage: {
      src: '/src/assets/images/laundry_washing_folding_1795526442152.jpg',
      alt: 'Stainless washing machines and freshly folded cotton towels at The Junction Hub laundry counter',
    },
    galleryImages: [
      {
        id: 'l-wash',
        title: 'Sorting & Wash Bay',
        subtitle: 'Separate cycles per load',
        src: '/src/assets/images/laundry_washing_folding_1795526442152.jpg',
        alt: 'Front-loading washing machines and folded laundry counter',
      },
      {
        id: 'l-duvet',
        title: 'Duvet & Blanket Care',
        subtitle: 'Deep-cycle bulky bedding',
        src: '/src/assets/images/laundry_duvet_care_1795527972203.jpg',
        alt: 'Freshly cleaned white duvets and sky-blue towels neatly stacked',
      },
      {
        id: 'l-press',
        title: 'Steam Pressing',
        subtitle: 'Crisp shirts on hangers',
        src: '/src/assets/images/laundry_ironing_care_1795526442689.jpg',
        alt: 'Freshly pressed collared shirts hanging beside steam iron station',
      },
    ],
    filters: [
      { id: 'all', label: 'All' },
      { id: 'daily', label: 'Daily' },
      { id: 'bedding', label: 'Duvets & Bulk' },
      { id: 'express', label: 'Express' },
    ],
    processTitle: 'Simple drop-off',
    steps: [
      { step: '', title: 'Drop Off', body: 'Bring clothes or duvets to the counter for quick sorting.' },
      { step: '', title: 'Wash & Press', body: 'Clean wash cycles, full drying, and crisp steam pressing.' },
      { step: '', title: 'Pick Up Ready', body: 'Collect folded or hung, neatly wrapped for the road.' },
    ],
    whatsappMessage: 'Hello The Junction Hub, I would like to ask about Laundry Services.',
  },
  cyber: {
    key: 'cyber',
    number: '',
    title: 'Cyber Services',
    shortTitle: 'Cyber Café',
    tagline: 'Print, scan & online portals',
    heroHeading: 'Fast printing, PDF scans & online help.',
    heroSubtitle: 'Send files ahead via WhatsApp or walk straight in.',
    heroImage: {
      src: '/src/assets/images/cyber_cafe_workstations_1795526442794.jpg',
      alt: 'Bright desktop computer workstations inside The Junction Cyber Café',
    },
    galleryImages: [
      {
        id: 'c-desk',
        title: 'Desktop Workstations',
        subtitle: 'Quiet desks & web access',
        src: '/src/assets/images/cyber_cafe_workstations_1795526442794.jpg',
        alt: 'Organized desktop computer stations with natural window light',
      },
      {
        id: 'c-scan',
        title: 'Scanning & Portals',
        subtitle: 'PDF capture & uploads',
        src: '/src/assets/images/cyber_digital_desk_1795527988780.jpg',
        alt: 'Cyber desk with flatbed scanner and white paper stack',
      },
      {
        id: 'c-print',
        title: 'Laser Print Desk',
        subtitle: 'Crisp color & B&W prints',
        src: '/src/assets/images/cyber_printing_documents_1795526444880.jpg',
        alt: 'Multifunction laser printer with freshly printed documents',
      },
    ],
    filters: [
      { id: 'all', label: 'All' },
      { id: 'print', label: 'Print & Scan' },
      { id: 'digital', label: 'Typing & Portals' },
    ],
    processTitle: 'In and out fast',
    steps: [
      { step: '', title: 'Send Files', body: 'WhatsApp your PDF ahead or walk in with a flash drive.' },
      { step: '', title: 'Print or Apply', body: 'Crisp prints, clean scans, or guided online submissions.' },
      { step: '', title: 'Collect & Go', body: 'Grab your packet and receipts at the counter.' },
    ],
    whatsappMessage: 'Hello The Junction Cyber Desk, I have a file or portal request.',
  },
  barber: {
    key: 'barber',
    number: '',
    title: 'Barber Services',
    shortTitle: 'Barber Shop',
    tagline: 'Fades, beards & hot towels',
    heroHeading: 'Precision fades, clean trims & hot towels.',
    heroSubtitle: 'Walk right in at Junction-Kodoyo—sanitized tools, zero rush.',
    heroImage: {
      src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
      alt: 'Clean modern barbershop interior with barber chairs and wall mirrors',
    },
    galleryImages: [
      {
        id: 'b-chairs',
        title: 'Barber Chairs',
        subtitle: 'Clean mirror stations',
        src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
        alt: 'Barber chairs and bright mirrors inside the grooming bay',
      },
      {
        id: 'b-tools',
        title: 'Sanitized Tools',
        subtitle: 'Fresh blades & towels',
        src: '/src/assets/images/barber_grooming_tools_1795528332042.jpg',
        alt: 'Neatly arranged hair clippers, shears, brushes, and towels',
      },
      {
        id: 'b-hub',
        title: 'Walk-In Convenience',
        subtitle: 'Right on Homa Bay–Rongo Road',
        src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
        alt: 'Junction-Kodoyo roadside entrance to all hub services',
      },
    ],
    filters: [
      { id: 'all', label: 'All' },
      { id: 'haircut', label: 'Cuts & Fades' },
      { id: 'grooming', label: 'Beard & Towel' },
      { id: 'express', label: 'Express' },
    ],
    processTitle: 'At the chair',
    steps: [
      { step: '', title: 'Walk In', body: 'Drop by the bay or message ahead for chair wait time.' },
      { step: '', title: 'Clean Cut', body: 'Tailored fade, beard trim, or warm towel refresh.' },
      { step: '', title: 'Step Out Fresh', body: 'Ready for town, campus, or the highway.' },
    ],
    whatsappMessage: 'Hello The Junction Barber Desk, I would like to check chair availability.',
  },
  hotel: {
    key: 'hotel',
    number: '',
    title: 'Junction Highway Hotel',
    shortTitle: 'Highway Hotel',
    tagline: 'Fresh meals, tea & clean rooms',
    heroHeading: 'Warm Kenyan meals, tea & clean rooms.',
    heroSubtitle: 'A clean roadside stop along the Homa Bay–Rongo Road.',
    heroImage: {
      src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
      alt: 'Sunlit dining room at Junction Highway Hotel with oak tables',
    },
    galleryImages: [
      {
        id: 'h-dining',
        title: 'Dining & Tea Lounge',
        subtitle: 'Hot chai & daily plates',
        src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
        alt: 'Bright restaurant seating with timber tables',
      },
      {
        id: 'h-room',
        title: 'Overnight Rooms',
        subtitle: 'Pressed white linens',
        src: '/src/assets/images/hotel_guest_room_1795528333616.jpg',
        alt: 'Spotless hotel guest bedroom with white sheets',
      },
      {
        id: 'h-exterior',
        title: 'Highway Access',
        subtitle: 'Direct stop at Junction-Kodoyo',
        src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
        alt: 'Junction-Kodoyo roadside entrance for dining and rooms',
      },
    ],
    filters: [
      { id: 'all', label: 'All' },
      { id: 'dining', label: 'Meals & Tea' },
      { id: 'rooms', label: 'Rooms' },
      { id: 'travellers', label: 'Day Rest & Groups' },
    ],
    processTitle: 'Stop & refresh',
    steps: [
      { step: '', title: 'Pull In or Book', body: 'Walk in for meals or WhatsApp ahead to hold a room.' },
      { step: '', title: 'Dine & Rest', body: 'Fresh Kenyan dishes and crisp sheets laundered in-house.' },
      { step: '', title: 'Continue On', body: 'Pair your stop with laundry, cyber, or a carwash.' },
    ],
    whatsappMessage: 'Hello Junction Highway Hotel, I would like to ask about meals or rooms.',
  },
  carwash: {
    key: 'carwash',
    number: '',
    title: 'Carwash Services',
    shortTitle: 'Carwash',
    tagline: 'Pressure wash, chassis & cabin',
    heroHeading: 'Pressure wash, chassis flush & cabin detail.',
    heroSubtitle: 'Pull straight off the highway—leave your car shining.',
    heroImage: {
      src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
      alt: 'Clean roadside carwash bay washing an SUV with high-pressure water spray',
    },
    galleryImages: [
      {
        id: 'cw-bay',
        title: 'Pressure Wash Bay',
        subtitle: 'Foam scrub & rinse',
        src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
        alt: 'SUV receiving high-pressure water wash inside The Junction Hub carwash bay',
      },
      {
        id: 'cw-interior',
        title: 'Cabin Vacuum & Detail',
        subtitle: 'Seats, mats & glass',
        src: '/src/assets/images/carwash_interior_detailing_1795529235741.jpg',
        alt: 'Clean car interior beside folded microfiber detailing cloths',
      },
      {
        id: 'cw-access',
        title: 'Drive-In Access',
        subtitle: 'Right at Junction-Kodoyo',
        src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
        alt: 'Junction-Kodoyo roadside entrance along the Homa Bay–Rongo Road',
      },
    ],
    filters: [
      { id: 'all', label: 'All' },
      { id: 'exterior', label: 'Exterior & Chassis' },
      { id: 'interior', label: 'Cabin Detail' },
      { id: 'express', label: 'Express Rinse' },
    ],
    processTitle: 'Park once',
    steps: [
      { step: '', title: 'Drive In', body: 'Pull directly off Homa Bay–Rongo Road into the bay.' },
      { step: '', title: 'Wash & Detail', body: 'High-pressure rinse, foam wash, chassis flush, and vacuum.' },
      { step: '', title: 'Relax Nearby', body: 'Grab chai, print documents, or get a trim while we finish.' },
    ],
    whatsappMessage: 'Hello The Junction Carwash, I would like to ask about wash packages.',
  },
};

export function getServicesForDivision(key: ServiceDivisionKey): ServiceItem[] {
  switch (key) {
    case 'laundry':
      return LAUNDRY_SERVICES;
    case 'cyber':
      return CYBER_SERVICES;
    case 'barber':
      return BARBER_SERVICES;
    case 'hotel':
      return HOTEL_SERVICES;
    case 'carwash':
      return CARWASH_SERVICES;
  }
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-exterior',
    title: 'Junction-Kodoyo Frontage',
    department: 'Premises',
    caption: 'Direct roadside entry on Homa Bay–Rongo Road.',
    src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
    alt: 'Street-level storefront of The Junction Laundry And Services Hub in Junction-Kodoyo',
  },
  {
    id: 'gallery-hotel-dining',
    title: 'Highway Hotel Dining',
    department: 'Highway Hotel',
    caption: 'Fresh Kenyan breakfast, chai, and hot meals.',
    src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
    alt: 'Sunlit dining hall with polished timber tables',
  },
  {
    id: 'gallery-hotel-room',
    title: 'Clean Guest Rooms',
    department: 'Highway Hotel',
    caption: 'Quiet overnight rooms with pressed white linens.',
    src: '/src/assets/images/hotel_guest_room_1795528333616.jpg',
    alt: 'Clean guest room with white sheets and natural morning light',
  },
  {
    id: 'gallery-barber-chairs',
    title: 'Barber Grooming Bay',
    department: 'Barber',
    caption: 'Bright mirror stations and sanitized clippers.',
    src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
    alt: 'Modern barbershop chairs and mirrors inside The Junction Hub',
  },
  {
    id: 'gallery-barber-tools',
    title: 'Sanitized Clippers & Towels',
    department: 'Barber',
    caption: 'Fresh cotton towels and clean blades every cut.',
    src: '/src/assets/images/barber_grooming_tools_1795528332042.jpg',
    alt: 'Barber clippers, shears, brushes, and fresh towel on counter',
  },
  {
    id: 'gallery-washers',
    title: 'Washing & Folding Bay',
    department: 'Laundry',
    caption: 'Sorted machine wash and tidy folding tables.',
    src: '/src/assets/images/laundry_washing_folding_1795526442152.jpg',
    alt: 'Stainless steel washing machines and neatly folded white towels',
  },
  {
    id: 'gallery-duvets',
    title: 'Duvet & Blanket Care',
    department: 'Laundry',
    caption: 'Deep-washed bedding ready for pickup.',
    src: '/src/assets/images/laundry_duvet_care_1795527972203.jpg',
    alt: 'Neatly folded white duvets and blankets on timber shelving',
  },
  {
    id: 'gallery-ironing',
    title: 'Steam Pressing Station',
    department: 'Laundry',
    caption: 'Crisp shirts and uniforms on hangers.',
    src: '/src/assets/images/laundry_ironing_care_1795526442689.jpg',
    alt: 'Freshly pressed shirts on wooden hangers beside a steam iron',
  },
  {
    id: 'gallery-cyber',
    title: 'Desktop Cyber Stations',
    department: 'Cyber Café',
    caption: 'Bright computer desks for study and online work.',
    src: '/src/assets/images/cyber_cafe_workstations_1795526442794.jpg',
    alt: 'Clean modern cyber cafe workstations with desktop monitors',
  },
  {
    id: 'gallery-scanning',
    title: 'Scanning & Portal Desk',
    department: 'Cyber Café',
    caption: 'PDF scans and guided portal help.',
    src: '/src/assets/images/cyber_digital_desk_1795527988780.jpg',
    alt: 'Modern cyber counter with flatbed document scanner and monitor',
  },
  {
    id: 'gallery-printing',
    title: 'Laser Print Counter',
    department: 'Cyber Café',
    caption: 'Crisp B&W and color printing.',
    src: '/src/assets/images/cyber_printing_documents_1795526444880.jpg',
    alt: 'Multifunction laser printer and tidy printed reports',
  },
  {
    id: 'gallery-carwash-bay',
    title: 'Drive-In Carwash Bay',
    department: 'Carwash',
    caption: 'High-pressure exterior wash and foam scrub.',
    src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
    alt: 'SUV being washed inside The Junction Hub roadside carwash bay',
  },
  {
    id: 'gallery-carwash-interior',
    title: 'Cabin Vacuum & Finish',
    department: 'Carwash',
    caption: 'Spotless seats, mats, and microfiber drying.',
    src: '/src/assets/images/carwash_interior_detailing_1795529235741.jpg',
    alt: 'Spotless vehicle interior with folded microfiber detailing towels',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '1',
    title: 'Five Services, One Stop',
    detail: 'Laundry, cyber, barber, hotel, and carwash together.',
  },
  {
    number: '2',
    title: 'Right on the Highway',
    detail: 'Direct pull-in at Junction-Kodoyo, Homa Bay–Rongo Road.',
  },
  {
    number: '3',
    title: 'Clean Everyday Care',
    detail: 'Pressed linens, sanitized tools, and fresh microfiber towels.',
  },
  {
    number: '4',
    title: 'Instant WhatsApp Desk',
    detail: 'Send print files or check rooms on +254 766 768617.',
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Dropped off my duvet, printed notes, and got a quick fade in one stop.',
    author: 'Brenda Achieng',
    role: 'Student · Laundry & Cyber',
    context: 'Junction-Kodoyo',
  },
  {
    id: 't2',
    quote: 'A chassis wash while sipping chai at the hotel saves real travel time.',
    author: 'David Otieno',
    role: 'Motorist · Carwash & Hotel',
    context: 'Homa Bay–Rongo Road',
  },
  {
    id: 't3',
    quote: 'Quiet lunch seating while tender PDFs are printed right next door.',
    author: 'Samuel Odhiambo',
    role: 'Business Owner · Cyber & Hotel',
    context: 'Homa Bay Town',
  },
  {
    id: 't4',
    quote: 'Crisp sheets in clean rooms plus a fresh trim before the morning drive.',
    author: 'Grace Nyambura',
    role: 'Traveller · Hotel & Barber',
    context: 'Homa Bay–Rongo Road',
  },
  {
    id: 't5',
    quote: 'Full cabin vacuum finished right alongside my pressed work shirts.',
    author: 'Kevin Mwangi',
    role: 'Field Engineer · Carwash & Laundry',
    context: 'Junction-Kodoyo',
  },
];

export const EMPLOYEE_ROLES: EmployeeRole[] = [
  {
    id: 'hub-manager',
    code: '',
    title: 'Hub Supervisor',
    department: 'management',
    departmentLabel: 'Operations',
    placeholderHolder: '',
    summary: 'Coordinates all five bays and handles WhatsApp bookings.',
    responsibilities: [
      'Keeps all 5 bays ready from opening',
      'Answers calls & WhatsApp on +254 766 768617',
      'Coordinates bulk laundry & room holds',
    ],
    customerTouchpoint: 'Main Reception Counter',
    image: {
      src: '/src/assets/images/team_hub_supervisor_1795529811442.jpg',
      alt: 'Hub supervisor at The Junction Hub reception counter',
    },
  },
  {
    id: 'laundry-wash-specialist',
    code: '',
    title: 'Laundry & Steam Specialist',
    department: 'laundry',
    departmentLabel: 'Laundry',
    placeholderHolder: '',
    summary: 'Sorts, washes, steam-presses, and wraps clothes and duvets.',
    responsibilities: [
      'Color-sorted washing & tagged bags',
      'Heavy duvet & hotel linen cycles',
      'Crisp steam pressing on hangers',
    ],
    customerTouchpoint: 'Laundry Drop-Off Desk',
    servicePage: 'laundry',
    image: {
      src: '/src/assets/images/team_laundry_attendant_1795529811256.jpg',
      alt: 'Laundry care attendant steam pressing freshly washed shirts',
    },
  },
  {
    id: 'cyber-digital-officer',
    code: '',
    title: 'Cyber & Print Officer',
    department: 'cyber',
    departmentLabel: 'Cyber Café',
    placeholderHolder: '',
    summary: 'Runs B&W/color prints, PDF scans, typing, and online portals.',
    responsibilities: [
      'Instant prints, copies & PDF scans',
      '1-on-1 online portal submissions',
      'WhatsApp file-to-print pickup orders',
    ],
    customerTouchpoint: 'Print & Desktop Counter',
    servicePage: 'cyber',
    image: {
      src: '/src/assets/images/team_cyber_officer_1795529812278.jpg',
      alt: 'Cyber cafe officer assisting a client with printed documents',
    },
  },
  {
    id: 'master-barber',
    code: '',
    title: 'Senior Barber',
    department: 'barber',
    departmentLabel: 'Barber Shop',
    placeholderHolder: '',
    summary: 'Shapes sharp fades, clean trims, beard lines, and hot towels.',
    responsibilities: [
      'Precision fades & classic haircuts',
      'Sanitized tools & fresh blades',
      'Beard sculpting & warm towel refresh',
    ],
    customerTouchpoint: 'Barber Grooming Chairs',
    servicePage: 'barber',
    image: {
      src: '/src/assets/images/team_barber_specialist_1795529814089.jpg',
      alt: 'Senior barber shaping a clean tapered fade haircut',
    },
  },
  {
    id: 'hotel-hospitality-lead',
    code: '',
    title: 'Hotel Chef & Host',
    department: 'hotel',
    departmentLabel: 'Highway Hotel',
    placeholderHolder: '',
    summary: 'Serves hot Kenyan meals, spiced chai, and fresh guest rooms.',
    responsibilities: [
      'Fresh breakfast, chai & daily lunches',
      'Takeaway boxes for highway travellers',
      'Clean overnight rooms with fresh linens',
    ],
    customerTouchpoint: 'Hotel Dining & Guest Desk',
    servicePage: 'hotel',
    image: {
      src: '/src/assets/images/team_hotel_chef_1795529812533.jpg',
      alt: 'Hospitality chef serving fresh spiced Kenyan tea and chapatis',
    },
  },
  {
    id: 'carwash-detailing-lead',
    code: '',
    title: 'Carwash Specialist',
    department: 'carwash',
    departmentLabel: 'Carwash',
    placeholderHolder: '',
    summary: 'Delivers pressure foam washes, chassis flushes, and cabin vacuuming.',
    responsibilities: [
      'Pressure wash & under-chassis mud flush',
      'Seat vacuuming & floor mat care',
      'Clean microfiber exterior hand dry',
    ],
    customerTouchpoint: 'Drive-In Carwash Bay',
    servicePage: 'carwash',
    image: {
      src: '/src/assets/images/team_carwash_specialist_1795529811588.jpg',
      alt: 'Carwash specialist drying a sparkling clean car hood with a microfiber towel',
    },
  },
];
