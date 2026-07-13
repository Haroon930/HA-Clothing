import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Instagram, Twitter, MessageCircle, CreditCard } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { addToast, setSizeGuideOpen } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Subscription successful. Welcome to the Blackout Circle.', 'success');
    setEmail('');
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-brand-red/10 text-brand-bone relative">
      
      {/* Top Banner: Newsletter signup */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-b border-brand-bone/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-2">
            <h3 className="font-display text-2xl md:text-3xl tracking-tight uppercase">
              JOIN THE <span className="text-brand-red">BLACKOUT CIRCLE</span>
            </h3>
            <p className="text-xs text-brand-grey max-w-md tracking-wide leading-relaxed">
              Sign up for priority access to secret archives, collection pre-drops, and limited-run editorial streetwear collaborations.
            </p>
          </div>
          <div className="lg:col-span-7">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red text-xs px-5 py-4 tracking-widest text-brand-bone outline-none placeholder-brand-grey/60 transition-all font-mono"
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey/50" />
              </div>
              <button
                type="submit"
                className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.25em] px-8 py-4 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase shrink-0"
              >
                SUBSCRIBE <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Brand identity */}
        <div className="space-y-4">
          <span className="font-display text-xl tracking-tight block">
            HA <span className="text-brand-red">CLOTHING</span>
          </span>
          <p className="text-[11px] text-brand-grey leading-relaxed tracking-wider max-w-[200px]">
            BUILT IN BLACK.<br />FINISHED IN RED.<br />PREMIUM STREETWEAR DESIGNED TO RESIST THE COLD.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-brand-grey hover:text-brand-red transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-brand-grey hover:text-brand-red transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-brand-grey hover:text-brand-red transition-colors" aria-label="Discord">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column: Shop Categories */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-[0.2em] text-brand-bone uppercase border-l-2 border-brand-red pl-2.5">
            SHOP COLLECTIONS
          </h4>
          <ul className="space-y-2.5 text-xs text-brand-grey font-medium tracking-wider">
            <li><Link to="/shop" className="hover:text-brand-red transition-colors">ALL APPAREL</Link></li>
            <li><Link to="/shop/jackets" className="hover:text-brand-red transition-colors">TECHNICAL JACKETS</Link></li>
            <li><Link to="/shop/hoodies" className="hover:text-brand-red transition-colors">HEAVYWEIGHT HOODIES</Link></li>
            <li><Link to="/shop/pants" className="hover:text-brand-red transition-colors">TAPERED CARGO PANTS</Link></li>
            <li><span className="text-brand-red text-[10px] bg-brand-red/10 px-2 py-0.5 rounded font-bold">LIMITED DROP</span></li>
          </ul>
        </div>

        {/* Column: Help Center */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-[0.2em] text-brand-bone uppercase border-l-2 border-brand-red pl-2.5">
            CUSTOMER SUPPORT
          </h4>
          <ul className="space-y-2.5 text-xs text-brand-grey font-medium tracking-wider">
            <li><Link to="/contact" className="hover:text-brand-red transition-colors">SUBMIT TICKET</Link></li>
            <li><Link to="/about" className="hover:text-brand-red transition-colors">SHIPPING POLICY</Link></li>
            <li><Link to="/about" className="hover:text-brand-red transition-colors">COMPLIMENTARY RETURNS</Link></li>
            <li>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="hover:text-brand-red transition-colors text-left bg-transparent p-0 border-0 cursor-pointer text-xs text-brand-grey tracking-wider font-medium"
              >
                SIZE SCALING GUIDE
              </button>
            </li>
          </ul>
        </div>

        {/* Column: About */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-[0.2em] text-brand-bone uppercase border-l-2 border-brand-red pl-2.5">
            HA STUDIO
          </h4>
          <p className="text-xs text-brand-grey leading-relaxed tracking-wide">
            Our atelier is focused on high-density materials, rigid hardware finishes, and functional utility cuts. Built for comfort, engineered for performance.
          </p>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 border-t border-brand-bone/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-brand-grey font-medium tracking-widest">
        <span>© 2026 HA CLOTHING ATELIER. ALL RIGHTS RESERVED.</span>
        
        {/* Mock Payment Icons */}
        <div className="flex items-center gap-3">
          <CreditCard className="w-3.5 h-3.5 text-brand-grey" />
          <span>VISA / MC / AMEX / PAY / BITCOIN</span>
        </div>

        <div className="flex gap-6">
          <Link to="/about" className="hover:text-brand-bone transition-colors">PRIVACY CODE</Link>
          <Link to="/about" className="hover:text-brand-bone transition-colors">TERMS OF SALE</Link>
        </div>
      </div>

    </footer>
  );
};
