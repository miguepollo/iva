'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface QuickFact {
  icon: ReactNode
  label: string
  value: string
}

interface QuickFactsProps {
  facts: QuickFact[]
  className?: string
}

export function QuickFacts({ facts, className = '' }: QuickFactsProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {facts.map((fact, index) => (
        <motion.div
          key={fact.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm text-center"
        >
          <div className="flex justify-center mb-2 text-sky-600">
            {fact.icon}
          </div>
          <div className="text-sm text-gray-500 mb-1">{fact.label}</div>
          <div className="font-semibold text-gray-900">{fact.value}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default QuickFacts
