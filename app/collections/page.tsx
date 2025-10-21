import { getCollections } from '@/lib/cosmic'
import CollectionGrid from '@/components/CollectionGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections - Nike Inspired Store',
  description: 'Explore our curated collections of athletic footwear and apparel.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Collections</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections featuring the latest innovations and timeless classics.
          </p>
        </div>
        
        {collections.length > 0 ? (
          <CollectionGrid collections={collections} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No collections found.</p>
          </div>
        )}
      </div>
    </div>
  )
}