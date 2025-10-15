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
  const [hasFinePointer, setHasFinePointer] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches
  })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(any-hover: hover) and (any-pointer: fine)')
    const updatePointerCapability = (matches: boolean) => {
      setHasFinePointer(matches)
      if (!matches) {
        setTrail([])
      }
    }

    updatePointerCapability(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      updatePointerCapability(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    const legacyHandler = (event: MediaQueryListEvent) => handleChange(event)
    mediaQuery.addListener(legacyHandler)
    return () => mediaQuery.removeListener(legacyHandler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) {
      setTrail([])
      return
    }

    let pointId = 0

    const emitPoint = (x: number, y: number) => {
      pointId += 1
      const newPoint: TrailPoint = { id: pointId, x, y }
      setTrail((prev) => [...prev.slice(-MAX_POINTS + 1), newPoint])
    }

    const pointerHandler = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return
      }
      emitPoint(event.clientX, event.clientY)
    }

    const mouseHandler = (event: MouseEvent) => emitPoint(event.clientX, event.clientY)

    const supportsPointerEvents = typeof window.PointerEvent !== 'undefined'

    if (supportsPointerEvents) {
      window.addEventListener('pointermove', pointerHandler)
      return () => window.removeEventListener('pointermove', pointerHandler)
    } else {
      window.addEventListener('mousemove', mouseHandler)
      return () => window.removeEventListener('mousemove', mouseHandler)
    }
  }, [prefersReducedMotion, hasFinePointer])

  if (prefersReducedMotion || !hasFinePointer) {
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
