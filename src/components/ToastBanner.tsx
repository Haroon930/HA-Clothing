import React from 'react';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AnimatePresence, motion } from 'motion/react';

export const ToastBanner: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div
      id="toast-notifications-container"
      className="fixed bottom-6 right-6 z-50 space-y-3 w-full max-w-sm px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let iconColor = 'text-[#fff]';
          let borderColor = 'border-brand-red/40';

          if (toast.type === 'success') {
            Icon = CheckCircle;
            iconColor = 'text-brand-red';
            borderColor = 'border-brand-red';
          } else if (toast.type === 'error') {
            Icon = AlertTriangle;
            iconColor = 'text-brand-red';
            borderColor = 'border-brand-red';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              className={`bg-[#050505] text-brand-bone border-l-4 ${borderColor} p-4 flex items-start gap-3.5 shadow-2xl relative border border-y-brand-bone/5 border-r-brand-bone/5 overflow-hidden`}
            >
              {/* Subtle grid line overlay */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-red/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-red/20" />

              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              
              <div className="flex-1">
                <span className="text-[10px] tracking-[0.2em] text-brand-grey font-bold uppercase block mb-0.5">
                  SYSTEM MESSAGE
                </span>
                <p className="text-xs font-semibold text-brand-bone leading-relaxed tracking-wide">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-brand-grey hover:text-brand-red transition-colors shrink-0 p-0.5"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
