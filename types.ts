// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description?: string;
    price: number;
    category?: Category;
    collection?: Collection;
    images?: {
      url: string;
      imgix_url: string;
    }[];
    sizes?: string[];
    color?: string;
    featured?: boolean;
    in_stock?: boolean;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    category_type?: {
      key: 'main' | 'subcategory';
      value: 'Main Category' | 'Subcategory';
    };
    parent_category?: Category;
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Collection interface
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description?: string;
    tagline?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    featured_homepage?: boolean;
  };
}

// Homepage Section interface
export interface HomepageSection extends CosmicObject {
  type: 'homepage-sections';
  metadata: {
    title: string;
    subtitle?: string;
    background_image?: {
      url: string;
      imgix_url: string;
    };
    cta_text?: string;
    cta_link?: string;
    section_order: number;
    section_type: {
      key: 'hero' | 'featured' | 'promotional';
      value: 'Hero Section' | 'Featured Products' | 'Promotional Banner';
    };
  };
}

// Content Page interface
export interface ContentPage extends CosmicObject {
  type: 'content-pages';
  metadata: {
    title: string;
    content?: string;
    page_type: {
      key: 'help' | 'company' | 'legal' | 'promotion';
      value: 'Help' | 'Company' | 'Legal' | 'Promotion';
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isHomepageSection(obj: CosmicObject): obj is HomepageSection {
  return obj.type === 'homepage-sections';
}

export function isContentPage(obj: CosmicObject): obj is ContentPage {
  return obj.type === 'content-pages';
}