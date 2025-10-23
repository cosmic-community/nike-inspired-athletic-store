'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [showAddedAnimation, setShowAddedAnimation] = useState(false)
  const { addToCart } = useCart()
  
  const { metadata } = product

  if (!metadata) {
    return <div>Product data not available</div>
  }

  const images = metadata.images || []
  const sizes = metadata.sizes || []

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      return
    }

    addToCart({
      id: product.id,
      name: metadata.name,
      price: metadata.price,
      size: selectedSize || undefined,
      image: images[0]?.imgix_url || '',
      quantity: 1,
    })

    // Trigger animation
    setShowAddedAnimation(true)
    setTimeout(() => {
      setShowAddedAnimation(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {images.length > 0 ? (
                <img 
                  src={`${images[selectedImageIndex]?.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={metadata.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={800}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={`${image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={`${metadata.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{metadata.name}</h1>
              
              {metadata.category && (
                <p className="text-gray-600 mb-4">
                  {metadata.category.metadata?.name || metadata.category.title}
                </p>
              )}
              
              <p className="text-3xl font-bold">${metadata.price}</p>
              
              {metadata.color && (
                <p className="text-lg text-gray-600 mt-2">{metadata.color}</p>
              )}
            </div>

            {/* Sizes */}
            {sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 border rounded-lg text-center font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4 relative">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${
                  selectedSize || sizes.length === 0
                    ? 'bg-black text-white hover:bg-gray-800 active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={sizes.length > 0 && !selectedSize}
              >
                {sizes.length > 0 && !selectedSize ? 'Select Size' : 'Add to Bag'}
              </button>
              
              {/* Added to Cart Animation */}
              {showAddedAnimation && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg animate-bounce">
                    ✓ Added to Bag!
                  </div>
                </div>
              )}
              
              <button className="w-full border border-gray-300 py-4 rounded-full font-semibold text-lg hover:border-black transition-colors">
                Favourite
              </button>
            </div>

            {/* Description */}
            {metadata.description && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <div 
                  className="text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: metadata.description }}
                />
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                metadata.in_stock ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {metadata.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}