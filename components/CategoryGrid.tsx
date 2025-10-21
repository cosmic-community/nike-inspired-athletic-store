import Link from 'next/link'
import { Category } from '@/types'

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">No categories available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {categories.map((category) => (
        <Link 
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group block hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
            {category.metadata?.image ? (
              <img 
                src={`${category.metadata.image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={category.metadata.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                width={400}
                height={400}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                  {category.metadata?.name || category.title}
                </span>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-2 group-hover:text-gray-600 transition-colors">
              {category.metadata?.name || category.title}
            </h3>
            
            {category.metadata?.description && (
              <p className="text-gray-600 text-sm">
                {category.metadata.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}