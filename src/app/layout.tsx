import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Iva Viajes | Guías de Viaje para Soñadores',
    template: '%s | Iva Viajes',
  },
  description: 'Descubre los destinos más increíbles del mundo. Guías de viaje detalladas, recomendaciones de hoteles, vuelos y excursiones para tu próxima aventura.',
  keywords: ['viajes', 'guías de viaje', 'destinos', 'turismo', 'vacaciones', 'aventuras'],
  authors: [{ name: 'Iva Viajes' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Iva Viajes',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
