'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Plane, Search } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/destinos', label: 'Destinos' },
  { href: '#excursiones', label: 'Excursiones' },
  { href: '#sobre-mi', label: 'Sobre Mí' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-sky-pastel/20 rounded-xl group-hover:bg-sky-pastel/30 transition-colors">
              <Plane className="w-6 h-6 text-sky-600" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Iva<span className="text-coral-soft">Viajes</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-sky-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/destinos"
              className="bg-coral-soft text-white px-5 py-2 rounded-xl font-medium hover:bg-pink-400 transition-colors"
            >
              Explorar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md rounded-2xl mb-4 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/destinos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block bg-coral-soft text-white px-4 py-3 rounded-xl font-medium text-center mt-4"
              >
                Explorar Destinos
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
