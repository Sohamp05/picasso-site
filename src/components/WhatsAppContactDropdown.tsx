"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

interface WhatsAppContactDropdownProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  contacts?: Array<{
    name: string;
    phoneNumber: string;
  }>;
}

export default function WhatsAppContactDropdown({
  message = "Hi! I'm interested in your corporate branding solutions.",
  className = "",
  children,
  contacts = [
    { name: "Vinay Jain", phoneNumber: "+919731315677" },
    { name: "Abhishek", phoneNumber: "+919071161269" },
  ],
}: WhatsAppContactDropdownProps) {
  const [showOptions, setShowOptions] = useState(false);

  const validContacts = contacts.filter(
    (contact) => contact.phoneNumber && contact.phoneNumber.replace(/[^0-9]/g, "")
  );

  if (validContacts.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-72 bg-surface rounded-2xl shadow-2xl border border-gray-light p-4 space-y-2 z-50"
          >
            <p className="text-sm font-semibold text-primary px-3 pt-2">Choose a contact</p>
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
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-medium hover:bg-gray-light transition-colors"
                >
                  <span>{contact.name}</span>
                  <span className="text-xs text-gray-medium">{contact.phoneNumber}</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setShowOptions((prev) => !prev)}
        className="group flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300 shadow-sm hover:shadow-md"
        aria-label="Choose WhatsApp contact"
      >
        <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  );
}
