'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import CartDrawer from './CartDrawer'

export default function CartButton() {
  const { totalItems } = useCart()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {totalItems}
          </span>
        )}
      </button>
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}