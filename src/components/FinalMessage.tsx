import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

const vowLines = [
  'I will keep writing us into every sunrise, one gentle promise at a time.',
  'I will keep building little sanctuaries where your heart can rest and glow.',
  'I will keep choosing your hand, no matter how many tomorrows we meet.',
]

export const FinalMessage = () => {
  return (
    <section className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2.75rem] border border-emerald-700/40 bg-card-gradient/70 p-10 text-center shadow-aurora backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-transparent to-emerald-950/70" />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-4xl text-gold">This love is our forever symphony</h2>
        <p className="mt-4 text-lg text-cream/90">
          Thank you for being my safe place, my wild adventure, and the melody that steadies my heart. Let’s keep
          dancing through this dream we’re creating.
        </p>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          {[...Array(6).keys()].map((index) => (
            <motion.span
              key={index}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/15 text-rose"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
                rotate: index % 2 === 0 ? [0, 6, -6, 0] : [0, -6, 6, 0],
              }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaHeart />
            </motion.span>
          ))}
        </motion.div>

        <motion.ul
          className="mt-10 space-y-4 text-left text-base leading-relaxed text-cream/85"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        >
          {vowLines.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 rounded-2xl border border-emerald-600/30 bg-emerald-900/40 p-4 shadow-inner"
            >
              <span className="mt-1 text-rose">
                <FaHeart className="drop-shadow" />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p
          className="mt-10 text-sm uppercase tracking-[0.4em] text-gold/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        >
          Forever yours,
        </motion.p>
        <motion.p
          className="mt-3 font-script text-4xl text-cream"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        >
          Raj ❤️
        </motion.p>
      </motion.div>
    </section>
  )
}
