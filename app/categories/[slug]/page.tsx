// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getCategories, getProducts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { Metadata } from 'next'
import { Product } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata.name} - Nike Inspired Store`,
    description: category.metadata.description || `Shop ${category.metadata.name} athletic wear and footwear`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, allProducts] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts()
  ])

  if (!category) {
    notFound()
  }

  // Filter products by category
  const categoryProducts = allProducts.filter((product: Product) => 
    product.metadata?.category?.id === category.id
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        {/* Category Header */}
        <div className="text-center mb-16">
          {category.metadata?.image && (
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden">
              <img 
                src={`${category.metadata.image.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={category.metadata.name}
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            </div>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {category.metadata.name}
          </h1>
          {category.metadata?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>
        
        {/* Products */}
        {categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}