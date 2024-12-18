// src/lib/actions/listings.ts
import { getAuth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import prisma from '@/lib/actions/prisma';

// Type definitions
export const ListingStatus = {
  DRAFT: 'DRAFT',
  PENDING_REVIEW: 'PENDING_REVIEW',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  EXPIRED: 'EXPIRED',
  DELETED: 'DELETED'
} as const;

export const ListingType = {
  STANDARD: 'STANDARD',
  FEATURED: 'FEATURED',
  PREMIUM: 'PREMIUM'
} as const;

export type ListingStatus = typeof ListingStatus[keyof typeof ListingStatus];
export type ListingType = typeof ListingType[keyof typeof ListingType];

// Validation schema for creating/updating listings
export const listingSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(30).max(2000),
  price: z.number().positive(),
  categoryId: z.string(),
  location: z.string().min(3).max(100),
  type: z.enum(['STANDARD', 'FEATURED', 'PREMIUM']),
  images: z.array(z.object({
    url: z.string().url(),
    order: z.number().int().min(0)
  })).min(1).max(10)
});

export type ListingFormData = z.infer<typeof listingSchema>;

class ListingError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ListingError';
  }
}

export async function createListing(formData: ListingFormData) {
  const { userId } = getAuth();
  
  if (!userId) {
    throw new ListingError('You must be logged in to create a listing', 'UNAUTHORIZED');
  }

  try {
    const validatedData = listingSchema.parse(formData);

    const listing = await prisma.listing.create({
      data: {
        ...validatedData,
        userId,
        status: 'PENDING_REVIEW',
        images: {
          create: validatedData.images
        }
      },
      include: {
        images: true
      }
    });

    revalidatePath('/listings');
    revalidatePath(`/categories/${listing.categoryId}`);
    
    return { success: true, listingId: listing.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ListingError('Invalid listing data', 'VALIDATION_ERROR');
    }
    throw new ListingError('Failed to create listing', 'DATABASE_ERROR');
  }
}