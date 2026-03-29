'use client'

import Link from 'next/link'
import { Plane, Instagram, Twitter, Youtube, Mail, Heart } from 'lucide-react'

const footerLinks = {
  destinos: [
    { label: 'España', href: '/destinos/espana' },
    { label: 'Italia', href: '/destinos/italia' },
    { label: 'Francia', href: '/destinos/francia' },
    { label: 'Portugal', href: '/destinos/portugal' },
  ],
  recursos: [
    { label: 'Guías de Viaje', href: '/guias' },
    { label: 'Blog', href: '/blog' },
    { label: 'Consejos', href: '/consejos' },
    { label: 'Presupuestos', href: '/presupuestos' },
  ],
  legal: [
    { label: 'Política de Privacidad', href: '/privacidad' },
    { label: 'Términos de Uso', href: '/terminos' },
    { label: 'Afiliados', href: '/afiliados' },
    { label: 'Contacto', href: '/contacto' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-sky-pastel/20 rounded-xl">
                <Plane className="w-6 h-6 text-sky-pastel" />
              </div>
              <span className="text-xl font-bold text-white">
                Iva<span className="text-coral-soft">Viajes</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Tu guía de confianza para descubrir los destinos más increíbles del mundo.
              Viaja inteligente, viaja con estilo.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-sky-pastel"
                />
              </div>
              <button className="bg-coral-soft text-white px-4 py-2 rounded-xl font-medium hover:bg-pink-400 transition-colors">
                Suscribir
              </button>
            </div>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Destinos</h4>
            <ul className="space-y-2">
              {footerLinks.destinos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sky-pastel transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sky-pastel transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sky-pastel transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © {new Date().getFullYear()} IvaViajes. Hecho con{' '}
              <Heart className="w-4 h-4 text-coral-soft fill-coral-soft" /> para viajeros soñadores.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-sky-pastel transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
