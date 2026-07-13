import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, setQuickViewProduct, addToCart } = useShop();
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const isWish = isInWishlist(product.id);
  const hasSale = product.compareAtPrice && product.compareAtPrice > product.price;

  // Use second image on hover if available, otherwise fallback to primary
  const displayedImage = hovered && product.images[1] ? product.images[1] : product.images[0];

  const isImageLoaded = !!loadedImages[displayedImage];

  const handleImageLoad = () => {
    setLoadedImages((prev) => ({ ...prev, [displayedImage]: true }));
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', selectedColor, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col justify-between bg-[#0A0A0A] border border-brand-bone/5 hover:border-brand-red/30 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual Frame highlights */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-transparent border-t border-r border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-transparent border-b border-l border-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-[#121212] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={displayedImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0 scale-98'
            }`}
            loading="lazy"
          />
        </Link>

        {/* Image Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-[#141414] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
            <span className="font-display text-2xl tracking-[0.25em] text-brand-bone/5 uppercase select-none">HA</span>
          </div>
        )}

        {/* Wishlist Icon Overlay */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-brand-black/40 hover:bg-brand-black/80 transition-all z-10 cursor-pointer ${
            isWish ? 'text-brand-red' : 'text-brand-bone hover:text-brand-red'
          }`}
          aria-label={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4.5 h-4.5 ${isWish ? 'fill-brand-red' : ''}`} />
        </button>

        {/* Badge Labels overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-brand-bone text-brand-black text-[9px] font-bold tracking-[0.2em] px-2.5 py-1.5 uppercase">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-brand-black text-brand-red border border-brand-red text-[8px] font-bold tracking-[0.25em] px-2.5 py-1.5 uppercase">
              BESTSELLER
            </span>
          )}
          {hasSale && (
            <span className="bg-brand-red text-brand-bone text-[9px] font-bold tracking-[0.2em] px-2.5 py-1.5 uppercase">
              SALE
            </span>
          )}
        </div>

        {/* Interactive hover panels (Quick Add & Quick View) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-brand-black/90 via-brand-black/60 to-transparent flex flex-col gap-2 pt-12 z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-brand-red hover:bg-[#ff1c2d] text-brand-bone py-2.5 text-[10px] font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> QUICK ADD [M]
          </button>
          
          <button
            onClick={handleQuickView}
            className="w-full bg-brand-black/90 hover:bg-brand-black hover:text-brand-red text-brand-bone border border-brand-bone/20 hover:border-brand-red py-2 text-[10px] font-semibold tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
          >
            <Eye className="w-3.5 h-3.5" /> QUICK SPEC VIEW
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category & Rating */}
          <div className="flex justify-between items-center text-[10px] tracking-wider text-brand-grey uppercase">
            <span>{product.category}</span>
            <div className="flex items-center gap-0.5 text-brand-red">
              <Star className="w-3 h-3 fill-brand-red" />
              <span className="font-mono text-brand-bone/90">{product.rating}</span>
            </div>
          </div>

          {/* Name */}
          <Link
            to={`/product/${product.slug}`}
            className="block text-sm font-semibold tracking-tight text-brand-bone hover:text-brand-red transition-colors truncate"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex justify-between items-end pt-1">
          {/* Dynamic Color swatches selector */}
          <div className="flex gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(color);
                }}
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  selectedColor.name === color.name
                    ? 'border-brand-red scale-110'
                    : 'border-brand-bone/20 hover:border-brand-bone/50'
                }`}
                title={color.name}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color.hex }} />
              </button>
            ))}
          </div>

          {/* Pricing */}
          <div className="text-right flex items-baseline gap-1.5">
            {hasSale && (
              <span className="text-[10px] text-brand-grey line-through font-mono">
                ${product.compareAtPrice}
              </span>
            )}
            <span className="text-sm font-bold text-brand-bone font-mono">
              ${product.price}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
