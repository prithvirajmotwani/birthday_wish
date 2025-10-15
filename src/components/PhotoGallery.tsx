import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryMoments } from '../data/messages'
import { FaHeart } from 'react-icons/fa'

type LightboxState = {
  open: boolean
  index: number
}

export const PhotoGallery = () => {
  const [lightbox, setLightbox] = useState<LightboxState>({ open: false, index: 0 })

  return (
    <section className="relative mx-auto w-full max-w-6xl">
      <motion.h2
        className="text-center text-4xl text-gold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        The Moments That Made Us 💞
      </motion.h2>
      <motion.p
        className="mt-3 text-center text-cream/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Little snapshots of forever. Click to relive them with me.
      </motion.p>
      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {galleryMoments.map((moment, index) => (
          <motion.button
            key={moment.src}
            className="group relative overflow-hidden rounded-[2rem] border border-emerald-700/40 bg-emerald-950/40 p-1 text-left shadow-aurora backdrop-blur"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            onClick={() => setLightbox({ open: true, index })}
          >
            <div className="relative overflow-hidden rounded-[1.8rem]">
              <img
                src={moment.src}
                alt={moment.caption}
                loading="lazy"
                className="h-56 w-full object-cover transition duration-700 group-hover:scale-105 md:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <div className="flex items-center justify-center">
                  <FaHeart className="text-rose/90" />
                </div>
                <p className="mt-3 text-center text-lg font-medium text-cream">
                  {moment.caption}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-h-[85vh] w-[min(90vw,900px)] overflow-hidden rounded-[2.5rem] border border-emerald-700/40 bg-emerald-950/90 p-6 shadow-glow"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <button
                className="absolute right-6 top-6 rounded-full bg-rose/30 px-3 py-1 text-sm font-semibold text-cream shadow-lg transition hover:bg-rose/50"
                onClick={() => setLightbox({ open: false, index: 0 })}
              >
                Close ✨
              </button>
              <img
                src={galleryMoments[lightbox.index].src}
                alt={galleryMoments[lightbox.index].caption}
                className="max-h-[60vh] w-full rounded-[2rem] object-contain"
              />
              <div className="mt-4 text-center text-cream">
                <FaHeart className="mx-auto text-rose/80" />
                <p className="mt-3 text-cream/85 text-lg">
                  {galleryMoments[lightbox.index].caption}
                </p>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.3em] text-rose/80">
                  <span>Swipe the timeline</span>
                  <span>
                    {lightbox.index + 1} / {galleryMoments.length}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    className="rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-sm text-gold transition hover:bg-gold/20"
                    onClick={() =>
                      setLightbox((prev) => ({
                        open: true,
                        index: (prev.index - 1 + galleryMoments.length) % galleryMoments.length,
                      }))
                    }
                  >
                    ← Back in time
                  </button>
                  <button
                    className="rounded-full border border-rose/50 bg-rose/10 px-5 py-2 text-sm text-rose transition hover:bg-rose/20"
                    onClick={() =>
                      setLightbox((prev) => ({
                        open: true,
                        index: (prev.index + 1) % galleryMoments.length,
                      }))
                    }
                  >
                    Fast forward →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
