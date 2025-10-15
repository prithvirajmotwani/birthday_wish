import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import partySound from '../assets/audio/party-sound.mp3'

type MagicRevealProps = {
  isVisible: boolean
}

export const MagicReveal = ({ isVisible }: MagicRevealProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!isVisible) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
      return
    }

    if (typeof window === 'undefined') {
      return
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(partySound)
      audioRef.current.volume = 0.75
    }

    audioRef.current.currentTime = 0
    void audioRef.current.play().catch(() => {
      /* Autoplay might be blocked; ignore the error so UI still progresses. */
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-emerald-950/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.p
            className="relative z-10 px-6 text-center font-script text-4xl text-cream drop-shadow-2xl md:text-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            ✨ The moment has arrived! ✨
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
