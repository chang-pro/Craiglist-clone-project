// src/app/categories/[slug]/category-page-client.tsx
'use client';

import { useState } from "react";
import { Car, Tags, Home, Wrench, PawPrint, Users, Briefcase } from "lucide-react";
import CategoryListings from "@/components/ui/listings/category-listings";
import CategoryFilters from "@/components/ui/listings/category-filters";

const iconComponents = {
  car: Car,
  tags: Tags,
  home: Home,
  wrench: Wrench,
  "paw-print": PawPrint,
  users: Users,
  briefcase: Briefcase,
} as const;

type IconName = keyof typeof iconComponents;

interface CategoryPageClientProps {
  name: string;
  iconName: IconName;
}

// Using fixed timestamps to avoid hydration mismatches
const sampleListings = [
  {
    id: '1',
    title: 'Test Listing 1',
    price: 1299.99,
    location: 'Toronto, ON',
    createdAt: '2024-12-17T00:00:00.000Z', // Fixed timestamp
    status: 'ACTIVE' as const,
    imageUrl: 'https://via.placeholder.com/400x300'
  },
  {
    id: '2',
    title: 'Featured Listing',
    price: 899.99,
    location: 'Mississauga, ON',
    createdAt: '2024-12-16T00:00:00.000Z', // Fixed timestamp
    status: 'ACTIVE' as const,
    isPromoted: true,
    imageUrl: 'https://via.placeholder.com/400x300'
  }
];

export default function CategoryPageClient({ name, iconName }: CategoryPageClientProps) {
  const [filteredListings, setFilteredListings] = useState(sampleListings);
  const Icon = iconComponents[iconName];

  const handleFilterChange = (filters: any) => {
    let filtered = [...sampleListings];

    // Apply price filter
    if (filters.priceRange.min) {
      filtered = filtered.filter(item => item.price >= Number(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(item => item.price <= Number(filters.priceRange.max));
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(item => 
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredListings(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Icon className="w-8 h-8" />
        <h1 className="text-3xl font-bold">
          {name}
        </h1>
      </div>

      <CategoryFilters onFilterChange={handleFilterChange} />
      <CategoryListings listings={filteredListings} />
    </div>
  );
}