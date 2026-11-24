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
  locationReference: 'Along the Homa Bay–Rongo Road',
  county: 'Homa Bay County, Kenya',
  phoneDisplay: '+254 766 768617',
  phoneHref: 'tel:+254766768617',
  whatsappNumber: '254766768617',
  category: 'Laundry · Cyber Café · Barber · Highway Hotel · Carwash',
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
  alt: 'Street-level exterior view of The Junction Laundry And Services Hub with sky-blue trim along the Homa Bay–Rongo Road',
};

export const PROMO_VIDEO = {
  src: 'https://www.youtube.com/embed/MWBQt7tEaFI',
  title: 'WELCOME TO THE JUNCTION BUSINESS HUB 🔥🔥🔥 // HOMA BAY TOWN // JUNCTION KODOYO',
};

export const OPERATING_HOURS: OperatingHour[] = [
  { dayIndex: 1, day: 'Monday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 2, day: 'Tuesday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 3, day: 'Wednesday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 4, day: 'Thursday', hours: '7:00 AM – 8:30 PM', confirmed: true },
  { dayIndex: 5, day: 'Friday', hours: '7:00 AM – 8:00 PM', confirmed: true },
  { dayIndex: 6, day: 'Saturday', hours: 'Hours to be confirmed (call ahead)', confirmed: false },
  { dayIndex: 0, day: 'Sunday', hours: '8:00 AM – 8:00 PM', confirmed: true },
];

export const LAUNDRY_SERVICES: ServiceItem[] = [
  {
    id: 'clothes-washing',
    title: 'Everyday Clothes Washing',
    category: 'Garment Care',
    department: 'laundry',
    filterGroup: 'daily',
    description:
      'Sorted machine and gentle hand washing for everyday wear, work shirts, uniforms, and delicate fabrics using clean water and fabric-safe detergents.',
    highlights: [
      'Color & fabric separation at intake',
      'Clean rinse and gentle fabric care',
      'Tagging per customer bag for zero mix-ups',
    ],
    turnaround: 'Standard & Next-Day',
    pricingNote: 'Rate confirmed by load or item at drop-off',
    featured: true,
  },
  {
    id: 'clothes-ironing',
    title: 'Steam Pressing & Ironing',
    category: 'Garment Care',
    department: 'laundry',
    filterGroup: 'daily',
    description:
      'Crisp steam ironing for office shirts, trousers, school uniforms, and formal attire so garments return ready to wear.',
    highlights: [
      'Collar, cuff, and trouser crease precision',
      'Hanger or flat-fold return options',
      'Ideal for weekly work wardrobes',
    ],
    turnaround: 'Same-Day Available',
    pricingNote: 'Per-garment pricing confirmed on enquiry',
  },
  {
    id: 'folding-packaging',
    title: 'Folding & Protective Packaging',
    category: 'Finishing',
    department: 'laundry',
    filterGroup: 'daily',
    description:
      'Neat sorting, folding, and moisture-resistant wrapping for easy transport home or onward travel along the Homa Bay–Rongo corridor.',
    highlights: [
      'Moisture-shielded travel wraps',
      'Sorted by household member or garment type',
      'Ready for quick roadside pickup',
    ],
    turnaround: 'Included with Wash',
    pricingNote: 'Confirm packaging preferences at counter',
  },
  {
    id: 'bedding-duvets',
    title: 'Bedding, Blankets & Duvet Cleaning',
    category: 'Heavy Items',
    department: 'laundry',
    filterGroup: 'bedding',
    description:
      'Deep-cycle washing and thorough drying for duvets, heavy blankets, bedsheets, and curtains that are difficult to wash at home.',
    highlights: [
      'High-capacity drum cycles for bulky duvets',
      'Fresh air & tumble drying check',
      'Clean zippered or wrapped storage pack',
    ],
    turnaround: '24–48 Hours (weather/load)',
    pricingNote: 'Quoted by duvet size at counter or WhatsApp',
    featured: true,
  },
  {
    id: 'bulk-laundry',
    title: 'Family & Bulk Laundry Loads',
    category: 'Volume Care',
    department: 'laundry',
    filterGroup: 'bedding',
    description:
      'Consolidated weekly washing for households, guest rooms, and local staff teams looking for dependable turnaround and volume coordination.',
    highlights: [
      'Custom volume scheduling for households & lodges',
      'Consistent weekly drop-off slots',
      'Dedicated WhatsApp pickup alerts',
    ],
    turnaround: 'Scheduled Pickup',
    pricingNote: 'Custom volume quote via +254 766 768617',
  },
  {
    id: 'express-laundry',
    title: 'Express Laundry Service',
    category: 'Priority',
    department: 'laundry',
    filterGroup: 'express',
    description:
      'Priority wash-and-dry handling for travellers, professionals, and urgent wardrobe needs when time matters.',
    highlights: [
      'Priority queue for morning drop-offs',
      'Combined wash, dry & urgent steam press',
      'Ideal for Junction Highway Hotel guests',
    ],
    turnaround: 'Priority Same-Day',
    pricingNote: 'Subject to drop-off time & machine availability',
  },
];

export const CYBER_SERVICES: ServiceItem[] = [
  {
    id: 'document-printing',
    title: 'Document Printing (B&W & Color)',
    category: 'Print Desk',
    department: 'cyber',
    filterGroup: 'print',
    description:
      'Sharp laser printing for academic assignments, CVs, business invoices, letters, and official forms from USB drives, email, or WhatsApp.',
    highlights: [
      'Send PDFs ahead via WhatsApp for pickup',
      'Crisp black & white or vibrant color pages',
      'Single or double-sided layout options',
    ],
    turnaround: 'While You Wait',
    pricingNote: 'Per-page B&W and color rates at desk',
    featured: true,
  },
  {
    id: 'photocopying',
    title: 'High-Speed Photocopying',
    category: 'Print Desk',
    department: 'cyber',
    filterGroup: 'print',
    description:
      'Single-sided and double-sided copying for IDs, certificates, study handouts, and multi-page office packets.',
    highlights: [
      'Clean ID & certificate enlargement/copying',
      'Multi-page school & workshop packets',
      'Volume discounts confirmed at counter',
    ],
    turnaround: 'Immediate',
    pricingNote: 'Single & bulk sheet rates available',
  },
  {
    id: 'document-scanning',
    title: 'Document Scanning & PDF Prep',
    category: 'Digital Capture',
    department: 'cyber',
    filterGroup: 'print',
    description:
      'Clean high-resolution PDF or image scans sent directly to your email, flash drive, or phone for online portals.',
    highlights: [
      'Multi-page PDF merging & compression',
      'Direct delivery to email or WhatsApp',
      'Clear color scans for official applications',
    ],
    turnaround: 'Immediate',
    pricingNote: 'Per-page scan & digital delivery',
  },
  {
    id: 'typing-formatting',
    title: 'Typing & Document Formatting',
    category: 'Office Support',
    department: 'cyber',
    filterGroup: 'digital',
    description:
      'Professional typing, layout formatting, CV updates, letters, and spreadsheet preparation with careful proofreading.',
    highlights: [
      'Structured CVs & cover letters',
      'Academic project formatting & tables',
      'Business letters, menus & forms',
    ],
    turnaround: 'Same-Day / Walk-In',
    pricingNote: 'Confirmed by page count & complexity',
  },
  {
    id: 'internet-access',
    title: 'Internet & Computer Access',
    category: 'Workstations',
    department: 'cyber',
    filterGroup: 'digital',
    description:
      'Quiet, well-maintained desktop stations with reliable internet for research, coursework, email, and personal productivity.',
    highlights: [
      'Well-lit, organized desk seating',
      'Reliable web connectivity for portals',
      'Clean privacy cleanup after each session',
    ],
    turnaround: 'Walk-In Seating',
    pricingNote: 'Timed access rates at reception',
  },
  {
    id: 'online-applications',
    title: 'Online Applications & Digital Assistance',
    category: 'Guided Support',
    department: 'cyber',
    filterGroup: 'digital',
    description:
      'Step-by-step desk support for online portals, form submissions, document uploads, and general digital errands.',
    highlights: [
      'Calm 1-on-1 portal navigation support',
      'File resizing & attachment checks',
      'Printable confirmation receipts on completion',
    ],
    turnaround: 'Assisted Session',
    pricingNote: 'Confirm requirements via WhatsApp before visiting',
    featured: true,
  },
];

export const BARBER_SERVICES: ServiceItem[] = [
  {
    id: 'executive-haircut',
    title: 'Executive Haircuts & Precision Fades',
    category: 'Hair Styling',
    department: 'barber',
    filterGroup: 'haircut',
    description:
      'Clean skin fades, tapered cuts, classic scissor trims, and sharp hairline detailing tailored for professionals, students, and everyday style.',
    highlights: [
      'Sanitized cordless clippers & fresh blades',
      'Custom fade height and hairline shaping',
      'Quick brush-down and soothing aftershave finish',
    ],
    turnaround: '25–35 Mins Walk-In',
    pricingNote: 'Standard grooming rates confirmed at chair',
    featured: true,
  },
  {
    id: 'beard-grooming',
    title: 'Beard Sculpting & Clean Shaves',
    category: 'Beard Care',
    department: 'barber',
    filterGroup: 'grooming',
    description:
      'Crisp beard line-ups, uniform length trimming, and close clean shaves finished with warm towel comfort and conditioning oil.',
    highlights: [
      'Sharp cheek and jawline detailing',
      'Clean single-use blade hygiene',
      'Soothing balm finish to prevent razor bumps',
    ],
    turnaround: '15–25 Mins',
    pricingNote: 'Standalone or paired with haircut',
    featured: true,
  },
  {
    id: 'student-kids-cuts',
    title: 'Student & Kids Haircuts',
    category: 'Family Grooming',
    department: 'barber',
    filterGroup: 'haircut',
    description:
      'Neat, school-ready trims and comfortable grooming sessions for children, teens, and college students around Junction-Kodoyo.',
    highlights: [
      'Patient, tidy styling for young clients',
      'School regulation & neat taper options',
      'Weekend and after-school walk-in friendly',
    ],
    turnaround: '20–30 Mins',
    pricingNote: 'Confirm child & student rates at counter',
  },
  {
    id: 'hot-towel-refresh',
    title: 'Hot Towel & Facial Scrub Refresh',
    category: 'Skin & Relaxation',
    department: 'barber',
    filterGroup: 'grooming',
    description:
      'Warm steamed towel compress, gentle facial cleanse, and scalp refresh ideal after dusty highway travel or a busy week.',
    highlights: [
      'Steamed clean cotton towels',
      'Pore-cleansing charcoal or gentle scrub',
      'Refreshing cooling lotion finish',
    ],
    turnaround: '15–20 Mins',
    pricingNote: 'Available as an add-on or solo refresh',
  },
  {
    id: 'express-traveller-trim',
    title: 'Express Line-Up & Traveller Trim',
    category: 'Priority',
    department: 'barber',
    filterGroup: 'express',
    description:
      'Quick neckline tidy, beard edge touch-up, or neat trim for travellers stopping briefly along the Homa Bay–Rongo Road.',
    highlights: [
      'Minimal wait time at reception',
      'Great while your prints or laundry wrap up',
      'Call ahead on +254 766 768617 to check chair queue',
    ],
    turnaround: '10–15 Mins',
    pricingNote: 'Walk-in or WhatsApp slot check',
  },
];

export const HOTEL_SERVICES: ServiceItem[] = [
  {
    id: 'morning-tea-breakfast',
    title: 'Breakfast, Kenyan Tea & Fresh Snacks',
    category: 'Dining & Refreshments',
    department: 'hotel',
    filterGroup: 'dining',
    description:
      'Hot spiced chai, coffee, fresh chapati, mandazi, eggs, and hearty morning plates served cleanly for early commuters and guests.',
    highlights: [
      'Served fresh from early morning opening',
      'Clean sunlit indoor dining seating',
      'Quick counter takeaway available',
    ],
    turnaround: 'Walk-In Dining',
    pricingNote: 'Daily kitchen menu confirmed at Junction Highway Hotel',
    featured: true,
  },
  {
    id: 'highway-lunch-dinner',
    title: 'Lunch & Highway Stopover Meals',
    category: 'Dining & Refreshments',
    department: 'hotel',
    filterGroup: 'dining',
    description:
      'Wholesome local Kenyan dishes, grilled meats, fish, ugali, rice, and seasonal greens prepared fresh for travellers and Junction-Kodoyo locals.',
    highlights: [
      'Consistent roadside stop along Homa Bay–Rongo Road',
      'Comfortable tables for individuals and families',
      'Cold sodas, bottled water & fresh juices',
    ],
    turnaround: 'Dine-In & Takeaway',
    pricingNote: 'Meal prices confirmed daily at hotel counter',
    featured: true,
  },
  {
    id: 'overnight-guest-rooms',
    title: 'Clean Overnight Guest Rooms',
    category: 'Accommodation',
    department: 'hotel',
    filterGroup: 'rooms',
    description:
      'Quiet, tidy guest bedrooms fitted with freshly laundered cotton bedding from our in-house laundry, ideal for overnight travellers and visitors.',
    highlights: [
      'Fresh linens pressed directly in-house',
      'Easy access to meals, cyber desk & laundry',
      'Call or WhatsApp ahead to check room availability',
    ],
    turnaround: 'Overnight Stay',
    pricingNote: 'Room rates confirmed on booking enquiry',
    featured: true,
  },
  {
    id: 'day-rest-rooms',
    title: 'Traveller Day-Rest & Refresh Rooms',
    category: 'Accommodation',
    department: 'hotel',
    filterGroup: 'travellers',
    description:
      'Short daytime rest spaces for long-distance drivers, business visitors, or travellers waiting for express laundry and document prep.',
    highlights: [
      'Private rest between Homa Bay & Rongo trips',
      'Pair with express haircut, shower & meal',
      'Flexible check-in confirmation via phone',
    ],
    turnaround: 'Daytime Booking',
    pricingNote: 'Subject to room availability',
  },
  {
    id: 'group-stopover-hospitality',
    title: 'Small Group Dining & Road-Trip Packs',
    category: 'Group Hospitality',
    department: 'hotel',
    filterGroup: 'travellers',
    description:
      'Pre-arranged meal service and packed refreshment orders for travel crews, local church/community groups, and visiting work teams.',
    highlights: [
      'Advance WhatsApp pre-order saves wait time',
      'Neatly packed takeaway meal boxes',
      'Combined laundry & cyber access for crews',
    ],
    turnaround: 'Pre-Booked / Walk-In',
    pricingNote: 'Group menu quoted via +254 766 768617',
  },
];

export const CARWASH_SERVICES: ServiceItem[] = [
  {
    id: 'carwash-exterior-foam',
    title: 'High-Pressure Body & Foam Wash',
    category: 'Exterior Care',
    department: 'carwash',
    filterGroup: 'exterior',
    description:
      'Thorough exterior pressure rinse, thick snow-foam soap scrub, wheel arch flush, and streak-free microfiber drying for sedans, SUVs, and pickups.',
    highlights: [
      'Safe high-pressure mud & highway dust removal',
      'Clean sky-blue microfiber towel hand drying',
      'Wheel rim cleaning and tire gloss finish',
    ],
    turnaround: '25–35 Mins',
    pricingNote: 'Confirmed by vehicle size (saloon, SUV, van)',
    featured: true,
  },
  {
    id: 'carwash-interior-vacuum',
    title: 'Interior Vacuuming & Cabin Detailing',
    category: 'Interior Care',
    department: 'carwash',
    filterGroup: 'interior',
    description:
      'Deep seat and carpet vacuuming, floor mat washing, dashboard wipe-down, and crystal-clear interior glass polishing.',
    highlights: [
      'Thorough crevice vacuuming under seats',
      'Rubber & fabric mat wash and sun-dry',
      'Non-greasy dashboard, console & door panel clean',
    ],
    turnaround: '30–40 Mins',
    pricingNote: 'Available solo or as Full Body & Interior package',
    featured: true,
  },
  {
    id: 'carwash-underbody-chassis',
    title: 'Underbody, Mud & Chassis Flush',
    category: 'Deep Exterior',
    department: 'carwash',
    filterGroup: 'exterior',
    description:
      'Targeted high-pressure under-chassis spray to clear caked murram, mud, and road grime picked up across rural and regional Homa Bay roads.',
    highlights: [
      'Clears suspension, mudguards & wheel wells',
      'Helps protect underbody metal from rust buildup',
      'Ideal after rainy-season highway travel',
    ],
    turnaround: '20–30 Mins',
    pricingNote: 'Confirmed on bay inspection',
  },
  {
    id: 'carwash-engine-upholstery',
    title: 'Engine Bay Wipe & Seat Stain Care',
    category: 'Detailing',
    department: 'carwash',
    filterGroup: 'interior',
    description:
      'Careful low-moisture engine bay dust clean and spot treatment for fabric car seats, armrests, and boot liners.',
    highlights: [
      'Protected electrical cover care during cleaning',
      'Fabric seat & boot mat spot refreshing',
      'Fresh clean-cabin deodorizing finish',
    ],
    turnaround: '40–60 Mins',
    pricingNote: 'Quoted at carwash bay prior to start',
  },
  {
    id: 'carwash-express-rinse',
    title: 'Express Highway Dust Rinse & Dry',
    category: 'Priority',
    department: 'carwash',
    filterGroup: 'express',
    description:
      'Quick exterior pressure wash, windshield bug removal, and towel dry while you grab Kenyan tea, print documents, or get a trim.',
    highlights: [
      'Designed for Homa Bay–Rongo Road stopovers',
      'Clear windshield, side mirrors & lights',
      'Park once and use all five hub services',
    ],
    turnaround: '15–20 Mins',
    pricingNote: 'Fast walk-in bay pricing',
  },
];

export const SERVICE_DIVISIONS: Record<ServiceDivisionKey, ServiceDivisionMeta> = {
  laundry: {
    key: 'laundry',
    number: '01',
    title: 'Laundry Services',
    shortTitle: 'Laundry',
    tagline: 'Washing, steam ironing & duvet care',
    heroHeading: 'Thoughtful garment care, crisp pressing, and heavy duvet washing.',
    heroSubtitle:
      'Drop off everyday clothes, work uniforms, curtains, or heavy blankets at Junction-Kodoyo and collect them clean, neatly folded, and protected.',
    heroImage: {
      src: '/src/assets/images/laundry_washing_folding_1795526442152.jpg',
      alt: 'Stainless washing machines and freshly folded cotton towels at The Junction Hub laundry counter',
    },
    galleryImages: [
      {
        id: 'l-wash',
        title: 'Sorting & Machine Wash',
        subtitle: 'Separate light, dark, and delicate cycles',
        src: '/src/assets/images/laundry_washing_folding_1795526442152.jpg',
        alt: 'Front-loading washing machines and folded laundry counter',
      },
      {
        id: 'l-duvet',
        title: 'Duvet & Blanket Storage',
        subtitle: 'Deep-cycle wash for bulky bedding',
        src: '/src/assets/images/laundry_duvet_care_1795527972203.jpg',
        alt: 'Freshly cleaned white duvets and sky-blue towels neatly stacked',
      },
      {
        id: 'l-press',
        title: 'Steam Pressing & Hanger Finish',
        subtitle: 'Ready-to-wear shirts & formal uniforms',
        src: '/src/assets/images/laundry_ironing_care_1795526442689.jpg',
        alt: 'Freshly pressed collared shirts hanging beside steam iron station',
      },
    ],
    filters: [
      { id: 'all', label: 'All Laundry' },
      { id: 'daily', label: 'Everyday Garments' },
      { id: 'bedding', label: 'Bedding & Bulk' },
      { id: 'express', label: 'Express' },
    ],
    processTitle: 'How laundry drop-off works',
    steps: [
      {
        step: '01',
        title: 'Drop Off & Sort',
        body: 'Bring clothes, uniforms, or duvets to the Junction-Kodoyo counter for color and fabric sorting.',
      },
      {
        step: '02',
        title: 'Wash, Dry & Press',
        body: 'Garments undergo clean wash cycles, thorough drying, and careful steam ironing.',
      },
      {
        step: '03',
        title: 'Folded & Ready',
        body: 'Collected neatly folded or hung, wrapped cleanly for your journey home.',
      },
    ],
    whatsappMessage:
      'Hello The Junction Hub, I would like to enquire about Laundry Services pricing and turnaround times.',
  },
  cyber: {
    key: 'cyber',
    number: '02',
    title: 'Cyber Services',
    shortTitle: 'Cyber Café',
    tagline: 'Printing, scanning & online assistance',
    heroHeading: 'Calm desktop workstations, sharp printing, and guided digital help.',
    heroSubtitle:
      'Supporting students, job seekers, small businesses, and travellers along the Homa Bay–Rongo Road with fast printing, PDF scanning, and online applications.',
    heroImage: {
      src: '/src/assets/images/cyber_cafe_workstations_1795526442794.jpg',
      alt: 'Bright desktop computer workstations inside The Junction Cyber Café',
    },
    galleryImages: [
      {
        id: 'c-desk',
        title: 'Desktop Workstations',
        subtitle: 'Quiet seating & reliable internet',
        src: '/src/assets/images/cyber_cafe_workstations_1795526442794.jpg',
        alt: 'Organized desktop computer stations with natural window light',
      },
      {
        id: 'c-scan',
        title: 'Scanning & Portal Assistance',
        subtitle: 'Flatbed PDF capture & online uploads',
        src: '/src/assets/images/cyber_digital_desk_1795527988780.jpg',
        alt: 'Cyber desk with flatbed scanner and white paper stack',
      },
      {
        id: 'c-print',
        title: 'Printing & Document Finishing',
        subtitle: 'Crisp B&W and color laser outputs',
        src: '/src/assets/images/cyber_printing_documents_1795526444880.jpg',
        alt: 'Multifunction laser printer with freshly printed documents',
      },
    ],
    filters: [
      { id: 'all', label: 'All Cyber' },
      { id: 'print', label: 'Printing & Scanning' },
      { id: 'digital', label: 'Typing & Online Help' },
    ],
    processTitle: 'Fast document & portal workflow',
    steps: [
      {
        step: '01',
        title: 'Send or Bring Files',
        body: 'Share PDFs or Word docs via WhatsApp ahead of arrival, or walk in with a flash drive.',
      },
      {
        step: '02',
        title: 'Print, Scan or Apply',
        body: 'Our desk attendant handles crisp printing, clear PDF scans, typing, or guided portal entries.',
      },
      {
        step: '03',
        title: 'Verify & Collect',
        body: 'Review your printed packet or portal confirmation receipt before stepping back on the road.',
      },
    ],
    whatsappMessage:
      'Hello The Junction Hub Cyber Desk, I would like to send a file or ask about printing and digital services.',
  },
  barber: {
    key: 'barber',
    number: '03',
    title: 'Barber Services',
    shortTitle: 'Barber Shop',
    tagline: 'Precision haircuts, fades & grooming',
    heroHeading: 'Clean cuts, crisp fades, and relaxing hot-towel grooming.',
    heroSubtitle:
      'Step out sharp whether you live in Junction-Kodoyo, attend college nearby, or are passing through along the Homa Bay–Rongo corridor.',
    heroImage: {
      src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
      alt: 'Clean modern barbershop interior with barber chairs, wall mirrors, and sky-blue towels',
    },
    galleryImages: [
      {
        id: 'b-chairs',
        title: 'Modern Grooming Chairs',
        subtitle: 'Bright mirror stations & calm space',
        src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
        alt: 'Barber chairs and bright mirrors inside the grooming bay',
      },
      {
        id: 'b-tools',
        title: 'Sanitized Clippers & Fresh Towels',
        subtitle: 'Clean tools and sky-blue cotton towels',
        src: '/src/assets/images/barber_grooming_tools_1795528332042.jpg',
        alt: 'Neatly arranged hair clippers, shears, brushes, and sky-blue towel',
      },
      {
        id: 'b-hub',
        title: 'Roadside Hub Access',
        subtitle: 'Pair your haircut with laundry or lunch',
        src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
        alt: 'Junction-Kodoyo roadside entrance to all hub services',
      },
    ],
    filters: [
      { id: 'all', label: 'All Barber' },
      { id: 'haircut', label: 'Haircuts & Fades' },
      { id: 'grooming', label: 'Beard & Hot Towel' },
      { id: 'express', label: 'Express Trim' },
    ],
    processTitle: 'What to expect at the chair',
    steps: [
      {
        step: '01',
        title: 'Walk In or Check Queue',
        body: 'Drop by Junction-Kodoyo or message +254 766 768617 to check immediate chair availability.',
      },
      {
        step: '02',
        title: 'Clean Cut & Detailing',
        body: 'Enjoy a tailored cut, beard sculpt, or hot-towel refresh using sterilized equipment.',
      },
      {
        step: '03',
        title: 'Step Out Fresh',
        body: 'Head out looking sharp—or grab tea next door at Junction Highway Hotel.',
      },
    ],
    whatsappMessage:
      'Hello The Junction Hub Barber Desk, I would like to check chair availability and haircut rates.',
  },
  hotel: {
    key: 'hotel',
    number: '04',
    title: 'Junction Highway Hotel',
    shortTitle: 'Highway Hotel',
    tagline: 'Fresh meals, tea lounge & guest rooms',
    heroHeading: 'Warm Kenyan meals, roadside refreshments, and clean overnight rooms.',
    heroSubtitle:
      'Junction Highway Hotel welcomes Homa Bay–Rongo Road travellers, local professionals, and families with freshly prepared food and restful guest accommodation.',
    heroImage: {
      src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
      alt: 'Sunlit dining room at Junction Highway Hotel with oak tables and sky-blue runners',
    },
    galleryImages: [
      {
        id: 'h-dining',
        title: 'Sunlit Dining & Tea Lounge',
        subtitle: 'Fresh meals, chai & comfortable seating',
        src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
        alt: 'Bright restaurant seating with timber tables and sky-blue runners',
      },
      {
        id: 'h-room',
        title: 'Clean Guest Rooms',
        subtitle: 'Pressed white linens & restful comfort',
        src: '/src/assets/images/hotel_guest_room_1795528333616.jpg',
        alt: 'Spotless hotel guest bedroom with white sheets and sky-blue bed runner',
      },
      {
        id: 'h-exterior',
        title: 'Convenient Junction Location',
        subtitle: 'Direct stop along Homa Bay–Rongo Road',
        src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
        alt: 'Junction-Kodoyo roadside entrance for dining, rooms, and hub services',
      },
    ],
    filters: [
      { id: 'all', label: 'All Hotel' },
      { id: 'dining', label: 'Meals & Tea' },
      { id: 'rooms', label: 'Overnight Rooms' },
      { id: 'travellers', label: 'Day Rest & Groups' },
    ],
    processTitle: 'Hospitality along the highway',
    steps: [
      {
        step: '01',
        title: 'Stop In or Book Ahead',
        body: 'Walk in for breakfast, lunch, or tea—or WhatsApp +254 766 768617 to hold a guest room.',
      },
      {
        step: '02',
        title: 'Fresh Meals & Clean Comfort',
        body: 'Enjoy freshly cooked dishes and spotless rooms maintained with our in-house laundry care.',
      },
      {
        step: '03',
        title: 'All-in-One Convenience',
        body: 'Have your clothes pressed, print travel documents, or get a fresh trim before heading on.',
      },
    ],
    whatsappMessage:
      'Hello Junction Highway Hotel, I would like to enquire about today’s menu or guest room availability.',
  },
  carwash: {
    key: 'carwash',
    number: '05',
    title: 'Carwash Services',
    shortTitle: 'Carwash',
    tagline: 'Exterior wash, underbody & interior clean',
    heroHeading: 'Sparkling exterior washes, chassis flushes, and spotless cabin detailing.',
    heroSubtitle:
      'Pull straight off the Homa Bay–Rongo Road into our paved carwash bay at Junction-Kodoyo—leave your vehicle gleaming while you enjoy laundry, cyber, barber, or hotel services.',
    heroImage: {
      src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
      alt: 'Clean roadside carwash bay washing an SUV with high-pressure water spray and sky-blue buckets',
    },
    galleryImages: [
      {
        id: 'cw-bay',
        title: 'Roadside Pressure Wash Bay',
        subtitle: 'Foam scrub & clean water rinse',
        src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
        alt: 'SUV receiving high-pressure water wash inside The Junction Hub carwash bay',
      },
      {
        id: 'cw-interior',
        title: 'Interior Vacuum & Mat Care',
        subtitle: 'Spotless seats, dashboard & microfiber towels',
        src: '/src/assets/images/carwash_interior_detailing_1795529235741.jpg',
        alt: 'Clean car interior beside folded sky-blue and white microfiber detailing cloths',
      },
      {
        id: 'cw-access',
        title: 'Direct Highway Driveway Access',
        subtitle: 'Easy pull-in at Junction-Kodoyo',
        src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
        alt: 'Junction-Kodoyo roadside entrance along the Homa Bay–Rongo Road',
      },
    ],
    filters: [
      { id: 'all', label: 'All Carwash' },
      { id: 'exterior', label: 'Exterior & Chassis' },
      { id: 'interior', label: 'Interior & Detailing' },
      { id: 'express', label: 'Express Rinse' },
    ],
    processTitle: 'How the drive-in carwash works',
    steps: [
      {
        step: '01',
        title: 'Pull Into the Bay',
        body: 'Drive straight off the Homa Bay–Rongo Road into our paved washing apron at Junction-Kodoyo.',
      },
      {
        step: '02',
        title: 'Wash, Vacuum & Detail',
        body: 'Our bay crew performs pressure rinsing, foam scrubbing, underbody flushing, and interior vacuuming.',
      },
      {
        step: '03',
        title: 'Dine, Print or Cut While Waiting',
        body: 'Relax with tea at Junction Highway Hotel, use the cyber desk, or collect dry laundry until your keys are ready.',
      },
    ],
    whatsappMessage:
      'Hello The Junction Hub Carwash, I would like to ask about wash packages and vehicle pricing.',
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
    title: 'Junction-Kodoyo Roadside Frontage',
    department: 'Premises & Reception',
    caption: 'Visible street-level entrance along the Homa Bay–Rongo Road with clean sky-blue trim.',
    src: '/src/assets/images/hub_exterior_junction_1795527987884.jpg',
    alt: 'Street-level storefront of The Junction Laundry And Services Hub in Junction-Kodoyo',
  },
  {
    id: 'gallery-hotel-dining',
    title: 'Junction Highway Hotel Dining Lounge',
    department: 'Junction Highway Hotel',
    caption: 'Bright dining room serving fresh breakfast, tea, and highway stopover lunches.',
    src: '/src/assets/images/hotel_highway_dining_1795528332703.jpg',
    alt: 'Sunlit dining hall with polished timber tables and sky-blue table runners',
  },
  {
    id: 'gallery-hotel-room',
    title: 'Spotless Guest Room Comfort',
    department: 'Junction Highway Hotel',
    caption: 'Quiet overnight accommodation dressed with freshly pressed cotton bedding.',
    src: '/src/assets/images/hotel_guest_room_1795528333616.jpg',
    alt: 'Clean guest room with white sheets, sky-blue runner, and natural morning light',
  },
  {
    id: 'gallery-barber-chairs',
    title: 'Barber Grooming Bay',
    department: 'Barber Services',
    caption: 'Clean grooming chairs, full-length mirrors, and fresh sky-blue cotton towels.',
    src: '/src/assets/images/barber_salon_chairs_1795528332331.jpg',
    alt: 'Modern barbershop chairs and mirrors inside The Junction Hub',
  },
  {
    id: 'gallery-barber-tools',
    title: 'Precision Clippers & Grooming Kit',
    department: 'Barber Services',
    caption: 'Sanitized cordless clippers, shears, and fresh towels prepared for every client.',
    src: '/src/assets/images/barber_grooming_tools_1795528332042.jpg',
    alt: 'Barber clippers, shears, brushes, and sky-blue towel on a clean counter',
  },
  {
    id: 'gallery-washers',
    title: 'Washing & Folding Counter',
    department: 'Laundry Department',
    caption: 'Front-loading machines and clean sorting tables for garments and linens.',
    src: '/src/assets/images/laundry_washing_folding_1795526442152.jpg',
    alt: 'Stainless steel washing machines and neatly folded white towels on a clean sorting counter',
  },
  {
    id: 'gallery-duvets',
    title: 'Duvet & Blanket Shelving',
    department: 'Laundry Department',
    caption: 'Deep-cleaned bedding, duvets, and fresh cotton stacks stored cleanly for collection.',
    src: '/src/assets/images/laundry_duvet_care_1795527972203.jpg',
    alt: 'Neatly folded white duvets, blankets, and sky-blue towels arranged on timber shelving',
  },
  {
    id: 'gallery-ironing',
    title: 'Steam Pressing & Hanger Care',
    department: 'Laundry Department',
    caption: 'Dedicated pressing station keeping collared shirts and uniforms crisp.',
    src: '/src/assets/images/laundry_ironing_care_1795526442689.jpg',
    alt: 'Freshly pressed shirts on wooden hangers beside a steam ironing station',
  },
  {
    id: 'gallery-cyber',
    title: 'Desktop Cyber Workstations',
    department: 'Cyber Café',
    caption: 'Bright, organized computer desks suited for students and remote work.',
    src: '/src/assets/images/cyber_cafe_workstations_1795526442794.jpg',
    alt: 'Clean modern cyber cafe workstations with desktop monitors and natural daylight',
  },
  {
    id: 'gallery-scanning',
    title: 'Scanning & Digital Assistance Counter',
    department: 'Cyber Café',
    caption: 'Guided digital applications, flatbed document scanning, and neat paper prep.',
    src: '/src/assets/images/cyber_digital_desk_1795527988780.jpg',
    alt: 'Modern cyber counter with flatbed document scanner, white paper stacks, and monitor',
  },
  {
    id: 'gallery-printing',
    title: 'Printing & Document Desk',
    department: 'Cyber Café',
    caption: 'Multifunction printing, scanning, and document preparation counter.',
    src: '/src/assets/images/cyber_printing_documents_1795526444880.jpg',
    alt: 'Multifunction laser printer and tidy printed reports at the cyber service counter',
  },
  {
    id: 'gallery-carwash-bay',
    title: 'Drive-In Carwash Pressure Bay',
    department: 'Carwash Services',
    caption: 'High-pressure exterior washing, foam rinse, and clean microfiber drying.',
    src: '/src/assets/images/carwash_bay_exterior_1795529235094.jpg',
    alt: 'SUV being washed inside The Junction Hub roadside carwash bay',
  },
  {
    id: 'gallery-carwash-interior',
    title: 'Cabin Vacuum & Interior Detailing',
    department: 'Carwash Services',
    caption: 'Clean seat vacuuming, mat washing, and dashboard finishing with sky-blue towels.',
    src: '/src/assets/images/carwash_interior_detailing_1795529235741.jpg',
    alt: 'Spotless vehicle interior with folded sky-blue and white microfiber detailing towels',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'Five Hubs, One Stop',
    detail: 'Laundry, cyber desk, barber, highway hotel, and carwash together.',
  },
  {
    number: '02',
    title: 'Direct Highway Access',
    detail: 'Right on the Homa Bay–Rongo Road at Junction-Kodoyo.',
  },
  {
    number: '03',
    title: 'Clean Standards Throughout',
    detail: 'Fresh hotel linens, sanitized clippers, and clean microfiber towels.',
  },
  {
    number: '04',
    title: 'Quick WhatsApp Coordination',
    detail: 'Send print files or check rooms and bay queues on +254 766 768617.',
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Dropped off my duvet, printed lecture notes, and got a quick trim at one stop.',
    author: 'Brenda Achieng',
    role: 'Student · Laundry & Cyber',
    context: 'Illustrative scenario · Junction-Kodoyo',
  },
  {
    id: 't2',
    quote:
      'A high-pressure chassis wash while sipping chai at the hotel saves real travel time.',
    author: 'David Otieno',
    role: 'Motorist · Carwash & Hotel',
    context: 'Illustrative scenario · Homa Bay–Rongo Road',
  },
  {
    id: 't3',
    quote:
      'Quiet lunch seating while tender PDFs are printed and bound right next door.',
    author: 'Samuel Odhiambo',
    role: 'Business Owner · Cyber & Hotel',
    context: 'Illustrative scenario · Homa Bay County',
  },
  {
    id: 't4',
    quote:
      'Crisp pressed sheets in clean overnight rooms plus a morning haircut before hitting the road.',
    author: 'Grace Nyambura',
    role: 'Traveller · Hotel, Barber & Laundry',
    context: 'Illustrative scenario · Homa Bay–Rongo Road',
  },
  {
    id: 't5',
    quote:
      'Full cabin vacuuming finished on schedule right alongside my pressed work shirts.',
    author: 'Kevin Mwangi',
    role: 'Field Engineer · Carwash & Laundry',
    context: 'Illustrative scenario · Junction-Kodoyo',
  },
];

export const EMPLOYEE_ROLES: EmployeeRole[] = [
  {
    id: 'hub-manager',
    code: '01',
    title: 'Hub Supervisor & Operations Lead',
    department: 'management',
    departmentLabel: 'Management · Operations',
    placeholderHolder: 'Role holder to be confirmed by management',
    summary:
      'Oversees daily coordination across Laundry, Cyber Café, Barber Shop, Junction Highway Hotel, and Carwash at Junction-Kodoyo.',
    responsibilities: [
      'Confirm daily operating hours, stock readiness, and service standards across all 5 hubs',
      'Respond to telephone and WhatsApp enquiries on +254 766 768617',
      'Coordinate bulk laundry accounts, group meals, and overnight room bookings',
      'Ensure clean quality checks across completed orders and guest areas',
    ],
    customerTouchpoint: 'Main Reception Counter & WhatsApp Business Line',
    image: {
      src: '/src/assets/images/team_hub_supervisor_1795529811442.jpg',
      alt: 'Hub supervisor at The Junction Hub reception counter holding an operations checklist',
    },
  },
  {
    id: 'laundry-wash-specialist',
    code: '02',
    title: 'Laundry Care & Steam Pressing Attendant',
    department: 'laundry',
    departmentLabel: 'Laundry Services',
    placeholderHolder: 'Role holder to be confirmed by management',
    summary:
      'Manages garment intake, fabric sorting, duvet cycles, crisp steam ironing, and protective packaging for walk-in and hotel linens.',
    responsibilities: [
      'Log incoming clothing bags and separate white, colored, and delicate items',
      'Run deep-cycle washing and drying for heavy duvets, blankets, and hotel bedding',
      'Steam press office shirts, uniforms, and trousers neatly on hangers',
      'Wrap completed orders cleanly and trigger pickup notifications',
    ],
    customerTouchpoint: 'Laundry Drop-Off & Hanger Pickup Desk',
    servicePage: 'laundry',
    image: {
      src: '/src/assets/images/team_laundry_attendant_1795529811256.jpg',
      alt: 'Laundry care attendant steam pressing freshly washed white collared shirts',
    },
  },
  {
    id: 'cyber-digital-officer',
    code: '03',
    title: 'Cyber Café & Document Services Officer',
    department: 'cyber',
    departmentLabel: 'Cyber Services',
    placeholderHolder: 'Role holder to be confirmed by management',
    summary:
      'Assists walk-in students, businesses, and travellers with desktop access, high-speed printing, PDF scanning, typing, and online portals.',
    responsibilities: [
      'Produce sharp B&W and color prints, double-sided copies, and PDF scans',
      'Guide customers through online portal applications and document uploads',
      'Prepare advance WhatsApp print orders for quick roadside pickup',
      'Maintain clean workstation privacy between sessions',
    ],
    customerTouchpoint: 'Desktop Workstations & Printing Counter',
    servicePage: 'cyber',
    image: {
      src: '/src/assets/images/team_cyber_officer_1795529812278.jpg',
      alt: 'Cyber cafe services officer assisting a client with printed documents at a computer desk',
    },
  },
  {
    id: 'master-barber',
    code: '04',
    title: 'Senior Barber & Grooming Specialist',
    department: 'barber',
    departmentLabel: 'Barber Services',
    placeholderHolder: 'Role holder to be confirmed by management',
    summary:
      'Delivers clean fades, classic haircuts, beard sculpting, and warm-towel refreshes in a calm, hygienic grooming bay.',
    responsibilities: [
      'Consult with clients on preferred haircut taper, fade, and beard lines',
      'Sterilize clippers, shears, and combs thoroughly between every appointment',
      'Provide refreshing hot-towel facial treatments and kids trims',
      'Coordinate walk-in and WhatsApp queue times smoothly',
    ],
    customerTouchpoint: 'Barber Grooming Chairs',
    servicePage: 'barber',
    image: {
      src: '/src/assets/images/team_barber_specialist_1795529814089.jpg',
      alt: 'Senior barber shaping a clean tapered fade haircut with cordless clippers',
    },
  },
  {
    id: 'hotel-hospitality-lead',
    code: '05',
    title: 'Junction Highway Hotel Chef & Hospitality Host',
    department: 'hotel',
    departmentLabel: 'Junction Highway Hotel',
    placeholderHolder: 'Role holder to be confirmed by management',
    summary:
      'Leads fresh kitchen meal preparation, tea service, dining hall hospitality, and spotless guest room turnover.',
    responsibilities: [
      'Prepare fresh breakfast, spiced Kenyan tea, and wholesome highway lunches',
      'Welcome dining guests and assemble pre-booked takeaway road-trip packs',
      'Coordinate room housekeeping with fresh linens from our in-house laundry',
      'Confirm room availability and meal specials for callers',
    ],
    customerTouchpoint: 'Junction Highway Hotel Dining Room & Guest Desk',
    servicePage: 'hotel',
    image: {
      src: '/src/assets/images/team_hotel_chef_1795529812533.jpg',
      alt: 'Hospitality chef serving fresh spiced Kenyan tea and chapatis in the hotel dining hall',
    },
  },
  {
    id: 'carwash-detailing-lead',
    code: '06',
    title: 'Carwash Bay Attendant & Detailing Specialist',
    department: 'carwash',
    departmentLabel: 'Carwash Services',
    placeholderHolder: 'Role holder to be confirmed by management',
    summary:
      'Operates high-pressure vehicle washing, underbody mud flushing, interior vacuuming, and clean microfiber drying for motorists along the corridor.',
    responsibilities: [
      'Greet arriving drivers and confirm exterior, full-body, or express wash packages',
      'Perform high-pressure rinse, foam wash, and under-chassis mud removal',
      'Vacuum interiors, wash floor mats, and wipe dashboards using fresh microfiber towels',
      'Coordinate vehicle handover cleanly while guests dine or collect laundry',
    ],
    customerTouchpoint: 'Drive-In Carwash Bay & Key Handover Counter',
    servicePage: 'carwash',
    image: {
      src: '/src/assets/images/team_carwash_specialist_1795529811588.jpg',
      alt: 'Carwash specialist drying a sparkling clean silver car hood with a sky-blue microfiber towel',
    },
  },
];
