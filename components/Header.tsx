import Link from 'next/link'
import { getMainCategories } from '@/lib/cosmic'
import MobileMenu from '@/components/MobileMenu'
import CartButton from '@/components/CartButton'

export default async function Header() {
  const categories = await getMainCategories()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-5 h-3 bg-white rounded-sm transform -skew-x-12"></div>
            </div>
            <span className="font-bold text-xl">NIKE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-gray-600 font-medium">
              All Products
            </Link>
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/categories/${category.slug}`}
                className="hover:text-gray-600 font-medium"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
            <Link href="/collections" className="hover:text-gray-600 font-medium">
              Collections
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Link href="/search" className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Favorites */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Cart */}
            <CartButton />

            {/* Mobile Menu */}
            <MobileMenu categories={categories} />
          </div>
        </div>
      </div>
    </header>
  )
}