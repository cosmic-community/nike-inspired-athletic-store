// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'
import { Metadata } from 'next'

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

  return {
    title: `${product.metadata.name} - Nike Inspired Store`,
    description: product.metadata.description || `${product.metadata.name} - Premium athletic footwear`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}