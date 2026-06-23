import React, { useState } from "react";
import { Mail, Check, Send, Sparkles, MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "sales",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || !form.email.includes("@") || form.message.trim().length < 10) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "sales", message: "" });
    }, 1500);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
      {/* Visual background details */}
      <div className="absolute right-0 bottom-0 top-0 left-0 bg-[radial-gradient(circle_at_bottom_right,#f973160b,transparent_60%)] opacity-80 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-slate-800 rounded-full blur-2xl opacity-40 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="contact-form-body"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-8 max-w-md relative z-10">
              <span className="text-[10px] bg-orange-500/10 text-orange-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-orange-500/20 inline-flex items-center gap-1.5 mb-3.5">
                <Sparkles className="w-3 h-3 text-orange-500" />
                OKA Relations Desk
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white leading-tight mb-2">
                Let's upgrade your living space.
              </h3>
              <p className="text-sm text-slate-400">
                Have custom integration architectural plans, dealer questions, or wholesale inquiries? Write us and get a guaranteed expert callback within 12 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Full Name</label>
                  <input
                    id="contact-name-input"
                    type="text"
                    name="name"
                    required
                    placeholder="E.g., Dr. Evelyn"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    id="contact-email-input"
                    type="email"
                    name="email"
                    required
                    placeholder="you@domain.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Callback Phone (Optional)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="contact-phone-input"
                      type="tel"
                      name="phone"
                      placeholder="+1 (303) 555-0192"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white placeholder-slate-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Inquiry Type</label>
                  <select
                    id="contact-subject-select"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white cursor-pointer select-none"
                  >
                    <option value="sales">Sales & Custom Configuration</option>
                    <option value="integration">Dealer / Installer Programs</option>
                    <option value="support">Technical Device Assistance</option>
                    <option value="wholesale">Corporate / Bulk Wholesale</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Detailed Project Message</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <textarea
                    id="contact-message-input"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your home or project parameters. List room layouts, device quantities, or particular integration environments (e.g. HomeKit/Home Assistant/Offline local config)..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:bg-slate-950/40 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none rounded-xl text-sm transition-all text-white placeholder-slate-500 min-h-[100px] resize-y"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting || form.message.length < 10 || !form.email.includes("@")}
                  className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 disabled:bg-slate-850 text-white disabled:text-slate-500 py-3.5 px-8 rounded-xl font-sans font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:shadow-orange-500/15 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-4 h-4 rounded-full border-2 border-orange-300 border-t-white"
                      />
                      Transmitting Inquiry...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Secure Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="contact-form-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-center py-12 md:py-20 relative z-10 max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-orange-500/20">
              <Check className="w-8 h-8 text-orange-400" />
            </div>
            <span className="text-[10px] bg-orange-500/10 text-orange-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-orange-500/20">
              Secure Transmission Success
            </span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mt-4.5 mb-2 leading-tight">
              Inquiry Transmitted!
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Our regional field accounts director has received your smart home project parameters. We will perform initial site layouts and coordinate with you via email or phone shortly.
            </p>
            <button
              id="contact-reset-btn"
              onClick={() => setSubmitted(false)}
              className="border border-white/10 hover:border-orange-500 hover:bg-white/5 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Send Another Consultation Query
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
