'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        bg-white/70 backdrop-blur-md rounded-2xl border border-white/20
        ${hover ? 'shadow-sm hover:shadow-md cursor-pointer' : 'shadow-sm'}
        transition-shadow duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

interface CardImageProps {
  src: string
  alt: string
  className?: string
}

export function CardImage({ src, alt, className = '' }: CardImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-t-2xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  )
}

export default Card
