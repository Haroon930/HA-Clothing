import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Heart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AnimatePresence, motion } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const navigate = useNavigate();

  // Reset local state when product changes
  useEffect(() => {
    if (quickViewProduct) {
      if (quickViewProduct.sizes.length > 0) {
        // Fallback to first available size
        const mIndex = quickViewProduct.sizes.indexOf('M');
        if (mIndex > -1) {
          setSelectedSize('M');
        } else {
          setSelectedSize(quickViewProduct.sizes[0]);
        }
      }
      if (quickViewProduct.colors.length > 0) {
        setSelectedColor(quickViewProduct.colors[0]);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  // Handle keydown close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedColor) {
      addToCart(product, selectedSize, selectedColor, 1);
      setQuickViewProduct(null);
    }
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    navigate(`/product/${product.slug}`);
  };

  return (
    <AnimatePresence>
      <div id="quick-view-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="absolute inset-0 bg-[#000]"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl bg-[#0A0A0A] border border-brand-red/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          {/* Close button */}
          <button
            id="close-quick-view"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 text-brand-bone hover:text-brand-red transition-colors bg-[#000]/60 backdrop-blur"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="w-full md:w-1/2 bg-[#121212] aspect-[4/5] md:aspect-auto overflow-hidden relative">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-red text-brand-bone text-[9px] font-bold tracking-[0.2em] px-3 py-1.5 uppercase">
                NEW
              </span>
            )}
          </div>

          {/* Right: Selection info */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Breadcrumb */}
              <p className="text-[10px] tracking-[0.25em] text-brand-red uppercase font-bold mb-2">
                QUICK SPECIFICATION
              </p>

              {/* Title & Price */}
              <div className="space-y-1 mb-4">
                <h3 className="font-display text-2xl tracking-tight uppercase text-brand-bone leading-none">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-lg font-bold text-brand-bone">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-brand-grey line-through">${product.compareAtPrice}</span>
                  )}
                </div>
              </div>

              {/* Rating details */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex items-center text-brand-red">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-brand-red' : 'text-brand-grey/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-brand-grey font-semibold font-mono">
                  {product.rating} ({product.reviewCount} REVIEWERS)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-brand-grey leading-relaxed tracking-wide mb-6">
                {product.description.slice(0, 150)}...
              </p>

              {/* Colors selection */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                  SELECT COLORWAY: <span className="text-brand-bone">{selectedColor?.name}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor?.name === c.name
                          ? 'border-brand-red scale-110'
                          : 'border-brand-bone/10 hover:border-brand-bone/40'
                      }`}
                      title={c.name}
                    >
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                  CHOOSE SIZE: <span className="text-brand-bone">{selectedSize}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[38px] h-9 text-xs font-semibold font-mono tracking-wider border flex items-center justify-center transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-brand-red bg-brand-red/10 text-brand-red font-bold'
                          : 'border-brand-bone/10 text-brand-bone hover:border-brand-bone/40'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-brand-bone/5">
              <div className="flex gap-3">
                <button
                  id="quick-view-add-to-cart"
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-3 text-xs font-bold tracking-[0.2em] transition-all uppercase cursor-pointer"
                >
                  ADD TO BAG
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`px-4 border flex items-center justify-center transition-all cursor-pointer ${
                    isWish
                      ? 'border-brand-red text-brand-red bg-brand-red/5'
                      : 'border-brand-bone/10 text-brand-bone hover:border-brand-red hover:text-brand-red'
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'fill-brand-red' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-brand-grey hover:text-brand-red tracking-widest transition-colors py-1.5 uppercase cursor-pointer"
              >
                VIEW FULL SPEC DETAILS <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
