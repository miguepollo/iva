'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Plane,
  Palmtree,
  Compass,
  Star,
  ArrowRight,
  MapPin,
  Search,
  Sparkles
} from 'lucide-react'
import { DestinationCard, Button } from '@/components/ui'
import { destinos } from '@/data/destinos'

const features = [
  {
    icon: <Palmtree className="w-6 h-6" />,
    title: 'Destinos de Ensueño',
    description: 'Calas escondidas, ciudades históricas y rincones mágicos seleccionados para ti.',
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'Guías Detalladas',
    description: 'Todo lo que necesitas saber: cómo llegar, dónde dormir y qué hacer.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Excursiones Top',
    description: 'Las mejores actividades seleccionadas con las valoraciones más altas.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">Tu próxima aventura empieza aquí</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Descubre el mundo con
              <span className="block text-coral-soft">Iva Viajes</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Guías de viaje auténticas, consejos de expertos y los mejores planes para viajeros soñadores como tú.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-lg">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Busca tu próximo destino..."
                    className="flex-1 px-4 py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                  />
                  <Button variant="primary" className="rounded-xl">
                    <Plane className="w-5 h-5 mr-2" />
                    Explorar
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/destinos/menorca-espana" className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm">
                🏝️ Menorca
              </Link>
              <Link href="#destinos" className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm">
                🇪🇸 España
              </Link>
              <Link href="#excursiones" className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm">
                ⛵ Excursiones
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/70 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué viajar con nosotros?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Más que guías de viaje, somos tu compañero de aventuras.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 bg-sky-pastel/20 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-pastel group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Destinos Destacados
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Los lugares más increíbles que hemos descubierto para ti.
              </p>
            </div>
            <Link
              href="/destinos"
              className="flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700 mt-4 md:mt-0"
            >
              Ver todos los destinos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinos.map((destino, index) => (
              <motion.div
                key={destino.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DestinationCard
                  slug={destino.slug}
                  name={destino.name}
                  country={destino.country}
                  image={destino.heroImage}
                  description={destino.description}
                  rating={destino.rating}
                  activities={destino.activitiesCount}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-pastel/20 to-coral-soft/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Listo para tu próxima aventura?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a nuestra comunidad de viajeros y recibe las mejores ofertas y consejos directamente en tu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                <MapPin className="w-5 h-5 mr-2" />
                Explorar Destinos
              </Button>
              <Button variant="outline" size="lg">
                <Star className="w-5 h-5 mr-2" />
                Ver Excursiones
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
