"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface ProductsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialProducts: any[];
  categories: string[];
  initialCategory?: string;
}

export default function ProductsClient({
  initialProducts,
  categories,
  initialCategory = "All",
}: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  const filteredProducts = activeCategory === "All" 
    ? initialProducts 
    : initialProducts.filter(p => p.category === activeCategory);

  const formatCategory = (cat: string) => {
    if (cat === "All") return "All Categories";
    return cat.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-#F8F8FF mb-4 font-heading">
          Our Products
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Browse our complete catalog of premium corporate branding solutions and promotional items.
        </p>
      </div>

      {/* Categories Filter (Client-side) */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === "All" 
              ? "bg-gray-900 text-white shadow-md scale-105" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category 
                ? "bg-gray-900 text-white shadow-md scale-105" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {formatCategory(category)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-lg text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
