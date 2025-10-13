import { useCallback, useRef } from 'react'

type SynthContext = {
  audioCtx: AudioContext
  gain: GainNode
  oscillators: OscillatorNode[]
}

export const useRomanticSoundscape = () => {
  const synthRef = useRef<SynthContext | null>(null)

  const start = useCallback(async () => {
    if (typeof window === 'undefined') return

    if (!synthRef.current) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const gain = audioCtx.createGain()
      gain.gain.value = 0.08
      gain.connect(audioCtx.destination)

      const frequencies = [261.63, 329.63, 392.0, 523.25]
      const oscillators = frequencies.map((freq, index) => {
        const osc = audioCtx.createOscillator()
        osc.type = index % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.value = freq

        const oscGain = audioCtx.createGain()
        oscGain.gain.value = 0.25 - index * 0.05
        osc.connect(oscGain)
        oscGain.connect(gain)
        osc.start()
        return osc
      })

      const lfo = audioCtx.createOscillator()
      lfo.frequency.value = 0.08
      const lfoGain = audioCtx.createGain()
      lfoGain.gain.value = 0.02
      lfo.connect(lfoGain)
      lfoGain.connect(gain.gain)
      lfo.start()

      synthRef.current = { audioCtx, gain, oscillators: [...oscillators, lfo] }
    }

    await synthRef.current?.audioCtx.resume()
  }, [])

  const stop = useCallback(() => {
    if (!synthRef.current) return
    synthRef.current.oscillators.forEach((osc) => {
      try {
        osc.stop()
      } catch (error) {
        // oscillator may already be stopped – ignore
      }
    })
    synthRef.current.audioCtx.close()
    synthRef.current = null
  }, [])

  return { start, stop }
}
