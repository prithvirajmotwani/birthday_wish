import { motion } from 'framer-motion'
import type { Stage } from '../types'

type NavigableStage = Exclude<Stage, 'countdown'>

const stageLabels: Record<NavigableStage, string> = {
  wish: 'Wish',
  letters: 'Love Notes',
  gallery: 'Memories',
  carousel: 'Reasons',
  future: 'Future',
  game: 'Game',
  final: 'Forever',
}

type StageProgressProps = {
  currentStage: Stage
  onNavigate: (stage: Stage) => void
}

export const StageProgress = ({ currentStage, onNavigate }: StageProgressProps) => {
  const stages = Object.keys(stageLabels) as NavigableStage[]
  const currentIndex = stages.indexOf(currentStage as NavigableStage)
  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  return (
    <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-y-3 text-[0.55rem] uppercase tracking-[0.25em] text-cream/60 sm:text-xs sm:tracking-[0.3em]">
        {stages.map((stage, idx) => {
          const reached = idx <= safeIndex
          return (
            <button
              key={stage}
              onClick={() => onNavigate(stage)}
              className={`flex flex-col items-center gap-2 transition ${
                reached ? 'text-gold' : 'text-emerald-400/60'
              }`}
            >
              <span>{stageLabels[stage]}</span>
              <motion.span
                className={`h-2.5 w-2.5 rounded-full ${reached ? 'bg-rose' : 'bg-emerald-700/60'}`}
                animate={{ scale: reached ? 1.4 : 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </button>
          )
        })}
      </div>
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-900/60">
        <motion.div
          className="h-full bg-gradient-to-r from-rose via-gold to-cream"
          initial={false}
          animate={{ width: `${((safeIndex + 1) / stages.length) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
