import { useEffect, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export const ParticlesBackground = () => {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    })
  }, [])

  if (prefersReducedMotion) {
    return null
  }

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      particles: {
        number: { value: 25, density: { enable: true, area: 800 } },
        color: { value: ['#ff6f91', '#b8860b', '#f5e6cc'] },
        shape: {
          type: ['heart', 'character'],
          character: {
            value: ['❀', '✿', '❁', '♡'],
            font: 'Poppins',
            style: '',
            weight: '400',
          },
        },
        opacity: {
          value: { min: 0.1, max: 0.6 },
          animation: { enable: true, speed: 0.6, sync: false },
        },
        size: {
          value: { min: 12, max: 26 },
          animation: { enable: true, speed: 4, minimumValue: 6 },
        },
        move: {
          enable: true,
          speed: { min: 0.4, max: 1.6 },
          direction: 'top',
          outModes: 'out',
        },
        wobble: {
          enable: true,
          distance: 8,
          speed: 4,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 60, duration: 0.4 },
        },
      },
      detectRetina: true,
    }),
    []
  )

  return (
    <Particles id="heart-particles" className="pointer-events-none fixed inset-0 -z-10" options={options as any} />
  )
}
