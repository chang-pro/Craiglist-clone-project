import Link from "next/link";
import { Car, Tags, Home, Wrench, PawPrint, Users, Briefcase } from "lucide-react";

// Define the type for a Category
interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  Icon: React.ElementType;
}

// Define the categories array with explicit typing
const categories: Category[] = [
  { id: "motors", name: "Motors", Icon: Car, slug: "motors", count: 2345 },
  { id: "buy-sell", name: "Buy/Sell/Trade", Icon: Tags, slug: "buy-sell", count: 5678 },
  { id: "property", name: "Property", Icon: Home, slug: "property", count: 1234 },
  { id: "services", name: "Services", Icon: Wrench, slug: "services", count: 3456 },
  { id: "pets", name: "Pets", Icon: PawPrint, slug: "pets", count: 890 },
  { id: "community", name: "Community", Icon: Users, slug: "community", count: 2567 },
  { id: "jobs", name: "Jobs", Icon: Briefcase, slug: "jobs", count: 4321 },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Find Anything in Your Area
          </h1>
          <p className="text-center text-gray-600 text-lg mb-8">
            Browse thousands of listings in your local community
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category: Category) => {
            const Icon = category.Icon; // Destructure the Icon for use
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                {/* Category Name */}
                <h2 className="text-lg font-medium text-gray-900 mb-1">
                  {category.name}
                </h2>
                {/* Listings Count */}
                <span className="text-sm text-gray-500">
                  {category.count.toLocaleString()} listings
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Verified users and secure transactions</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Local Community</h3>
              <p className="text-gray-600">Find items and services near you</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Post or find listings in minutes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
