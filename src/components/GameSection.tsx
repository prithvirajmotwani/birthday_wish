import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hiddenHeartCompliments } from '../data/messages'

const HEART_COUNT = 12

type HeartInfo = {
  id: number
  left: number
  top: number
  delay: number
}

export const GameSection = () => {
  const hearts = useMemo<HeartInfo[]>(
    () =>
      Array.from({ length: HEART_COUNT }).map((_, idx) => ({
        id: idx,
        left: 8 + Math.random() * 84,
        top: 10 + Math.random() * 70,
        delay: Math.random() * 6,
      })),
    []
  )
  const [found, setFound] = useState<number[]>([])
  const [compliment, setCompliment] = useState<string | null>(null)

  const remaining = HEART_COUNT - found.length

  const revealCompliment = () => {
    const options = hiddenHeartCompliments.filter((line) => line !== compliment)
    const next = options[Math.floor(Math.random() * options.length)]
    setCompliment(next)
  }

  return (
    <section className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.75rem] border border-emerald-700/40 bg-emerald-950/60 p-10 shadow-aurora backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose/10 via-transparent to-emerald-900/40" />
      <header className="relative z-10 text-center">
        <h2 className="text-4xl text-gold">Find the Hidden Hearts</h2>
        <p className="mt-3 text-cream/80">
          Every heart hides a tiny compliment. Collect them all!
        </p>
        <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-emerald-900/60 px-6 py-2 text-sm uppercase tracking-[0.3em] text-gold">
          {remaining > 0 ? `${remaining} hearts left` : 'All hearts found!'}
        </div>
      </header>
  <div className="relative z-10 mt-8 h-[22rem] overflow-hidden rounded-[2rem] border border-emerald-700/30 bg-emerald-950/50 sm:h-[26rem]">
        {hearts.map((heart) => {
          const isFound = found.includes(heart.id)
          return (
            <motion.button
              key={heart.id}
              className={`absolute flex h-12 w-12 items-center justify-center rounded-full text-2xl transition ${
                isFound ? 'bg-rose/50 text-cream shadow-glow' : 'bg-rose/20 text-rose'
              }`}
              style={{ left: `${heart.left}%`, top: `${heart.top}%` }}
              onClick={() => {
                if (isFound) return
                setFound((prev) => [...prev, heart.id])
                revealCompliment()
              }}
              whileHover={{ scale: 1.15 }}
              animate={{
                y: isFound ? 0 : [-8, 8, -8],
                x: isFound ? 0 : [-4, 4, -4],
              }}
              transition={{ duration: 6, repeat: Infinity, delay: heart.delay }}
            >
              ❤️
            </motion.button>
          )
        })}
      </div>
      <AnimatePresence>
        {compliment && (
          <motion.div
            key={compliment}
            className="relative z-10 mt-8 rounded-[2rem] border border-rose/40 bg-rose/20 p-6 text-center text-cream shadow-glow backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="font-script text-3xl text-gold">{compliment}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cream/70">
              {remaining > 0 ? 'There are more hearts to find…' : 'You collected them all!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
