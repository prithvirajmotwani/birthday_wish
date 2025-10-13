import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loveMessages } from '../data/messages'

type Reaction = 'love' | 'laugh' | 'tear'

type CardState = {
  isOpen: boolean
  reaction?: Reaction
}

const reactionBadgeMap: Record<Reaction, string> = {
  love: '❤️',
  laugh: '😂',
  tear: '😭',
}

export const LoveLetterCards = () => {
  const [cardStates, setCardStates] = useState<Record<number, CardState>>({})
  const randomOffsets = useMemo(
    () => loveMessages.map(() => Math.random() * 0.4 - 0.2),
    []
  )

  const toggleCard = (index: number) => {
    setCardStates((prev) => ({
      ...prev,
      [index]: {
        isOpen: !prev[index]?.isOpen,
        reaction: prev[index]?.reaction,
      },
    }))
  }

  const setReaction = (index: number, reaction: Reaction) => {
    setCardStates((prev) => ({
      ...prev,
      [index]: {
        isOpen: true,
        reaction,
      },
    }))
  }

  return (
    <section className="relative mx-auto w-full max-w-6xl">
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
        Tap a heart to read the secret inside
      </p>
      <motion.div
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06 },
          },
        }}
      >
        {loveMessages.map((message, index) => {
          const state = cardStates[index]
          const isOpen = state?.isOpen
          const reaction = state?.reaction

          return (
            <motion.div
              key={message.title}
              className="relative h-56 cursor-pointer [&:nth-child(3n+2)]:mt-6 sm:h-64"
              custom={randomOffsets[index]}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: (offset: number) => ({
                  opacity: 1,
                  y: 0,
                  rotate: offset * 6,
                }),
              }}
            >
              <motion.div
                className="absolute inset-0 [perspective:1200px]"
                onClick={() => toggleCard(index)}
              >
                <motion.div
                  className="absolute inset-0 rounded-[1.8rem] bg-emerald-950/60 p-[1px] shadow-aurora"
                  initial={false}
                  animate={{ rotateY: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 rounded-[1.8rem] bg-card-gradient/70 p-6 backdrop-blur-lg" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-cream">
                      <span className="text-4xl drop-shadow-lg">❤️</span>
                      <p className="text-lg font-semibold tracking-wide text-cream">
                        {message.title}
                      </p>
                      <span className="text-xs uppercase tracking-[0.35em] text-gold/80">
                        Tap to open
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-[1.8rem] bg-emerald-900/60 p-6 text-cream"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className="font-script text-3xl text-gold drop-shadow">
                          {message.title}
                        </h3>
                        <p className="text-base leading-relaxed text-cream/90">
                          {message.body}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-cream/70">
                        <span className="text-xs uppercase tracking-[0.25em]">React:</span>
                        <div className="flex gap-2">
                          {(
                            [
                              ['love', '❤️'],
                              ['laugh', '😂'],
                              ['tear', '😭'],
                            ] as [Reaction, string][]
                          ).map(([key, label]) => (
                            <button
                              key={key}
                              onClick={(event) => {
                                event.stopPropagation()
                                setReaction(index, key)
                              }}
                              className={`flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950/70 transition hover:-translate-y-1 hover:bg-emerald-900/80 ${
                                reaction === key ? 'ring-2 ring-rose/70' : ''
                              }`}
                            >
                              <span className="text-lg" role="img" aria-label={key}>
                                {label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <AnimatePresence>
                {reaction && (
                  <motion.span
                    className="pointer-events-none absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose/60 text-xl text-cream shadow-lg backdrop-blur"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: [0, -8, 8, 0] }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    {reactionBadgeMap[reaction]}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(6).keys()].map((idx) => (
          <motion.span
            key={idx}
            className="absolute h-20 w-20 rounded-full border border-rose/30"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 70}%`,
            }}
            animate={{ scale: [0.4, 1.2, 0.4], opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 10 + Math.random() * 6, repeat: Infinity }}
          />
        ))}
      </div>
    </section>
  )
}
