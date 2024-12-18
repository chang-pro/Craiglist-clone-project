// src/components/ui/listings/listing-card.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, AlertCircle } from 'lucide-react';
import type { Listing } from '@/lib/types';

interface ListingCardProps extends Listing {
  isFavorited?: boolean;
  onFavoriteClick?: (id: string) => void;
}

export default function ListingCard({
  id,
  title,
  price,
  location,
  createdAt,
  imageUrl,
  status,
  isPromoted = false,
  isFavorited = false,
  onFavoriteClick
}: ListingCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onFavoriteClick?.(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  return (
    <div className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
      {onFavoriteClick && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          type="button"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      )}
      
      {isPromoted && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-blue-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Featured
          </div>
        </div>
      )}

      <Link href={`/listings/${id}`} className="block">
        <div className="aspect-video bg-gray-100 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {title}
            </h3>
            <span className="text-xl font-bold text-green-600 whitespace-nowrap">
              ${price.toLocaleString()}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>{location}</span>
            <time dateTime={createdAt}>
              {formatDate(createdAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
}