import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronDown, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Wishlist: React.FC = () => {
  const { wishlist } = useShop();

  // Filter products in wishlist
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  useDocumentMetadata(
    `WISHLIST VAULT (${wishlistProducts.length})`,
    'Manage your saved streetwear list on HA Clothing. Compare specs of technical hoodies, cargos, and jackets before finalizing configurations.'
  );

  return (
    <div id="wishlist-page" className="min-h-screen bg-[#0A0A0A] pb-24 text-brand-bone">
      
      {/* Header section */}
      <section className="border-b border-brand-bone/10 py-12 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] tracking-[0.2em] font-bold text-brand-grey uppercase">
            <Link to="/" className="hover:text-brand-red transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-brand-red">WISHLIST ARCHIVE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-brand-bone">
            YOUR SAVED WISHLIST ({wishlistProducts.length} ITEMS)
          </h1>
        </div>
      </section>

      {/* Grid of wishlist products */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {wishlistProducts.length === 0 ? (
          <div className="p-16 border border-brand-bone/5 text-center space-y-6 bg-[#050505] max-w-2xl mx-auto">
            <Heart className="w-12 h-12 text-brand-grey/40 stroke-[1.5] mx-auto animate-pulse text-brand-red" />
            <div className="space-y-2">
              <h3 className="font-display text-2xl uppercase tracking-wide text-brand-bone">WISHLIST LOGS ARE VACANT</h3>
              <p className="text-xs text-brand-grey leading-relaxed max-w-sm mx-auto">
                You have not logged any custom garment architectures in your wishlist. Explore the jackets, hoodies, and cargo catalogs to select your favorites.
              </p>
            </div>
            <Link
              to="/shop"
              className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.2em] px-8 py-3.5 inline-block uppercase transition-all"
            >
              BROWSE CATALOGS NOW
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
