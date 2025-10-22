import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/cosmic'
import { SearchFilters } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const query = searchParams.get('q') || ''
    const filters: SearchFilters = {
      category: searchParams.get('category') || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      inStock: searchParams.get('inStock') === 'true' || false,
      featured: searchParams.get('featured') === 'true' || false,
      size: searchParams.get('size') || undefined,
      sortBy: (searchParams.get('sortBy') || 'newest') as SearchFilters['sortBy']
    }

    const products = await searchProducts(query, filters)

    return NextResponse.json({
      products,
      total: products.length,
      query,
      filters
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}