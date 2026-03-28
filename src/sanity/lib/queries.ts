import { client } from "./client";

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      heroTagline,
      heroSubtext,
      heroVideoUrl,
      whatsappNumber,
      whatsappMessage,
      contactEmail,
      contactPhone,
      address
    }`
  );
}

export async function getFeaturedProducts() {
  return client.fetch(
    `*[_type == "product" && featured == true]{
      _id,
      title,
      slug,
      images,
      category,
      description
    }`
  );
}

export async function getAllProducts() {
  return client.fetch(
    `*[_type == "product"] | order(_createdAt desc){
      _id,
      title,
      slug,
      images,
      category,
      description
    }`
  );
}

export async function getProductCategories() {
  return client.fetch(
    `array::unique(*[_type == "product"].category)`
  );
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      images,
      category,
      description
    }`,
    { slug }
  );
}

export async function getRelatedProducts(category: string, currentProductId: string) {
  // Fetch up to 4 products in the same category, excluding the current product
  return client.fetch(
    `*[_type == "product" && category == $category && _id != $currentProductId][0...4]{
      _id,
      title,
      slug,
      images,
      category,
      description
    }`,
    { category, currentProductId }
  );
}
