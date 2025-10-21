import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products - Nike Inspired Store',
  description: 'Browse our complete collection of athletic footwear and apparel.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">All Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of athletic footwear, apparel, and accessories designed for peak performance.
          </p>
        </div>
        
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}