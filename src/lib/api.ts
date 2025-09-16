// src/lib/api.ts

import { AboutPage, Category, EnquiryData, FooterType, Homepage, Product, ProductCategory } from "@/types";


const API_URL = process.env.API_URL!;
const revalidateTime = 0;
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





