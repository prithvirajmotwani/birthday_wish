import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type TrailPoint = {
  id: number
  x: number
  y: number
}

const MAX_POINTS = 14

export const CursorSparkles = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setTrail([])
      return
    }

    let pointId = 0
    const handler = (event: MouseEvent) => {
      pointId += 1
      const newPoint: TrailPoint = {
        id: pointId,
        x: event.clientX,
        y: event.clientY,
      }
      setTrail((prev) => [...prev.slice(-MAX_POINTS + 1), newPoint])
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {trail.map((point) => (
          <motion.span
            key={point.id}
            className="absolute text-rose drop-shadow"
            initial={{ opacity: 0.9, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.4, y: -10 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ left: point.x, top: point.y }}
          >
            ✨
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
