import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import WhatsAppContactDropdown from "@/components/WhatsAppContactDropdown";
import type { Metadata } from "next";
import { Product } from "@/types/product";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const product: Product | null = await getProductBySlug(params.slug);

  if (!product) return { title: "Product Not Found", description: "This product does not exist" };

  return {
    title: `${product.title} | Picasso Corporate Branding`,
    description: product.description?.substring(0, 160) ?? "Premium corporate branding product.",
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product: Product | null = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, settings] = await Promise.all([
    getRelatedProducts(product.category, product._id),
    getSiteSettings()
  ]);

  // Construct WhatsApp message
  const whatsappMsg = `Hi, I would like to enquire about: ${product.title}`;

  // Share URLs (just placeholders for real intent URLs)
  const currentUrl = `https://picasso-site.com/products/${product.slug.current}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.title)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mb-24">
        
        {/* Left: Product Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square w-full bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center">
            <ProductCarousel 
              images={product.images || (product.image ? [product.image] : [])} 
              title={product.title} 
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-primary mb-8">
            {product.title}
          </h1>
          
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-medium tracking-wider uppercase mb-4">Description</h3>
            {product.description ? (
              <div className="prose prose-gray prose-p:leading-relaxed text-gray-medium whitespace-pre-wrap">
                {product.description}
              </div>
            ) : (
              <p className="text-gray-medium italic">No description available for this product.</p>
            )}
          </div>

          <div className="mt-auto pt-8 border-t border-gray-light flex flex-wrap items-center gap-4">
            
            {/* Social Share Icons */}
            <div className="flex items-center gap-2">
              <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-medium text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href={twShareUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-medium text-white flex items-center justify-center hover:bg-sky-500 transition-colors">
                <FaTwitter size={16} />
              </a>
              <WhatsAppContactDropdown 
                message={whatsappMsg}
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-gray-light">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-primary tracking-wider uppercase">
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related: any) => (
              <ProductCard key={related._id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
