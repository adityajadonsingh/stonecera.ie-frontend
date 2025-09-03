// src/types/index.ts

export interface seoTags {
  id: number;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  og_title: string;
  og_description: string;
  twitter_title: string;
  twitter_description: string;
  canonical: string;
  robots: string;
  og_image: string;
  meta_image: string;
  twitter_image: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  alt_text: string;
  enquiry_button_text: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  image_alt_tag: string;
  footer_content: string;
  seo: seoTags;
  schema: Record<string, any>[];
  updatedAt: string;
}

export interface Footer {
  phone_number1: string;
  phone_number2: string;
  email1: string;
  email2: string;
  footer_content: string;
}

