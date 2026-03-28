"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    category: string;
    description?: string;
    slug?: { current: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = product.images || (product.image ? [product.image] : []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);
  // Format category to be human readable (e.g. corporate-apparel -> Corporate Apparel)
  const formatCategory = (cat: string) => {
    return cat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const cardContent = (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
    >
      {/* Image Container with aspect ratio */}
      <div 
        className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {images.length > 0 && images[currentImageIndex] && (
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={urlFor(images[currentImageIndex]).width(800).height(600).url()}
                alt={product.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
            {formatCategory(product.category)}
          </span>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <div className="mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <ArrowUpRight className="text-blue-600" size={20} />
          </div>
        </div>
        
        {product.description && (
          <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
      </div>

      {/* Subtle bottom border gradient on hover */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );

  // If we have a slug, wrap in a Link. Otherwise, just return the card (e.g. if rendering incomplete data)
  if (product.slug?.current) {
    return (
      <Link href={`/products/${product.slug.current}`} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
