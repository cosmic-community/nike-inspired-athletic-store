import Link from 'next/link'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">No products available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => {
        const image = product.metadata?.images?.[0]
        
        return (
          <Link 
            key={product.id}
            href={`/products/${product.slug}`}
            className="group block hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
              {image ? (
                <img 
                  src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                  alt={product.metadata?.name || product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={400}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg group-hover:text-gray-600 transition-colors">
                {product.metadata?.name || product.title}
              </h3>
              
              {product.metadata?.category && (
                <p className="text-sm text-gray-500">
                  {product.metadata.category.metadata?.name || product.metadata.category.title}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg">
                  ${product.metadata?.price || 0}
                </p>
                
                {product.metadata?.featured && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              
              {product.metadata?.color && (
                <p className="text-sm text-gray-600">
                  {product.metadata.color}
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}