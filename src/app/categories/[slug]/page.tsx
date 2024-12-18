// src/app/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import CategoryPageClient from "./category-page-client";

const categories = {
  motors: { name: "Motors", icon: "car" },
  "buy-sell": { name: "Buy/Sell/Trade", icon: "tags" },
  property: { name: "Property", icon: "home" },
  services: { name: "Services", icon: "wrench" },
  pets: { name: "Pets", icon: "paw-print" },
  community: { name: "Community", icon: "users" },
  jobs: { name: "Jobs", icon: "briefcase" },
} as const;

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the params to ensure it's resolved
  const { slug } = await params;

  // Get the category using the resolved slug
  const category = categories[slug as keyof typeof categories];

  // Handle invalid slugs by showing a 404 page
  if (!category) {
    notFound();
  }

  return <CategoryPageClient name={category.name} iconName={category.icon} />;
}
