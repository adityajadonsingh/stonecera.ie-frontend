// src/lib/api.ts

import { AboutPage, BrochurePage, Category, ContactPageData, EnquiryData, FooterType, Homepage, LegalPageData, Product, ProductCategory, ProductsPageSeo, Review } from "@/types";


const API_URL = process.env.API_URL!;
const revalidateTime = 60;
const PRODUCTS_PER_PAGE = 12;
const BLOGS_PER_PAGE = 12;

export const sendEnquiry = async (data: EnquiryData) => {
  const type = data.product_name ? "product" : "contact";
  const { product_name, ...rest } = data;
  const cleanedData =
    product_name === null || product_name === undefined
      ? rest
      : { ...rest, product_name };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleanedData),
  });
  if (!res.ok) {
    throw new Error("Failed to send enquiry");
  }
  const sendMail = await fetch("/api/sendMail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...cleanedData, type }),
  });
  if (!sendMail.ok) {
    throw new Error("Failed to send email");
  }
  return res.json();
};



export async function getHomepageData(): Promise<Homepage> {
  const res = await fetch(`${API_URL}/homepage`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch homepage data: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getAboutPageData(): Promise<AboutPage> {
  const res = await fetch(`${API_URL}/about-us`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch about us data: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getProductCategoryPageData(): Promise<ProductCategory> {
  const res = await fetch(`${API_URL}/product-category`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch product category page data: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch all category: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getFooter(): Promise<FooterType> {
  const res = await fetch(`${API_URL}/footer`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch footer: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getCategoryBySlug(category: string): Promise<Category | null> {
  const res = await fetch(`${API_URL}/category/${category}`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch all products: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getRandomProducts(count: number = 10): Promise<Product[]> {
  const products = await getAllProducts();

  if (products.length <= count) {
    return shuffleArray(products);
  }
  return shuffleArray(products).slice(0, count);
}

export async function getRelatedProducts(
  categorySlug: string,
  currentProductId: number,
  limit: number = 5
): Promise<Product[]> {
  const category: Category | null = await getCategoryBySlug(categorySlug);
  if (!category || !category.products) return [];

  const filtered = category.products.filter(
    (p) => p.id !== currentProductId
  );

  return filtered.slice(0, limit);
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getProductBySlug(product: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/product/${product}`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    return null;
  }
  return res.json();
}



export async function getProductReviews(productId: number): Promise<Review[]> {
  if (!productId) throw new Error("productId is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${productId}`, { cache: "no-store" });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Review fetch failed:", res.status, err);
    throw new Error("Failed to fetch reviews");
  }

  const data = await res.json();

  return data.map((r: Review) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    comment: r.comment,
    rating: r.rating,
    createdAt: r.createdAt,
  }));
}




// Submit Review
export async function submitReview(review: {
  name: string;
  email: string;
  comment: string;
  rating: number;
  productId: number;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name: review.name,
        email: review.email,
        comment: review.comment,
        rating: review.rating,
        product: review.productId,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Review submit failed:", res.status, err);
    throw new Error("Failed to submit review");
  }

  return res.json();
}



export async function getLegalPageContent(
  pageType: string
): Promise<LegalPageData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/legal-pages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: revalidateTime },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch legal pages");
    }

    const json = await res.json();

    // Check if it's wrapped inside { data: [...] }
    const pages: LegalPageData[] = Array.isArray(json)
      ? json
      : Array.isArray(json.data)
      ? json.data
      : [];

    const matchedPage = pages.find(
      (page) => page.page_type.toLowerCase() === pageType.toLowerCase()
    );

    return matchedPage || null;
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return null;
  }
}



export async function getBrochurePage(): Promise<BrochurePage> {
  const res = await fetch(`${API_URL}/brochure`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch brochure: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getContactPage(): Promise<ContactPageData> {
  const res = await fetch(`${API_URL}/contact-us`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch contact us page: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getProductsSeo(): Promise<ProductsPageSeo> {
  const res = await fetch(`${API_URL}/products-page`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch products page seo: ${res.status} ${res.statusText}`);
  }
  return res.json();
}