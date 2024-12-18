// src/components/ui/listings/listing-grid.tsx
import React from 'react';
import ListingCard from './listing-card';
import type { Listing } from '@/lib/types';

interface ListingGridProps {
  listings: Listing[];
  favoriteListingIds?: string[];
  onFavoriteClick?: (id: string) => void;
}

export default function ListingGrid({ 
  listings,
  favoriteListingIds = [],
  onFavoriteClick 
}: ListingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          {...listing}
          isFavorited={favoriteListingIds.includes(listing.id)}
          onFavoriteClick={onFavoriteClick}
        />
      ))}
    </div>
  );
}