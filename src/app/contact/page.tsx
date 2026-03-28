import { getSiteSettings } from "@/sanity/lib/queries";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Picasso Corporate Branding",
  description: "Get in touch with Picasso for your corporate branding needs.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-#F8F8FF mb-6 font-heading">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Ready to elevate your brand? Contact our team of corporate gifting experts to discuss your upcoming project or request a custom quote.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Contact Form Details */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-heading">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="john@company.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">How can we help?</label>
              <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your project requirements..." />
            </div>

            <button type="button" className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-[0.98]">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info fetched from Sanity */}
        <div className="flex flex-col justify-center space-y-12">
          
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-#F8F8FF mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">Our team is ready to respond to your queries.</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:vinayjain@picassogroup.in" className="text-blue-600 font-semibold hover:underline border-b border-transparent hover:border-blue-600 pb-0.5 transition-all w-fit">
                  vinayjain@picassogroup.in
                </a>
                <a href="mailto:abhishek@picassogroup.in" className="text-blue-600 font-semibold hover:underline border-b border-transparent hover:border-blue-600 pb-0.5 transition-all w-fit">
                  abhishek@picassogroup.in
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-#F8F8FF mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">Mon-Fri from 9am to 6pm.</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+919731315677" className="text-indigo-600 font-semibold hover:underline border-b border-transparent hover:border-indigo-600 pb-0.5 transition-all w-fit">
                  +91 9731315677 <span className="text-gray-400 font-normal text-sm ml-1">(Vinay Jain)</span>
                </a>
                <a href="tel:+919071161269" className="text-indigo-600 font-semibold hover:underline border-b border-transparent hover:border-indigo-600 pb-0.5 transition-all w-fit">
                  +91 9071161269 <span className="text-gray-400 font-normal text-sm ml-1">(Abhishek)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-#F8F8FF mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Come say hello at our brand studio.</p>
              <p className="text-gray-800 font-medium whitespace-pre-wrap">
                Picasso | VELEXE - Umbrella, Tent & Canopy, Mysore Road, Telecom Colony, Srinagar, Banashankari, Bengaluru, Karnataka, India
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
