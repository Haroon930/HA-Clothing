import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Plus, Minus, ArrowRight, Shield, Truck, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, toggleWishlist, isInWishlist, setSizeGuideOpen, addToast } = useShop();

  // Find current product
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  // States
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('desc');

  // Review submission mock state
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [mockReviews, setMockReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });

  // Dynamic Product Schema markup for search engines and answer engines
  const productSchema = useMemo(() => {
    if (!product) return undefined;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ha-clothing.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'image': product.images.map((img) => img.startsWith('/') ? `${origin}${img}` : img),
      'description': product.description,
      'sku': product.id,
      'mpn': product.id,
      'brand': {
        '@type': 'Brand',
        'name': 'HA CLOTHING'
      },
      'offers': {
        '@type': 'Offer',
        'url': `${origin}/product/${product.slug}`,
        'priceCurrency': 'USD',
        'price': product.price.toString(),
        'priceValidUntil': '2027-12-31',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'Organization',
          'name': 'HA CLOTHING'
        }
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': product.rating.toString(),
        'reviewCount': (mockReviews.length + product.reviewCount).toString(),
        'bestRating': '5',
        'worstRating': '1'
      },
      'color': product.colors.map(c => c.name).join(', '),
      'size': product.sizes.join(', ')
    };
  }, [product, mockReviews]);

  useDocumentMetadata(
    product ? product.name : 'PRODUCT',
    product ? `${product.name} — ${product.description}` : 'Premium streetwear product spec.',
    productSchema
  );

  // Accordion details
  const togglers = {
    desc: 'Description Spec',
    materials: 'Materials & Care',
    shipping: 'Shipping & Free Returns',
  };

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      if (product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes.length > 0) {
        const mIndex = product.sizes.indexOf('M');
        setSelectedSize(mIndex > -1 ? 'M' : product.sizes[0]);
      }
      setQuantity(1);
      
      // Setup default mock reviews for this product
      setMockReviews([
        { id: 'rev-1', name: 'KAI G.', rating: 5, date: 'June 28, 2026', text: `Incredible piece of garment. The boxy drape of this ${product.name} is spot on. Worth every dollar.` },
        { id: 'rev-2', name: 'NICOLE P.', rating: 4, date: 'July 04, 2026', text: `Dense build, keeps warm. The crimson red zip features are brilliant. Runs slightly larger than expected, had to exchange for S.` }
      ]);

      // --- Recently Viewed tracker ---
      try {
        const viewed = localStorage.getItem('ha_recently_viewed');
        const viewedList: string[] = viewed ? JSON.parse(viewed) : [];
        const filtered = viewedList.filter((s) => s !== product.slug); // remove duplicate
        const updated = [product.slug, ...filtered].slice(0, 4); // keep top 4
        localStorage.setItem('ha_recently_viewed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  }, [product]);

  // Fetch recently viewed products from storage
  const recentlyViewedProducts = useMemo(() => {
    try {
      const viewed = localStorage.getItem('ha_recently_viewed');
      if (!viewed) return [];
      const slugs: string[] = JSON.parse(viewed);
      return PRODUCTS.filter((p) => slugs.includes(p.slug) && p.slug !== slug).slice(0, 4);
    } catch (e) {
      return [];
    }
  }, [slug, product]);

  // Related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-display text-4xl text-brand-bone uppercase">ARCHIVE PIECE NOT FOUND</h2>
        <p className="text-xs text-brand-grey max-w-sm tracking-wider leading-relaxed">
          The requested garment index could not be located in our active database. It may have been archived or decommissioned.
        </p>
        <Link
          to="/shop"
          className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.2em] px-8 py-3.5 uppercase"
        >
          RETURN TO CATALOUGE
        </Link>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const hasSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = () => {
    if (selectedColor) {
      addToCart(product, selectedSize, selectedColor, quantity);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) {
      addToast('Please fill out all fields.', 'error');
      return;
    }
    const submittedReview = {
      id: `rev-user-${Date.now()}`,
      name: newReview.name.toUpperCase(),
      rating: newReview.rating,
      date: 'Today',
      text: newReview.text,
    };
    setMockReviews([submittedReview, ...mockReviews]);
    addToast('Review submitted. Thank you for your feedback.', 'success');
    setNewReview({ name: '', rating: 5, text: '' });
    setWriteReviewOpen(false);
  };

  return (
    <div id="product-detail-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
      
      {/* 1. PDP Breadcrumb & Product layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
          <Link to="/" className="hover:text-brand-red transition-colors">HOME</Link>
          <ChevronDown className="w-3 h-3 text-brand-red/30 rotate-[270deg]" />
          <Link to="/shop" className="hover:text-brand-red transition-colors">SHOP</Link>
          <ChevronDown className="w-3 h-3 text-brand-red/30 rotate-[270deg]" />
          <Link to={`/shop/${product.category}`} className="hover:text-brand-red transition-colors">{product.category}</Link>
          <ChevronDown className="w-3 h-3 text-brand-red/30 rotate-[270deg]" />
          <span className="text-brand-red font-bold">{product.name}</span>
        </div>

        {/* Main Product Spec block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Gallery */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Desktop thumbnail column */}
            <div className="hidden md:flex md:col-span-2 flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-[3/4] bg-[#121212] overflow-hidden border transition-all cursor-pointer ${
                    activeImage === img ? 'border-brand-red scale-[1.02]' : 'border-brand-bone/10 hover:border-brand-bone/30'
                  }`}
                  aria-label={`View detail ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} alternate view ${i}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image viewer */}
            <div className="md:col-span-10 aspect-[3/4] bg-[#121212] border border-brand-bone/10 overflow-hidden relative group">
              <img
                src={activeImage || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-brand-red text-brand-bone text-[9px] font-bold tracking-[0.2em] px-3.5 py-1.5">
                  NEW ARRIVAL
                </span>
              )}
            </div>

            {/* Mobile swipeable image row */}
            <div className="flex md:hidden gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 bg-[#121212] shrink-0 overflow-hidden border transition-all ${
                    activeImage === img ? 'border-brand-red' : 'border-brand-bone/10'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Selection details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
                BLACKOUT ARCHIVE / {product.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl tracking-tight text-brand-bone uppercase leading-none">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-4 pt-1">
                <span className="text-2xl font-bold font-mono text-brand-bone">
                  ${product.price}.00
                </span>
                {hasSale && (
                  <span className="text-sm font-mono text-brand-grey line-through">
                    ${product.compareAtPrice}.00
                  </span>
                )}
                {hasSale && (
                  <span className="text-[10px] bg-brand-red/15 text-brand-red font-bold px-2 py-0.5 rounded tracking-wide">
                    SAVE ${(product.compareAtPrice! - product.price)}
                  </span>
                )}
              </div>

              {/* Ratings details */}
              <div className="flex items-center gap-1.5 py-1">
                <div className="flex items-center text-brand-red">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-brand-red' : 'text-brand-grey/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-brand-grey font-mono mt-0.5">
                  {product.rating} OF 5 Stars ({product.reviewCount} CLIENT REVIEWS)
                </span>
              </div>
            </div>

            {/* Colors Swatches selection */}
            <div className="space-y-3.5 border-t border-brand-bone/10 pt-5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase block">
                COLORWAY: <span className="text-brand-bone font-mono">{selectedColor?.name}</span>
              </span>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor?.name === c.name
                        ? 'border-brand-red scale-110 ring-1 ring-brand-red/50'
                        : 'border-brand-bone/15 hover:border-brand-bone/40'
                    }`}
                    title={c.name}
                  >
                    <span className="w-5 h-5 rounded-full" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing selection with guide link */}
            <div className="space-y-3.5 border-t border-brand-bone/10 pt-5">
              <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase font-bold text-brand-grey">
                <span>CHOOSE SIZING SCALE</span>
                <button
                  id="pdp-open-size-guide"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-brand-red hover:text-brand-bone transition-colors underline font-semibold cursor-pointer"
                >
                  SIZING SPEC SHEET [INCHES]
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[44px] h-11 text-xs font-mono font-bold tracking-wider border flex items-center justify-center transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'border-brand-red bg-brand-red/10 text-brand-red'
                        : 'border-brand-bone/10 hover:border-brand-bone/45 text-brand-bone'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity adjustment & Actions */}
            <div className="space-y-4 border-t border-brand-bone/10 pt-5">
              <div className="flex gap-4">
                {/* Qty Stepper */}
                <div className="flex items-center border border-brand-bone/15 bg-[#0F0F0F]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-brand-bone hover:text-brand-red transition-all"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-5 text-sm font-mono font-bold text-brand-bone min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-brand-bone hover:text-brand-red transition-all"
                    aria-label="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add To Cart Button */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.25em] transition-all uppercase cursor-pointer py-4"
                >
                  ADD TO ZIP BAG
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`px-4.5 border flex items-center justify-center transition-all cursor-pointer ${
                    isWish
                      ? 'border-brand-red text-brand-red bg-brand-red/5 animate-pulse'
                      : 'border-brand-bone/10 text-brand-bone hover:border-brand-red hover:text-brand-red'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWish ? 'fill-brand-red' : ''}`} />
                </button>
              </div>
            </div>

            {/* Accordion list */}
            <div className="border-t border-brand-bone/10 pt-4 space-y-2">
              
              {/* Accordion Item: Description */}
              <div className="border-b border-brand-bone/5 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'desc' ? null : 'desc')}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold tracking-widest text-brand-bone uppercase text-left"
                >
                  <span>DESCRIPTION SPEC</span>
                  {activeAccordion === 'desc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'desc' && (
                  <p className="text-xs text-brand-grey leading-relaxed tracking-wide py-2 pr-4 pl-1">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Accordion Item: Materials */}
              <div className="border-b border-brand-bone/5 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'materials' ? null : 'materials')}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold tracking-widest text-brand-bone uppercase text-left"
                >
                  <span>MATERIALS & SEWING</span>
                  {activeAccordion === 'materials' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'materials' && (
                  <p className="text-xs text-brand-grey leading-relaxed tracking-wide py-2 pr-4 pl-1">
                    {product.materials}
                  </p>
                )}
              </div>

              {/* Accordion Item: Shipping */}
              <div className="border-b border-brand-bone/5 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold tracking-widest text-brand-bone uppercase text-left"
                >
                  <span>SHIPPING & RETURNS</span>
                  {activeAccordion === 'shipping' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="text-xs text-brand-grey leading-relaxed tracking-wide py-2 pr-4 pl-1 space-y-1.5">
                    <p>• Complimentary Express Shipping on orders over $150.</p>
                    <p>• Fully compostable heavyweight black packaging sleeves.</p>
                    <p>• 14-day hassle-free structural exchanges.</p>
                  </div>
                )}
              </div>

            </div>

            {/* High-fashion small assurance icons */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-center border-t border-brand-bone/10 text-[9px] text-brand-grey font-semibold tracking-widest uppercase">
              <div className="space-y-1">
                <Shield className="w-4 h-4 mx-auto text-brand-red" />
                <span>SECURED CORE</span>
              </div>
              <div className="space-y-1">
                <Truck className="w-4 h-4 mx-auto text-brand-red" />
                <span>FAST PORT</span>
              </div>
              <div className="space-y-1">
                <RefreshCw className="w-4 h-4 mx-auto text-brand-red" />
                <span>FREE RETURN</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 2. Related Products Carousel list */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#050505] border-t border-brand-bone/10 py-20 mt-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
            <div className="text-left space-y-1">
              <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
                COMPATIBLE PIECES
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-bone">
                YOU MAY ALSO LIKE
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Recently Viewed products (Tracked locally) */}
      {recentlyViewedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-brand-bone/10">
          <div className="space-y-12">
            <div className="text-left space-y-1">
              <span className="text-brand-red text-xs tracking-[0.25em] font-bold uppercase block">
                VIEW HISTORY LOGS
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-bone">
                RECENTLY VIEWED
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {recentlyViewedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Customer Reviews breakdown section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 border-t border-brand-bone/10">
        <div className="space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h2 className="font-display text-3xl text-brand-bone uppercase tracking-tight">
                CLIENT CRITIQUES
              </h2>
              <p className="text-xs text-brand-grey tracking-wider font-semibold font-mono">
                OVERALL RATING: {product.rating} OUT OF 5.0 // ({mockReviews.length + 12} SUBMISSIONS)
              </p>
            </div>

            <button
              id="write-review-toggle"
              onClick={() => setWriteReviewOpen(!writeReviewOpen)}
              className="border border-brand-bone/20 hover:border-brand-red text-xs font-semibold tracking-widest px-6 py-3.5 hover:text-brand-red transition-all uppercase bg-transparent"
            >
              {writeReviewOpen ? 'CANCEL REVIEW' : 'WRITE A CRITIQUE'}
            </button>
          </div>

          {/* Form to write a review */}
          {writeReviewOpen && (
            <form onSubmit={handleReviewSubmit} className="p-6 bg-[#050505] border border-brand-red/10 space-y-4">
              <h3 className="font-display text-lg tracking-wide uppercase text-brand-bone">SUBMIT GARMENT FEEDBACK</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">NAME / INITIALS</label>
                  <input
                    type="text"
                    required
                    placeholder="E.G. MARKUS K."
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/10 focus:border-brand-red px-4 py-3 text-xs tracking-wider uppercase text-brand-bone outline-none"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">RATING VALUE</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0A] border border-brand-bone/10 focus:border-brand-red px-4 py-3 text-xs tracking-wider text-brand-bone outline-none font-mono"
                  >
                    <option value="5">5 STARS (EXCELLENT)</option>
                    <option value="4">4 STARS (GOOD)</option>
                    <option value="3">3 STARS (FAIR)</option>
                    <option value="2">2 STARS (POOR)</option>
                    <option value="1">1 STAR (CRITICAL)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-wider text-brand-grey uppercase font-bold block">YOUR CRITIQUE</label>
                <textarea
                  required
                  rows={4}
                  placeholder="PROVIDE IN-DEPTH FEEDBACK ON TEXTURE, FIT, ZIP WEIGHT, AND DURABILITY..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-brand-bone/10 focus:border-brand-red px-4 py-3 text-xs tracking-wider text-brand-bone outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-widest px-8 py-3.5 uppercase transition-all shrink-0 cursor-pointer"
              >
                SUBMIT LOG
              </button>
            </form>
          )}

          {/* List of reviews */}
          <div className="space-y-6">
            {mockReviews.map((rev) => (
              <div key={rev.id} className="border-b border-brand-bone/5 pb-6 last:border-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2.5 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-bone/5 flex items-center justify-center text-xs font-display text-brand-red border border-brand-bone/10 font-bold uppercase">
                      {rev.name.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-brand-bone">{rev.name}</h4>
                      <p className="text-[10px] text-brand-grey uppercase font-mono">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-brand-red">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-brand-red text-brand-red' : 'text-brand-grey/25'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-brand-grey tracking-wide leading-relaxed pl-11">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom Sticky Add To Bag Bar (Mobile Only) once scrolled */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-brand-black border-t border-brand-bone/10 px-4 py-3 flex gap-2 shadow-2xl">
        <div className="flex-1">
          <span className="text-[10px] text-brand-grey font-bold block uppercase truncate">{product.name}</span>
          <span className="text-xs font-bold font-mono text-brand-red">${product.price}.00</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-brand-red text-brand-bone px-6 py-2.5 text-xs font-bold tracking-wider uppercase shrink-0"
        >
          ADD TO ZIP BAG
        </button>
      </div>

    </div>
  );
};
