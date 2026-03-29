'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Pencil,
  X,
  Save,
  RotateCcw,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  MapPin,
  DollarSign,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
} from 'lucide-react'

interface EditableField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'url' | 'number' | 'image'
  value: string | number
}

interface EditPanelProps {
  isOpen: boolean
  onClose: () => void
  section: string
  data: Record<string, any>
  onSave: (data: Record<string, any>) => void
}

export function EditPanel({ isOpen, onClose, section, data, onSave }: EditPanelProps) {
  const [editedData, setEditedData] = useState<Record<string, any>>(data)
  const [expandedSections, setExpandedSections] = useState<string[]>(['main'])

  useEffect(() => {
    setEditedData(data)
  }, [data])

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey)
        ? prev.filter((s) => s !== sectionKey)
        : [...prev, sectionKey]
    )
  }

  const updateField = (key: string, value: any) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    // Guardar en localStorage
    const storedEdits = JSON.parse(localStorage.getItem('iva-edits') || '{}')
    storedEdits[section] = editedData
    localStorage.setItem('iva-edits', JSON.stringify(storedEdits))
    onSave(editedData)
    onClose()
  }

  const handleReset = () => {
    const storedEdits = JSON.parse(localStorage.getItem('iva-edits') || '{}')
    delete storedEdits[section]
    localStorage.setItem('iva-edits', JSON.stringify(storedEdits))
    setEditedData(data)
  }

  const renderField = (key: string, value: any, label: string) => {
    const type = key.includes('url') || key.includes('Url') || key.includes('link')
      ? 'url'
      : key.includes('image') || key.includes('Image') || key.includes('heroImage')
      ? 'image'
      : typeof value === 'number'
      ? 'number'
      : typeof value === 'string' && value.length > 100
      ? 'textarea'
      : 'text'

    return (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={value || ''}
            onChange={(e) => updateField(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-pastel focus:border-transparent text-sm"
            rows={3}
          />
        ) : type === 'image' ? (
          <div className="space-y-2">
            <input
              type="url"
              value={value || ''}
              onChange={(e) => updateField(key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-pastel focus:border-transparent text-sm"
              placeholder="https://images.unsplash.com/..."
            />
            {value && (
              <img
                src={value}
                alt="Preview"
                className="w-full h-24 object-cover rounded-lg"
              />
            )}
          </div>
        ) : type === 'url' ? (
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={value || ''}
              onChange={(e) => updateField(key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-pastel focus:border-transparent text-sm"
            />
          </div>
        ) : type === 'number' ? (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => updateField(key, parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-pastel focus:border-transparent text-sm"
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => updateField(key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-pastel focus:border-transparent text-sm"
          />
        )}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-sky-pastel/10 to-coral-soft/10">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Editar {section}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Main Fields */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('main')}
                  className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                >
                  <span className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-sky-600" />
                    Contenido Principal
                  </span>
                  {expandedSections.includes('main') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('main') && (
                  <div className="mt-4 space-y-4 pl-6">
                    {renderField('name', editedData.name, 'Nombre')}
                    {renderField('tagline', editedData.tagline, 'Eslogan')}
                    {renderField('description', editedData.description, 'Descripción')}
                    {renderField('heroImage', editedData.heroImage, 'Imagen Principal')}
                    {renderField('rating', editedData.rating, 'Valoración')}
                    {renderField('activitiesCount', editedData.activitiesCount, 'Nº Actividades')}
                  </div>
                )}
              </div>

              {/* SEO */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('seo')}
                  className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    SEO
                  </span>
                  {expandedSections.includes('seo') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('seo') && (
                  <div className="mt-4 space-y-4 pl-6">
                    {renderField('metaTitle', editedData.metaTitle, 'Título Meta')}
                    {renderField('metaDescription', editedData.metaDescription, 'Descripción Meta')}
                  </div>
                )}
              </div>

              {/* Quick Facts */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('facts')}
                  className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-600" />
                    Datos Rápidos
                  </span>
                  {expandedSections.includes('facts') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('facts') && editedData.quickFacts && (
                  <div className="mt-4 space-y-4 pl-6">
                    {renderField('quickFacts.bestTime', editedData.quickFacts.bestTime, 'Mejor Época')}
                    {renderField('quickFacts.currency', editedData.quickFacts.currency, 'Moneda')}
                    {renderField('quickFacts.language', editedData.quickFacts.language, 'Idioma')}
                    {renderField('quickFacts.timezone', editedData.quickFacts.timezone, 'Zona Horaria')}
                  </div>
                )}
              </div>

              {/* Affiliate Links */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('affiliates')}
                  className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                >
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-sky-600" />
                    Enlaces de Afiliado
                  </span>
                  {expandedSections.includes('affiliates') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('affiliates') && editedData.affiliateLinks && (
                  <div className="mt-4 space-y-4 pl-6">
                    {renderField('affiliateLinks.skyscanner', editedData.affiliateLinks.skyscanner, 'Skyscanner')}
                    {renderField('affiliateLinks.booking', editedData.affiliateLinks.booking, 'Booking')}
                  </div>
                )}
              </div>

              {/* Gallery */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('gallery')}
                  className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                >
                  <span className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-sky-600" />
                    Galería ({editedData.gallery?.length || 0} imágenes)
                  </span>
                  {expandedSections.includes('gallery') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('gallery') && editedData.gallery && (
                  <div className="mt-4 space-y-4 pl-6">
                    {editedData.gallery.map((img: string, idx: number) => (
                      <div key={idx}>
                        {renderField(`gallery.${idx}`, img, `Imagen ${idx + 1}`)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Excursions */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('excursions')}
                  className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900"
                >
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-sky-600" />
                    Excursiones ({editedData.excursions?.length || 0})
                  </span>
                  {expandedSections.includes('excursions') ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.includes('excursions') && editedData.excursions && (
                  <div className="mt-4 space-y-6 pl-6">
                    {editedData.excursions.map((exc: any, idx: number) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Excursión {idx + 1}: {exc.title}
                        </h4>
                        {renderField(`excursions.${idx}.title`, exc.title, 'Título')}
                        {renderField(`excursions.${idx}.price`, exc.price, 'Precio')}
                        {renderField(`excursions.${idx}.affiliateUrl`, exc.affiliateUrl, 'URL Afiliado')}
                        {renderField(`excursions.${idx}.image`, exc.image, 'Imagen')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Restaurar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-coral-soft text-white rounded-lg hover:bg-pink-400 transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EditPanel
