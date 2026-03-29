'use client'

import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap
              ${activeTab === tab.id ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-sky-pastel rounded-lg"
                transition={{ type: 'spring', duration: 0.3 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </motion.div>
    </div>
  )
}

export default Tabs
