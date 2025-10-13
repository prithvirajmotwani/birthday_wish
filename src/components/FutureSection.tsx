import { motion } from 'framer-motion'

export const FutureSection = () => {
  return (
    <section className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.75rem] border border-emerald-700/40 bg-emerald-950/60 p-10 shadow-aurora backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/50 to-emerald-950/80" />
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-4xl text-gold">Our Future Together</h2>
        <p className="mt-3 text-cream/80">
          Here’s to forever… and also stealing your fries forever 🍟💚.
        </p>
      </motion.div>
      <div className="relative mt-10 flex h-72 items-end justify-center overflow-hidden rounded-[2.2rem] border border-emerald-700/30 bg-gradient-to-t from-emerald-950/90 via-emerald-900/60 to-transparent">
        <motion.div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-950 via-emerald-900/90 to-transparent"
          animate={{ backgroundPositionX: ['0%', '100%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-40 w-full"
          animate={{
            backgroundPositionX: ['0%', '100%'],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(255, 111, 145, 0.08) 0px, rgba(255, 111, 145, 0.08) 30px, transparent 30px, transparent 60px)',
          }}
        />
        <motion.div
          className="absolute bottom-0 flex w-full justify-around px-16"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="flex items-end gap-3"
            animate={{ x: ['0%', '6%', '0%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="h-28 w-16 rounded-full bg-rose/30"
              animate={{ scaleY: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div className="relative h-32 w-20">
              <motion.div
                className="absolute inset-x-2 bottom-0 h-24 rounded-full bg-cream/80"
                animate={{ scaleX: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              />
              <motion.div
                className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-rose/70"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-end gap-4"
            animate={{ x: ['0%', '-6%', '0%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div className="relative h-32 w-20">
              <motion.div
                className="absolute inset-x-2 bottom-0 h-24 rounded-full bg-rose/60"
                animate={{ scaleX: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-cream"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div
              className="h-28 w-16 rounded-full bg-gold/30"
              animate={{ scaleY: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-x-0 bottom-0 flex justify-center"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-28 w-[65%] rounded-t-[50%] bg-gradient-to-t from-rose/30 via-transparent to-transparent" />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 top-6 flex justify-center"
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-36 w-[70%] rounded-full bg-gradient-to-r from-transparent via-cream/10 to-transparent blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}
