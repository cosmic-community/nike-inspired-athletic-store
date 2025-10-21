import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionShowcaseProps {
  collection: Collection
}

export default function CollectionShowcase({ collection }: CollectionShowcaseProps) {
  const { metadata } = collection

  if (!metadata) {
    return null
  }

  return (
    <Link 
      href={`/collections/${collection.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] group-hover:scale-105 transition-transform duration-300">
        {metadata.hero_image ? (
          <img 
            src={`${metadata.hero_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={metadata.name}
            className="w-full h-full object-cover"
            width={800}
            height={600}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xl">{metadata.name}</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-8">
          <div className="text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-2">
              {metadata.name}
            </h3>
            
            {metadata.tagline && (
              <p className="text-lg opacity-90 mb-4">
                {metadata.tagline}
              </p>
            )}
            
            {metadata.description && (
              <p className="text-sm opacity-80 mb-6">
                {metadata.description}
              </p>
            )}
            
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}