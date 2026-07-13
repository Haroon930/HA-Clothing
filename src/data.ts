import { Product, Testimonial } from './types';

export const HERO_PRIMARY = "/src/assets/images/hero_primary_1783956225655.jpg";
export const CATEGORY_JACKETS_IMG = "/src/assets/images/category_jackets_1783956239828.jpg";
export const CATEGORY_HOODIES_IMG = "/src/assets/images/category_hoodies_1783956256983.jpg";
export const CATEGORY_PANTS_IMG = "/src/assets/images/category_pants_1783956272067.jpg";
export const PRODUCT_MAIN_IMG = "/src/assets/images/product_main_1783956285361.jpg";

export const PRODUCTS: Product[] = [
  // --- JACKETS ---
  {
    id: "jackets-1",
    slug: "blackout-bomber",
    name: "Blackout Bomber",
    category: "jackets",
    price: 185,
    compareAtPrice: 220,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" },
      { name: "Crimson Accent", hex: "#E1000F" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      PRODUCT_MAIN_IMG,
      HERO_PRIMARY,
      CATEGORY_JACKETS_IMG,
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop"
    ],
    description: "The definitive centerpiece of the Blackout Collection. Oversized fit, dual-layered water-repellent shell, and lined with an intense Crimson Red satin interior flash. Features heavy-gauge industrial zips, drop shoulders, and reinforced ribbed cuffs.",
    materials: "Outer: 100% Technical Nylon. Lining: 100% Viscose Satin. Hardware: Matte Black Zinc Alloy. Care: Professional dry clean only.",
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 48
  },
  {
    id: "jackets-2",
    slug: "crimson-zip-trucker",
    name: "Crimson-Zip Trucker",
    category: "jackets",
    price: 165,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#3A3A3A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=600&auto=format&fit=crop",
      CATEGORY_JACKETS_IMG,
      PRODUCT_MAIN_IMG,
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop"
    ],
    description: "A brutalist reconstruction of the classic trucker jacket. Crafted in heavy 14oz raw black denim, tailored with sharp architectural panels, and contrasted with high-visibility red contrast zipper tapes.",
    materials: "100% Rigid Cotton Denim (14oz). Contrast tape nylon zippers. Care: Wash cold inside out, hang dry.",
    rating: 4.7,
    reviewCount: 24
  },
  {
    id: "jackets-3",
    slug: "shadow-puffer",
    name: "Shadow Puffer",
    category: "jackets",
    price: 210,
    compareAtPrice: 245,
    colors: [
      { name: "Matte Black", hex: "#121212" },
      { name: "Signal Red", hex: "#E1000F" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop",
      HERO_PRIMARY,
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Ultra-warm insulated outerwear engineered to resist the harshest elements. Features high-loft eco-down insulation, custom geometric quilting, a wire-braced detachable hood, and storm-guard fleece cuffs.",
    materials: "Shell: Ripstop Polyester with DWR coating. Insulation: 100% Recycled Poly-Down. Contrast details in Signature Red webbing.",
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 37
  },
  {
    id: "jackets-4",
    slug: "red-line-windbreaker",
    name: "Red-Line Windbreaker",
    category: "jackets",
    price: 135,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
      CATEGORY_JACKETS_IMG,
      PRODUCT_MAIN_IMG
    ],
    description: "Ultra-lightweight windproof shield with custom taping. Reflective Red-Line detailing along the spine and side seams. Drawstring adjustment at hem and hood for customized silhouette sculpting.",
    materials: "100% Crinkle Nylon. Weatherproof taped seams. Care: Gentle machine wash cold.",
    isNew: true,
    rating: 4.5,
    reviewCount: 16
  },
  {
    id: "jackets-5",
    slug: "midnight-overshirt",
    name: "Midnight Overshirt",
    category: "jackets",
    price: 115,
    colors: [
      { name: "Carbon Black", hex: "#1C1C1C" },
      { name: "Off-White", hex: "#F3F1EC" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop"
    ],
    description: "The ultimate transitional layer. Combining the structured silhouette of a work jacket with the comfort of heavy flannel. Features dual chest patch pockets with red rivet reinforcements.",
    materials: "80% Wool, 20% Technical Poly Blend. Red heavy stitching highlights.",
    rating: 4.6,
    reviewCount: 21
  },

  // --- HOODIES ---
  {
    id: "hoodies-1",
    slug: "core-oversized-hoodie",
    name: "Core Oversized Hoodie",
    category: "hoodies",
    price: 95,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" },
      { name: "Bone White", hex: "#F3F1EC" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      CATEGORY_HOODIES_IMG,
      HERO_PRIMARY,
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Premium heavy-weight streetwear essential. Double-lined hood, dropped shoulders, relaxed boxy body, and signature red hem label. No drawstrings for a ultra-minimalist clean drape.",
    materials: "100% Organic Cotton French Terry (480 GSM). Brushed interior.",
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 112
  },
  {
    id: "hoodies-2",
    slug: "red-drawstring-hoodie",
    name: "Red Drawstring Hoodie",
    category: "hoodies",
    price: 98,
    compareAtPrice: 110,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=600&auto=format&fit=crop",
      CATEGORY_HOODIES_IMG,
      PRODUCT_MAIN_IMG
    ],
    description: "Sleek and moody silhouette highlighted by an extra-thick contrast drawstring in signature crimson red with metal tips. Features a subtle front embroidery monogram logo.",
    materials: "85% Cotton, 15% Polyester (420 GSM). Anodized aluminum aglets.",
    isNew: true,
    rating: 4.8,
    reviewCount: 39
  },
  {
    id: "hoodies-3",
    slug: "layer-zip-hoodie",
    name: "Layer Zip Hoodie",
    category: "hoodies",
    price: 105,
    colors: [
      { name: "Pitch Black", hex: "#050505" },
      { name: "Bone White", hex: "#F3F1EC" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
      CATEGORY_HOODIES_IMG,
      HERO_PRIMARY
    ],
    description: "Designed for effortless layering. Features a dual-ended custom red metal zipper, offset side pockets, and cross-over front collar design.",
    materials: "100% Heavy Combed Cotton (450 GSM). Two-way YKK custom zipper.",
    rating: 4.6,
    reviewCount: 28
  },
  {
    id: "hoodies-4",
    slug: "heavyweight-crewneck",
    name: "Heavyweight Crewneck",
    category: "hoodies",
    price: 85,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" },
      { name: "Concrete Grey", hex: "#8A8A8A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1609873814058-a8928924184a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Boxy, vintage athletic cut sweat without a hood. Reinforced coverstitch seams and a heavy ribbed crew collar. Minimalist red brand flag label in side seam.",
    materials: "100% Loopback Cotton (500 GSM). Pre-shrunk for the perfect fit.",
    rating: 4.7,
    reviewCount: 54
  },
  {
    id: "hoodies-5",
    slug: "split-panel-hoodie",
    name: "Split-Panel Hoodie",
    category: "hoodies",
    price: 110,
    colors: [
      { name: "Black / Red", hex: "#E1000F" }
    ],
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop",
      CATEGORY_HOODIES_IMG
    ],
    description: "An aggressive colorblocked garment. Vertically divided panels of carbon black and signature crimson red. Graphic asymmetric design for a loud streetwear statement.",
    materials: "90% Cotton, 10% Poly Tech French Terry. Double needle stitch seams.",
    isNew: true,
    rating: 4.4,
    reviewCount: 12
  },

  // --- PANTS ---
  {
    id: "pants-1",
    slug: "tapered-tech-cargo",
    name: "Tapered Tech Cargo",
    category: "pants",
    price: 125,
    compareAtPrice: 145,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      CATEGORY_PANTS_IMG,
      HERO_PRIMARY,
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Multi-pocket functional cargo pants designed with a sharp, modern taper. Heavyweight ripstop fabric, reinforced knee panels, red utility strap accents, and ankle cinch cords for modular styling.",
    materials: "85% Cotton Ripstop, 15% Nylon Cordura. High durability weave.",
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 76
  },
  {
    id: "pants-2",
    slug: "red-stripe-track-pant",
    name: "Red-Stripe Track Pant",
    category: "pants",
    price: 90,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
      CATEGORY_PANTS_IMG
    ],
    description: "Luxury sportswear track pants. Styled with a razor-sharp knitted stripe in crimson red running down the outer leg. Fitted with flat-lying zip pockets and zipper ankle vents.",
    materials: "Heavy Double-Knit Interlock Poly (380 GSM). Ribbed waistband with interior red drawcord.",
    isNew: true,
    rating: 4.7,
    reviewCount: 33
  },
  {
    id: "pants-3",
    slug: "straight-utility-pant",
    name: "Straight Utility Pant",
    category: "pants",
    price: 115,
    colors: [
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Rich Black", hex: "#0A0A0A" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop",
      CATEGORY_PANTS_IMG,
      PRODUCT_MAIN_IMG
    ],
    description: "Workwear silhouette redesigned for street aesthetic. Straight-leg cut with hammer loop, deep carpenter utility pockets, and triple-stitch crimson red structural seams.",
    materials: "100% Cotton Duck Canvas (12oz). Reinforced brass hardware.",
    rating: 4.6,
    reviewCount: 42
  },
  {
    id: "pants-4",
    slug: "relaxed-fleece-pant",
    name: "Relaxed Fleece Pant",
    category: "pants",
    price: 85,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" },
      { name: "Bone White", hex: "#F3F1EC" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=600&auto=format&fit=crop",
      CATEGORY_PANTS_IMG
    ],
    description: "Ultra-comfortable heavy fleece jogger. Elasticated waistband and cuffs, deep hand pockets, and minimal red logo embroidery on the left thigh. Pairs perfectly with the Core Hoodie.",
    materials: "100% Combed Cotton fleece. Brushed interior back.",
    rating: 4.9,
    reviewCount: 61
  },
  {
    id: "pants-5",
    slug: "zip-cuff-jogger",
    name: "Zip-Cuff Jogger",
    category: "pants",
    price: 110,
    compareAtPrice: 130,
    colors: [
      { name: "Rich Black", hex: "#0A0A0A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop",
      CATEGORY_PANTS_IMG
    ],
    description: "Sleek tapered activewear joggers featuring fully waterproof, custom red-sealed ankle zipper expansions. Highly breathable technical-stretch weave.",
    materials: "88% Nylon Tech-Stretch, 12% Spandex. Water-resistant coating.",
    isNew: true,
    rating: 4.5,
    reviewCount: 19
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "The weight and drape of the Core Hoodie is insane. 480 GSM organic cotton is no joke. The red hem accent is subtle but stands out.",
    author: "ZACK R.",
    rating: 5,
    location: "New York"
  },
  {
    id: "test-2",
    quote: "Blackout Bomber completely blew my expectations. The red satin interior is incredibly soft and looks amazing when it catches the light.",
    author: "ELENA M.",
    rating: 5,
    location: "Berlin"
  },
  {
    id: "test-3",
    quote: "Tapered Cargos are heavy duty. Cinch legs, red buckles, deep pockets. It's rare to find high-fashion aesthetics with actual utility.",
    author: "MARCUS T.",
    rating: 5,
    location: "Tokyo"
  }
];
