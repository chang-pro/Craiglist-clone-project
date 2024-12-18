// src/types/listing.ts
export type ListingStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'REMOVED' | 'FLAGGED';

export interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  createdAt: string;  // Using string for ISO dates
  status: ListingStatus;
  imageUrl?: string;
  isPromoted?: boolean;
}