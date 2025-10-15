import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Confetti from 'react-confetti'
import { CountdownCard } from './components/CountdownCard'
import { BirthdayWishCard } from './components/BirthdayWishCard'
import { LoveLetterCards } from './components/LoveLetterCards'
import { PhotoGallery } from './components/PhotoGallery'
import { VideoSection } from './components/VideoSection'
import { FinalMessage } from './components/FinalMessage'
import { ParticlesBackground } from './components/ParticlesBackground'
import { CursorSparkles } from './components/CursorSparkles'
import { StageProgress } from './components/StageProgress'
import { useWindowSize } from './hooks/useWindowSize'
import type { Stage } from './types'

const stageOrder: Stage[] = ['countdown', 'wish', 'letters', 'gallery', 'video', 'final']

const App = () => {
  const { width, height } = useWindowSize()
  const [stage, setStage] = useState<Stage>('countdown')
  const [showConfetti, setShowConfetti] = useState(false)
  const isCountdownStage = stage === 'countdown'

  const targetDate = useMemo(() => {
  const now = new Date()
  // const targetMonth = 9 // October (zero-indexed)
  // const targetDay = 16

  // Previous countdown presets retained for reference:
  // const twentyFourHours = 24 * 60 * 60 * 1000
  // return new Date(now.getTime() + twentyFourHours)

    const eighteenSeconds = 4   * 1000
    return new Date(now.getTime() + eighteenSeconds)

    // const parseOffsetMinutes = (label?: string | null) => {
    //   if (!label) return null
    //   const explicitMatch = label.match(/([+-]\d{1,2})(?::(\d{2}))?/)
    //   if (explicitMatch) {
    //     const sign = explicitMatch[1].startsWith('-') ? -1 : 1
    //     const hours = Math.abs(parseInt(explicitMatch[1], 10))
    //     const minutes = explicitMatch[2] ? parseInt(explicitMatch[2], 10) : 0
    //     return sign * (hours * 60 + minutes)
    //   }

    //   const normalized = label.toUpperCase()
    //   if (normalized === 'BST') return 60
    //   if (normalized === 'GMT' || normalized === 'UTC') return 0

    //   return null
    // }

    // const getLondonOffsetMinutes = (year: number) => {
    //   const baseUtc = new Date(Date.UTC(year, targetMonth, targetDay, 0, 0, 0))
    //   const formatterOptions = ['shortOffset', 'longOffset', 'short', 'long'] as const

    //   for (const option of formatterOptions) {
    //     try {
    //       const formatter = new Intl.DateTimeFormat('en-US', {
    //         timeZone: 'Europe/London',
    //         timeZoneName: option,
    //       })
    //       const label = formatter.formatToParts(baseUtc).find((part) => part.type === 'timeZoneName')?.value
    //       const offsetMinutes = parseOffsetMinutes(label)
    //       if (offsetMinutes !== null) {
    //         return offsetMinutes
    //       }
    //     } catch {
    //       // Some environments might not support every timeZoneName option; try the next one.
    //       continue
    //     }
    //   }

    //   // Fallback: London is either GMT or GMT+1 depending on daylight savings. Mid-October falls under BST (GMT+1).
    //   return 60
    // }

    // const createTarget = (year: number) => {
    //   const londonOffsetMinutes = getLondonOffsetMinutes(year)
    //   const utcMillis = Date.UTC(year, targetMonth, targetDay, 0, 0, 0) - londonOffsetMinutes * 60 * 1000
    //   return new Date(utcMillis)
    // }

    // const currentYear = now.getFullYear()
    // const candidateForThisYear = createTarget(currentYear)

    // return candidateForThisYear.getTime() >= now.getTime()
    //   ? candidateForThisYear
    //   : createTarget(currentYear + 1)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [stage])

  const goToStage = useCallback((nextStage: Stage) => {
    setStage(nextStage)
  }, [])

  const handleCountdownComplete = useCallback(() => {
  setShowConfetti(true)
    goToStage('wish')
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ff6f91', '#f5e6cc', '#b8860b', '#014034'],
    })
    setTimeout(() => setShowConfetti(false), 6000)
  }, [goToStage])

  const goToNextStage = useCallback(() => {
    const currentIndex = stageOrder.indexOf(stage)
    const nextIndex = Math.min(currentIndex + 1, stageOrder.length - 1)
    setStage(stageOrder[nextIndex])
  }, [stage])

  const renderStage = () => {
    switch (stage) {
      case 'countdown':
        return (
          <CountdownCard targetDate={targetDate} onComplete={handleCountdownComplete} isActive={stage === 'countdown'} />
        )
      case 'wish':
        return (
          <BirthdayWishCard
            isVisible={stage === 'wish'}
            onProceed={() => {
              goToNextStage()
            }}
          />
        )
      case 'letters':
        return (
          <SectionShell onContinue={goToNextStage} cta="Next surprise">
            <LoveLetterCards />
          </SectionShell>
        )
      case 'gallery':
        return (
          <SectionShell onContinue={goToNextStage} cta="Keep wandering">
            <PhotoGallery />
          </SectionShell>
        )
      case 'video':
        return (
          <SectionShell onContinue={goToNextStage} cta="Final love note">
            <VideoSection />
          </SectionShell>
        )
      case 'final':
        return <FinalMessage />
      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden pb-24">
      <ParticlesBackground />
      <CursorSparkles />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(255,111,145,0.15),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(184,134,11,0.18),transparent_55%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 py-12 sm:px-6 lg:px-10">
        {!isCountdownStage && (
          <>
            <motion.header
              className="w-full text-center"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-5xl text-cream drop-shadow-lg md:text-6xl">
                A Birthday Symphony for My Love 
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-base text-cream/80">
                Crafted with petals, pixels, and all the ways you keep my heart dancing.
              </p>
            </motion.header>
            <StageProgress currentStage={stage} onNavigate={goToStage} />
          </>
        )}
        <div
          className={`w-full ${
            isCountdownStage ? 'flex flex-1 items-center justify-center' : 'mt-12'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="will-change-transform"
            >
              {renderStage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {showConfetti && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Confetti width={width} height={height} numberOfPieces={400} recycle={false} gravity={0.3} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type SectionShellProps = {
  children: ReactNode
  onContinue: () => void
  cta: string
}

const SectionShell = ({ children, onContinue, cta }: SectionShellProps) => (
  <motion.div className="flex flex-col items-center gap-10">
    {children}
    <button
      onClick={onContinue}
      className="rounded-full border border-gold/40 bg-gold/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-gold shadow-glow transition hover:bg-gold/20"
    >
      {cta}
    </button>
  </motion.div>
)

export default App
