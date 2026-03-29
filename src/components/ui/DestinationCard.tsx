'use client'

import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import Link from 'next/link'

interface DestinationCardProps {
  slug: string
  name: string
  country: string
  image: string
  description: string
  rating?: number
  activities?: number
}

export function DestinationCard({
  slug,
  name,
  country,
  image,
  description,
  rating = 4.8,
  activities = 12,
}: DestinationCardProps) {
  return (
    <Link href={`/destinos/${slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm hover:shadow-xl overflow-hidden transition-shadow duration-300"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-800">{rating}</span>
          </div>

          {/* Location */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1 text-white mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{country}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sky-600 text-sm font-medium">
              {activities} actividades
            </span>
            <span className="text-coral-soft font-medium group-hover:translate-x-1 transition-transform">
              Explorar →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default DestinationCard
