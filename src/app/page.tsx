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
        tagline={settings?.heroTagline || "Elevate Your Corporate Identity"}
        subtext={settings?.heroSubtext || "Premium promotional products and corporate apparel tailored for your brand."}
        videoUrl={settings?.heroVideoUrl}
      />

      {/* Categories and Options Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-600 text-lg">
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
                    className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
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
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {formatCategory(category)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {products.length} product{products.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500">No categories found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust/Process Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 font-heading">Why Choose Picasso?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">We source only the highest quality materials for your branded merchandise.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Turnaround</h3>
              <p className="text-gray-600">Efficient production processes ensure your products arrive exactly when you need them.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">Our dedicated team helps you choose the perfect products for your campaign.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
