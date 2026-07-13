import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import {
  HERO_PRIMARY,
  CATEGORY_JACKETS_IMG,
  CATEGORY_HOODIES_IMG,
  CATEGORY_PANTS_IMG,
  PRODUCTS,
  TESTIMONIALS,
} from '../data';
import { ProductCard } from '../components/ProductCard';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Home: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  // Dynamic SEO schema markup
  const homeSchema = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ha-clothing.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'Store',
      'name': 'HA Clothing',
      'description': 'Premium streetwear and casual apparel online storefront. Built in our signature high-contrast black and crimson colorways.',
      'url': origin,
      'image': `${origin}${HERO_PRIMARY}`,
      'telephone': '+1-800-555-0199',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Atelier Sector Blackout',
        'addressLocality': 'New York',
        'addressRegion': 'NY',
        'postalCode': '10001',
        'addressCountry': 'US'
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${origin}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }, []);

  useDocumentMetadata(
    'HA CLOTHING — Premium Streetwear Archive',
    'Shop high-density 480 GSM organic cotton hoodies, layered weatherproof technical jackets, and tapered utility cargos. Distinct black-and-red premium aesthetics.',
    homeSchema
  );

  // Stagger reveal animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 180 } },
  };

  return (
    <div id="home-page" className="bg-[#0A0A0A] overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center py-20 px-6 md:px-12">
        {/* Background Full-bleed Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_PRIMARY}
            alt="HA Clothing Hero Model"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45"
          />
          {/* Dense dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-transparent to-brand-black/95" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl text-center space-y-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="text-brand-red text-xs md:text-sm tracking-[0.3em] font-bold uppercase block">
              EST. 2026 // BLACKOUT ATELIER
            </span>
            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl text-brand-bone tracking-tight leading-none uppercase">
              BUILT IN <span className="text-brand-red">BLACK.</span><br />
              FINISHED IN <span className="text-outline">RED.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xs sm:text-sm text-brand-grey max-w-xl mx-auto tracking-wider leading-relaxed"
          >
            Sartorial streetwear engineered for cold environments. High-density organic cottons, technical weather-resistant membranes, and bold signature crimson highlights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              id="hero-shop-all-btn"
              to="/shop"
              className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.25em] px-10 py-4.5 transition-all w-full sm:w-auto uppercase shadow-lg shadow-brand-red/10 active:scale-95 text-center"
            >
              SHOP ARCHIVE
            </Link>
            <Link
              to="/shop/jackets"
              className="border border-brand-bone/20 hover:border-brand-red text-brand-bone hover:text-brand-red text-xs font-semibold tracking-[0.25em] px-10 py-4.5 transition-all w-full sm:w-auto uppercase bg-brand-black/20 backdrop-blur text-center"
            >
              EXPLORE JACKETS
            </Link>
          </motion.div>
        </div>

        {/* Scroll cues */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-65 text-brand-grey text-[10px] tracking-widest font-semibold uppercase">
          <span>SCROLL ARCHIVE</span>
          <div className="w-1 h-12 bg-brand-bone/10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 bg-brand-red h-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Brand Tagline Marquee Strip */}
      <section className="w-full bg-[#050505] py-5 border-y border-brand-bone/5 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex gap-16 text-xs md:text-sm font-display tracking-[0.2em] uppercase text-brand-bone/60">
            <span>HA CLOTHING ATELIER CO.</span>
            <span className="text-brand-red">•</span>
            <span>CRIMSON HIGHLIGHTS</span>
            <span className="text-brand-red">•</span>
            <span>HIGH WEATHER RESISTANCE</span>
            <span className="text-brand-red">•</span>
            <span>BOX STREETWEAR CUTS</span>
            <span className="text-brand-red">•</span>
            <span>TECHNICAL OUTERWEAR</span>
            <span className="text-brand-red">•</span>
          </div>
          <div className="animate-marquee flex gap-16 text-xs md:text-sm font-display tracking-[0.2em] uppercase text-brand-bone/60" aria-hidden="true">
            <span>HA CLOTHING ATELIER CO.</span>
            <span className="text-brand-red">•</span>
            <span>CRIMSON HIGHLIGHTS</span>
            <span className="text-brand-red">•</span>
            <span>HIGH WEATHER RESISTANCE</span>
            <span className="text-brand-red">•</span>
            <span>BOX STREETWEAR CUTS</span>
            <span className="text-brand-red">•</span>
            <span>TECHNICAL OUTERWEAR</span>
            <span className="text-brand-red">•</span>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-16">
        <div className="text-center md:text-left space-y-1">
          <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
            CORE CONFIGURATIONS
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-brand-bone uppercase tracking-tight">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card: Jackets */}
          <Link
            id="cat-card-jackets"
            to="/shop/jackets"
            className="group relative aspect-[4/5] bg-[#121212] overflow-hidden border border-brand-bone/5 hover:border-brand-red/30 transition-all duration-300"
          >
            <img
              src={CATEGORY_JACKETS_IMG}
              alt="Jackets Catalog"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 space-y-1.5">
              <span className="text-[10px] text-brand-red tracking-[0.25em] font-bold block">COLLECTION 01</span>
              <h3 className="font-display text-2xl md:text-3xl text-brand-bone uppercase leading-none">TECHNICAL JACKETS</h3>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-bone group-hover:text-brand-red transition-colors pt-1">
                DISCOVER ARCHIVE <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card: Hoodies */}
          <Link
            id="cat-card-hoodies"
            to="/shop/hoodies"
            className="group relative aspect-[4/5] bg-[#121212] overflow-hidden border border-brand-bone/5 hover:border-brand-red/30 transition-all duration-300"
          >
            <img
              src={CATEGORY_HOODIES_IMG}
              alt="Hoodies Catalog"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 space-y-1.5">
              <span className="text-[10px] text-brand-red tracking-[0.25em] font-bold block">HEAVY FABRICS</span>
              <h3 className="font-display text-2xl md:text-3xl text-brand-bone uppercase leading-none">HEAVYWEIGHT HOODIES</h3>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-bone group-hover:text-brand-red transition-colors pt-1">
                DISCOVER ARCHIVE <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card: Pants */}
          <Link
            id="cat-card-pants"
            to="/shop/pants"
            className="group relative aspect-[4/5] bg-[#121212] overflow-hidden border border-brand-bone/5 hover:border-brand-red/30 transition-all duration-300"
          >
            <img
              src={CATEGORY_PANTS_IMG}
              alt="Pants Catalog"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 space-y-1.5">
              <span className="text-[10px] text-brand-red tracking-[0.25em] font-bold block">MODULAR STYLING</span>
              <h3 className="font-display text-2xl md:text-3xl text-brand-bone uppercase leading-none">TAPERED PANTS</h3>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-bone group-hover:text-brand-red transition-colors pt-1">
                DISCOVER ARCHIVE <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section className="bg-[#050505] border-y border-brand-red/10 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
            <div className="space-y-1 text-left">
              <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
                HIGH DENSITY DEMAND
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-bone uppercase tracking-tight">
                BEST SELLING PIECES
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-semibold tracking-[0.2em] text-brand-bone hover:text-brand-red transition-colors flex items-center gap-2 shrink-0 border-b border-brand-bone/20 pb-1"
            >
              VIEW ALL ARCHIVES <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Best Sellers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Brand Story Split Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Left */}
          <div className="lg:col-span-6 bg-[#0F0F0F] aspect-[16/10] overflow-hidden border border-brand-bone/5">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
              alt="Editorial portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter grayscale contrast-125 hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>

          {/* Text Right */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
              OUR ATELIER CODE
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-brand-bone uppercase tracking-tight leading-none">
              DESIGNED FOR THE UNCOMPROMISING
            </h2>
            <p className="text-xs text-brand-grey tracking-wide leading-relaxed">
              HA Clothing was founded to challenge safe, predictable silhouettes. Every jacket, hoodie, and pant we release undergoes rigorous geometry testing to achieve the perfect oversized, angular street drape.
            </p>
            <p className="text-xs text-brand-grey tracking-wide leading-relaxed">
              We do not compromise on material weight. Our hoodies start at 480 GSM, and our technical outerwear includes high-performance stormproofing to shield you from absolute frost. Crafted to withstand standard wearing friction, and detailed with signature red accents.
            </p>
            <div className="pt-4">
              <Link
                to="/about"
                className="bg-brand-bone hover:bg-brand-red text-brand-black hover:text-brand-bone text-xs font-bold tracking-[0.2em] px-8 py-3.5 transition-all inline-block uppercase"
              >
                OUR FULL STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-end Trust Badges Grid */}
      <section className="border-t border-brand-bone/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start p-4 border border-brand-bone/5 bg-[#0A0A0A]/30">
            <Truck className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-widest text-brand-bone uppercase">FREE EXPRESS SHIPPING</h4>
              <p className="text-[11px] text-brand-grey tracking-wide leading-relaxed">
                Qualify for free shipping on orders over $150. Expedited packaging in technical black dust-sleeves.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 border border-brand-bone/5 bg-[#0A0A0A]/30">
            <RefreshCw className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-widest text-brand-bone uppercase">EASY RETURNS POLICY</h4>
              <p className="text-[11px] text-brand-grey tracking-wide leading-relaxed">
                If the sizing drape is not completely as desired, request an exchange within 14 days of receipt.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 border border-brand-bone/5 bg-[#0A0A0A]/30">
            <ShieldCheck className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-widest text-brand-bone uppercase">PREMIUM MATERIAL BUILD</h4>
              <p className="text-[11px] text-brand-grey tracking-wide leading-relaxed">
                Every piece uses authenticated heavy cotton blends and premium anodized metal zippers to guarantee lifespan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reviews Strip */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-16">
        <div className="text-center space-y-1">
          <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
            VERIFIED CRITIQUE
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-brand-bone uppercase tracking-tight">
            WHAT THE ATELIER SAYS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#050505] border border-brand-bone/5 p-8 space-y-6 relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Stars list */}
                <div className="flex items-center gap-1 text-brand-red">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-red" />
                  ))}
                </div>
                <p className="text-xs text-brand-grey italic leading-relaxed tracking-wide">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-bone/5">
                <div className="w-9 h-9 rounded-full bg-brand-red/10 border border-brand-red/25 flex items-center justify-center font-display text-sm text-brand-red shrink-0">
                  {t.author.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-bone tracking-widest">{t.author}</h4>
                  <p className="text-[10px] text-brand-grey uppercase tracking-wider">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
