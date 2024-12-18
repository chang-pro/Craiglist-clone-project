// src/components/ui/header/index.tsx
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import SelectLanguageButton from "./select-language-button";
import LocationBar from "./location-bar";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-8">
            <Link href="/" className="flex items-center flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MarketPlace
              </span>
            </Link>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <SelectLanguageButton />
              <Link 
                href="/listings/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Post Ad
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>
      <LocationBar />
    </>
  );
}