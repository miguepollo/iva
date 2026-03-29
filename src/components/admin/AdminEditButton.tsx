'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, X, Settings, Database, Code } from 'lucide-react'
import EditPanel from './EditPanel'

interface AdminEditButtonProps {
  section: string
  data: Record<string, any>
  onUpdate?: (data: Record<string, any>) => void
}

export function AdminEditButton({ section, data, onUpdate }: AdminEditButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [currentData, setCurrentData] = useState(data)

  useEffect(() => {
    // Cargar ediciones guardadas
    const storedEdits = JSON.parse(localStorage.getItem('iva-edits') || '{}')
    if (storedEdits[section]) {
      setCurrentData({ ...data, ...storedEdits[section] })
    }
  }, [section, data])

  const handleSave = (editedData: Record<string, any>) => {
    setCurrentData(editedData)
    onUpdate?.(editedData)
  }

  const exportData = () => {
    const storedEdits = JSON.parse(localStorage.getItem('iva-edits') || '{}')
    const blob = new Blob([JSON.stringify(storedEdits, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `iva-edits-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearAllEdits = () => {
    if (confirm('¿Estás seguro de que quieres borrar todas las ediciones?')) {
      localStorage.removeItem('iva-edits')
      setCurrentData(data)
      setShowMenu(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 mb-2"
            >
              <button
                onClick={exportData}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Database className="w-4 h-4" />
                Exportar JSON
              </button>
              <button
                onClick={clearAllEdits}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
                Borrar todo
              </button>
              <div className="border-t border-gray-200 my-1" />
              <div className="px-4 py-2 text-xs text-gray-500">
                Ediciones guardadas en localStorage
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-coral-soft text-white rounded-xl shadow-lg hover:bg-pink-400 transition-colors font-medium"
          >
            <Pencil className="w-5 h-5" />
            <span className="hidden sm:inline">Editar</span>
          </motion.button>

          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className="p-3 bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {showMenu ? (
              <X className="w-5 h-5" />
            ) : (
              <Settings className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Edit Panel */}
      <EditPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        section={section}
        data={currentData}
        onSave={handleSave}
      />
    </>
  )
}

export default AdminEditButton
