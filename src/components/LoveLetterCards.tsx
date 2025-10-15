import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loveMessages } from '../data/messages'

const cardVariants = {
  initial: { opacity: 0, y: 24, rotateX: -8 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  exit: { opacity: 0, y: -24, rotateX: 8 },
}

export const LoveLetterCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shimmerOffsets = useMemo(
    () => Array.from({ length: 4 }, () => Math.random() * 0.5 + 0.8),
    []
  )

  const currentMessage = loveMessages[currentIndex]
  const total = loveMessages.length

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  return (
    <section className="relative mx-auto w-full max-w-4xl">
      <motion.h2
        className="text-center text-4xl text-gold"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        18 Little Love Notes
      </motion.h2>
      <p className="mt-3 text-center text-sm uppercase tracking-[0.35em] text-cream/70">
        Turn the keepsake pages to read each promise
      </p>

      <div className="relative mt-12 flex flex-col items-center">
        <div className="relative w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={currentIndex}
              className="relative overflow-hidden rounded-[2rem] border border-emerald-700/30 bg-card-gradient/70 p-8 text-cream shadow-aurora backdrop-blur-lg"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-50">
                {shimmerOffsets.map((scale, index) => (
                  <motion.span
                    key={index}
                    className="absolute h-36 w-36 rounded-full bg-rose/30 blur-3xl"
                    style={{
                      left: `${20 + index * 18}%`,
                      top: `${12 + index * 14}%`,
                    }}
                    animate={{
                      scale: [scale, scale * 1.2, scale],
                      opacity: [0.25, 0.45, 0.25],
                    }}
                    transition={{ duration: 10 + index * 2.5, repeat: Infinity }}
                  />
                ))}
              </div>

              <motion.header
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-gold/80">
                  Love note {currentIndex + 1} of {total}
                </p>
              </motion.header>

              <motion.div
                className="relative z-10 mt-6 space-y-4 text-lg leading-relaxed text-cream/90"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
              >
                {currentMessage
                  .split(/\n+/)
                  .map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
              </motion.div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex w-full max-w-xs items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            className="flex-1 rounded-full border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold transition hover:-translate-y-1 hover:bg-gold/20"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 rounded-full border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold transition hover:-translate-y-1 hover:bg-gold/20"
          >
            Next
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-cream/60">
          {Array.from({ length: total }).map((_, index) => (
            <span
              key={index}
              className={`h-[2px] w-9 rounded-full ${
                index === currentIndex ? 'bg-gold' : 'bg-emerald-700/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
