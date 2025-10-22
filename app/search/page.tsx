import { Suspense } from 'react'
import SearchInterface from '@/components/SearchInterface'
import { getCategories } from '@/lib/cosmic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Products - Nike Inspired Athletic Store',
  description: 'Search for athletic footwear, apparel, and gear. Find the perfect products for your active lifestyle.',
}

export default async function SearchPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto container-padding py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Products</h1>
          <p className="text-gray-600">Find the perfect athletic gear for your needs</p>
        </div>
        
        <Suspense fallback={
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        }>
          <SearchInterface categories={categories} />
        </Suspense>
      </div>
    </div>
  )
}