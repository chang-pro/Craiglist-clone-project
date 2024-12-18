// src/components/ui/listings/category-filters.tsx
'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterOptions {
  priceRange: {
    min: string;
    max: string;
  };
  sortBy: string;
  location: string;
  condition?: string;
}

interface CategoryFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function CategoryFilters({ onFilterChange }: CategoryFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: { min: '', max: '' },
    sortBy: 'newest',
    location: '',
    condition: 'all'
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'min' || name === 'max') {
      setFilters(prev => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [name]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const defaultFilters = {
      priceRange: { min: '', max: '' },
      sortBy: 'newest',
      location: '',
      condition: 'all'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>

        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {isOpen && (
        <div className="border rounded-lg p-4 bg-white shadow-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={handleFilterChange}
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="number"
                  name="max"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={handleFilterChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={filters.location}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="like_new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={applyFilters}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex-1"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="border px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}