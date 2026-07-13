import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronDown, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useDocumentMetadata(
    query ? `QUERY: ${query.toUpperCase()}` : 'SEARCH ARCHIVE',
    query ? `Explore streetwear search results for "${query}" on HA Clothing. Premium jackets, heavyweight hoodies, and cargos.` : 'Search the HA Clothing complete archival collections.'
  );

  // Filter products by search query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const recommendedChips = ['BOMBER', 'OVERSIZED', 'CARGO', 'RED ZIP', 'PUFFER', 'TRACK'];

  return (
    <div id="search-results-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
      
      {/* Header section */}
      <section className="border-b border-brand-bone/10 py-12 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] tracking-[0.2em] font-bold text-brand-grey uppercase">
            <Link to="/" className="hover:text-brand-red transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-brand-red">ARCHIVE QUERY</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-brand-bone">
            SEARCH RESULTS FOR "{query.toUpperCase() || 'EMPTY'}"
          </h1>
          <p className="text-xs text-brand-grey tracking-wider font-semibold font-mono">
            ARCHIVE SEARCH // FOUND {searchResults.length} PRODUCTS
          </p>
        </div>
      </section>

      {/* Grid of matched search products */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {searchResults.length === 0 ? (
          <div className="p-16 border border-brand-bone/5 text-center space-y-6 bg-[#050505] max-w-2xl mx-auto">
            <Search className="w-12 h-12 text-brand-grey/40 stroke-[1.5] mx-auto animate-bounce text-brand-red" />
            <div className="space-y-2">
              <h3 className="font-display text-2xl uppercase tracking-wide text-brand-bone">0 ARCHIVE PIECES FOUND</h3>
              <p className="text-xs text-brand-grey leading-relaxed max-w-sm mx-auto">
                No active streetwear configurations in our registry matched your phrase. Try exploring other collections using the fast-search chips below.
              </p>
            </div>

            {/* Quick recommendation options */}
            <div className="space-y-3 pt-4">
              <span className="text-[9px] font-bold tracking-[0.2em] text-brand-grey uppercase block">QUICK SUGGESTIONS</span>
              <div className="flex flex-wrap justify-center gap-2">
                {recommendedChips.map((chip) => (
                  <Link
                    key={chip}
                    to={`/search?q=${encodeURIComponent(chip.toLowerCase())}`}
                    className="bg-[#0A0A0A] border border-brand-bone/10 hover:border-brand-red/30 px-3.5 py-2 text-[10px] text-brand-bone tracking-widest uppercase transition-all hover:text-brand-red font-semibold font-mono"
                  >
                    {chip}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
