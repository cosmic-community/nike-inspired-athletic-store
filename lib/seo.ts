import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noIndex?: boolean
}

export function generateSEO({
  title,
  description,
  image,
  type = 'website',
  noIndex = false
}: SEOProps): Metadata {
  const siteName = 'Nike Inspired Athletic Store'
  const fullTitle = title.includes(siteName) ? title : `${title} - ${siteName}`
  const defaultImage = 'https://imgix.cosmicjs.com/12010850-aed5-11f0-b3d5-278a061684c4-photo-1608231387042-66d1773070a5-1761089059212.jpg?w=1200&h=630&fit=crop&auto=compress'
  const ogImage = image ? `${image}?w=1200&h=630&fit=crop&auto=format,compress` : defaultImage

  // OpenGraph only supports 'website' or 'article', not 'product'
  // Convert 'product' to 'website' for OpenGraph compatibility
  const ogType: 'website' | 'article' = type === 'article' ? 'article' : 'website'

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage]
    }
  }
}