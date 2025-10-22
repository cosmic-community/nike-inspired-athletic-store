'use client'

import { Category, SearchFilters } from '@/types'

interface SearchFiltersProps {
  categories: Category[]
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
}

export default function SearchFiltersComponent({ categories, filters, onFiltersChange }: SearchFiltersProps) {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const priceRanges = [
    { label: 'Under $50', min: 0, max: 49 },
    { label: '$50 - $99', min: 50, max: 99 },
    { label: '$100 - $149', min: 100, max: 149 },
    { label: '$150 - $199', min: 150, max: 199 },
    { label: '$200+', min: 200, max: undefined }
  ]

  const sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']

  // Helper function to check if a price range is selected
  const isPriceRangeSelected = (range: { min: number; max: number | undefined }) => {
    return filters.minPrice === range.min && 
           ((range.max === undefined && filters.maxPrice === undefined) || 
            (filters.maxPrice === range.max))
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="all"
              checked={!filters.category}
              onChange={() => updateFilter('category', undefined)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={filters.category === category.slug}
                onChange={() => updateFilter('category', category.slug)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                {category.metadata?.name || category.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              checked={!filters.minPrice && !filters.maxPrice}
              onChange={() => {
                updateFilter('minPrice', undefined)
                updateFilter('maxPrice', undefined)
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Any Price</span>
          </label>
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={isPriceRangeSelected(range)}
                onChange={() => {
                  updateFilter('minPrice', range.min)
                  updateFilter('maxPrice', range.max)
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => updateFilter('size', filters.size === size ? undefined : size)}
              className={`py-1 px-2 text-sm border rounded-md text-center transition-colors ${
                filters.size === size
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => updateFilter('inStock', e.target.checked || false)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.featured || false}
              onChange={(e) => updateFilter('featured', e.target.checked || false)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Featured Only</span>
          </label>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  )
}