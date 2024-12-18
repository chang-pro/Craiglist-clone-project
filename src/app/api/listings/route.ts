// src/app/api/listings/route.ts

import { NextRequest } from 'next/server';
import prisma from '@/lib/actions/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '1000000');

  const listings = await prisma.listing.findMany({
    where: {
      AND: [
        { title: { contains: search, mode: 'insensitive' } },
        { category: { name: { contains: category, mode: 'insensitive' } } },
        { price: { gte: minPrice, lte: maxPrice } },
      ],
    },
    include: { images: true },
  });

  return new Response(JSON.stringify(listings), { status: 200 });
}
