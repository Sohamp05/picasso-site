import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-primary border-t border-gray-light py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Picasso Logo" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-gray-medium text-sm leading-relaxed max-w-sm">
              Premium corporate branding solutions. We transform your brand identity with high-quality promotional products and apparel.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-medium mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link href="/products" className="text-sm text-gray-medium hover:text-accent transition-all duration-300 hover:translate-x-1">
                All Products
              </Link>
              <Link href="/contact" className="text-sm text-gray-medium hover:text-accent transition-all duration-300 hover:translate-x-1">
                Contact Us
              </Link>
              <Link href="/studio" className="text-sm text-gray-medium hover:text-accent transition-all duration-300 hover:translate-x-1">
                Admin Settings (CMS)
              </Link>
            </div>
          </div>

          {/* Contact Details from Sanity */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-medium mb-4">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-medium">
              <div className="flex flex-col gap-1">
                <a href="mailto:vinayjain@picassogroup.in" className="hover:text-accent transition-all duration-300 hover:translate-x-1">vinayjain@picassogroup.in</a>
                <a href="mailto:abhishek@picassogroup.in" className="hover:text-accent transition-all duration-300 hover:translate-x-1">abhishek@picassogroup.in</a>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <a href="tel:+919731315677" className="hover:text-accent transition-all duration-300 hover:translate-x-1">+91 9731315677 (Vinay Jain)</a>
                <a href="tel:+919071161269" className="hover:text-accent transition-all duration-300 hover:translate-x-1">+91 9071161269 (Abhishek)</a>
              </div>
              <p className="whitespace-pre-wrap mt-2">
                Picasso | VELEXE - Umbrella, Tent & Canopy, Mysore Road, Telecom Colony, Srinagar, Banashankari, Bengaluru, Karnataka, India
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-light">
          <p className="text-center text-sm text-gray-medium">
            &copy; {new Date().getFullYear()} Picasso Corporate Branding Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
