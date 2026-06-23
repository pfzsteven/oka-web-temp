import React from "react";
import { CartItem } from "../types";
import { X, Minus, Plus, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% estimated local sales tax
  const total = subtotal + tax;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.aside
            id="cart-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/5 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <ShoppingBag className="w-5.5 h-5.5 text-orange-500" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold font-mono h-4 w-4 rounded-full flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <h2 className="font-display font-extrabold text-lg text-white">Your Shopping Cart</h2>
              </div>
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-dashed border-white/10">
                    <ShoppingBag className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-base mb-1">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Explore our Amazon-best seller smart home appliances and add premium intelligence to your space today!
                  </p>
                  <button
                    id="cart-empty-shop-btn"
                    onClick={onClose}
                    className="mt-5 border border-orange-500 text-orange-500 hover:bg-orange-500/10 text-xs font-semibold px-5 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="flex gap-4 p-3.5 bg-white/5 rounded-xl border border-white/5 items-start hover:border-orange-500/30 transition-all group"
                  >
                    {/* Micro Mini Product representation */}
                    <div className="w-16 h-16 rounded-lg bg-slate-950/40 border border-white/10 flex items-center justify-center shrink-0 p-1.5 shadow-sm text-orange-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-slate-200 leading-tight truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-orange-400 font-mono mt-0.5 uppercase tracking-wide">
                        {item.product.category}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5 border border-white/10 bg-slate-950/40 rounded-md p-0.5">
                          <button
                            id={`qty-minus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded cursor-pointer"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            id={`qty-plus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Action buttons */}
                        <button
                          id={`cart-remove-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-orange-500 transition-colors rounded-md hover:bg-orange-500/10 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Price right aligned */}
                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-orange-500">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[10px] text-slate-500 mt-0.5 font-mono">
                          ${item.product.price.toFixed(2)} each
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom calculation Summary & CTA */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-white/5 bg-slate-950/40 shadow-inner animate-fade-in">
                <div className="space-y-2 mb-4.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Estimated Local Tax (8%)</span>
                    <span className="font-mono font-semibold text-slate-200">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Shipping</span>
                    <span className="text-orange-500 font-bold uppercase tracking-wide text-[10px]">FREE</span>
                  </div>
                  <div className="border-t border-white/10 my-2 pt-2.5 flex items-baseline justify-between">
                    <span className="font-display font-extrabold text-white text-sm">Estimated Total</span>
                    <span className="font-mono font-extrabold text-lg text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="checkout-cta-btn"
                  onClick={onCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-sans font-bold text-sm tracking-wide shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all active:scale-[0.99] group/btn cursor-pointer"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>256-bit SSL Encrypted Secure Gateway Connection</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
