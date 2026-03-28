"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  tagline: string;
  subtext?: string;
  videoUrl?: string;
}

export default function HeroSection({
  tagline,
  subtext,
  videoUrl,
}: HeroSectionProps) {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 min-h-[85vh] flex items-center">
      {/* Background Video */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60 mix-blend-overlay"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        // Fallback gradient if no video is provided
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900" />
      )}

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/10" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {tagline}
            </h1>
          </motion.div>

          {subtext && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {subtext}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              Get a Free Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
