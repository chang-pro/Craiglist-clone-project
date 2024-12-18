// src/app/categories/[slug]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-4">Category Not Found</h2>
      <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Return to Homepage
      </Link>
    </div>
  );
}