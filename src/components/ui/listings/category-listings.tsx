// src/components/ui/listings/category-listings.tsx
'use client';

import React from 'react';
import ListingCard from './listing-card';
import type { Listing } from '@/lib/types';

interface CategoryListingsProps {
  listings: Listing[];
}

export default function CategoryListings({ listings }: CategoryListingsProps) {
  const handleFavorite = (listingId: string): void => {
    console.log('Favorited:', listingId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map(listing => (
        <ListingCard
          key={listing.id}
          {...listing}
          onFavoriteClick={handleFavorite}
        />
      ))}
    </div>
  );
}