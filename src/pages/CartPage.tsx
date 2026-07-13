import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Tag, HelpCircle, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartCount,
    addToast,
  } = useShop();

  const navigate = useNavigate();
  const subtotal = getCartSubtotal();

  useDocumentMetadata(
    `SHOPPING BAG (${getCartCount()})`,
    'View and manage items inside your HA Clothing active shopping bag, apply promo codes, and proceed to our secure multi-step checkout.'
  );

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = subtotal > 0 ? (isFreeShipping ? 0 : 15) : 0;

  // Handle coupon application
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'BLACKOUT10') {
      setAppliedPromo('BLACKOUT10');
      const discount = subtotal * 0.1;
      setDiscountAmount(discount);
      addToast('Promo Code BLACKOUT10 applied! 10% discount subtracted.', 'success');
      setPromoInput('');
    } else if (code === 'FREESHIP' && !isFreeShipping) {
      setAppliedPromo('FREESHIP');
      addToast('Promo Code FREESHIP applied! Free shipping granted.', 'success');
      setPromoInput('');
    } else {
      addToast('Invalid or expired coupon code. Try "BLACKOUT10".', 'error');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    addToast('Promo Code removed.', 'info');
  };

  const finalShippingCost = useMemo(() => {
    if (appliedPromo === 'FREESHIP') return 0;
    return shippingCost;
  }, [appliedPromo, shippingCost]);

  const grandTotal = subtotal - discountAmount + finalShippingCost;

  const handleCheckoutClick = () => {
    // Store discount details in local storage or a shared state if needed, or just let useShop clear it on submit
    navigate('/checkout');
  };

  return (
    <div id="standalone-cart-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
      
      {/* Header section */}
      <section className="border-b border-brand-bone/10 py-12 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] tracking-[0.2em] font-bold text-brand-grey uppercase">
            <Link to="/" className="hover:text-brand-red transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-brand-red">BAG DETAILS</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-brand-bone">
            YOUR SHOPPING BAG ({getCartCount()} ARTICLES)
          </h1>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {cart.length === 0 ? (
          <div className="p-16 border border-brand-bone/5 text-center space-y-6 bg-[#050505] max-w-2xl mx-auto">
            <Trash2 className="w-12 h-12 text-brand-grey/40 stroke-[1.5] mx-auto" />
            <div className="space-y-2">
              <h3 className="font-display text-2xl uppercase tracking-wide text-brand-bone">YOUR ARCHIVE BAG IS EMPTY</h3>
              <p className="text-xs text-brand-grey leading-relaxed max-w-sm mx-auto">
                No streetwear configurations have been added to your session active bag. Explore the latest technical jackets and heavyweight hoodies drops now.
              </p>
            </div>
            <Link
              to="/shop"
              className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.2em] px-8 py-3.5 inline-block uppercase transition-all"
            >
              SHOP LATEST DROP
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Cart items */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border-b border-brand-bone/10 pb-4 hidden md:grid grid-cols-12 text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                <div className="col-span-6">GARMENT PRODUCT</div>
                <div className="col-span-2 text-center">SIZE / COLOR</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-right">SUBTOTAL</div>
              </div>

              <div className="divide-y divide-brand-bone/5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Thumbnail & Meta */}
                    <div className="col-span-6 flex gap-4 w-full">
                      <div className="w-20 h-24 bg-[#121212] border border-brand-bone/5 overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="text-sm font-bold text-brand-bone hover:text-brand-red transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-[10px] text-brand-grey uppercase tracking-wider">
                            {item.product.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-brand-red hover:text-brand-bone font-bold tracking-widest uppercase flex items-center gap-1.5 pt-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> REMOVE ARTICLE
                        </button>
                      </div>
                    </div>

                    {/* Size / Color */}
                    <div className="col-span-2 flex md:flex-col items-center justify-between md:justify-center gap-2 w-full md:w-auto mt-2 md:mt-0 py-1.5 px-3 md:p-0 bg-[#0F0F0F] md:bg-transparent border border-brand-bone/5 md:border-0">
                      <span className="text-[10px] text-brand-grey uppercase md:hidden font-bold">Size & Colorway</span>
                      <div className="flex items-center md:flex-col gap-1.5 text-xs font-semibold font-mono">
                        <span className="px-2 py-0.5 bg-[#141414] border border-brand-bone/10 text-brand-bone font-bold">
                          {item.selectedSize}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-brand-bone/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                            title={item.selectedColor.name}
                          />
                          <span className="text-[10px] text-brand-grey uppercase font-mono max-w-[80px] truncate">
                            {item.selectedColor.name.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="col-span-2 flex md:flex-col items-center justify-between md:justify-center gap-2 w-full md:w-auto mt-2 md:mt-0 py-1.5 px-3 md:p-0 bg-[#0F0F0F] md:bg-transparent border border-brand-bone/5 md:border-0">
                      <span className="text-[10px] text-brand-grey uppercase md:hidden font-bold font-mono">Qty Modifier</span>
                      <div className="flex items-center border border-brand-bone/15 bg-[#050505]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-brand-bone hover:text-brand-red transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 font-mono text-xs font-bold text-brand-bone">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-brand-bone hover:text-brand-red transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 flex md:flex-col items-center justify-between md:justify-end gap-2 w-full md:w-auto mt-2 md:mt-0 py-1.5 px-3 md:p-0 bg-[#0F0F0F] md:bg-transparent border border-brand-bone/5 md:border-0">
                      <span className="text-[10px] text-brand-grey uppercase md:hidden font-bold">Product Price</span>
                      <span className="text-sm font-bold font-mono text-brand-bone text-right">
                        ${(item.product.price * item.quantity).toFixed(0)}.00
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Promo code Form banner */}
              <div className="bg-[#050505] p-6 border border-brand-bone/5 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-brand-red uppercase block">COUPONS PROMO</span>
                  <h4 className="text-xs font-bold text-brand-bone uppercase tracking-wider">HAVE A CAMPAIGN CODE?</h4>
                  <p className="text-[10px] text-brand-grey tracking-wide leading-relaxed max-w-sm">
                    Enter coupon <span className="text-brand-bone font-mono font-bold">BLACKOUT10</span> for a complimentary 10% subtotal subtraction.
                  </p>
                </div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ENTER CODE"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="bg-[#0A0A0A] border border-brand-bone/15 px-4 py-2.5 text-xs text-brand-bone font-mono outline-none focus:border-brand-red uppercase tracking-widest max-w-[140px]"
                  />
                  <button
                    type="submit"
                    className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-widest px-5 py-2.5 uppercase transition-all shrink-0 cursor-pointer"
                  >
                    APPLY
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column: Summary sidebar */}
            <div className="lg:col-span-4 bg-[#050505] border border-brand-bone/10 p-6 md:p-8 space-y-6">
              <h3 className="font-display text-xl tracking-tight uppercase text-brand-bone">ORDER SUMMARY</h3>
              
              <div className="divide-y divide-brand-bone/5 text-xs tracking-wide">
                {/* Subtotal */}
                <div className="py-3 flex justify-between text-brand-grey font-medium">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-brand-bone font-mono">${subtotal.toFixed(2)}</span>
                </div>

                {/* Promo deduction if any */}
                {appliedPromo && (
                  <div className="py-3 flex justify-between text-brand-red font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Coupon: {appliedPromo}
                    </span>
                    <span className="font-bold font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Shipping */}
                <div className="py-3 flex justify-between text-brand-grey font-medium">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-brand-bone font-mono">
                    {finalShippingCost === 0 ? 'FREE' : `$${finalShippingCost.toFixed(2)}`}
                  </span>
                </div>

                {/* Shipping prompt info */}
                {!isFreeShipping && appliedPromo !== 'FREESHIP' && (
                  <p className="text-[9px] text-brand-grey tracking-wider leading-relaxed pt-2">
                    * Add <span className="font-bold text-brand-red">${(freeShippingThreshold - subtotal).toFixed(2)}</span> more to qualify for complimentary shipping.
                  </p>
                )}

                {/* Grand Total */}
                <div className="py-4 flex justify-between text-base font-bold text-brand-bone">
                  <span>Grand Total</span>
                  <span className="text-brand-red font-display tracking-tight text-lg font-bold">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Render applied coupon status block */}
              {appliedPromo && (
                <div className="p-3 bg-brand-red/5 border border-brand-red/20 text-[10px] flex justify-between items-center text-brand-red tracking-wider">
                  <span>Coupon {appliedPromo} Active</span>
                  <button
                    onClick={handleRemovePromo}
                    className="text-brand-grey hover:text-brand-red transition-colors font-mono font-bold uppercase"
                  >
                    [REMOVE]
                  </button>
                </div>
              )}

              {/* Checkout actions */}
              <div className="space-y-3">
                <button
                  id="cart-page-checkout-btn"
                  onClick={handleCheckoutClick}
                  className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-4 text-xs font-bold tracking-[0.2em] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-red/10"
                >
                  PROCEED TO SECURE CHECKOUT <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/shop"
                  className="w-full border border-brand-bone/15 hover:border-brand-red text-brand-bone hover:text-brand-red py-3 text-xs font-semibold tracking-[0.2em] uppercase text-center bg-transparent block"
                >
                  CONTINUE SHOPPING ARCHIVE
                </Link>
              </div>

              {/* Assurances logs */}
              <div className="pt-4 border-t border-brand-bone/5 space-y-2 text-[10px] text-brand-grey tracking-wider">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-red" />
                  <span>256-BIT ATELIER ENCRYPTED TRANSFERS</span>
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-red" />
                  <span>NEED SIZING HELP? SUBMIT CONTACT SHEETS</span>
                </div>
              </div>

            </div>

          </div>
        )}
      </section>

    </div>
  );
};
