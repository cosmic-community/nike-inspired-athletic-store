import { getCategories } from '@/lib/cosmic'
import CategoryGrid from '@/components/CategoryGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories - Nike Inspired Store',
  description: 'Shop by category - Men, Women, Kids, and Jordan collections.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Shop by Category</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect gear for everyone, from professional athletes to weekend warriors.
          </p>
        </div>
        
        {categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  )
}