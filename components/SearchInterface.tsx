'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Product, Category, SearchFilters } from '@/types'
import ProductGrid from '@/components/ProductGrid'
import SearchFiltersComponent from '@/components/SearchFilters'

interface SearchInterfaceProps {
  categories: Category[]
}

export default function SearchInterface({ categories }: SearchInterfaceProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'newest'
  })
  
  const debounceRef = useRef<NodeJS.Timeout>()

  // Initialize search from URL params
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'all'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const inStock = searchParams.get('inStock') === 'true'
    const featured = searchParams.get('featured') === 'true'
    const size = searchParams.get('size') || ''
    const sortBy = (searchParams.get('sortBy') || 'newest') as SearchFilters['sortBy']

    setQuery(q)
    setDebouncedQuery(q)
    setFilters({
      category: category === 'all' ? undefined : category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      inStock: inStock || false,
      featured: featured || false,
      size: size || undefined,
      sortBy
    })
  }, [searchParams])

  // Debounce search query
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // 300ms debounce delay

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query])

  // Search products
  const searchProducts = useCallback(async (searchQuery: string, searchFilters: SearchFilters) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      if (searchFilters.category) params.set('category', searchFilters.category)
      if (searchFilters.minPrice !== undefined) params.set('minPrice', searchFilters.minPrice.toString())
      if (searchFilters.maxPrice !== undefined) params.set('maxPrice', searchFilters.maxPrice.toString())
      if (searchFilters.inStock) params.set('inStock', 'true')
      if (searchFilters.featured) params.set('featured', 'true')
      if (searchFilters.size) params.set('size', searchFilters.size)
      if (searchFilters.sortBy) params.set('sortBy', searchFilters.sortBy)

      const response = await fetch(`/api/search?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to search products')
      
      const data = await response.json()
      setProducts(data.products)
      
      // Update URL without triggering navigation
      const newUrl = params.toString() ? `/search?${params.toString()}` : '/search'
      window.history.replaceState(null, '', newUrl)
    } catch (error) {
      console.error('Search error:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Effect to trigger search when debounced query or filters change
  useEffect(() => {
    searchProducts(debouncedQuery, filters)
  }, [debouncedQuery, filters, searchProducts])

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery)
  }

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
  }

  const handleClearAll = () => {
    setQuery('')
    setDebouncedQuery('')
    setFilters({ sortBy: 'newest' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={handleClearAll}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          </div>
          
          {/* Search Input */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search by name, color, or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <SearchFiltersComponent
            categories={categories}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {debouncedQuery ? `Search Results for "${debouncedQuery}"` : 'All Products'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {loading ? 'Searching...' : `${products.length} products found`}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  )
}