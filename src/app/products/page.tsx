import { getAllProducts, getProductCategories } from "@/sanity/lib/queries";
import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Picasso Corporate Branding",
  description: "Browse our complete catalog of premium corporate branding solutions.",
};

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;

  const [products, categories] = await Promise.all([
    getAllProducts(),
    getProductCategories(),
  ]);

  // Filter out null/undefined categories just in case
  const validCategories = (categories || []).filter(Boolean);
  const initialCategory =
    searchParams.category && validCategories.includes(searchParams.category)
      ? searchParams.category
      : "All";

  return (
    <ProductsClient
      initialProducts={products}
      categories={validCategories}
      initialCategory={initialCategory}
    />
  );
}
