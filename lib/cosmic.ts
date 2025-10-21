import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Category, Collection, HomepageSection, ContentPage, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Product[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured products');
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'products',
      slug
    }).depth(1);
    
    const product = response.object as Product;
    
    if (!product || !product.metadata) {
      return null;
    }
    
    return product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getMainCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'categories',
        'metadata.category_type': 'main'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch main categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'categories',
      slug
    }).depth(1);
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// Collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Collection[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'collections',
        'metadata.featured_homepage': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Collection[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured collections');
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'collections',
      slug
    }).depth(1);
    
    return response.object as Collection;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch collection');
  }
}

// Homepage Sections
export async function getHomepageSections(): Promise<HomepageSection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'homepage-sections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const sections = response.objects as HomepageSection[];
    
    return sections.sort((a, b) => 
      a.metadata.section_order - b.metadata.section_order
    );
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch homepage sections');
  }
}

// Content Pages
export async function getContentPages(): Promise<ContentPage[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'content-pages' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as ContentPage[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch content pages');
  }
}

export async function getContentPageBySlug(slug: string): Promise<ContentPage | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'content-pages',
      slug
    });
    
    return response.object as ContentPage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch content page');
  }
}