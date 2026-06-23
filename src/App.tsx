/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Product, CartItem } from "./types";
import { PRODUCTS } from "./productsData";
import { CUSTOMER_CASES } from "./casesData";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import CaseCard from "./components/CaseCard";
import ContactForm from "./components/ContactForm";
import {
  ShoppingBag,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  Cpu,
  Bookmark,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Globe,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  // Local Cart State with safety checks
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("oka-cart-v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<"All" | "Climate" | "Security" | "Energy" | "Lighting">("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickBuyItem, setQuickBuyItem] = useState<CartItem | null>(null);

  // Sync Cart state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("oka-cart-v1", JSON.stringify(cartItems));
    } catch {
      // safe fallback
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { id: product.id, product, quantity: 1 }];
    });
    // Visual pop notification trigger
    setIsCartOpen(true);
  };

  const handleQuickPay = (product: Product) => {
    setQuickBuyItem({ id: product.id, product, quantity: 1 });
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenCheckoutFromCart = () => {
    setIsCartOpen(false);
    setQuickBuyItem(null); // use complete cartitems
    setIsCheckoutOpen(true);
  };

  const filteredProducts = selectedCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-orange-500/20 selection:text-orange-350 scroll-smooth">
      
      {/* Absolute Sticky Floating Header with cart button */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white flex items-center">
              OKA
              <span className="h-2 w-2 rounded-full bg-orange-500 ml-1 shadow-[0_0_10px_#f97316]" />
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="sticky-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-orange-500 text-white px-4 py-2.5 rounded-full font-sans font-bold text-xs tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-orange-500 group-hover:text-white" />
              <span>Cart ({totalQuantity})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Single Page Content */}
      <main>
        {/* Hero Section */}
        <section id="hero" className="max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-16 md:pb-28 text-center relative overflow-hidden">
          {/* Subtle decoration elements */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-800/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Shield anti-crawler notice */}
            <span className="inline-flex items-center gap-1.5 bg-white/5 text-slate-100 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6.5 font-mono border border-white/10 shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              Search Crawlers Restricted
            </span>

            <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-white leading-[1.08] mb-6">
              Intelligent Home Living.<br />
              <span className="text-orange-500">Completely Protected.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              OKA curates and designs premium mechanical smart locks, adaptive thermostats, 360° security, and power monitoring plugs that function locally without subscriptions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products-section"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-sans font-bold text-sm py-4 px-8 rounded-xl shadow-lg shadow-orange-500/15 hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Configure Your Applet
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#cases-section"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-sans font-semibold text-sm py-4 px-8 rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                Read Customer Cases
              </a>
            </div>

            {/* Micro value row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/5 text-left max-w-3xl mx-auto">
              <div className="flex gap-2">
                <Cpu className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h5 className="font-display font-bold text-xs text-white">Local Only Control</h5>
                  <p className="text-[10px] text-slate-400">Run entirely offline fallback</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Bookmark className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-bold text-xs text-white">No Subscriptions</h5>
                  <p className="text-[10px] text-slate-400">All features free forever</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Smartphone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-bold text-xs text-white">One-App Ecosystem</h5>
                  <p className="text-[10px] text-slate-400">Controls OKA catalog seamlessly</p>
                </div>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-display font-bold text-xs text-white">2-Year Guarantee</h5>
                  <p className="text-[10px] text-slate-400">Direct instant replacements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="products-section" className="bg-[#0d1324] border-y border-white/5 py-16 md:py-24 animate-fade-in">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Mid Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-[10px] bg-white/5 text-slate-300 font-bold px-2.5 py-1 rounded border border-white/10 uppercase tracking-widest font-mono">
                  Engineered Hardware
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mt-3 tracking-tight">
                  Premium Smart Home Catalog
                </h2>
                <p className="text-sm text-slate-400 mt-1.5 max-w-md">
                  Compare features and pricing based on official Amazon marketplaces.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-white/5 border border-white/10 p-1.5 rounded-xl">
                {(["All", "Climate", "Security", "Energy", "Lighting"] as const).map((cat) => (
                  <button
                    key={cat}
                    id={`filter-pill-${cat.toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                  onQuickPay={handleQuickPay}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Customer Success Cases Section */}
        <section id="cases-section" className="py-16 md:py-24 max-w-7xl mx-auto px-6 text-slate-300">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <span className="text-[10px] bg-orange-500/10 text-orange-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-orange-500/20">
              Verified Living Proof
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white mt-3 mb-1.5">
              OKA Integrations in Play
            </h2>
            <p className="text-sm text-slate-400 leading-normal">
              Read how homes across diverse regions adapt OKA setups to achieve extreme energy safety and secure luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CUSTOMER_CASES.map((customerCase) => (
              <CaseCard key={customerCase.id} customerCase={customerCase} />
            ))}
          </div>
        </section>

        {/* Support & Contact Section */}
        <section id="contact-section" className="pb-20 pt-8 max-w-5xl mx-auto px-6">
          <ContactForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#090d16] text-slate-450 border-t border-white/5 py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/5 pb-12">
          
          {/* Logo Brand info */}
          <div className="space-y-4">
            <span className="font-display font-black text-2xl tracking-tighter text-white flex items-center">
              OKA
              <span className="h-2 w-2 rounded-full bg-orange-500 ml-1 shadow-[0_0_10px_#f97316]" />
            </span>
            <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
              Premium subscription-free autonomous hardware modules centered around robust security and local-first execution.
            </p>
          </div>

          {/* Core values */}
          <div>
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4 font-mono">Ecosystem Policy</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-orange-500" />
                <span>Global Priority Carrier Dispatch</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
                <span>Double Box Recyclable Material Packaging</span>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
                <span>Lifetime Local Config & Fallback Support</span>
              </li>
            </ul>
          </div>

          {/* Crawler restrictions detail card */}
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-display font-bold text-xs text-white">Full Crawl Disallowed</h5>
                <p className="text-[10px] text-slate-400 leading-normal mt-1">
                  At OKA, protection starts from layout indexing. All search spiders and metadata trackers are disbarred at our gateway route.
                </p>
              </div>
            </div>
            
            <span className="text-[9px] font-mono font-medium text-orange-500 mt-4 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded inline-block text-center select-all">
              robots.txt : DISALLOW /
            </span>
          </div>

        </div>

        {/* Sub-footer copyright */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© 2026 OKA TECHNOLOGY PTE. LTD. All Rights Reserved. Model prices mapped directly to Amazon.</p>
          <div className="flex gap-4 mt-4 sm:mt-0 font-medium font-mono text-[10px]">
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Security Standards</span>
            <span>·</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Local Policy</span>
            <span>·</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">No-Index Registry</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Slide Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleOpenCheckoutFromCart}
      />

      {/* Checkout step-by-step Modal Payment portal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setQuickBuyItem(null);
        }}
        cartItems={cartItems}
        onClearCart={handleClearCart}
        quickBuyProduct={quickBuyItem}
      />

    </div>
  );
}
