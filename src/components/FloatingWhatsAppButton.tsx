"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useMemo, useState } from "react";

interface FloatingWhatsAppButtonProps {
  contacts?: Array<{
    name: string;
    phoneNumber: string;
  }>;
  message?: string;
}

export default function FloatingWhatsAppButton({
  contacts = [],
  message = "Hi! I'm interested in your corporate branding solutions.",
}: FloatingWhatsAppButtonProps) {
  const [showOptions, setShowOptions] = useState(false);

  const validContacts = useMemo(
    () =>
      contacts.filter(
        (contact) => contact.phoneNumber && contact.phoneNumber.replace(/[^0-9]/g, "")
      ),
    [contacts]
  );

  if (validContacts.length === 0) return null;

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
      {showOptions && (
        <div className="absolute bottom-20 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 space-y-2">
          <p className="text-sm font-semibold text-gray-800 px-2 pt-1">Choose a contact</p>
          {validContacts.map((contact) => {
            const cleanNumber = contact.phoneNumber.replace(/[^0-9]/g, "");
            const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

            return (
              <a
                key={contact.phoneNumber}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowOptions(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span>{contact.name}</span>
                <span className="text-xs text-gray-500">{contact.phoneNumber}</span>
              </a>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowOptions((prev) => !prev)}
        className="group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        aria-label="Choose WhatsApp contact"
      >
        <FaWhatsapp className="w-8 h-8 md:w-9 md:h-9 group-hover:scale-110 transition-transform duration-300" />

        {/* Tooltip ping animation */}
        <span className="absolute flex h-full w-full rounded-full">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30"></span>
        </span>
      </button>
    </motion.div>
  );
}
