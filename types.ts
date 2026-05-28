
export interface NavLink {
  label: string;
  href: string;
  subItems?: NavLink[];
}

export interface ServiceItem {
  id?: number;
  title: string;
  description: string;
  subcategories?: string[];
  image: string;
  icon: string;
}

export interface Testimonial {
  id?: number;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface Feature {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id?: number;
  title: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
}

export interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface Project {
  id?: number;
  title: string;
  category: string;
  image: string;
  gallery?: GalleryItem[];
  // New fields for details page
  description?: string;
  client?: string;
  location?: string;
  scope?: string[]; // Array of strings for "Alcance del trabajo"
}

export interface Brand {
  id?: number;
  name: string;
  logo: string;
}

export interface PageHeaderData {
  title: string;
  subtitle: string;
  bgImage: string;
}

export type PageHeaderKeys = 'about' | 'services' | 'projects' | 'blog' | 'contact';
