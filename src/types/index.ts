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
  short_description: string;
  pageBanner: PageBanner;
  footer_content: string | null;
  seo: seoTags;
  schema: Schema[];
  updatedAt: string;
  products: Product[];
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  attribute_name: string;
  attribute_value: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  images: ProductImage[];
  image: string;
  image_alt_tag: string;
  attributes: ProductAttribute[];
  updatedAt: string;
  category: Category;
  seo: seoTags;
  schema: Schema[];
}

export interface Testimonal {
  id: number;
  name: string;
  testimonial: string;
}

export interface HomeAbout {
  title: string;
  description: string;
  image: string;
  alt_tag: string;
}
export interface HomeContact {
  title: string;
  sub_heading: string;
  image: string;
  alt_tag: string;
}
export interface HomeCategorySilder {
  title: string;
  subtitle: string;
}

export interface FooterType {
  phone_number1: string;
  phone_number2: string;
  email1: string;
  email2: string;
  address: string;
  instagram_link: string;
  facebook_link: string;
  linkedin_link: string;
  twitter_link: string;
  pinterest_link: string;
}

export interface Homepage {
  banners: Banner[];
  categorySlider: HomeCategorySilder;
  aboutContent: HomeAbout;
  contactContent: HomeContact;
  testimonials: Testimonal[];
  footerContent: string;
  seo: seoTags;
  schema: Schema[];
}

export interface AboutPage {
  pageBanner: PageBanner;
  seo: seoTags;
}

export interface PageBanner {
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

export interface ProductCategory {
  pageBanner: PageBanner;
  footer: PageFooterContent;
  seo: seoTags;
}
export interface ContactPageData {
  seo: seoTags;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone_number: string;
  message: string;
  product_name: string | null | undefined;
}

export interface Review {
  id: number;
  name: string;
  email: string;
  comment: string;
  rating: number;
  createdAt: string;
}
export interface LegalPageData {
  id: number;
  documentId: string;
  page_type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: seoTags;
}
interface PDF{
  id: number;
  url: string;
  name: string;
}
interface Thumbnail{
  id: number;
  url: string;
}
interface Brochure{
  id: number;
  brochure_name: string;
  pdf: PDF;
  thumbnail_image: Thumbnail;
}
export interface BrochurePage{
  pageBanner: PageBanner;
  brochures: Brochure[];
  seo: seoTags;
}
export interface ProductsPageSeo{
  seo: seoTags;
}

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
type JSONArray = JSONValue[];

export interface Schema {
  id: number;
  name: string;
  schema_json: JSONObject;
}