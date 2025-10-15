import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'
import { MagicReveal } from './MagicReveal'

type CountdownCardProps = {
  targetDate: Date
  onComplete: () => void
  isActive: boolean
}

const FloatingIcon = ({ index, isDimmed }: { index: number; isDimmed: boolean }) => {
  const delay = useMemo(() => Math.random() * 4, [])
  const initialX = useMemo(() => (Math.random() - 0.5) * 180, [])
  const initialY = useMemo(() => Math.random() * 80, [])
  const icon = index % 2 === 0 ? <FaHeart /> : <GiBalloons />

  return (
    <motion.span
      className="pointer-events-none absolute text-rose/70"
      style={{
        left: `calc(50% + ${initialX}px)`,
        top: `calc(50% - ${initialY}px)`,
        fontSize: `${1.4 + Math.random()}rem`,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isDimmed
          ? { opacity: 0 }
          : {
              opacity: [0, 1, 0],
              y: [-30, -80 - Math.random() * 40],
              x: [0, (Math.random() - 0.5) * 40],
            }
      }
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: isDimmed ? 0 : Infinity,
        ease: 'easeInOut',
      }}
    >
      {icon}
    </motion.span>
  )
}

export const CountdownCard = ({ targetDate, onComplete, isActive }: CountdownCardProps) => {
  const [revealStarted, setRevealStarted] = useState(false)
  const revealTimeoutRef = useRef<number | null>(null)

  const handleCountdownFinish = useCallback(() => {
    setRevealStarted(true)
  }, [])

  useEffect(() => {
    if (!revealStarted) return

    if (typeof window === 'undefined') {
      onComplete()
      return
    }

    revealTimeoutRef.current = window.setTimeout(() => {
      onComplete()
    }, 2400)

    return () => {
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current)
        revealTimeoutRef.current = null
      }
    }
  }, [revealStarted, onComplete])

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current)
        revealTimeoutRef.current = null
      }
    }
  }, [])

  return (
    <motion.section
      className="relative mx-auto flex min-h-[26rem] w-full max-w-3xl flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-emerald-700/40 bg-card-gradient/40 p-8 text-center shadow-aurora backdrop-blur-xl sm:min-h-[30rem] sm:p-10"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {[...Array(18).keys()].map((i) => (
        <FloatingIcon key={i} index={i} isDimmed={revealStarted} />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-emerald-900/30 mix-blend-soft-light" />
      <motion.div
        className="relative z-10"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: revealStarted ? -10 : 0, opacity: revealStarted ? 0 : 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
      >
        <p className="text-sm uppercase tracking-[0.4em] text-gold/70">Counting down to the most beautiful day 💚</p>
        <motion.h2
          className="mt-6 font-script text-4xl text-cream drop-shadow-lg md:text-5xl"
          animate={{
            textShadow: [
              '0 0 12px rgba(255, 111, 145, 0.3)',
              '0 0 22px rgba(184, 134, 11, 0.45)',
              '0 0 12px rgba(255, 111, 145, 0.3)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          Our hearts are almost there
        </motion.h2>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <Countdown
            key={targetDate.toISOString()}
            date={targetDate}
            onComplete={handleCountdownFinish}
            renderer={({ days, hours, minutes, seconds }) => (
              <div className="flex flex-wrap items-center justify-center gap-4 text-cream sm:gap-5">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hours', value: hours },
                  { label: 'Minutes', value: minutes },
                  { label: 'Seconds', value: seconds },
                ].map(({ value, label }) => (
                  <motion.div
                    key={label}
                    className="relative flex h-20 w-20 flex-col items-center justify-center rounded-3xl border border-emerald-600/40 bg-emerald-900/50 shadow-glow backdrop-blur sm:h-24 sm:w-24"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ type: 'spring', stiffness: 140, damping: 12 }}
                  >
                    <span className="text-2xl font-semibold tracking-wider text-cream sm:text-3xl">
                      {zeroPad(value)}
                    </span>
                    <span className="mt-1 text-xs uppercase tracking-[0.35em] text-gold/80">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          />
        </motion.div>
      </motion.div>
      <MagicReveal isVisible={revealStarted} />
    </motion.section>
  )
}
