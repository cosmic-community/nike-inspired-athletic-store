// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getCollections, getProducts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { Metadata } from 'next'
import { Product } from '@/types'
import { generateSEO } from '@/lib/seo'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const collections = await getCollections()
  
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  const description = collection.metadata.description 
    ? collection.metadata.description 
    : `Explore the ${collection.metadata.name} collection. ${collection.metadata.tagline || ''}`

  return generateSEO({
    title: collection.metadata.name,
    description,
    image: collection.metadata.hero_image?.imgix_url,
    type: 'website'
  })
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const [collection, allProducts] = await Promise.all([
    getCollectionBySlug(slug),
    getProducts()
  ])

  if (!collection) {
    notFound()
  }

  // Filter products by collection - handle both string ID and object reference
  const collectionProducts = allProducts.filter((product: Product) => {
    if (!product.metadata?.collection) {
      return false
    }
    
    // Handle case where collection is an object with ID
    if (typeof product.metadata.collection === 'object' && 'id' in product.metadata.collection) {
      return product.metadata.collection.id === collection.id
    }
    
    // Handle case where collection is just an ID string
    if (typeof product.metadata.collection === 'string') {
      return product.metadata.collection === collection.id
    }
    
    return false
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Hero */}
      {collection.metadata?.hero_image && (
        <div className="relative h-96 bg-gray-900 overflow-hidden">
          <img 
            src={`${collection.metadata.hero_image.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt={collection.metadata.name}
            className="w-full h-full object-cover opacity-80"
            width={1920}
            height={400}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="hero-text mb-4">{collection.metadata.name}</h1>
              {collection.metadata?.tagline && (
                <p className="text-xl lg:text-2xl opacity-90">
                  {collection.metadata.tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto container-padding py-16">
        {/* Collection Info */}
        {!collection.metadata?.hero_image && (
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {collection.metadata.name}
            </h1>
            {collection.metadata?.tagline && (
              <p className="text-xl text-gray-600 mb-4">
                {collection.metadata.tagline}
              </p>
            )}
            {collection.metadata?.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {collection.metadata.description}
              </p>
            )}
          </div>
        )}
        
        {/* Products */}
        {collectionProducts.length > 0 ? (
          <ProductGrid products={collectionProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  )
}