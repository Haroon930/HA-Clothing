import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Checkout: React.FC = () => {
  const {
    cart,
    clearCart,
    getCartSubtotal,
    addToast,
    placedOrder,
    setPlacedOrder,
  } = useShop();

  const navigate = useNavigate();
  const subtotal = getCartSubtotal();

  // Step state: 'shipping' | 'payment' | 'review' | 'confirmation'
  const [step, setStep] = useState<'shipping' | 'payment' | 'review' | 'confirmation'>('shipping');

  useDocumentMetadata(
    step === 'confirmation' ? 'ORDER CONFIRMED' : `SECURE CHECKOUT — ${step.toUpperCase()}`,
    'Finalize your purchase securely at HA Clothing. Complete your shipping parameters and payment metrics to register your order.'
  );

  // Input states
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // Automatically handle empty cart redirect
  useEffect(() => {
    // If cart is empty AND we haven't placed an order yet, we shouldn't be here
    if (cart.length === 0 && step !== 'confirmation' && !placedOrder) {
      navigate('/shop');
    }
  }, [cart, step, placedOrder, navigate]);

  // Calculate costs
  const shippingCost = subtotal >= 150 ? 0 : 15;
  const grandTotal = subtotal + shippingCost;

  // Formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setPaymentForm({ ...paymentForm, cardNumber: formatted.slice(0, 19) });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
      setPaymentForm({ ...paymentForm, expiry: `${value.slice(0, 2)}/${value.slice(2, 4)}` });
    } else {
      setPaymentForm({ ...paymentForm, expiry: value });
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    setPaymentForm({ ...paymentForm, cvv: value.slice(0, 4) });
  };

  // Navigations
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = () => {
    const randomId = `HA-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newOrder = {
      orderId: randomId,
      items: [...cart],
      shipping: { ...shippingForm },
      total: grandTotal,
      date: new Date().toLocaleDateString(),
    };

    setPlacedOrder(newOrder);
    setStep('confirmation');
    clearCart();
    addToast('Order placed successfully. Thank you!', 'success');
  };

  // Render Confirmation Step
  if (step === 'confirmation' && placedOrder) {
    return (
      <div id="checkout-confirmation-container" className="min-h-[80vh] flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-xl bg-[#050505] border border-brand-red/35 p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
          {/* Corner elements */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-red" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-red" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-red" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-red" />

          <div className="space-y-4">
            <CheckCircle2 className="w-16 h-16 text-brand-red mx-auto stroke-[1.5]" />
            <span className="text-brand-red text-xs tracking-[0.3em] font-bold uppercase block">SECURED TRANSIT PROCESSED</span>
            <h1 className="font-display text-4xl uppercase tracking-tight text-brand-bone">
              ORDER REGISTERED
            </h1>
            <p className="text-xs text-brand-grey max-w-md mx-auto leading-relaxed tracking-wider">
              We have compiled your streetwear selection. Your order is currently being inspected at our atelier, and will be cleared for dispatch shortly.
            </p>
          </div>

          {/* Details summary card */}
          <div className="p-5 bg-[#0A0A0A] border border-brand-bone/5 text-left text-xs font-mono space-y-3">
            <div className="flex justify-between border-b border-brand-bone/10 pb-2 text-brand-bone font-bold">
              <span>ORDER IDENTIFIER:</span>
              <span className="text-brand-red">{placedOrder.orderId}</span>
            </div>
            <div className="flex justify-between text-brand-grey">
              <span>Client Email:</span>
              <span className="text-brand-bone">{placedOrder.shipping.email}</span>
            </div>
            <div className="flex justify-between text-brand-grey">
              <span>Shipping Address:</span>
              <span className="text-brand-bone text-right">
                {placedOrder.shipping.address}, {placedOrder.shipping.city}
              </span>
            </div>
            <div className="flex justify-between text-brand-grey">
              <span>Registration Date:</span>
              <span className="text-brand-bone">{placedOrder.date}</span>
            </div>
            <div className="flex justify-between border-t border-brand-bone/10 pt-2 text-brand-bone font-bold text-sm">
              <span>GRAND TOTAL:</span>
              <span className="text-brand-red">${placedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              id="checkout-confirmation-continue"
              to="/shop"
              className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.25em] px-10 py-4 block uppercase transition-all"
              onClick={() => setPlacedOrder(null)}
            >
              CONTINUE SHOPPING ARCHIVE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-funnel-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
      
      {/* Checkout header banner */}
      <section className="border-b border-brand-bone/10 py-8 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="font-display text-3xl uppercase tracking-tight text-brand-bone leading-none">
              SECURE CHECKOUT
            </h1>
            <p className="text-[10px] text-brand-grey tracking-wider font-semibold font-mono mt-1">
              HA ATELIER MOCK TRANSFERS GATEWAY
            </p>
          </div>

          {/* Stepper progress indicator */}
          <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-widest font-bold">
            <span className={step === 'shipping' ? 'text-brand-red' : 'text-brand-grey'}>1. SHIPPING</span>
            <span className="text-brand-grey/40">//</span>
            <span className={step === 'payment' ? 'text-brand-red' : 'text-brand-grey'}>2. CARD DETAILS</span>
            <span className="text-brand-grey/40">//</span>
            <span className={step === 'review' ? 'text-brand-red' : 'text-brand-grey'}>3. CONFIRMATION</span>
          </div>
        </div>
      </section>

      {/* Main funnel form */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Input Columns */}
          <div className="lg:col-span-7">
            {/* Step 1: Shipping Details */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="space-y-1">
                  <span className="text-brand-red text-xs tracking-[0.2em] font-bold uppercase block">STEP 01</span>
                  <h3 className="font-display text-2xl uppercase tracking-tight text-brand-bone">CONTACT & SHIPPING LOG</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">First Name</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.firstName}
                      onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">Last Name</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.lastName}
                      onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">Delivery Address</label>
                  <input
                    type="text"
                    required
                    placeholder="STREET ADDRESS AND APARTMENT / UNIT"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none placeholder-brand-grey/40 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">City</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">State / Region</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">ZIP / Postal Code</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.zipCode}
                      onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  id="checkout-shipping-btn"
                  type="submit"
                  className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer text-center"
                >
                  PROCEED TO PAYMENT SPECS
                </button>
              </form>
            )}

            {/* Step 2: Payment Details */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-1 flex items-center justify-between">
                  <div>
                    <span className="text-brand-red text-xs tracking-[0.2em] font-bold uppercase block">STEP 02</span>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-brand-bone">CARD SPECIFICATION</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="text-xs text-brand-grey hover:text-brand-red transition-colors flex items-center gap-1 uppercase font-bold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK
                  </button>
                </div>

                {/* Secure warning info */}
                <div className="p-4 bg-brand-red/5 border border-brand-red/20 text-xs text-brand-red leading-relaxed tracking-wider">
                  ⚠️ **DEVELOPMENT DEMO MODE:** Do NOT enter real credit card numbers. You can input standard dummy numbers to continue.
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">CARD NUMBER</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        value={paymentForm.cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono tracking-widest"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-grey" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">CARDHOLDER NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="E.G. MARKUS K."
                      value={paymentForm.cardName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value.toUpperCase() })}
                      className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none uppercase font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">EXPIRY DATE</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentForm.expiry}
                        onChange={handleExpiryChange}
                        className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">CVV CODE</label>
                      <input
                        type="password"
                        required
                        placeholder="000"
                        value={paymentForm.cvv}
                        onChange={handleCVVChange}
                        className="w-full bg-[#050505] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  id="checkout-payment-btn"
                  type="submit"
                  className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer text-center"
                >
                  PROCEED TO FINAL REVIEW
                </button>
              </form>
            )}

            {/* Step 3: Review Details */}
            {step === 'review' && (
              <div className="space-y-6">
                <div className="space-y-1 flex items-center justify-between">
                  <div>
                    <span className="text-brand-red text-xs tracking-[0.2em] font-bold uppercase block">STEP 03</span>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-brand-bone">FINAL ORDER VERIFICATION</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="text-xs text-brand-grey hover:text-brand-red transition-colors flex items-center gap-1 uppercase font-bold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK
                  </button>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {/* Delivery summary details */}
                  <div className="p-5 bg-[#050505] border border-brand-bone/10 space-y-3">
                    <h4 className="text-xs font-bold text-brand-red uppercase tracking-wider pb-1 border-b border-brand-bone/5">
                      DISPATCH ADDRESS DETAILS
                    </h4>
                    <p className="text-brand-bone font-semibold">
                      {shippingForm.firstName} {shippingForm.lastName}
                    </p>
                    <p className="text-brand-grey">{shippingForm.address}</p>
                    <p className="text-brand-grey">
                      {shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}
                    </p>
                    <p className="text-brand-grey">Contact Phone: {shippingForm.phone}</p>
                  </div>

                  {/* Payment summary details */}
                  <div className="p-5 bg-[#050505] border border-brand-bone/10 space-y-2">
                    <h4 className="text-xs font-bold text-brand-red uppercase tracking-wider pb-1 border-b border-brand-bone/5">
                      MOCK PAYMENT SUMMARY
                    </h4>
                    <p className="text-brand-grey">
                      Card Number:{' '}
                      <span className="text-brand-bone">
                        •••• •••• •••• {paymentForm.cardNumber.slice(-4)}
                      </span>
                    </p>
                    <p className="text-brand-grey">
                      Cardholder Name: <span className="text-brand-bone">{paymentForm.cardName}</span>
                    </p>
                  </div>
                </div>

                <button
                  id="checkout-confirm-order-btn"
                  onClick={handlePlaceOrder}
                  className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-4.5 text-xs font-bold tracking-[0.25em] uppercase transition-all cursor-pointer text-center shadow-lg shadow-brand-red/10"
                >
                  CONFIRM & PLACE ORDER NOW
                </button>
              </div>
            )}
          </div>

          {/* Right: Cart side-drawer summary */}
          <div className="lg:col-span-5 bg-[#050505] border border-brand-bone/10 p-6 md:p-8 space-y-6">
            <h3 className="font-display text-xl tracking-tight uppercase text-brand-bone">GARMENT SUMMARY</h3>
            
            {/* Short review item listings */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 divide-y divide-brand-bone/5">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3.5 pt-4 first:pt-0">
                  <div className="w-12 h-15 bg-[#121212] border border-brand-bone/5 overflow-hidden shrink-0">
                    <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-brand-bone truncate">{item.product.name}</h4>
                    <div className="flex gap-2 text-[10px] text-brand-grey mt-0.5">
                      <span>SIZE: {item.selectedSize}</span>
                      <span>QTY: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-brand-bone shrink-0">
                    ${(item.product.price * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations summaries */}
            <div className="divide-y divide-brand-bone/5 text-xs font-mono pt-4 border-t border-brand-bone/10">
              <div className="py-2.5 flex justify-between text-brand-grey">
                <span>Subtotal</span>
                <span className="text-brand-bone">${subtotal.toFixed(2)}</span>
              </div>
              <div className="py-2.5 flex justify-between text-brand-grey">
                <span>Atelier shipping fee</span>
                <span className="text-brand-bone">
                  {shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="py-3 flex justify-between text-sm font-bold text-brand-bone">
                <span>GRAND TOTAL</span>
                <span className="text-brand-red font-display tracking-tight text-base">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Assurances */}
            <div className="pt-4 border-t border-brand-bone/5 space-y-2 text-[9px] text-brand-grey tracking-widest uppercase font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                <span>ATELIER CIPHER SECURITY ENCRYPTION</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-red shrink-0" />
                <span>EXPRESS CORRIDOR DISPATCH</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
