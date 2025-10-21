'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Category } from '@/types'

interface MobileMenuProps {
  categories: Category[]
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="container-padding py-4 space-y-4">
            <Link 
              href="/products" 
              className="block py-2 font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/categories/${category.slug}`}
                className="block py-2 font-medium hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
            <Link 
              href="/collections" 
              className="block py-2 font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Collections
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}