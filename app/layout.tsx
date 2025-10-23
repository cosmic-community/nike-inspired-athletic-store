import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Nike Inspired Athletic Store - Just Do It',
  description: 'Discover the latest in athletic footwear, apparel, and gear. Shop premium sneakers, Jordan collection, and performance sportswear.',
  keywords: 'nike, athletic wear, sneakers, sportswear, jordan, running shoes, basketball shoes, athletic apparel',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Nike Inspired Athletic Store - Just Do It',
    description: 'Discover the latest in athletic footwear, apparel, and gear. Shop premium sneakers, Jordan collection, and performance sportswear.',
    type: 'website',
    siteName: 'Nike Inspired Athletic Store',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/12010850-aed5-11f0-b3d5-278a061684c4-photo-1608231387042-66d1773070a5-1761089059212.jpg?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Nike Inspired Athletic Store'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nike Inspired Athletic Store - Just Do It',
    description: 'Discover the latest in athletic footwear, apparel, and gear. Shop premium sneakers, Jordan collection, and performance sportswear.',
    images: ['https://imgix.cosmicjs.com/12010850-aed5-11f0-b3d5-278a061684c4-photo-1608231387042-66d1773070a5-1761089059212.jpg?w=1200&h=630&fit=crop&auto=format,compress']
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </CartProvider>
      </body>
    </html>
  )
}