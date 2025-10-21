import { getHomepageSections, getFeaturedProducts, getFeaturedCollections } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import CollectionShowcase from '@/components/CollectionShowcase'
import { HomepageSection, Product, Collection } from '@/types'

export default async function HomePage() {
  const [sections, featuredProducts, featuredCollections] = await Promise.all([
    getHomepageSections(),
    getFeaturedProducts(),
    getFeaturedCollections()
  ])

  // Get hero sections
  const heroSections = sections.filter(section => 
    section.metadata.section_type?.key === 'hero'
  )

  return (
    <div className="min-h-screen">
      {/* Hero Sections */}
      {heroSections.map((section) => (
        <HeroSection key={section.id} section={section} />
      ))}
      
      {/* Featured Collections */}
      {featuredCollections.length > 0 && (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <h2 className="text-center mb-16">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCollections.map((collection) => (
                <CollectionShowcase key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto container-padding">
            <h2 className="text-center mb-16">Featured Products</h2>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* Promotional Sections */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12">
              <h3 className="text-3xl font-bold mb-4">MLB World Series Essentials</h3>
              <p className="text-lg mb-8 opacity-90">Secure the Win</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop
              </button>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white p-12">
              <h3 className="text-3xl font-bold mb-4">Give Sport</h3>
              <p className="text-lg mb-8 opacity-90">Gifts for Runners</p>
              <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop Gifts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}