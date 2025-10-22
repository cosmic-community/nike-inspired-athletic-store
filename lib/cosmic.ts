import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Category, Collection, HomepageSection, ContentPage, CosmicResponse, SearchFilters } from '@/types'

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

// Search products
export async function searchProducts(query?: string, filters?: SearchFilters): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    let products = response.objects as Product[];
    
    // Filter by search query
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      products = products.filter(product => {
        const name = (product.metadata?.name || product.title).toLowerCase();
        const description = (product.metadata?.description || '').toLowerCase();
        const color = (product.metadata?.color || '').toLowerCase();
        const categoryName = (product.metadata?.category?.metadata?.name || product.metadata?.category?.title || '').toLowerCase();
        
        return name.includes(searchTerm) || 
               description.includes(searchTerm) || 
               color.includes(searchTerm) ||
               categoryName.includes(searchTerm);
      });
    }
    
    // Apply filters
    if (filters) {
      // Filter by category
      if (filters.category && filters.category !== 'all') {
        products = products.filter(product => 
          product.metadata?.category?.slug === filters.category
        );
      }
      
      // Filter by price range
      if (filters.minPrice !== undefined) {
        products = products.filter(product => 
          (product.metadata?.price || 0) >= filters.minPrice!
        );
      }
      
      if (filters.maxPrice !== undefined) {
        products = products.filter(product => 
          (product.metadata?.price || 0) <= filters.maxPrice!
        );
      }
      
      // Filter by in stock
      if (filters.inStock) {
        products = products.filter(product => 
          product.metadata?.in_stock === true
        );
      }
      
      // Filter by featured
      if (filters.featured) {
        products = products.filter(product => 
          product.metadata?.featured === true
        );
      }
      
      // Filter by size
      if (filters.size) {
        products = products.filter(product => 
          product.metadata?.sizes?.includes(filters.size!) || false
        );
      }
    }
    
    // Sort products
    const sortBy = filters?.sortBy || 'newest';
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.metadata?.price || 0) - (b.metadata?.price || 0);
        case 'price-high':
          return (b.metadata?.price || 0) - (a.metadata?.price || 0);
        case 'name':
          return (a.metadata?.name || a.title).localeCompare(b.metadata?.name || b.title);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    
    return products;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to search products');
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