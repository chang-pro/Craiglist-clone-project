// src/components/ui/header/location-bar.tsx
"use client";
import { MapPin } from 'lucide-react';

export default function LocationBar() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 h-12">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-gray-600">Your Location:</span>
          <span className="font-medium">Greater Toronto Area</span>
          <button className="text-blue-600 text-sm hover:underline">
            Change
          </button>
        </div>
      </div>
    </div>
  );
}