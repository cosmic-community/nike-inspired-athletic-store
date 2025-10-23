// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'
import { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  // Extract description from HTML if needed
  const descriptionText = product.metadata.description
    ? product.metadata.description.replace(/<[^>]*>/g, '').substring(0, 160)
    : `${product.metadata.name} - Premium athletic footwear. Price: $${product.metadata.price}`

  // Get the first product image for Open Graph
  const productImage = product.metadata.images?.[0]?.imgix_url

  return generateSEO({
    title: product.metadata.name,
    description: descriptionText,
    image: productImage,
    type: 'product'
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}