import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Box, HardHat, FileText } from 'lucide-react';
import { HERO_PRIMARY, PRODUCT_MAIN_IMG } from '../data';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const About: React.FC = () => {
  useDocumentMetadata(
    'ABOUT US — Our Brand Manifesto & Philosophy',
    'Learn about HA Clothing design manifesto, geometric oversized draping, 480 GSM organic fabrics, and structural high-fashion streetwear specifications.'
  );

  return (
    <div id="about-us-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone overflow-hidden">
      
      {/* 1. Header Splash */}
      <section className="relative h-[55vh] flex items-center justify-center p-6 md:p-12 border-b border-brand-red/10">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_PRIMARY}
            alt="HA Clothing Editorial"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-30 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/75 to-brand-black/20" />
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-4">
          <span className="text-brand-red text-xs tracking-[0.3em] font-bold uppercase block">
            THE MANIFESTO // SINCE 2026
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-brand-bone uppercase tracking-tight leading-none">
            HA <span className="text-brand-red">CLOTHING</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-grey max-w-2xl mx-auto tracking-wider leading-relaxed">
            Uncompromising design. High density fabric specifications. Aggressive streetwear cuts tailored to endure standard urban friction and extreme cold.
          </p>
        </div>
      </section>

      {/* 2. Core split story */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Description Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
              DESIGN PHILOSOPHY
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-brand-bone uppercase tracking-tight leading-tight">
              SARTORIAL STRENGTH.<br />TECHNICAL SHIELD.
            </h2>
            <p className="text-xs text-brand-grey tracking-wide leading-relaxed">
              At HA Clothing, we build garments that act as defense shields. We rejects soft, loose fast-fashion weaves. Our pieces are engineered from heavy-gauge canvas, crinkle-proof high density tech nylons, and heavy organic cotton loops.
            </p>
            <p className="text-xs text-brand-grey tracking-wide leading-relaxed">
              Our aesthetic rules are simple: dominated by Rich Matte Black, supported by solid Off-White bones, and finalized with small flashes of intense Signature Crimson Red. The visual opposite of safe.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.2em] px-8 py-3.5 inline-flex uppercase items-center gap-2"
              >
                BROWSE CATALOUGE <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Product Image block */}
          <div className="lg:col-span-6 bg-[#0F0F0F] aspect-[4/5] overflow-hidden border border-brand-bone/5 relative">
            <img
              src={PRODUCT_MAIN_IMG}
              alt="Atelier flat-lay"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-75 filter grayscale hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="bg-[#050505] border-y border-brand-red/10 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-1">
            <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
              ATELIER METRICS
            </span>
            <h2 className="font-display text-4xl text-brand-bone uppercase tracking-tight">
              OUR STRUCTURAL VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0A0A0A] border border-brand-bone/5 p-8 space-y-4">
              <Box className="w-8 h-8 text-brand-red" />
              <h3 className="text-sm font-bold tracking-widest uppercase text-brand-bone">01 // GEOMETRIC ANGLE DRAPING</h3>
              <p className="text-xs text-brand-grey leading-relaxed tracking-wide">
                We perform architectural fabric modeling on physical fit mannequins to ensure every shoulder line, hood rim, and cargo pocket drops at custom angular configurations.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-brand-bone/5 p-8 space-y-4">
              <HardHat className="w-8 h-8 text-brand-red" />
              <h3 className="text-sm font-bold tracking-widest uppercase text-brand-bone">02 // INDESTRUCTIBLE METRICS</h3>
              <p className="text-xs text-brand-grey leading-relaxed tracking-wide">
                Our heavy French Terry is woven at a rigorous 480-500 GSM weight to maintain a structured drape even after multiple industrial washes. High utility resilience is priority.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-brand-bone/5 p-8 space-y-4">
              <Sparkles className="w-8 h-8 text-brand-red" />
              <h3 className="text-sm font-bold tracking-widest uppercase text-brand-bone">03 // INTENTIONAL HIGHLIGHT CODES</h3>
              <p className="text-xs text-brand-grey leading-relaxed tracking-wide">
                We strictly limit crimson red highlights to structural seam stitching, zip tapes, and interior pocket linings. Red is treated as our signature high-fashion seal.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
