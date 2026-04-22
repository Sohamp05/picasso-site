import { getSiteSettings, getAllProducts, getProductCategories } from "@/sanity/lib/queries";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface HomeProduct {
  _id: string;
  title: string;
  category: string;
  slug?: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images?: any[];
}

export default async function Home() {
  const [rawSettings, allProducts, categories] = await Promise.all([
    getSiteSettings(),
    getAllProducts(),
    getProductCategories(),
  ]);
  const settings = rawSettings as
    | { heroTagline?: string; heroSubtext?: string; heroVideoUrl?: string }
    | null;

  const categoryProductMap = (categories || []).map((category: string) => ({
    category,
    products: (allProducts || []).filter(
      (product: HomeProduct) => product.category === category
    ),
  }));

  const formatCategory = (cat: string) =>
    cat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div>
      <HeroSection
        tagline={settings?.heroTagline || "Corporate Branding Solutions by Picasso"}
        subtext={settings?.heroSubtext || "Transform every area into a powerful branding opportunity with Picasso branding solutions. Our custom built umbrellas, POSM, canopies, and gazebo tents are designed to enhance your corporate branding."}
        videoUrl={settings?.heroVideoUrl}
      />

      {/* Categories and Options Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-medium text-lg leading-relaxed">
                Explore every category and click to view products in that category.
              </p>
            </div>
          </div>

          {categoryProductMap.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProductMap.map(({ category, products }: { category: string; products: HomeProduct[] }) => {
                const coverImage = products[0]?.images?.[0];

                return (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="group block bg-surface border border-gray-light rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-accent/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100">
                      {coverImage ? (
                        <Image
                          src={urlFor(coverImage).width(800).height(600).url()}
                          alt={formatCategory(category)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                        {formatCategory(category)}
                      </h3>
                      <p className="text-sm text-gray-medium mt-1">
                        {products.length} product{products.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface rounded-2xl border border-dashed border-gray-light backdrop-blur-sm">
              <p className="text-gray-medium">No categories found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust/Process Section */}
      <section className="py-24 bg-gray-light border-t border-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-16 font-heading">
            Why Choose Picasso?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Premium Quality</h3>
              <p className="text-gray-medium leading-relaxed">We source only the highest quality materials for your branded merchandise.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Fast Turnaround</h3>
              <p className="text-gray-medium leading-relaxed">Efficient production processes ensure your products arrive exactly when you need them.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Expert Support</h3>
              <p className="text-gray-medium leading-relaxed">Our dedicated team helps you choose the perfect products for your campaign.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
