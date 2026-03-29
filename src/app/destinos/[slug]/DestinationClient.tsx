'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Calendar,
  Globe,
  Clock,
  Plane,
  Ship,
  Car,
  Hotel,
  Star,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'
import { ExcursionCard, QuickFacts, Accordion, AccordionItem, Tabs } from '@/components/ui'
import { AdminEditButton } from '@/components/admin'
import { Destination } from '@/data/destinos'

interface DestinationClientProps {
  destination: Destination
}

export default function DestinationClient({ destination }: DestinationClientProps) {
  const quickFactsData = [
    { icon: <Calendar className="w-5 h-5" />, label: 'Mejor época', value: destination.quickFacts.bestTime },
    { icon: <Globe className="w-5 h-5" />, label: 'Moneda', value: destination.quickFacts.currency },
    { icon: <MapPin className="w-5 h-5" />, label: 'Idioma', value: destination.quickFacts.language },
    { icon: <Clock className="w-5 h-5" />, label: 'Zona horaria', value: destination.quickFacts.timezone },
  ]

  const tabsContent = [
    {
      id: 'como-llegar',
      label: 'Cómo Llegar',
      content: (
        <div className="space-y-4">
          <Accordion>
            <AccordionItem title="✈️ En Avión">
              <p className="text-gray-600 leading-relaxed">{destination.howToGet.byPlane}</p>
              <a
                href={destination.affiliateLinks.skyscanner}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 mt-4 bg-sky-pastel text-white px-4 py-2 rounded-xl hover:bg-sky-400 transition-colors text-sm"
              >
                <Plane className="w-4 h-4" />
                Buscar vuelos
                <ExternalLink className="w-3 h-3" />
              </a>
            </AccordionItem>
            <AccordionItem title="🚢 En Ferry">
              <p className="text-gray-600 leading-relaxed">{destination.howToGet.byBoat}</p>
            </AccordionItem>
            <AccordionItem title="🚗 En Coche">
              <p className="text-gray-600 leading-relaxed">{destination.howToGet.byCar}</p>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      id: 'donde-dormir',
      label: 'Dónde Dormir',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">{destination.whereToSleep.intro}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {destination.whereToSleep.areas.map((area) => (
              <motion.div
                key={area.name}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Hotel className="w-5 h-5 text-coral-soft" />
                  <h4 className="font-semibold text-gray-900">{area.name}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">{area.description}</p>
                <div className="text-xs text-sky-600 font-medium mb-4">
                  Ideal para: {area.bestFor}
                </div>
                <a
                  href={area.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1 text-coral-soft text-sm font-medium hover:text-pink-500"
                >
                  Ver hoteles
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
          <a
            href={destination.affiliateLinks.booking}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-coral-soft text-white px-6 py-3 rounded-xl hover:bg-pink-400 transition-colors font-medium"
          >
            <Hotel className="w-5 h-5" />
            Ver todos los hoteles en Booking
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ),
    },
    {
      id: 'que-hacer',
      label: 'Qué Hacer',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">{destination.whatToDo.intro}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {destination.whatToDo.activities.map((activity, index) => (
              <motion.div
                key={activity.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-sm"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{activity.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                <div className="bg-sky-pastel/10 rounded-xl p-3 text-sm text-sky-700">
                  <strong>Tip:</strong> {activity.tip}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 w-full">
          <Link
            href="/destinos"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a destinos
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{destination.country} · {destination.region}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-6">
              {destination.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">{destination.rating}</span>
              </div>
              <span className="text-white/80">
                {destination.activitiesCount} actividades disponibles
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <QuickFacts facts={quickFactsData} />
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Descubre {destination.name}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs: Cómo llegar, Dónde dormir, Qué hacer */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs tabs={tabsContent} defaultTab="como-llegar" />
        </div>
      </section>

      {/* Excursions Grid */}
      <section id="excursiones" className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Excursiones en {destination.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Las mejores actividades seleccionadas con las valoraciones más altas de nuestros viajeros.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destination.excursions.map((excursion, index) => (
              <motion.div
                key={excursion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ExcursionCard {...excursion} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destination.gallery.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${destination.name} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sky-pastel/20 to-coral-soft/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Preparado para visitar {destination.name}?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Encuentra los mejores vuelos y hoteles para tu viaje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={destination.affiliateLinks.skyscanner}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-2 bg-sky-pastel text-white px-6 py-3 rounded-xl font-medium hover:bg-sky-400 transition-colors"
            >
              <Plane className="w-5 h-5" />
              Buscar Vuelos
            </a>
            <a
              href={destination.affiliateLinks.booking}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-2 bg-coral-soft text-white px-6 py-3 rounded-xl font-medium hover:bg-pink-400 transition-colors"
            >
              <Hotel className="w-5 h-5" />
              Buscar Hoteles
            </a>
          </div>
        </div>
      </section>

      {/* Admin Edit Button */}
      <AdminEditButton
        section={destination.slug}
        data={destination}
      />
    </>
  )
}
