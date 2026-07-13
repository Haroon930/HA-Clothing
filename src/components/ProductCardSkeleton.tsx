import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col justify-between bg-[#0A0A0A] border border-brand-bone/5 space-y-4">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] bg-[#121212] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
        {/* Subtle decorative grid lines to match the tech theme */}
        <div className="absolute inset-0 border border-brand-bone/5 pointer-events-none" />
      </div>

      {/* Details Box Skeleton */}
      <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Category & Rating */}
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 bg-brand-bone/5 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
            </div>
            <div className="h-3 w-8 bg-brand-bone/5 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
            </div>
          </div>
          {/* Name */}
          <div className="h-4 w-3/4 bg-brand-bone/5 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Colors and Price */}
        <div className="flex justify-between items-center pt-2 border-t border-brand-bone/5">
          {/* Color Swatch Skeletons */}
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-brand-bone/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-brand-bone/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
            </div>
          </div>
          {/* Price Skeleton */}
          <div className="h-4 w-12 bg-brand-bone/5 rounded-sm relative overflow-hidden font-mono">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-bone/5 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
