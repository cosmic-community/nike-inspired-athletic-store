import Link from 'next/link'
import { getContentPages } from '@/lib/cosmic'

export default async function Footer() {
  const contentPages = await getContentPages()

  const helpPages = contentPages.filter(page => 
    page.metadata?.page_type?.key === 'help'
  )
  const companyPages = contentPages.filter(page => 
    page.metadata?.page_type?.key === 'company'
  )

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Featured */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Featured</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-300 hover:text-white">Air Force 1</Link></li>
              <li><Link href="/categories/jordan" className="text-gray-300 hover:text-white">Jordan 1</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Air Max Dn</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Vomero</Link></li>
            </ul>
          </div>

          {/* Shoes */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shoes</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-300 hover:text-white">All Shoes</Link></li>
              <li><Link href="/categories/jordan" className="text-gray-300 hover:text-white">Jordan Shoes</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Running Shoes</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Basketball Shoes</Link></li>
            </ul>
          </div>

          {/* Clothing */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Clothing</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-300 hover:text-white">All Clothing</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Tops & T-Shirts</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Shorts</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Hoodies & Pullovers</Link></li>
            </ul>
          </div>

          {/* Kids */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kids</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-300 hover:text-white">Infant & Toddler Shoes</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Kids Shoes</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Kids Basketball Shoes</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Kids Running Shoes</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Resources */}
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Gift Cards</Link></li>
                <li><Link href="/find-a-store" className="text-gray-400 hover:text-white">Find a Store</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-medium mb-4">Help</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Get Help</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Order Status</Link></li>
                {helpPages.map((page) => (
                  <li key={page.id}>
                    <Link href={`/${page.slug}`} className="text-gray-400 hover:text-white">
                      {page.metadata?.title || page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">About Nike</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">News</Link></li>
                {companyPages.map((page) => (
                  <li key={page.id}>
                    <Link href={`/${page.slug}`} className="text-gray-400 hover:text-white">
                      {page.metadata?.title || page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promotions */}
            <div>
              <h4 className="font-medium mb-4">Promotions & Discounts</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Student</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Military</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-gray-800">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-2 bg-black rounded-sm transform -skew-x-12"></div>
              </div>
              <span className="text-sm text-gray-400">United States</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 Nike Inspired Store. Built with Cosmic.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}