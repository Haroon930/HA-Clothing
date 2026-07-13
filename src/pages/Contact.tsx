import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Contact: React.FC = () => {
  const { addToast } = useShop();
  const [form, setForm] = useState({ name: '', email: '', subject: 'size', message: '' });

  useDocumentMetadata(
    'CONTACT US — Submit Atelier Ticket',
    'Get in touch with HA Clothing support for custom garment sizing, shipping issues, structural exchanges, and collaboration inquiries. Rapid 12-hour response.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Please complete all form specifications.', 'error');
      return;
    }
    addToast('Atelier Ticket created! Support will respond within 12 hours.', 'success');
    setForm({ name: '', email: '', subject: 'size', message: '' });
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
      
      {/* Header Banner */}
      <section className="border-b border-brand-bone/10 py-12 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] tracking-[0.2em] font-bold text-brand-grey uppercase">
            <span>HOME</span>
            <span>/</span>
            <span className="text-brand-red">SUBMIT TICKET</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-brand-bone">
            CLIENT SUPPORT CORRIDOR
          </h1>
          <p className="text-xs text-brand-grey tracking-wider font-semibold font-mono">
            ESTABLISHED RESPONSE MATRIX: 12 HOURS MAXIMUM
          </p>
        </div>
      </section>

      {/* Main Form content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#050505] border border-brand-bone/5 p-6 md:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-brand-red text-xs tracking-[0.2em] font-bold uppercase block">SECURED ENVELOPE</span>
              <h3 className="font-display text-2xl uppercase tracking-tight text-brand-bone">SUBMIT SPEC TICKET</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="ENTER FULL NAME"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="ENTER EMAIL ADDRESS"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">TICKET SUBJECT</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none font-mono"
                >
                  <option value="size">GARMENT SIZING & HEIGHT CONSTRAINTS</option>
                  <option value="shipping">SECURE TRANSIT & SHIPMENT DELAYS</option>
                  <option value="exchange">STRUCTURAL EXCHANGES & DEFECTS</option>
                  <option value="collab">CREATIVE COLLABORATIONS & ARCHIVES</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">SPECIFIC DETAILS</label>
                <textarea
                  required
                  rows={5}
                  placeholder="PROVIDE AS MUCH GEOMETRIC DETAIL AS POSSIBLE, INCLUDING MEASUREMENTS OR ORDER CODES..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red px-4 py-3 text-xs text-brand-bone outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-3.5 text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                SUBMIT ATELIER TICKET <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right: Info and Channels details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier details card */}
            <div className="bg-[#050505] border border-brand-bone/5 p-6 md:p-8 space-y-6">
              <h3 className="font-display text-xl uppercase tracking-tight text-brand-bone">ATELIER CORE LOCATIONS</h3>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex gap-3.5 items-start">
                  <MapPin className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <div>
                    <h4 className="font-bold text-brand-bone uppercase tracking-wider">OFFICIAL STUDIO HQ</h4>
                    <p className="text-brand-grey mt-0.5 leading-relaxed">
                      HA CLOTHING ARCHIVES<br />
                      34 URBAN RED BOULEVARD, ATELIER 10A<br />
                      NEW YORK, NY 10013
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <Mail className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <div>
                    <h4 className="font-bold text-brand-bone uppercase tracking-wider">SECURE DIGITAL MAILS</h4>
                    <p className="text-brand-grey mt-0.5 leading-relaxed hover:text-brand-red transition-colors">
                      <a href="mailto:support@haclothing.com">support@haclothing.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <Phone className="w-4.5 h-4.5 text-brand-red shrink-0" />
                  <div>
                    <h4 className="font-bold text-brand-bone uppercase tracking-wider">URGENT CALL WIRES</h4>
                    <p className="text-brand-grey mt-0.5 leading-relaxed">
                      +1 (212) 555-BLACKOUT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ card */}
            <div className="bg-[#050505] border border-brand-bone/5 p-6 md:p-8 space-y-4">
              <h3 className="font-display text-xl uppercase tracking-tight text-brand-bone flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-red" /> FAST ANSWERS
              </h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-bone uppercase">HOW LONG UNTIL COMPLIMENTARY SHIPMENT DISPATCH?</h4>
                  <p className="text-brand-grey leading-relaxed">
                    Most orders undergo strict packaging inspection and clear for transit within 24 hours.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-bone uppercase">IS THE SIZE ADJUSTMENT EXCHANGE FREE?</h4>
                  <p className="text-brand-grey leading-relaxed">
                    Yes. We provide pre-paid return shipment labels for all sizing corrections requested within 14 days.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
