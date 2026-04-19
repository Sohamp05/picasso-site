import { client, hasSanityConfig } from "./client";

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!hasSanityConfig || !client) {
    return fallback;
  }

  try {
    return await client.fetch(query, params, { next: { revalidate: 60 } });
  } catch {
    return fallback;
  }
}

export async function getSiteSettings() {
  return safeFetch(
    `*[_type == "siteSettings"][0]{
      heroTagline,
      heroSubtext,
      heroVideoUrl,
      whatsappNumber,
      whatsappMessage,
      contactEmail,
      contactPhone,
      address
    }`,
    {},
    null
  );
}

export async function getFeaturedProducts() {
  return safeFetch(
    `*[_type == "product" && featured == true]{
      _id,
      title,
      slug,
      images,
      category,
      description
    }`,
    {},
    []
  );
}

export async function getAllProducts() {
  return safeFetch(
    `*[_type == "product"] | order(_createdAt desc){
      _id,
      title,
      slug,
      images,
      category,
      description
    }`,
    {},
    []
  );
}

export async function getProductCategories() {
  return safeFetch(
    `array::unique(*[_type == "product"].category)`,
    {},
    []
  );
}

export async function getProductBySlug(slug: string) {
  return safeFetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      images,
      category,
      description
    }`,
    { slug },
    null
  );
}

export async function getRelatedProducts(category: string, currentProductId: string) {
  // Fetch up to 4 products in the same category, excluding the current product
  return safeFetch(
    `*[_type == "product" && category == $category && _id != $currentProductId][0...4]{
      _id,
      title,
      slug,
      images,
      category,
      description
    }`,
    { category, currentProductId },
    []
  );
}
