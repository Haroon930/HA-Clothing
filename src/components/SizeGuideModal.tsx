import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AnimatePresence, motion } from 'motion/react';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useShop();

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSizeGuideOpen(false);
    };
    if (sizeGuideOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [sizeGuideOpen, setSizeGuideOpen]);

  const sizes = [
    { size: 'S', chest: '34" - 36"', waist: '28" - 30"', sleeve: '32.5"' },
    { size: 'M', chest: '38" - 40"', waist: '32" - 34"', sleeve: '33.5"' },
    { size: 'L', chest: '42" - 44"', waist: '36" - 38"', sleeve: '34.5"' },
    { size: 'XL', chest: '46" - 48"', waist: '40" - 42"', sleeve: '35.5"' },
    { size: 'XXL', chest: '50" - 52"', waist: '44" - 46"', sleeve: '36.5"' },
  ];

  return (
    <AnimatePresence>
      {sizeGuideOpen && (
        <div id="size-guide-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={() => setSizeGuideOpen(false)}
            className="absolute inset-0 bg-[#000]"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-brand-red/20 p-6 md:p-8 overflow-hidden"
          >
            {/* Corner visual lines to reinforce aggressive technical DTC feel */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-red" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-red" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand-red" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-red" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-bone/10 mb-6">
              <h3 className="font-display text-2xl tracking-tight uppercase">
                SIZE <span className="text-brand-red">SCALING GUIDE</span>
              </h3>
              <button
                id="close-size-guide"
                onClick={() => setSizeGuideOpen(false)}
                className="p-1 text-brand-bone hover:text-brand-red transition-colors"
                aria-label="Close Guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-brand-grey mb-6 tracking-wide leading-relaxed">
              Our products are engineered with an intentional boxy, oversized streetwear drape. If you prefer a standard, closer-to-body fit, we highly recommend selecting **one size smaller** than your standard measurements.
            </p>

            {/* Sizing Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-brand-bone/15 text-brand-bone uppercase tracking-widest font-bold">
                    <th className="py-3 px-2">SIZE</th>
                    <th className="py-3 px-2">CHEST</th>
                    <th className="py-3 px-2">WAIST</th>
                    <th className="py-3 px-2">SLEEVE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-bone/5 text-brand-grey font-mono">
                  {sizes.map((row) => (
                    <tr key={row.size} className="hover:bg-brand-bone/5 hover:text-brand-bone transition-colors">
                      <td className="py-3.5 px-2 font-display text-sm text-brand-red">{row.size}</td>
                      <td className="py-3.5 px-2">{row.chest}</td>
                      <td className="py-3.5 px-2">{row.waist}</td>
                      <td className="py-3.5 px-2">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes */}
            <div className="mt-6 pt-4 border-t border-brand-bone/10 space-y-2 text-[10px] text-brand-grey tracking-wider">
              <p>• All measurements are listed in inches.</p>
              <p>• Chest refers to the full circumference of the widest part of your chest.</p>
              <p>• Standard 14-day return window available for sizing corrections.</p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
