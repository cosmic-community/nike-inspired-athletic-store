import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionGridProps {
  collections: Collection[]
}

export default function CollectionGrid({ collections }: CollectionGridProps) {
  if (!collections || collections.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">No collections available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {collections.map((collection) => (
        <Link 
          key={collection.id}
          href={`/collections/${collection.slug}`}
          className="group block"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] group-hover:scale-105 transition-transform duration-300">
            {collection.metadata?.hero_image ? (
              <img 
                src={`${collection.metadata.hero_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={collection.metadata.name}
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">
                  {collection.metadata?.name || collection.title}
                </span>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  {collection.metadata?.name || collection.title}
                </h3>
                
                {collection.metadata?.tagline && (
                  <p className="text-lg opacity-90 mb-6">
                    {collection.metadata.tagline}
                  </p>
                )}
                
                <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}