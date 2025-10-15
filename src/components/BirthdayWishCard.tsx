import { motion } from 'framer-motion'
import { FaRegEnvelopeOpen } from 'react-icons/fa'

type BirthdayWishCardProps = {
  isVisible: boolean
  onProceed: () => void
}

export const BirthdayWishCard = ({
  isVisible,
  onProceed,
}: BirthdayWishCardProps) => {
  return (
    <motion.section
      className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center overflow-hidden rounded-[2.75rem] border border-emerald-700/40 bg-card-gradient/60 px-8 py-16 text-center shadow-aurora backdrop-blur-xl"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.96 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-emerald-900/40" />
      <motion.div
        className="relative z-10 max-w-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-5xl leading-tight text-rose drop-shadow-2xl md:text-6xl"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        >
          Happy Birthday, Manji Raniii 🌸
        </motion.h1>
        <p className="mt-6 text-lg leading-relaxed text-cream/90">
          You are the heartbeat in my every song and the smile in every sunrise.
        </p>
        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={onProceed}
            className="group inline-flex items-center gap-3 rounded-full border border-rose/50 bg-rose/20 px-8 py-3 text-base font-semibold text-cream shadow-glow transition hover:border-rose/70 hover:bg-rose/30"
          >
            <FaRegEnvelopeOpen className="text-lg transition group-hover:scale-110" />
            Open My Surprise 💌
          </button>
        </div>
      </motion.div>
    </motion.section>
  )
}
