import React from "react";
import { CustomerCase } from "../types";
import { Star, ShieldCheck, Quote } from "lucide-react";

interface CaseCardProps {
  key?: React.Key;
  customerCase: CustomerCase;
}

export default function CaseCard({ customerCase }: CaseCardProps) {
  // Simple solid rating stars
  const renderStars = (count: number) => {
    const starArr = [];
    for (let i = 0; i < 5; i++) {
      starArr.push(
        <Star
          key={i}
          id={`case-star-${customerCase.id}-${i}`}
          className={`w-3.5 h-3.5 ${i < count ? "fill-orange-400 text-orange-400" : "text-slate-800"}`}
        />
      );
    }
    return starArr;
  };

  return (
    <article
      id={`case-card-${customerCase.id}`}
      className="glass-card rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Absolute top glowing orange graphic accent */}
      <span className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/10 rounded-full group-hover:scale-125 transition-transform duration-500 opacity-60" />
      <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 scale-95 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Metric Highlight badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold mb-4 border border-orange-500/20 font-mono tracking-wide shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
          {customerCase.metrics}
        </div>

        <h3 className="font-display font-extrabold text-base md:text-lg text-white group-hover:text-orange-500 transition-colors leading-tight mb-3">
          "{customerCase.title}"
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed mb-6 italic">
          {customerCase.content}
        </p>

        {/* Used gear tags */}
        <div className="mb-6 pt-4 border-t border-white/5">
          <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider mb-2">Equipped OKA Devices:</span>
          <div className="flex flex-wrap gap-1.55">
            {customerCase.productsUsed.map((productName, index) => (
              <span
                key={index}
                className="text-xs bg-white/5 text-slate-300 px-2.5 py-0.5 rounded-md border border-white/10 font-medium"
              >
                {productName}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Author profile */}
      <div className="flex items-center gap-3.5 border-t border-white/5 pt-4.5 mt-auto relative z-10">
        {/* Colorful placeholder vector initials */}
        <div className={`w-11 h-11 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-display font-black text-sm tracking-tighter shrink-0 shadow-sm border border-white/10`}>
          {customerCase.customerName.split(" ").map(w => w[0]).join("")}
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-slate-200 leading-tight">
            {customerCase.customerName}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            {customerCase.role} · <span className="text-orange-400 font-mono text-[10px]">{customerCase.location}</span>
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            {renderStars(customerCase.rating)}
          </div>
        </div>
      </div>
    </article>
  );
}
