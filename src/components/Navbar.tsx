"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary border-b border-gray-light shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Picasso Logo" className="h-24 w-auto object-contain brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:drop-shadow-[0_0_8px_rgba(232,178,76,0.3)] md:h-28" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white hover:text-accent transition-all duration-300 hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent-dark transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-accent hover:bg-gray-light rounded-full transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-primary border-b border-gray-light overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-white hover:text-accent transition-all duration-300 py-2 hover:pl-6"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-accent text-white px-6 py-3 rounded-xl text-center font-medium hover:bg-accent-dark transition-all duration-300 shadow-sm hover:shadow-md mt-3"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
