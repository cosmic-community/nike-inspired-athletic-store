import Link from 'next/link'
import { HomepageSection } from '@/types'

interface HeroSectionProps {
  section: HomepageSection
}

export default function HeroSection({ section }: HeroSectionProps) {
  const { metadata } = section

  if (!metadata) {
    return null
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {metadata.background_image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={`${metadata.background_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={metadata.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto container-padding">
        <h1 className="hero-text mb-6">
          {metadata.title}
        </h1>
        
        {metadata.subtitle && (
          <p className="text-xl lg:text-2xl mb-12 opacity-90">
            {metadata.subtitle}
          </p>
        )}

        {metadata.cta_text && metadata.cta_link && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={metadata.cta_link}
              className="btn-primary text-lg px-8 py-4"
            >
              {metadata.cta_text}
            </Link>
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}