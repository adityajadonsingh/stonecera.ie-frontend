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
  image_alt_text: string;
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
  schema: string;
  updatedAt: string;
}

export interface Testimonal{
  id: number;
  name: string;
  testimonial: string;
}

export interface FooterType {
  phone_number1: string;
  phone_number2: string;
  email1: string;
  email2: string;
  address: string;
  footer_content: string;
}

export interface Homepage{
  banners: Banner[];
  seo: seoTags;
  testimonials: Testimonal[];
}

export interface PageBanner{
  pageName: string;
  alt_tag: string;
  bannerImg: string;
}

export interface PageFooterContent {
  footerHeading: string;
  footerContent: string;
  footerImg: string;
  footerImgAlt: string;
}

export interface ProductCategory{
  pageBanner: PageBanner;
  footer: PageFooterContent;
  seo: seoTags;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone_number: string;
  message: string;
}