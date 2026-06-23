import { CustomerCase } from "./types";

export const CUSTOMER_CASES: CustomerCase[] = [
  {
    id: "case-1",
    customerName: "The Sterling Family",
    role: "Homeowners & Parents",
    location: "Colorado, USA",
    title: "Slashing Heating Bills by 22% in Rocky Mountain Winter",
    content: "We installed the OKA IntelliTemp Thermostat V2 and three Smart Energy Plugs before winter. The thermostat's ability to learn our busy kids' schedule and lower the temp when the house is empty saved us over $180 in the first three months. The mobile interface is incredibly intuitive, even for our non-tech grandparents.",
    rating: 5,
    productsUsed: ["OKA IntelliTemp Smart Thermostat V2", "OKA Smart Energy Plug Quad (4-Pack)"],
    metrics: "$180 Saved in 90 Days",
    avatarSeed: "bg-emerald-100 text-emerald-800"
  },
  {
    id: "case-2",
    customerName: "Marcus Vance",
    role: "Full-Stack Software Engineer",
    location: "Washington, USA",
    title: "The Ultimate Zero-Stress Secure Entryway",
    content: "Living in a dense suburb, keeping deliveries safe is critical. Combining the OKA Smart Deadbolt Pro and the 360° Smart Guard Cam has completely automated my porch and doorway. I can verify delivery couriers, unlock the door for friends via fingerprint, and check historical motion alerts with zero monthly subscriptions. Local edge AI person recognition is lightning-fast.",
    rating: 5,
    productsUsed: ["OKA SecureGuard Smart Deadbolt Pro", "OKA Horizon 360° Smart Guard Cam"],
    metrics: "Subscription-free 2K Security",
    avatarSeed: "bg-blue-100 text-blue-800"
  },
  {
    id: "case-3",
    customerName: "Dr. Evelyn Chen",
    role: "Hospital Physician",
    location: "California, USA",
    title: "Post-Shift Relaxation & Automated Energy Guards",
    content: "After grueling 14-hour hospital shifts, coming home to an automated greeting completely changes my mood. The Ambient Light Bars automatically ease me into a warm sunset tone. Simultaneously, my coffee builder and heating are safely toggled off via Energy Plugs when I leave. It turned my home into an energetic sanctuary.",
    rating: 5,
    productsUsed: ["OKA Smart Energy Plug Quad (4-Pack)", "OKA AuraLink Smart Ambient Bars (Pair)"],
    metrics: "100% Automated Mood Lighting",
    avatarSeed: "bg-purple-100 text-purple-800"
  }
];
