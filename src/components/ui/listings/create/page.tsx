// src/app/listings/create/page.tsx
import { getAuth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import prisma from '@/lib/actions/prisma';
import CreateListingForm from '@/components/ui/listings/create-listing-form';

export default async function CreateListingPage() {
  const { userId } = getAuth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    where: { active: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Listing</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateListingForm categories={categories} />
      </Suspense>
    </div>
  );
}