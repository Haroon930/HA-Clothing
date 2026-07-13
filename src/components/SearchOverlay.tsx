import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data';
import { AnimatePresence, motion } from 'motion/react';

export const SearchOverlay: React.FC = () => {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    if (searchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  const popularSearches = ['BOMBER', 'OVERSIZED', 'CARGO', 'RED ZIP', 'PUFFER', 'TRACK'];

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleProductClick = (slug: string) => {
    setSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleChipClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          id="search-overlay-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-brand-black/98 overflow-y-auto px-6 py-20 md:py-32 flex flex-col items-center"
        >
          {/* Close button */}
          <button
            id="close-search-overlay"
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 md:top-12 md:right-12 p-2 text-brand-bone hover:text-brand-red transition-colors"
            aria-label="Close Search"
          >
            <X className="w-8 h-8 stroke-[1.5]" />
          </button>

          {/* Search box */}
          <div className="w-full max-w-3xl space-y-12">
            <form onSubmit={handleSearchSubmit} className="relative border-b border-brand-bone/15 pb-4 flex items-center">
              <Search className="w-7 h-7 text-brand-grey mr-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="WHAT PIECE ARE YOU SEEKING?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-display text-2xl md:text-4xl text-brand-bone outline-none border-0 placeholder-brand-grey/30 tracking-wide uppercase"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-brand-grey hover:text-brand-bone transition-colors text-xs font-mono mr-2"
                >
                  CLEAR
                </button>
              )}
              <button
                type="submit"
                className="p-2 text-brand-red hover:text-brand-bone transition-colors"
                aria-label="Submit Search"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>

            {/* Popular/Quick suggestions */}
            {!query && (
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold tracking-[0.25em] text-brand-grey uppercase">
                  POPULAR SEARCH PHRASES
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleChipClick(term)}
                      className="bg-[#0F0F0F] hover:bg-brand-red/10 border border-brand-bone/10 hover:border-brand-red/30 text-[10px] tracking-widest text-brand-bone font-semibold px-4.5 py-2.5 transition-all cursor-pointer hover:text-brand-red"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Instant matching list */}
            {query && (
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold tracking-[0.25em] text-brand-grey uppercase">
                  MATCHING ARCHIVE PIECES ({filteredProducts.length})
                </h4>

                {filteredProducts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleProductClick(p.slug)}
                        className="flex items-center gap-4 p-3 bg-[#0F0F0F] border border-brand-bone/5 hover:border-brand-red/30 transition-all cursor-pointer group"
                      >
                        <div className="w-12 h-15 bg-[#141414] overflow-hidden shrink-0">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-brand-bone tracking-wide group-hover:text-brand-red transition-colors truncate">
                            {p.name}
                          </h5>
                          <p className="text-[10px] text-brand-grey uppercase tracking-wider">
                            {p.category}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-brand-bone">
                            ${p.price}
                          </span>
                          {p.compareAtPrice && (
                            <span className="text-[10px] text-brand-grey line-through ml-2">
                              ${p.compareAtPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {query.trim().length > 1 && (
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs font-bold text-brand-red hover:text-brand-bone tracking-widest transition-colors flex items-center gap-2 mt-4"
                      >
                        VIEW ALL ARCHIVES FOR "{query.toUpperCase()}" <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-6 bg-[#0F0F0F] border border-brand-bone/5 text-center text-xs text-brand-grey tracking-wide">
                    NO PIECES MATCH "{query.toUpperCase()}". PLEASE TRY ANOTHER PHRASE.
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
