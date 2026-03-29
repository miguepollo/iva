'use client'

import { motion } from 'framer-motion'
import { Star, Clock, Users, ExternalLink } from 'lucide-react'

interface ExcursionCardProps {
  title: string
  image: string
  price: number
  currency?: string
  rating: number
  reviews: number
  duration: string
  groupSize?: string
  affiliateUrl: string
  provider?: 'civitatis' | 'getyourguide' | 'viator'
}

export function ExcursionCard({
  title,
  image,
  price,
  currency = '€',
  rating,
  reviews,
  duration,
  groupSize,
  affiliateUrl,
  provider = 'civitatis',
}: ExcursionCardProps) {
  const providerColors = {
    civitatis: 'bg-orange-500',
    getyourguide: 'bg-red-500',
    viator: 'bg-yellow-600',
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute top-3 left-3 ${providerColors[provider]} text-white text-xs font-medium px-2 py-1 rounded-full`}>
          {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
          {title}
        </h4>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          {groupSize && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{groupSize}</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviews})</span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500">Desde</span>
            <div className="text-xl font-bold text-gray-900">
              {currency}{price}
            </div>
          </div>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-2 bg-coral-soft text-white px-4 py-2 rounded-xl font-medium hover:bg-pink-400 transition-colors"
          >
            Reservar
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ExcursionCard
