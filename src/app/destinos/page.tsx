'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Search, Filter } from 'lucide-react'
import { DestinationCard } from '@/components/ui'
import { destinos } from '@/data/destinos'

export default function DestinosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-sky-pastel/10 to-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Todos los Destinos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Explora nuestra colección de destinos cuidadosamente seleccionados para viajeros soñadores.
            </p>

            {/* Search & Filter */}
            <div className="max-w-2xl mx-auto flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar destino..."
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-sky-pastel focus:ring-2 focus:ring-sky-pastel/20"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-gray-200 hover:border-sky-pastel transition-colors">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Filtros</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">{destinos.length}</span> destinos encontrados
            </p>
            <select className="bg-white rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:outline-none focus:border-sky-pastel">
              <option>Ordenar por: Popularidad</option>
              <option>Ordenar por: Rating</option>
              <option>Ordenar por: A-Z</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinos.map((destino, index) => (
              <motion.div
                key={destino.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DestinationCard
                  slug={destino.slug}
                  name={destino.name}
                  country={destino.country}
                  image={destino.heroImage}
                  description={destino.tagline}
                  rating={destino.rating}
                  activities={destino.activitiesCount}
                />
              </motion.div>
            ))}
          </div>

          {/* Empty State Placeholder */}
          {destinos.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No hay destinos disponibles
              </h3>
              <p className="text-gray-600">
                Pronto añadiremos nuevos destinos increíbles.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-sky-pastel/20 to-coral-soft/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿No encuentras tu destino?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Suscríbete y te avisaremos cuando añadamos nuevos lugares increíbles.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-sky-pastel"
            />
            <button className="bg-coral-soft text-white px-6 py-3 rounded-xl font-medium hover:bg-pink-400 transition-colors">
              Notificarme
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
