# Nike Inspired Athletic Store

![Nike Inspired Athletic Store](https://imgix.cosmicjs.com/12010850-aed5-11f0-b3d5-278a061684c4-photo-1608231387042-66d1773070a5-1761089059212.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A complete Nike-inspired e-commerce platform built with Next.js 16 and powered by Cosmic CMS. Features a modern, responsive design with dynamic product catalog, category browsing, and content management.

## Features

- 🛍️ **Dynamic Product Catalog** - Browse and view products with detailed information
- 🏷️ **Category Navigation** - Organized product categories (Men, Women, Jordan, Kids)
- 🎯 **Collection Showcases** - Featured collections with hero imagery
- 📱 **Responsive Design** - Mobile-first approach for all devices
- 🏠 **Dynamic Homepage** - Customizable sections and promotional content
- 📄 **Content Pages** - Support for help, company, and legal pages
- 🔍 **Product Search** - Find products across categories and collections
- ⚡ **Performance Optimized** - Server-side rendering and image optimization

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f8151b87550ae715dd3c0a&clone_repository=68f81882b1d369bb3862dac4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Based on the content model I created for "Clone the Nike website"

### Code Generation Prompt

> Based on the content model I created for "Clone the Nike website", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nike-inspired-store
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Start the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with category and collection data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured products
const { objects: featuredProducts } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.featured': true 
  })
  .depth(1)
```

### Fetching Categories
```typescript
// Get main categories
const { objects: categories } = await cosmic.objects
  .find({ 
    type: 'categories',
    'metadata.category_type': 'main' 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Homepage Sections
```typescript
// Get homepage sections ordered by section_order
const { objects: sections } = await cosmic.objects
  .find({ type: 'homepage-sections' })
  .depth(1)

const sortedSections = sections.sort((a, b) => 
  a.metadata.section_order - b.metadata.section_order
)
```

## Cosmic CMS Integration

This application integrates with your Cosmic CMS bucket using these object types:

- **Products** - Athletic footwear and apparel with images, pricing, and specifications
- **Categories** - Product organization (Men, Women, Jordan, Kids)
- **Collections** - Curated product groups (Spotlight, LeBron XXIII)
- **Homepage Sections** - Dynamic hero sections and promotional content
- **Content Pages** - Static pages for help, company info, and legal content

## Deployment Options

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Set environment variables in Netlify dashboard

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`
<!-- README_END -->