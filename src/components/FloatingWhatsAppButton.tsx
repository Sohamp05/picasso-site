"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function FloatingWhatsAppButton({
  phoneNumber,
  message = "Hi! I'm interested in your corporate branding solutions.",
}: FloatingWhatsAppButtonProps) {
  if (!phoneNumber) return null;

  // Clean the phone number (remove +, spaces, dashes, etc.) for the wa.me URL
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  
  // Create the API URL with pre-filled message
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1, // Delay entrance to avoid distraction on initial load
      }}
      className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8 md:w-9 md:h-9 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Tooltip ping animation */}
        <span className="absolute flex h-full w-full rounded-full">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30"></span>
        </span>
      </a>
    </motion.div>
  );
}
