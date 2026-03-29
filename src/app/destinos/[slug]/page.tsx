import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllDestinationSlugs, getDestinationBySlug } from '@/data/destinos'
import DestinationClient from './DestinationClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all destinations
export async function generateStaticParams() {
  const slugs = getAllDestinationSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    return {
      title: 'Destino no encontrado',
    }
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    openGraph: {
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [destination.heroImage],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: destination.metaTitle,
      description: destination.metaDescription,
      images: [destination.heroImage],
    },
  }
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  return <DestinationClient destination={destination} />
}
