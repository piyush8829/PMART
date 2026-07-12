export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  specs: { [key: string]: string };
  isTrending?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  flashSaleEnds?: string; // ISO String
  inStock: number;
  sku: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "AeroBlade Carbon Mechanical Keyboard",
    tagline: "Aerospace carbon fiber, hot-swap tactical switches, crimson aura.",
    price: 299,
    originalPrice: 349,
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewsCount: 124,
    description: "The AeroBlade is a mechanical keyboard engineered for collectors who demand raw rigidity and custom acoustic dampening. Built around an aerospace-grade CNC-milled dry carbon fiber shell, it features hand-tuned stabilizers, silent linear tactical switches, and individual per-key crimson micro-LED configurations. Connect via ultra-low latency wireless or gold-plated mechanical braided cable.",
    specs: {
      "Chassis Material": "CNC-Milled Dry Carbon Fiber (3K Weave)",
      "Switch Type": "PMART Crimson Silent Linear (Pre-lubed)",
      "Keycaps": "Double-shot PBT Cherry Profile (Crimson Legends)",
      "Connectivity": "Tri-Mode (2.4Ghz, Bluetooth 5.1, USB-C)",
      "Battery Life": "Up to 150 hours (LED off)",
      "Weight": "1.45 kg"
    },
    isTrending: true,
    isBestSeller: true,
    isFlashSale: true,
    flashSaleEnds: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    inStock: 14,
    sku: "PM-AERO-KEY-01"
  },
  {
    id: "prod-2",
    name: "Vulcan X-9 Wireless Headphones",
    tagline: "Planar magnetic audio, ultra-dense carbon cups, crimson thread stitching.",
    price: 449,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    reviewsCount: 96,
    description: "Immerse yourself in acoustic perfection with the Vulcan X-9. Integrating massive 90mm planar magnetic drivers inside pressure-sealed, dry carbon fiber acoustic cups, it delivers zero-distortion bass and shimmering highs. Features dynamic active noise canceling, customizable soundstage, and memory foam cushions stitched with signature PMART red heavy-duty thread.",
    specs: {
      "Drivers": "90mm Planar Magnetic Custom Drivers",
      "Frequency Response": "5Hz - 42kHz",
      "Acoustic Chambers": "Dry Carbon Fiber Shells",
      "Cushions": "Memory Foam covered in Alcantara & Red Thread",
      "Active Noise Canceling": "Adaptive Hybrid ANC (-45dB)",
      "Battery Life": "Up to 40 Hours (ANC On)"
    },
    isTrending: true,
    isBestSeller: false,
    inStock: 8,
    sku: "PM-VULC-AUD-09"
  },
  {
    id: "prod-3",
    name: "Apex Chrono Carbon Fiber Watch",
    tagline: "Precision automatic mechanical caliber, Ruby-jeweled bezel, pure carbon face.",
    price: 899,
    originalPrice: 1200,
    category: "Timepieces",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 5.0,
    reviewsCount: 42,
    description: "The ultimate fusion of high-precision horology and structural carbon physics. Powered by a self-winding Miyota 9015 mechanical caliber visible through a sapphire exhibition caseback. The front watch dial is sliced from a single block of raw carbon weave, accented by glowing red Super-LumiNova markers and deep synthetic ruby bezel gems.",
    specs: {
      "Movement": "Miyota Caliber 9015 Automatic (42-Hr Reserve)",
      "Case Diameter": "43.5 mm",
      "Case Material": "Forged Carbon composite",
      "Bezel": "Anodized Ruby Aluminum with synthetic crystals",
      "Water Resistance": "100 Meters (10 ATM)",
      "Strap": "Anti-dust Vulcanized Red Silicone with Titanium Buckle"
    },
    isTrending: true,
    isBestSeller: true,
    inStock: 5,
    sku: "PM-APEX-WAT-77"
  },
  {
    id: "prod-4",
    name: "Nexus-Z Minimalist Wallet",
    tagline: "Aerospace carbon plating, spring-loaded quick eject, crimson titanium clip.",
    price: 85,
    originalPrice: 110,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588444650733-d0c529ba590a?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.7,
    reviewsCount: 215,
    description: "Say goodbye to bulky back pockets. The Nexus-Z is a laser-cut, dual-plate carbon wallet that accommodates up to 12 credit cards and banknotes, shielding them from illegal RFID frequencies. Features a patented mechanical spring-loaded card ejection system and an anodized red titanium cash band clip.",
    specs: {
      "Material": "Grade 5 Titanium & Forged Carbon Fiber",
      "Capacity": "1-12 Cards + Cash",
      "RFID Blocking": "Yes (Blocks 13.56 MHz signals)",
      "Ejection Mechanism": "Frictionless Lever System",
      "Thickness": "6.2 mm (Empty)"
    },
    isTrending: false,
    isBestSeller: true,
    isFlashSale: true,
    flashSaleEnds: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    inStock: 30,
    sku: "PM-NEXZ-WAL-04"
  },
  {
    id: "prod-5",
    name: "Valkyrie-15 Tactical Cyber Backpack",
    tagline: "Stiff polycarbonate exoskeleton, water-tight zippers, customizable crimson LED strip.",
    price: 149,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    reviewsCount: 78,
    description: "The Valkyrie-15 is a rugged, weatherproof backpack designed for digital nomads and tech enthusiasts. It features a semi-rigid carbon-textured hardshell core that distributes load weight symmetrically and provides impact shielding for laptops up to 16 inches. Its exterior features water-tight zipper channels and a low-energy red LED strip powered by any internal power bank.",
    specs: {
      "Shell Material": "Polycarbonate with Thermoformed Carbon Look",
      "Base Material": "1680D Ballistic Nylon Cordura",
      "Capacity": "24 Liters",
      "Laptop Compartment": "Padded, Suspended up to 16.2 inch",
      "Waterproofing": "IPX4 Rain-resistant",
      "Power Connection": "External USB-A and USB-C bypass Ports"
    },
    isTrending: false,
    isBestSeller: false,
    inStock: 12,
    sku: "PM-VALK-BPK-15"
  },
  {
    id: "prod-6",
    name: "Helix Forge Solid Carbon Ring",
    tagline: "Seamless forged carbon structure, 18k crimson-gold electroplated lining.",
    price: 199,
    category: "Timepieces",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.6,
    reviewsCount: 54,
    description: "The Helix Forge is an elegant, lightweight band crafted from a single, unbroken filament of high-modulus forged carbon fiber, pressurized at 120 atmospheres. The inner core is custom lined with a rich, crimson gold electroplated finish that feels incredibly smooth on the skin.",
    specs: {
      "Structure": "Unidirectional Forged Carbon",
      "Inner Core": "Crimson electroplated hypoallergenic copper-bronze base",
      "Band Width": "8.0 mm",
      "Thickness": "2.1 mm",
      "Weight": "Under 3.2 grams"
    },
    isTrending: true,
    isBestSeller: false,
    inStock: 25,
    sku: "PM-FORG-RNG-08"
  },
  {
    id: "prod-7",
    name: "Apex Titanium Mechanical Pen",
    tagline: "Grade 5 aerospace titanium, ruby-red tactical bolt-action system.",
    price: 125,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviewsCount: 31,
    description: "A solid titanium instrument engineered for tactile supremacy. Utilizing a high-tolerance internal spring and ruby anodized mechanical bolt-action slide, this pen offers incredibly addictive click engagement. Precision weight-balanced near the grip to reduce joint strain during long drafting sessions.",
    specs: {
      "Chassis": "CNC Lathe Grade 5 Titanium Alloy",
      "Accents": "Ruby Anodized Aluminum 6061",
      "Ink System": "Schmidt EasyFlow 9000M (Black loaded)",
      "Length": "136 mm",
      "Diameter": "10.4 mm",
      "Weight": "42 grams"
    },
    isTrending: false,
    isBestSeller: false,
    inStock: 18,
    sku: "PM-TITN-PEN-88"
  },
  {
    id: "prod-8",
    name: "Spectre Crimson Premium Desk Mat",
    tagline: "Stitch-framed premium tracking fabric, thick shock-absorbent base, lava-glow graphics.",
    price: 39,
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1632292224971-0d45778bd364?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.7,
    reviewsCount: 340,
    description: "A desk mat that redefines tactical workstation styling. With water-resistant micro-woven surface structures tailored for pixel-perfect cursor tracking. Complete with robust 4mm natural rubber shock absorption underlays and bound together by rich crimson heavy-stitch edge wrapping.",
    specs: {
      "Size": "900 mm x 400 mm",
      "Thickness": "4.0 mm",
      "Surface Fabric": "Hydrophobic Silk-blend high-tracking knit",
      "Base Mat": "Non-slip vulcanized rubber base",
      "Bordering": "Interlocking micro-knit Crimson stitch"
    },
    isTrending: false,
    isBestSeller: true,
    inStock: 50,
    sku: "PM-SPEC-MAT-12"
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    userName: "Marcus Vance",
    rating: 5,
    date: "2026-06-28",
    comment: "Absolutely mind-blowing quality. The carbon fiber chassis on the AeroBlade is real, thick, and has a fantastic heavy resonance. PMART's service was lightning-fast. Best luxury tech store online.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "rev-2",
    userName: "Elena Rostova",
    rating: 5,
    date: "2026-07-04",
    comment: "The Vulcan headphones sound pristine. The planer drivers are extremely crisp and the crimson stitching matches my workspace flawlessly. Highly recommend the VIP packaging!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "rev-3",
    userName: "Dave Kim",
    rating: 4,
    date: "2026-07-09",
    comment: "The titanium pen has an amazing mechanical feel, satisfying bolt action clicks, and premium balance. Looking forward to more red-accent gear from PMART.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  }
];

