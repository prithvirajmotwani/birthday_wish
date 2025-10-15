import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaHeart, FaPlay } from 'react-icons/fa'
import elevatorVideo from '../assets/elevator_video.mp4'
import elevatorPoster from '../assets/elevator_pic.png'

const pulseVariants = {
  animate: {
    scale: [1, 1.18, 1],
    opacity: [0.6, 1, 0.6],
  },
}

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      void video.play().catch(() => {
        /* Ignore autoplay blocks; user can press play manually. */
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [isPlaying])

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        left: 10 + Math.random() * 80,
        top: 15 + Math.random() * 70,
        delay: Math.random() * 4,
      })),
    []
  )

  return (
    <section className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.75rem] border border-emerald-700/40 bg-emerald-950/60 p-10 shadow-aurora backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose/10 via-transparent to-emerald-900/40" />
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
  <h2 className="text-4xl text-gold">Your Elevator Joke</h2>
        <p className="mt-3 text-cream/80">
          Step inside the moment that keeps replaying in my heart. Press play and ride the memory with me.
        </p>
      </motion.div>

      <div className="relative z-10 mt-8 flex flex-col items-center">
        <AnimatePresence mode="wait" initial={false}>
          {!isPlaying ? (
            <motion.div
              key="preview"
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-emerald-700/40 bg-emerald-900/40 shadow-aurora"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src={elevatorPoster}
                alt="Elevator memory preview"
                className="h-[22rem] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-cream">
                <motion.div
                  className="inline-flex items-center gap-3 rounded-full border border-rose/40 bg-rose/20 px-5 py-2 text-sm uppercase tracking-[0.3em] text-rose/90"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
                >
                  <FaHeart />
                  Elevator of forever
                </motion.div>
                <motion.button
                  className="inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-gold shadow-glow transition hover:-translate-y-1 hover:bg-gold/20"
                  onClick={() => setIsPlaying(true)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                >
                  <FaPlay className="text-xs" />
                  Play video
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-emerald-700/40 bg-emerald-900/60 p-4 shadow-aurora"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <video
                ref={videoRef}
                src={elevatorVideo}
                controls
                playsInline
                className="h-[22rem] w-full rounded-[1.5rem] bg-black object-cover"
                poster={elevatorPoster}
              >
                Your browser does not support the video tag.
              </video>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-cream/80">
                <span>Let’s replay the butterflies whenever you wish.</span>
                <button
                  onClick={() => setIsPlaying(false)}
                  className="rounded-full border border-rose/50 bg-rose/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-rose transition hover:bg-rose/20"
                >
                  Replay preview
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative mt-10 h-40 w-full max-w-3xl">
          {floatingHearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="pointer-events-none absolute flex h-10 w-10 items-center justify-center rounded-full bg-rose/20 text-rose"
              style={{ left: `${heart.left}%`, top: `${heart.top}%` }}
              variants={pulseVariants}
              animate="animate"
              transition={{ duration: 6 + heart.delay, repeat: Infinity, ease: 'easeInOut', delay: heart.delay }}
            >
              <FaHeart />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
