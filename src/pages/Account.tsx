import React, { useState } from 'react';
import { User, LogIn, Lock, Mail, Clipboard, ShieldAlert, KeyRound, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Account: React.FC = () => {
  const { addToast } = useShop();
  
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  // Input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useDocumentMetadata(
    isLoggedIn ? 'MEMBER PROFILE — Dashboard' : 'MEMBER ACCESS — Authenticate Registry',
    'Access your HA Clothing client registry profile, check historic order dispatches, secure your shipping coordinates, and unlock early drops.'
  );

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please complete all login details.', 'error');
      return;
    }
    setUserEmail(email);
    setIsLoggedIn(true);
    addToast('Logged in successfully. Welcome back to the Atelier.', 'success');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      addToast('Please complete all registration details.', 'error');
      return;
    }
    setUserEmail(email);
    setIsLoggedIn(true);
    addToast('Account created successfully. Welcome to the Blackout Circle.', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setFullName('');
    addToast('Logged out of session.', 'info');
  };

  if (isLoggedIn) {
    return (
      <div id="account-dashboard-container" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
        
        {/* Dashboard Header */}
        <section className="border-b border-brand-bone/10 py-12 px-6 md:px-12 bg-[#050505]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left space-y-1">
              <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">SECURED MEMBER PROFILE</span>
              <h1 className="font-display text-4xl uppercase tracking-tight text-brand-bone">
                WELCOME, {fullName.toUpperCase() || 'MEMBER'}
              </h1>
              <p className="text-xs text-brand-grey tracking-wider font-mono">
                EMAIL REGISTRY: {userEmail.toUpperCase()} // STATUS: ACTIVE
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="border border-brand-red/30 hover:bg-brand-red/10 text-brand-red hover:text-brand-bone text-xs font-bold tracking-[0.2em] px-6 py-3 uppercase transition-colors shrink-0 cursor-pointer"
            >
              LOGOUT WIRE
            </button>
          </div>
        </section>

        {/* Dashboard Details */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Order history summary */}
          <div className="lg:col-span-8 bg-[#050505] border border-brand-bone/5 p-6 md:p-8 space-y-6">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-bone border-b border-brand-bone/10 pb-3">
              HISTORIC ORDER DISPATCHES
            </h3>

            {/* Empty history mock */}
            <div className="p-8 bg-[#0A0A0A] border border-brand-bone/5 text-center space-y-4">
              <Clipboard className="w-10 h-10 text-brand-grey/40 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-widest text-brand-bone uppercase">0 DISPATCHED ORDERS LOGGED</h4>
                <p className="text-[11px] text-brand-grey max-w-sm mx-auto leading-relaxed">
                  You have not registered any clothing shipments under this profile. Once you execute checkouts, they will list here.
                </p>
              </div>
            </div>
          </div>

          {/* Member perks info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#050505] border border-[#ff1c2d]/20 p-6 md:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-2 bg-brand-red" />
              <h3 className="font-display text-xl uppercase tracking-tight text-brand-bone flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-brand-red" /> ATELIER BENEFITS
              </h3>
              
              <div className="space-y-4 text-xs tracking-wider">
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-bone uppercase">EXPRESS PORT CHECKOUTS</h4>
                  <p className="text-brand-grey leading-relaxed">
                    Your shipping parameters and payment specs are secured for 1-click checkout drapes.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-brand-bone uppercase">PRIORITY VAULT RELEASES</h4>
                  <p className="text-brand-grey leading-relaxed">
                    Receive SMS/Email notification keys 2 hours prior to public collection pre-drops.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>
    );
  }

  return (
    <div id="account-gate-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone flex items-center justify-center py-20 px-6">
      
      <div className="w-full max-w-md bg-[#050505] border border-brand-bone/10 p-8 relative overflow-hidden shadow-2xl">
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-red" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-red" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-red" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-red" />

        {/* Toggling view */}
        {isRegistering ? (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="space-y-1 text-center">
              <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">JOIN THE CIRCLE</span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-bone">CREATE ATELIER RECORD</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">FULL NAME</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                  <input
                    type="text"
                    required
                    placeholder="ENTER FULL NAME"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red pl-11 pr-4 py-3 text-xs text-brand-bone outline-none font-mono uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                  <input
                    type="email"
                    required
                    placeholder="ENTER EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red pl-11 pr-4 py-3 text-xs text-brand-bone outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">CIPHER KEY CODE</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                  <input
                    type="password"
                    required
                    placeholder="CREATE PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red pl-11 pr-4 py-3 text-xs text-brand-bone outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-3.5 text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              SUBMIT RECORD REGISTRATION
            </button>

            <p className="text-[11px] text-brand-grey text-center tracking-wide font-medium">
              ALREADY REGISTERED?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-brand-red font-bold underline hover:text-brand-bone transition-colors"
              >
                SIGN IN WIRE
              </button>
            </p>
          </form>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-1 text-center">
              <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">MEMBER ARCHIVE</span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-bone">ENTER ATELIER CO.</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                  <input
                    type="email"
                    required
                    placeholder="ENTER REGISTERED EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red pl-11 pr-4 py-3 text-xs text-brand-bone outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">CIPHER KEY CODE</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                  <input
                    type="password"
                    required
                    placeholder="ENTER PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/15 focus:border-brand-red pl-11 pr-4 py-3 text-xs text-brand-bone outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-3.5 text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              INITIALIZE LOGIN WIRE <LogIn className="w-3.5 h-3.5" />
            </button>

            <p className="text-[11px] text-brand-grey text-center tracking-wide font-medium">
              NEW TO THE ATELIER?{' '}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-brand-red font-bold underline hover:text-brand-bone transition-colors"
              >
                CREATE RECORD
              </button>
            </p>
          </form>
        )}

        {/* Small lock note */}
        <div className="mt-6 pt-4 border-t border-brand-bone/5 flex items-center gap-2 text-[9px] text-brand-grey tracking-widest uppercase font-semibold justify-center">
          <KeyRound className="w-3 h-3 text-brand-red" />
          <span>256-bit member-cipher encryption</span>
        </div>
      </div>

    </div>
  );
};