export const FAQS = [
  {
    question: "What makes PMART products unique?",
    answer: "PMART specializes in premium, curated high-performance items designed around raw materials like Dry CNC Carbon Fiber, Aerospace Titanium, and Hand-stitched Alcantara, accented with a cohesive, ultra-modern crimson palette. We manufacture in limited luxury batches to ensure flawless quality control."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, PMART offers secure, insured global express shipping. Custom duties and taxes are fully calculated and pre-paid during our checkout process so your order experiences zero customs delays."
  },
  {
    question: "What is your warranty policy?",
    answer: "All PMART hardware, audio gear, and elite timepieces are backed by our 3-year Carbon Shield international warranty, covering any physical defect or mechanical/electronic failure under normal operating environments."
  },
  {
    question: "How do I trace my delivery?",
    answer: "Upon checkout confirmation, you will receive a secure tracking token and link via email or your active PMART Dashboard to inspect your package's temperature, location, and handling status in real-time."
  }
];

export const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "The Physics of CNC Forged Carbon Fiber",
    excerpt: "Discover why dry forged carbon composite is redefining aerospace structural rigidity and luxury item design.",
    date: "July 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "blog-2",
    title: "Planar Magnetic Drivers vs Dynamic Audio",
    excerpt: "An in-depth sonic breakdown of how planar transducers deliver pristine acoustics with near-zero harmonic distortion.",
    date: "June 25, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800"
  }
];
