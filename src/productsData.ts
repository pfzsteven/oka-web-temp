import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "oka-thermostat-v2",
    name: "OKA IntelliTemp Smart Thermostat V2",
    shortDescription: "Saves energy on average 15% on heating and 12% on cooling with AI presence learning.",
    description: "The OKA IntelliTemp Smart Thermostat V2 adapts to your life and seasonal changes. After just one week of use, it programs itself to your preferred temperatures and schedules. Backed by energy star certification, it connects and integrates seamlessly to standard home ecosystems.",
    price: 179.99,
    originalPrice: 219.00,
    rating: 4.8,
    reviewCount: 1240,
    iconName: "Thermostat", // custom representation mapping
    category: "Climate",
    specs: [
      "Energy Star certified (avg. savings of $140/yr)",
      "Universal compatibility (24V C-wire required for most systems)",
      "Supports Geofencing, multi-room sensors, and humidity control",
      "Full offline fallback support"
    ],
    stock: 24
  },
  {
    id: "oka-secure-lock-pro",
    name: "OKA SecureGuard Smart Deadbolt Pro",
    shortDescription: "Ultra-fast 3D fingerprint recognition deadbolt with physical and digital secure entry keys.",
    description: "Upgrade your front door security. The SecureGuard deadbolt can be unlocked via advanced 3D fingerprint scanner, customizable digital pincodes, backup mechanical keys, or your smartphone. Integrates with existing deadbolts in under 15 minutes without professional help.",
    price: 229.00,
    originalPrice: 269.99,
    rating: 4.9,
    reviewCount: 852,
    iconName: "Lock",
    category: "Security",
    specs: [
      "0.3s ultra-fast fingerprint identification & recognition",
      "ANSI Grade 1 certified security rating (highest grade)",
      "IP65 weather resistant structural design",
      "Built-in Wi-Fi, absolutely no extra hubs required"
    ],
    stock: 12
  },
  {
    id: "oka-cam-360",
    name: "OKA Horizon 360° Smart Guard Cam",
    shortDescription: "2K resolution interior pan-tilt security dome with local edge AI recognition.",
    description: "Keep watch over every corner of your home. Incorporates 360-degree silent horizontal panning and 110-degree vertical control. Smart local edge AI detects persons, pets, and baby cries without recurring subscription fees.",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 2314,
    iconName: "Camera",
    category: "Security",
    specs: [
      "Crystal clear 2K Ultra HD with enhanced infrared night vision",
      "Two-way real-time audio with active noise-cancelling mics",
      "Supports physical privacy shutter with single tap",
      "MicroSD (up to 256GB) and secure server-less storage options"
    ],
    stock: 45
  },
  {
    id: "oka-plug-fourpack",
    name: "OKA Smart Energy Plug Quad (4-Pack)",
    shortDescription: "Compact smart plugs with precise socket real-time power monitoring and offline schedules.",
    description: "Turn standard household fans, heaters, or appliances into smart assistants. Monitor exact carbon footprints and electricity usage directly. The slim, stackable design doesn't block adjacent electrical sockets.",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.7,
    reviewCount: 3410,
    iconName: "Zap",
    category: "Energy",
    specs: [
      "Full individual real-time power monitoring and reporting",
      "Space-saving 1.5inch compact design style",
      "Robust scheduling, timers, and randomized 'away mode'",
      "Overload physical surge protection built right in"
    ],
    stock: 120
  },
  {
    id: "oka-ambient-bar-duo",
    name: "OKA AuraLink Smart Ambient Bars (Pair)",
    shortDescription: "Vibrant RGBIC atmospheric lighting with automatic screen sync and smart timers.",
    description: "Transform your home entertainment or bedroom ambience. The AuraLink dynamic twin high-luminosity bars sync 16 million colors with your smart monitor, TV sound, or local ambient noise, ideal for movie night or deep focus sessions.",
    price: 129.99,
    originalPrice: 159.00,
    rating: 4.7,
    reviewCount: 562,
    iconName: "Tv",
    category: "Lighting",
    specs: [
      "Advanced multi-color RGBIC segmented tracking customization",
      "Includes premium table mounts and universal screen brackets",
      "Integrated music sync mode with highly responsive local mic",
      "Seamless timers, sunrise wakeups, and focus themes"
    ],
    stock: 32
  }
];
