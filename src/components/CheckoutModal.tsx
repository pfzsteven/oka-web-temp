import React, { useState } from "react";
import { CartItem } from "../types";
import { X, ShieldCheck, Mail, User, MapPin, CreditCard, Sparkles, CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
  quickBuyProduct?: CartItem | null; // support Instant Buy directly
}

type Step = "shipping" | "payment" | "success";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
  quickBuyProduct
}: CheckoutModalProps) {
  const activeItems = quickBuyProduct ? [quickBuyProduct] : cartItems;
  const subtotal = activeItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const [step, setStep] = useState<Step>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    address: "",
    zip: "",
    city: ""
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardName: ""
  });

  const [orderNumber, setOrderNumber] = useState("");

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const validateShipping = () => {
    return (
      shippingForm.name.trim().length > 2 &&
      shippingForm.email.includes("@") &&
      shippingForm.address.trim().length > 5 &&
      shippingForm.zip.trim().length >= 4 &&
      shippingForm.city.trim().length > 1
    );
  };

  const validatePayment = () => {
    return (
      paymentForm.cardNumber.replace(/\s/g, "").length >= 15 &&
      paymentForm.expiry.includes("/") &&
      paymentForm.cvc.length >= 3 &&
      paymentForm.cardName.trim().length > 2
    );
  };

  const handleNextStep = () => {
    if (step === "shipping" && validateShipping()) {
      setStep("payment");
    }
  };

  const handlePrevStep = () => {
    if (step === "payment") {
      setStep("shipping");
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setIsProcessing(true);
    // Simulate real bank authorization payment latency
    setTimeout(() => {
      const generatedOrder = "OKA-" + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep("success");
      onClearCart();
    }, 2000);
  };

  const handleModalClose = () => {
    setStep("shipping");
    setShippingForm({ name: "", email: "", address: "", zip: "", city: "" });
    setPaymentForm({ cardNumber: "", expiry: "", cvc: "", cardName: "" });
    onClose();
  };

  // Format Card Number (space every 4 digits)
  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\s?/g, "").replace(/[^0-9]/g, "");
    const parts = [];
    for (let i = 0, len = raw.length; i < len; i += 4) {
      parts.push(raw.substring(i, i + 4));
    }
    return parts.length > 0 ? parts.join(" ") : raw;
  };

  // Format Expiry (MM/YY)
  const formatExpiry = (val: string) => {
    const raw = val.replace(/\s?/g, "").replace(/[^0-9]/g, "");
    if (raw.length > 2) {
      return raw.substring(0, 2) + "/" + raw.substring(2, 4);
    }
    return raw;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="checkout-modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            id="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="fixed inset-0 bg-slate-950"
            disabled={isProcessing}
          />

          {/* Modal Card */}
          <motion.div
            id="checkout-modal-box"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-slate-900 border border-white/10 text-slate-100 rounded-2xl w-full max-w-3xl shadow-2xl relative overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Header Close button */}
            <button
              id="checkout-close-btn"
              onClick={handleModalClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all z-20 cursor-pointer"
              disabled={isProcessing}
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Form Intake (7 cols) */}
            <div className="p-6 md:p-8 col-span-1 md:col-span-7 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Stepper Progress bar */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wide">
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step === "shipping" ? "bg-orange-500 text-white" : step === "payment" || step === "success" ? "bg-orange-500/20 text-orange-400 font-extrabold" : "bg-slate-800 text-slate-500"}`}>1</span>
                    <span className={step === "shipping" ? "text-white" : "text-slate-400"}>Shipping</span>
                  </div>
                  <div className="h-0.5 w-8 bg-white/10" />
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wide">
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step === "payment" ? "bg-orange-500 text-white" : step === "success" ? "bg-orange-500/20 text-orange-400 font-extrabold" : "bg-slate-800 text-slate-500"}`}>2</span>
                    <span className={step === "payment" ? "text-white" : "text-slate-400"}>Payment</span>
                  </div>
                  <div className="h-0.5 w-8 bg-white/10" />
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wide">
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step === "success" ? "bg-orange-500 text-white font-extrabold" : "bg-slate-800 text-slate-500"}`}>3</span>
                    <span className={step === "success" ? "text-white" : "text-slate-400"}>Success</span>
                  </div>
                </div>

                {/* Step 1: Shipping Form */}
                {step === "shipping" && (
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-white mb-1">Shipping Details</h3>
                    <p className="text-xs text-slate-400 mb-5">Where should we deliver your OKA smart home devices?</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id="shipping-name-input"
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={shippingForm.name}
                            onChange={handleShippingChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id="shipping-email-input"
                            type="email"
                            name="email"
                            required
                            placeholder="johndoe@gmail.com"
                            value={shippingForm.email}
                            onChange={handleShippingChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Delivery Address</label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id="shipping-address-input"
                            type="text"
                            name="address"
                            required
                            placeholder="123 Smart Alley"
                            value={shippingForm.address}
                            onChange={handleShippingChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Postal Code</label>
                          <input
                            id="shipping-zip-input"
                            type="text"
                            name="zip"
                            required
                            placeholder="80302"
                            value={shippingForm.zip}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">City</label>
                          <input
                            id="shipping-city-input"
                            type="text"
                            name="city"
                            required
                            placeholder="Boulder"
                            value={shippingForm.city}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Gateway Form (the payment entrance) */}
                {step === "payment" && (
                  <form onSubmit={handleCompleteOrder}>
                    <h3 className="font-display font-extrabold text-xl text-white mb-1">Secure Payment</h3>
                    <p className="text-xs text-slate-400 mb-5">Your connection is fully audited & encrypted via 256-bit SSL guard.</p>

                    {/* High-fidelity Virtual Credit Card render */}
                    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/60 p-5 rounded-2xl text-white shadow-lg mb-5 flex flex-col justify-between h-40 font-mono border border-white/10 relative overflow-hidden group">
                      <div className="absolute right-0 bottom-0 top-0 left-0 bg-[radial-gradient(circle_at_top_right,#f9731615,transparent)] opacity-60" />
                      
                      <div className="flex items-start justify-between relative z-10">
                        {/* Golden Chip */}
                        <div className="w-10 h-7.5 bg-amber-400 bg-opacity-35 rounded-md border border-amber-300/40 opacity-90 flex flex-col justify-between p-1.5">
                          <div className="h-0.5 bg-amber-300 w-full opacity-60" />
                          <div className="h-0.5 bg-amber-300 w-full opacity-60" />
                        </div>
                        
                        {/* Card brand logo */}
                        <div className="flex items-center gap-1.5 text-xs italic font-bold text-slate-200 font-display">
                          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                          OKA Secure Base
                        </div>
                      </div>

                      {/* Card number preview */}
                      <p className="text-base tracking-widest text-[15px] font-bold text-center my-2 text-slate-100 relative z-10 transition-all">
                        {paymentForm.cardNumber || "••••  ••••  ••••  ••••"}
                      </p>

                      <div className="flex justify-between items-end relative z-10">
                        <div>
                          <span className="text-[8px] text-slate-500 block uppercase font-sans">Card Holder</span>
                          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-sans truncate max-w-[180px]">
                            {paymentForm.cardName || "Your Full Name"}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <div>
                            <span className="text-[8px] text-slate-500 block uppercase font-sans">Expires</span>
                            <span className="text-xs font-semibold text-slate-300 block font-mono">{paymentForm.expiry || "MM/YY"}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 block uppercase font-sans">CVC</span>
                            <span className="text-xs font-semibold text-slate-300 block font-mono">{paymentForm.cvc || "•••"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Name on Card</label>
                        <input
                          id="payment-card-name-input"
                          type="text"
                          name="cardName"
                          required
                          placeholder="John Doe"
                          value={paymentForm.cardName}
                          onChange={handlePaymentChange}
                          disabled={isProcessing}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Card Number</label>
                        <div className="relative">
                          <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id="payment-card-number-input"
                            type="text"
                            name="cardNumber"
                            required
                            maxLength={19}
                            placeholder="4000 1234 5678 9010"
                            value={paymentForm.cardNumber}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value);
                              setPaymentForm({ ...paymentForm, cardNumber: formatted });
                            }}
                            disabled={isProcessing}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Expiry MM/YY</label>
                          <input
                            id="payment-expiry-input"
                            type="text"
                            name="expiry"
                            required
                            maxLength={5}
                            placeholder="12/28"
                            value={paymentForm.expiry}
                            onChange={(e) => {
                              const formatted = formatExpiry(e.target.value);
                              setPaymentForm({ ...paymentForm, expiry: formatted });
                            }}
                            disabled={isProcessing}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">CVC Code</label>
                          <input
                            id="payment-cvc-input"
                            type="password"
                            name="cvc"
                            required
                            maxLength={3}
                            placeholder="***"
                            value={paymentForm.cvc}
                            onChange={(e) => {
                              const clean = e.target.value.replace(/[^0-9]/g, "");
                              setPaymentForm({ ...paymentForm, cvc: clean });
                            }}
                            disabled={isProcessing}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Step 3: Success Screen */}
                {step === "success" && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                      <CheckCircle2 className="w-8 h-8 text-orange-400 animate-bounce" />
                    </div>
                    <span className="text-[10px] bg-orange-500/10 text-orange-500 font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                      Payment Accepted
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white mt-3 mb-1.5">
                      Thank you for your order, {shippingForm.name.split(" ")[0]}!
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed mb-6">
                      Your smart home setup is officially on the fast track. We are preparing your shipment with premium bubble wrap and double outer boxes.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-xl max-w-sm mx-auto p-4 flex flex-col gap-2.5 text-left font-mono text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Order Number:</span>
                        <span className="font-bold text-orange-500">{orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date Ordered:</span>
                        <span className="text-slate-300">June 23, 2026 (Today)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Delivery Est.:</span>
                        <span className="text-orange-400 font-bold">2-3 Shipping Days</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-2.5 font-sans mt-1">
                        <span className="text-slate-400 font-semibold font-display">Total Charged</span>
                        <span className="text-orange-500 font-extrabold text-sm">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Rows */}
              {step !== "success" && (
                <div className="mt-8 border-t border-white/10 pt-5 flex items-center justify-between">
                  {step === "payment" ? (
                    <button
                      id="checkout-back-step-btn"
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isProcessing}
                      className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md px-2 py-1.5 transition-all disabled:opacity-40 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Shipping
                    </button>
                  ) : (
                    <div />
                  )}

                  {step === "shipping" ? (
                    <button
                      id="checkout-shipping-next-btn"
                      type="button"
                      onClick={handleNextStep}
                      disabled={!validateShipping()}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-800 text-white disabled:text-slate-500 py-2.5 px-6 rounded-xl flex items-center gap-2 font-sans font-bold text-xs shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id="checkout-payment-complete-btn"
                      type="button"
                      onClick={handleCompleteOrder}
                      disabled={!validatePayment() || isProcessing}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-800 text-white disabled:text-slate-500 py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 font-sans font-bold text-xs shadow-md transition-all min-w-[140px] cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-orange-950" />
                          Processing...
                        </>
                      ) : (
                        `Pay $${total.toFixed(2)}`
                      )}
                    </button>
                  )}
                </div>
              )}

              {step === "success" && (
                <div className="mt-8 border-t border-white/10 pt-5 text-center">
                  <button
                    id="checkout-success-close-btn"
                    onClick={handleModalClose}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-sans font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Continue Exploring OKA
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Order Pricing Summary Panel (5 cols) */}
            <div className="md:col-span-5 bg-slate-950/40 border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-full">
              <div>
                <h4 className="font-display font-bold text-xs text-slate-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2 font-mono">
                  Order Summary
                </h4>

                <div className="space-y-3.5 max-h-[160px] md:max-h-[220px] overflow-y-auto pr-1">
                  {activeItems.map((item) => (
                    <div key={item.id} className="flex gap-3 justify-between items-start text-xs">
                      <div>
                        <p className="font-semibold text-slate-200 leading-tight truncate max-w-[150px]">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-orange-500 shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4.5 mt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Sales Tax (8%)</span>
                  <span className="font-mono text-slate-200 font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Global Priority Carrier</span>
                  <span className="text-orange-500 font-bold text-[10px] uppercase font-mono bg-orange-505/10 border border-orange-500/20 px-1 py-0.5 rounded">FREE</span>
                </div>

                <div className="border-t border-white/10 mt-2 pt-2.5 flex items-baseline justify-between">
                  <span className="font-display font-bold text-sm text-white">Charged Amount</span>
                  <span className="font-mono font-extrabold text-base text-orange-500">${total.toFixed(2)}</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mt-4 text-[10px] text-slate-450 leading-normal flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-300 block">OKA Satisfaction Shield Guarantee</span>
                    Your order includes instant dispatch tracking and 30-day no-reason full returns protection.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
