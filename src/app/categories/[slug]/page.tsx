// src/app/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import CategoryPageClient from "./category-page-client";

const categories = {
  "motors": { name: "Motors", icon: "car" },
  "buy-sell": { name: "Buy/Sell/Trade", icon: "tags" },
  "property": { name: "Property", icon: "home" },
  "services": { name: "Services", icon: "wrench" },
  "pets": { name: "Pets", icon: "paw-print" },
  "community": { name: "Community", icon: "users" },
  "jobs": { name: "Jobs", icon: "briefcase" }
} as const;

export default function CategoryPage({
  params
}: {
  params: { slug: string }
}) {
  const category = categories[params.slug as keyof typeof categories];
  
  if (!category) {
    notFound();
  }

  return <CategoryPageClient 
    name={category.name}
    iconName={category.icon}
  />;
}