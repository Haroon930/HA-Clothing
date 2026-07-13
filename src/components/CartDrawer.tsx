import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AnimatePresence, motion } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
  } = useShop();

  const navigate = useNavigate();
  const subtotal = getCartSubtotal();
  const freeShippingThreshold = 150;
  const neededForFreeShipping = freeShippingThreshold - subtotal;
  const isFreeShipping = neededForFreeShipping <= 0;
  const percentComplete = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  // Disable main body scroll when drawer is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[#000] z-50 pointer-events-auto"
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-[440px] bg-[#0A0A0A] border-l border-brand-red/10 z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-bone/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-red" />
                <span className="font-display text-xl tracking-tight text-brand-bone">
                  SHOPPING BAG ({cart.length})
                </span>
              </div>
              <button
                id="close-cart-drawer"
                onClick={() => setCartOpen(false)}
                className="p-1 text-brand-bone hover:text-brand-red transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-[#0F0F0F] border-b border-brand-bone/5">
                <div className="text-xs tracking-wider mb-2 text-brand-bone/90 flex justify-between">
                  {isFreeShipping ? (
                    <span className="text-brand-red font-semibold">YOU QUALIFY FOR FREE STANDARD SHIPPING! 🚚</span>
                  ) : (
                    <span>
                      ADD <span className="font-bold text-brand-red">${neededForFreeShipping.toFixed(2)}</span> MORE FOR FREE SHIPPING
                    </span>
                  )}
                  <span>{Math.round(percentComplete)}%</span>
                </div>
                <div className="w-full bg-brand-bone/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-red h-full transition-all duration-500 ease-out"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
              </div>
            )}

            {/* Line Items Scroll Panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <ShoppingBag className="w-12 h-12 text-brand-grey/50 stroke-[1.5]" />
                  <div className="space-y-1">
                    <h3 className="font-display text-lg text-brand-bone tracking-wide">YOUR BAG IS EMPTY</h3>
                    <p className="text-xs text-brand-grey max-w-[280px]">
                      Minimal aesthetic pieces, engineered to withstand the elements, are waiting to be yours.
                    </p>
                  </div>
                  <button
                    id="cart-drawer-shop-now"
                    onClick={() => {
                      setCartOpen(false);
                      navigate('/shop');
                    }}
                    className="border border-brand-bone/20 hover:border-brand-red text-xs font-semibold tracking-widest px-6 py-3 hover:text-brand-red transition-colors bg-transparent text-brand-bone"
                  >
                    SHOP NEW ARRIVALS
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-brand-bone/5 last:border-0"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-24 bg-[#141414] border border-brand-bone/5 shrink-0 overflow-hidden relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="text-sm font-semibold tracking-tight text-brand-bone hover:text-brand-red transition-colors leading-tight"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-sm font-bold text-brand-bone">
                            ${(item.product.price * item.quantity).toFixed(0)}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-grey uppercase tracking-wider">
                          {item.product.category}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-[#141414] border border-brand-bone/10 text-brand-bone font-medium">
                            {item.selectedSize}
                          </span>
                          <span
                            className="w-3.5 h-3.5 border border-brand-bone/25 rounded-full"
                            style={{ backgroundColor: item.selectedColor.hex }}
                            title={item.selectedColor.name}
                          />
                          <span className="text-[10px] text-brand-grey uppercase tracking-wider">
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Selector & Trash */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-brand-bone/20">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-brand-bone hover:text-brand-red hover:bg-brand-bone/5 transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-0.5 text-xs font-mono font-medium text-brand-bone">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-brand-bone hover:text-brand-red hover:bg-brand-bone/5 transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-brand-grey hover:text-brand-red transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & CTA */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-bone/10 bg-[#070707] space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-brand-grey">
                    <span>Shipping</span>
                    <span className="font-semibold text-brand-bone">
                      {isFreeShipping ? 'FREE' : '$15.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-brand-bone pt-1 border-t border-brand-bone/5">
                    <span>Subtotal</span>
                    <span className="text-brand-red font-display tracking-tight text-xl">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    id="cart-drawer-checkout-btn"
                    onClick={handleCheckoutClick}
                    className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-3.5 text-xs font-bold tracking-[0.2em] transition-all relative overflow-hidden group active:scale-[0.98] uppercase cursor-pointer"
                  >
                    PROCEED TO CHECKOUT
                  </button>

                  <button
                    onClick={handleViewCartClick}
                    className="w-full border border-brand-bone/20 hover:border-brand-red hover:text-brand-red text-brand-bone py-3 text-xs font-semibold tracking-[0.2em] transition-all uppercase text-center bg-transparent cursor-pointer"
                  >
                    VIEW FULL BAG
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
