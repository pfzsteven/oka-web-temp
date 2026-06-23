import React from "react";
import { Product } from "../types";
import { Star, ShieldCheck, CheckCircle2, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickPay: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickPay }: ProductCardProps) {
  // Renders a high-fidelity vector schematic of each specific product
  const renderProductIllustration = (id: string) => {
    switch (id) {
      case "oka-thermostat-v2":
        return (
          <svg className="w-full h-48 text-emerald-600 dark:text-emerald-400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="thermostat-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="200" height="200" rx="20" fill="#f8fafc" />
            <circle cx="100" cy="100" r="75" fill="url(#thermostat-glow)" />
            <circle cx="100" cy="100" r="60" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="100" cy="100" r="54" fill="#0f172a" />
            {/* Arcs representing temperature range */}
            <path d="M60 130 A 45 45 0 1 1 140 130" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
            <path d="M60 130 A 45 45 0 0 1 110 56" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
            {/* Interactive ticks */}
            <line x1="100" y1="46" x2="100" y2="52" stroke="#10b981" strokeWidth="2" />
            <line x1="56" y1="100" x2="62" y2="100" stroke="#64748b" strokeWidth="2" />
            <line x1="144" y1="100" x2="138" y2="100" stroke="#64748b" strokeWidth="2" />
            {/* Temperature readout */}
            <text x="100" y="105" fill="#ffffff" fontSize="28" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">72°</text>
            <text x="100" y="125" fill="#10b981" fontSize="10" fontWeight="medium" textAnchor="middle" letterSpacing="1">AUTO - HEATING</text>
            <circle cx="118" cy="85" r="4" fill="#ef4444" /> {/* Current heat active indicator */}
          </svg>
        );
      case "oka-secure-lock-pro":
        return (
          <svg className="w-full h-48 text-emerald-600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="20" fill="#f8fafc" />
            {/* Outer Escutcheon */}
            <rect x="70" y="30" width="60" height="140" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="3" />
            {/* Keypad Circle */}
            <circle cx="100" cy="65" r="20" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="92" cy="58" r="1.5" fill="#10b981" />
            <circle cx="100" cy="58" r="1.5" fill="#10b981" />
            <circle cx="108" cy="58" r="1.5" fill="#334155" />
            <circle cx="92" cy="65" r="1.5" fill="#10b981" />
            <circle cx="100" cy="65" r="1.5" fill="#10b981" />
            <circle cx="108" cy="65" r="1.5" fill="#10b981" />
            <circle cx="100" cy="72" r="1.5" fill="#10b981" />
            {/* Fingerprint Sensor Panel */}
            <rect x="88" y="100" width="24" height="24" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <path d="M94 112 A 6 6 0 0 1 106 112" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M96 115 A 4 4 0 0 1 104 115" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M98 108 A 2 2 0 0 0 102 108" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
            {/* Glowing lock ring */}
            <circle cx="100" cy="145" r="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
            <circle cx="100" cy="145" r="3" fill="#10b981" />
          </svg>
        );
      case "oka-cam-360":
        return (
          <svg className="w-full h-48 text-emerald-600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="20" fill="#f8fafc" />
            {/* Camera Stand/Base */}
            <path d="M60 160 C 60 140, 140 140, 140 160" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            {/* Camera Rotating Disk */}
            <ellipse cx="100" cy="142" rx="36" ry="8" fill="#334155" />
            {/* Spherical Dome Body */}
            <circle cx="100" cy="95" r="42" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            {/* Rotating Camera Lens Eye Ball */}
            <circle cx="100" cy="95" r="28" fill="#0f172a" />
            {/* Glass Lens element */}
            <circle cx="100" cy="95" r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="103" cy="92" r="5" fill="#0284c7" />
            <circle cx="97" cy="91" r="2" fill="#ffffff" />
            {/* Status sensor light */}
            <circle cx="100" cy="74" r="2" fill="#10b981" />
            {/* 360 sweeping lines */}
            <path d="M50 95 A 50 20 0 0 1 150 95" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        );
      case "oka-plug-fourpack":
        return (
          <svg className="w-full h-48 text-emerald-600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="20" fill="#f8fafc" />
            {/* Render 2 overlapping compact plugs */}
            {/* Plug 1 background */}
            <rect x="52" y="52" width="76" height="76" rx="38" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            {/* Plug 2 foreground (layered) */}
            <g transform="translate(20, 20)">
              <rect x="52" y="52" width="76" height="76" rx="38" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
              {/* Ground pins */}
              <rect x="85" y="70" width="10" height="8" rx="2" fill="#64748b" />
              <rect x="91" y="85" width="8" height="12" rx="4" fill="#64748b" />
              {/* Small LED active */}
              <circle cx="72" cy="90" r="3" fill="#10b981" />
              {/* Power Button */}
              <rect x="110" y="84" width="10" height="10" rx="5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="115" y1="87" x2="115" y2="91" stroke="#ef4444" strokeWidth="1.5" />
            </g>
            <text x="100" y="165" fill="#334155" fontSize="11" fontWeight="bold" fontFamily="var(--font-mono)" textAnchor="middle">4-PACK SYSTEM</text>
          </svg>
        );
      case "oka-ambient-bar-duo":
        return (
          <svg className="w-full h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="aurora-glow-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="aurora-glow-right" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="200" height="200" rx="20" fill="#f8fafc" />
            {/* Glowing neon background arcs */}
            <circle cx="65" cy="90" r="45" fill="url(#aurora-glow-left)" />
            <circle cx="135" cy="90" r="45" fill="url(#aurora-glow-right)" />
            {/* Left Bar stands */}
            <rect x="62" y="150" width="16" height="5" rx="2" fill="#1e293b" />
            <line x1="70" y1="135" x2="70" y2="150" stroke="#1e293b" strokeWidth="4" />
            <rect x="67" y="45" width="6" height="90" rx="3" fill="#0f172a" />
            <rect x="68" y="47" width="2" height="86" rx="1" fill="#10b981" />
            {/* Right Bar stands */}
            <rect x="122" y="150" width="16" height="5" rx="2" fill="#1e293b" />
            <line x1="130" y1="135" x2="130" y2="150" stroke="#1e293b" strokeWidth="4" />
            <rect x="127" y="32" width="6" height="103" rx="3" fill="#0f172a" />
            <rect x="128" y="34" width="2" height="99" rx="1" fill="#3b82f6" />
          </svg>
        );
      default:
        return (
          <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
            Smart Appliance Model
          </div>
        );
    }
  };

  // Star ratings
  const renderStars = (rating: number) => {
    const starArr = [];
    const floor = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      starArr.push(
        <Star
          key={i}
          id={`star-${product.id}-${i}`}
          className={`w-4 h-4 ${i < floor ? "fill-orange-400 text-orange-400" : "text-slate-700"}`}
        />
      );
    }
    return starArr;
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article
      id={`product-card-${product.id}`}
      className="glass-card rounded-2xl shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
    >
      {/* Visual illustration top */}
      <div className="relative border-b border-white/5">
        {renderProductIllustration(product.id)}
        
        {/* Deal discount tag matching Amazon style */}
        {discountPercent > 0 && (
          <span className="absolute top-4 left-4 bg-orange-500 text-white font-display text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-md">
            Save {discountPercent}%
          </span>
        )}
        <span className="absolute top-4 right-4 bg-slate-900/90 text-slate-100 font-display text-xs font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
          {product.category}
        </span>
      </div>

      {/* Content wrapper */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating summary */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-xs font-mono text-slate-400 font-medium">({product.reviewCount} reviews)</span>
          </div>

          <h3 className="font-display font-bold text-lg text-white group-hover:text-orange-500 transition-colors mb-2 leading-tight">
            {product.name}
          </h3>

          <p className="text-sm text-slate-400 mb-4 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Bulleted key features */}
          <ul className="space-y-1.5 mb-5 text-xs text-slate-400 border-t border-white/5 pt-4">
            {product.specs.slice(0, 2).map((spec, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-tight">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-sm text-orange-500 font-bold">$</span>
            <span className="text-3xl font-display font-extrabold text-orange-500 tracking-tight">
              {Math.floor(product.price)}
            </span>
            <span className="text-lg font-display font-extrabold text-orange-500 -ml-1">
              {(product.price % 1).toFixed(2).substring(1)}
            </span>
            
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            
            <span className="text-[10px] text-slate-300 ml-auto bg-white/5 border border-white/10 px-2 py-1 rounded">
              {product.stock < 15 ? `Only ${product.stock} left!` : "In Stock"}
            </span>
          </div>

          {/* Call to Actions */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={() => onAddToCart(product)}
              className="flex items-center justify-center gap-2 border border-white/10 hover:border-orange-500 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all font-sans font-medium text-xs py-2.5 rounded-lg cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-orange-500" />
              Add to Cart
            </button>
            <button
              id={`quick-pay-btn-${product.id}`}
              onClick={() => onQuickPay(product)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-sans font-semibold text-xs py-2.5 rounded-lg shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              Instant Buy
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
            <ShieldCheck className="w-3 h-3 text-orange-500" />
            <span>2-Year Warranty & Free Global Shipping</span>
          </div>
        </div>
      </div>
    </article>
  );
}
