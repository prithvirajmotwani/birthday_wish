export const playCelebrationChime = () => {
  if (typeof window === 'undefined') return
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const frequencies = [880, 1174, 1568]
  const now = ctx.currentTime

  frequencies.forEach((frequency, index) => {
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'triangle'
    oscillator.frequency.value = frequency
    gain.gain.value = 0.3
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start(now + index * 0.09)
    gain.gain.setValueAtTime(0.3, now + index * 0.09)
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.09 + 0.4)
    oscillator.stop(now + index * 0.09 + 0.5)
  })

  setTimeout(() => ctx.close(), 800)
}
