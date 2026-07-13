import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, X, ArrowUpDown, RefreshCw } from 'lucide-react';
import { PRODUCTS, CATEGORY_JACKETS_IMG, CATEGORY_HOODIES_IMG, CATEGORY_PANTS_IMG } from '../data';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Shop: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(60);
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Available unique colors and sizes from catalog
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const allColors = [
    { name: 'Rich Black', hex: '#0A0A0A' },
    { name: 'Signal Red / Crimson', hex: '#E1000F' },
    { name: 'Bone White', hex: '#F3F1EC' },
    { name: 'Charcoal / Carbon', hex: '#3A3A3A' }
  ];

  // Sync category state with URL parameter
  const activeCategory = useMemo(() => {
    if (!urlCategory) return 'all';
    return urlCategory.toLowerCase();
  }, [urlCategory]);

  // Reset filters when changing category
  useEffect(() => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice(60);
    setMaxPrice(250);
  }, [activeCategory]);

  // Simulated content loading effect when filters change to trigger skeleton grid
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeCategory, selectedSizes, selectedColors, minPrice, maxPrice, sortOption]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // 3. Filter by Colors
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((col) =>
          selectedColors.some((sc) =>
            col.name.toLowerCase().includes(sc.toLowerCase())
          )
        )
      );
    }

    // 4. Filter by Price Range (dynamic min and max)
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // 5. Sort
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [activeCategory, selectedSizes, selectedColors, minPrice, maxPrice, sortOption]);

  const categoryDetails = useMemo(() => {
    switch (activeCategory) {
      case 'jackets':
        return {
          title: 'TECHNICAL JACKETS',
          desc: 'Layered weatherproof storm shields with rigid industrial hardware and heavy nylon stitch lines.',
          banner: CATEGORY_JACKETS_IMG,
        };
      case 'hoodies':
        return {
          title: 'HEAVYWEIGHT HOODIES',
          desc: 'Indestructible 480 GSM French Terry fleeces featuring dense double hoods and minimal architectural box fits.',
          banner: CATEGORY_HOODIES_IMG,
        };
      case 'pants':
        return {
          title: 'TAPERED CARGO PANTS',
          desc: 'Multi-pocket canvas utilities built with seam cinches, modular leg straps, and sharp structural silhouettes.',
          banner: CATEGORY_PANTS_IMG,
        };
      default:
        return {
          title: 'THE ARCHIVE CATALOG',
          desc: 'The complete HA Clothing collection. Built in our signature high-contrast black and crimson colorways.',
          banner: '/src/assets/images/hero_primary_1783956225655.jpg', // Use primary hero as fallback
        };
    }
  }, [activeCategory]);

  // Dynamic Collection Schema markup for SEO / AEO
  const shopSchema = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ha-clothing.com';
    const categoryName = activeCategory === 'all' ? 'All Streetwear' : activeCategory.toUpperCase();
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `HA CLOTHING — ${categoryName}`,
      'description': categoryDetails.desc,
      'url': `${origin}/shop/${activeCategory === 'all' ? '' : activeCategory}`,
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'HA Clothing',
        'url': origin
      },
      'about': {
        '@type': 'Thing',
        'name': categoryName
      }
    };
  }, [activeCategory, categoryDetails]);

  useDocumentMetadata(
    `SHOP ${activeCategory === 'all' ? 'ARCHIVE' : activeCategory.toUpperCase()}`,
    categoryDetails.desc,
    shopSchema
  );

  // Toggle helpers
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const handleResetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice(60);
    setMaxPrice(250);
    setSortOption('featured');
  };

  const isFiltersApplied = selectedSizes.length > 0 || selectedColors.length > 0 || minPrice > 60 || maxPrice < 250;

  return (
    <div id="shop-catalog-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
      
      {/* 1. Category Banner Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center py-12 px-6 md:px-12 border-b border-brand-red/10">
        <div className="absolute inset-0 z-0">
          <img
            src={categoryDetails.banner}
            alt={categoryDetails.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/20" />
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-4">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-[0.25em] text-brand-grey uppercase">
            <Link to="/" className="hover:text-brand-red transition-colors">HOME</Link>
            <ChevronRight className="w-3 h-3 text-brand-red/40" />
            <Link to="/shop" className="hover:text-brand-red transition-colors">SHOP</Link>
            {activeCategory !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-brand-red/40" />
                <span className="text-brand-red font-bold">{activeCategory}</span>
              </>
            )}
          </div>

          <h1 className="font-display text-4xl sm:text-6xl text-brand-bone uppercase tracking-tight">
            {categoryDetails.title}
          </h1>
          <p className="text-[11px] sm:text-xs text-brand-grey max-w-xl mx-auto tracking-wider leading-relaxed">
            {categoryDetails.desc}
          </p>
        </div>
      </section>

      {/* 2. Main Shop Area */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-brand-bone/10 pb-5 mb-8">
          {/* Active stats */}
          <div className="text-xs tracking-wider text-brand-grey font-medium uppercase">
            ARCHIVES FOUND // <span className="font-bold text-brand-bone">{filteredProducts.length} ARTICLES</span>
          </div>

          {/* Desktop Controls / Mob triggers */}
          <div className="flex items-center gap-4">
            {/* Mobile filters button */}
            <button
              id="shop-mobile-filter-btn"
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 border border-brand-bone/15 px-4 py-2.5 text-xs font-semibold tracking-wider hover:text-brand-red hover:border-brand-red transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> FILTERS
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 border border-brand-bone/15 px-4 py-2.5 text-xs font-semibold tracking-wider text-brand-bone">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <select
                id="shop-sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border-0 text-brand-bone font-mono outline-none cursor-pointer tracking-wider text-[11px]"
              >
                <option value="featured" className="bg-[#0A0A0A]">FEATURED</option>
                <option value="price-asc" className="bg-[#0A0A0A]">PRICE: LOW TO HIGH</option>
                <option value="price-desc" className="bg-[#0A0A0A]">PRICE: HIGH TO LOW</option>
                <option value="rating" className="bg-[#0A0A0A]">BEST REVIEWED</option>
                <option value="newest" className="bg-[#0A0A0A]">LATEST DROP</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* A. Sidebar Filters Panel (Desktop) */}
          <aside className="hidden md:block md:col-span-3 space-y-8 sticky top-28 self-start">
            
            {/* Header / Clear action */}
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-wide uppercase">FILTERS SPEC</span>
              {isFiltersApplied && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] tracking-widest text-brand-red hover:text-brand-bone transition-colors flex items-center gap-1 uppercase font-semibold border-b border-brand-red/30"
                >
                  <X className="w-3 h-3" /> CLEAR ALL
                </button>
              )}
            </div>

            {/* Filter Section: Category */}
            <div className="space-y-3.5 border-t border-brand-bone/10 pt-5">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">CATEGORIES</h4>
              <div className="flex flex-col gap-2.5 text-xs font-semibold tracking-wider font-mono">
                <Link
                  id="filter-cat-all"
                  to="/shop"
                  className={`hover:text-brand-red transition-colors flex justify-between items-center ${activeCategory === 'all' ? 'text-brand-red' : 'text-brand-bone'}`}
                >
                  <span>ALL ARTICLES</span>
                  <span className="text-[10px] text-brand-grey font-normal">({PRODUCTS.length})</span>
                </Link>
                <Link
                  id="filter-cat-jackets"
                  to="/shop/jackets"
                  className={`hover:text-brand-red transition-colors flex justify-between items-center ${activeCategory === 'jackets' ? 'text-brand-red' : 'text-brand-bone'}`}
                >
                  <span>TECHNICAL JACKETS</span>
                  <span className="text-[10px] text-brand-grey font-normal">({PRODUCTS.filter(p => p.category === 'jackets').length})</span>
                </Link>
                <Link
                  id="filter-cat-hoodies"
                  to="/shop/hoodies"
                  className={`hover:text-brand-red transition-colors flex justify-between items-center ${activeCategory === 'hoodies' ? 'text-brand-red' : 'text-brand-bone'}`}
                >
                  <span>HEAVYWEIGHT HOODIES</span>
                  <span className="text-[10px] text-brand-grey font-normal">({PRODUCTS.filter(p => p.category === 'hoodies').length})</span>
                </Link>
                <Link
                  id="filter-cat-pants"
                  to="/shop/pants"
                  className={`hover:text-brand-red transition-colors flex justify-between items-center ${activeCategory === 'pants' ? 'text-brand-red' : 'text-brand-bone'}`}
                >
                  <span>TAPERED CARGO PANTS</span>
                  <span className="text-[10px] text-brand-grey font-normal">({PRODUCTS.filter(p => p.category === 'pants').length})</span>
                </Link>
              </div>
            </div>

            {/* Filter Section: Size */}
            <div className="space-y-3.5 border-t border-brand-bone/10 pt-5">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">SIZING SCALE</h4>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((size) => {
                  const isSel = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`min-w-[40px] h-9 text-[11px] font-bold font-mono tracking-wider border transition-colors cursor-pointer flex items-center justify-center ${
                        isSel
                          ? 'border-brand-red bg-brand-red/10 text-brand-red'
                          : 'border-brand-bone/10 hover:border-brand-bone/40 text-brand-bone'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section: Colorway */}
            <div className="space-y-3.5 border-t border-brand-bone/10 pt-5">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">COLORWAY ARCHIVES</h4>
              <div className="space-y-2.5">
                {allColors.map((color) => {
                  // check includes
                  const keyMatch = color.name.split(' ')[0].toLowerCase();
                  const isSel = selectedColors.some((sc) => sc.toLowerCase().includes(keyMatch));

                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorToggle(color.name.split(' ')[0])}
                      className="w-full flex items-center gap-3 hover:text-brand-red transition-colors text-xs font-semibold tracking-wider uppercase cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSel ? 'border-brand-red ring-1 ring-brand-red' : 'border-brand-bone/20'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={isSel ? 'text-brand-red font-bold' : 'text-brand-bone'}>
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section: Price Presets & Slider */}
            <div className="space-y-4 border-t border-brand-bone/10 pt-5">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">PRICE RANGE PRESETS</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'ALL PRICES', min: 60, max: 250 },
                  { label: 'UNDER $100', min: 60, max: 100 },
                  { label: '$100 - $180', min: 100, max: 180 },
                  { label: '$180+', min: 180, max: 250 },
                ].map((preset) => {
                  const isActive = minPrice === preset.min && maxPrice === preset.max;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setMinPrice(preset.min);
                        setMaxPrice(preset.max);
                      }}
                      className={`py-2 text-[9px] font-bold tracking-widest font-mono border transition-colors cursor-pointer text-center uppercase ${
                        isActive
                          ? 'border-brand-red bg-brand-red/10 text-brand-red'
                          : 'border-brand-bone/10 hover:border-brand-bone/40 text-brand-bone'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Slider for precision filtering */}
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                  <span>MAX PRICE LIMIT</span>
                  <span className="font-mono text-brand-bone text-xs font-bold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="250"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxPrice(val);
                    if (val < minPrice) {
                      setMinPrice(60);
                    }
                  }}
                  className="w-full accent-brand-red h-1 bg-brand-bone/10 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-brand-grey">
                  <span>MIN: ${minPrice}</span>
                  <span>MAX: $250</span>
                </div>
              </div>
            </div>

          </aside>

          {/* B. Product Grid (Desktop / Mobile with premium skeleton states) */}
          <main className="col-span-11 md:col-span-9">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse-slow">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <ProductCardSkeleton key={`skeleton-${idx}`} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="p-16 border border-brand-bone/5 bg-[#050505] text-center space-y-6">
                <RefreshCw className="w-12 h-12 text-brand-grey/40 stroke-[1.5] mx-auto animate-spin-slow" />
                <div className="space-y-2">
                  <h3 className="font-display text-2xl tracking-wide uppercase text-brand-bone">NO ARCHIVES MATCHED</h3>
                  <p className="text-xs text-brand-grey max-w-[340px] mx-auto leading-relaxed tracking-wide">
                    We could not locate any active garment archives that match your filters. Try widening your price parameter or removing size selections.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.2em] px-8 py-3.5 transition-all uppercase cursor-pointer"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </main>

        </div>
      </section>

      {/* C. Mobile Filter slide-out drawer */}
      {mobileFiltersOpen && (
        <div id="mobile-filter-drawer" className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-[#000]/75"
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-[320px] h-full bg-[#0A0A0A] border-l border-brand-red/10 p-6 overflow-y-auto space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-bone/10">
                <span className="font-display text-xl tracking-wide uppercase">FILTER SHELF</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-brand-bone hover:text-brand-red transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sizing scale */}
              <div className="space-y-3.5">
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">SIZING SCALE</h4>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map((size) => {
                    const isSel = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`min-w-[38px] h-9 text-xs font-bold font-mono tracking-wider border transition-colors flex items-center justify-center cursor-pointer ${
                          isSel
                            ? 'border-brand-red bg-brand-red/10 text-brand-red'
                            : 'border-brand-bone/10 hover:border-brand-bone/40 text-brand-bone'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colorways */}
              <div className="space-y-3.5 border-t border-brand-bone/10 pt-5">
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">COLORWAY ARCHIVES</h4>
                <div className="space-y-2.5">
                  {allColors.map((color) => {
                    const keyMatch = color.name.split(' ')[0].toLowerCase();
                    const isSel = selectedColors.some((sc) => sc.toLowerCase().includes(keyMatch));

                    return (
                      <button
                        key={color.name}
                        onClick={() => handleColorToggle(color.name.split(' ')[0])}
                        className="w-full flex items-center gap-3 text-left hover:text-brand-red transition-colors text-xs font-semibold tracking-wider uppercase cursor-pointer"
                      >
                        <span
                          className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                            isSel ? 'border-brand-red ring-1 ring-brand-red' : 'border-brand-bone/20'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className={isSel ? 'text-brand-red font-bold' : 'text-brand-bone'}>
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price presets & Slider */}
              <div className="space-y-4 border-t border-brand-bone/10 pt-5">
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">PRICE RANGE PRESETS</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'ALL PRICES', min: 60, max: 250 },
                    { label: 'UNDER $100', min: 60, max: 100 },
                    { label: '$100 - $180', min: 100, max: 180 },
                    { label: '$180+', min: 180, max: 250 },
                  ].map((preset) => {
                    const isActive = minPrice === preset.min && maxPrice === preset.max;
                    return (
                      <button
                        key={`mobile-preset-${preset.label}`}
                        onClick={() => {
                          setMinPrice(preset.min);
                          setMaxPrice(preset.max);
                        }}
                        className={`py-2 text-[9px] font-bold tracking-widest font-mono border transition-colors cursor-pointer text-center uppercase ${
                          isActive
                            ? 'border-brand-red bg-brand-red/10 text-brand-red'
                            : 'border-brand-bone/10 hover:border-brand-bone/40 text-brand-bone'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                {/* Slider */}
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-brand-grey uppercase">
                    <span>MAX PRICE LIMIT</span>
                    <span className="font-mono text-brand-bone text-xs font-bold">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="250"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setMaxPrice(val);
                      if (val < minPrice) {
                        setMinPrice(60);
                      }
                    }}
                    className="w-full accent-brand-red h-1 bg-brand-bone/10 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-brand-grey">
                    <span>MIN: ${minPrice}</span>
                    <span>MAX: $250</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer footer button */}
            <div className="pt-6 border-t border-brand-bone/10 space-y-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-3 text-xs font-bold tracking-[0.2em] transition-all uppercase cursor-pointer"
              >
                APPLY SELECTIONS ({filteredProducts.length})
              </button>
              {isFiltersApplied && (
                <button
                  onClick={() => {
                    handleResetFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full border border-brand-bone/20 hover:border-brand-red text-brand-bone hover:text-brand-red py-3 text-xs font-semibold tracking-[0.2em] transition-all uppercase bg-transparent cursor-pointer"
                >
                  RESET ALL
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
