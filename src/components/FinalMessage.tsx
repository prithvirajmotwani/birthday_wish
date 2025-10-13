import { motion } from 'framer-motion'
import { FaDownload, FaHeart } from 'react-icons/fa'

type FinalMessageProps = {
  onRevealSecret: () => void
  secretRevealed: boolean
}

export const FinalMessage = ({ onRevealSecret, secretRevealed }: FinalMessageProps) => {
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
        <h2 className="text-4xl text-gold">This website will stay forever…</h2>
        <p className="mt-4 text-lg text-cream/90">
          just like my love for you. Thank you for being my favorite chapter, my plot twist, and my home.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <a
            href="/love-letter.pdf"
            download
            className="group inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold/10 px-8 py-3 text-sm font-semibold text-gold shadow-glow transition hover:border-gold/70 hover:bg-gold/20"
          >
            <FaDownload className="transition group-hover:scale-110" />
            Download our love letter
          </a>
          <button
            onClick={onRevealSecret}
            className="inline-flex items-center gap-3 rounded-full border border-rose/50 bg-rose/10 px-8 py-3 text-sm font-semibold text-rose shadow-glow transition hover:bg-rose/20"
          >
            <FaHeart />
            {secretRevealed ? 'Hidden gallery unlocked!' : 'Reveal secret stargarden'}
          </button>
        </div>
        <AnimateSecret secretRevealed={secretRevealed} />
      </motion.div>
    </section>
  )
}

type AnimateSecretProps = {
  secretRevealed: boolean
}

const AnimateSecret = ({ secretRevealed }: AnimateSecretProps) => {
  if (!secretRevealed) return null
  return (
    <motion.div
      className="mt-10 rounded-[2rem] border border-rose/40 bg-rose/15 p-6 text-cream shadow-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="font-script text-3xl text-gold">Secret Stargarden</h3>
      <p className="mt-3 text-base leading-relaxed text-cream/85">
        I tucked away a hidden gallery filled with all the goofy selfies, sleepy morning faces, and every candid that proves we belong together. Head over to <span className="font-semibold text-rose">/secret-garden</span> for the VIP tour. (Password hint: the name of our first inside joke 🌿)
      </p>
    </motion.div>
  )
}
