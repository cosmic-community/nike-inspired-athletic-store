// app/[slug]/page.tsx
import { getContentPageBySlug, getContentPages } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface ContentPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await getContentPages()
  
  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getContentPageBySlug(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: `${page.metadata.title} - Nike Inspired Store`,
    description: `${page.metadata.title} - Nike Inspired Store`,
  }
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = await params
  const page = await getContentPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto container-padding py-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-center">
          {page.metadata.title}
        </h1>
        
        {page.metadata?.content && (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
          />
        )}
      </div>
    </div>
  )
}