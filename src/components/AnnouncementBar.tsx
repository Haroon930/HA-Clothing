import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div id="announcement-bar" className="w-full bg-[#050505] border-b border-brand-red/10 py-2.5 overflow-hidden z-50 relative">
      <div className="flex whitespace-nowrap">
        {/* Loop twice for infinite seamless scroll */}
        <div className="animate-marquee flex gap-12 text-xs font-medium tracking-[0.15em] text-brand-red">
          <span>FREE SHIPPING OVER $150</span>
          <span className="text-brand-grey">•</span>
          <span>NEW DROP: THE BLACKOUT COLLECTION</span>
          <span className="text-brand-grey">•</span>
          <span>RETURNS COMPLIMENTARY WITHIN 14 DAYS</span>
          <span className="text-brand-grey">•</span>
          <span>BUILT IN BLACK. FINISHED IN RED.</span>
          <span className="text-brand-grey">•</span>
        </div>
        <div className="animate-marquee flex gap-12 text-xs font-medium tracking-[0.15em] text-brand-red" aria-hidden="true">
          <span>FREE SHIPPING OVER $150</span>
          <span className="text-brand-grey">•</span>
          <span>NEW DROP: THE BLACKOUT COLLECTION</span>
          <span className="text-brand-grey">•</span>
          <span>RETURNS COMPLIMENTARY WITHIN 14 DAYS</span>
          <span className="text-brand-grey">•</span>
          <span>BUILT IN BLACK. FINISHED IN RED.</span>
          <span className="text-brand-grey">•</span>
        </div>
      </div>
    </div>
  );
};
