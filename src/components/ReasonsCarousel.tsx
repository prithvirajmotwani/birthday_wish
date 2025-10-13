import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { reasonsILoveYou } from '../data/messages'

export const ReasonsCarousel = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reasonsILoveYou.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-emerald-700/40 bg-emerald-950/60 p-10 text-center shadow-aurora backdrop-blur">
      <h2 className="text-3xl text-gold">Reasons I Love You</h2>
      <p className="mt-3 text-sm uppercase tracking-[0.3em] text-cream/70">
        They keep coming, just like your smiles
      </p>
      <div className="relative mt-10 min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="mx-auto max-w-2xl text-xl leading-relaxed text-cream"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            “{reasonsILoveYou[index]}”
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {reasonsILoveYou.map((_, dotIndex) => (
          <motion.span
            key={dotIndex}
            className={`h-2.5 w-8 rounded-full ${
              dotIndex === index ? 'bg-rose' : 'bg-emerald-800'
            }`}
            animate={{ scale: dotIndex === index ? 1.05 : 1 }}
          />
        ))}
      </div>
    </section>
  )
}
