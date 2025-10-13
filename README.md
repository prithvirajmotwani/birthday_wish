# Forever Birthday Card 💚

An intimate, animated one-page web experience crafted as a digital love letter for your fiancée. Every section unfolds inside a centered card with soft glows, romantic typography, gentle transitions, and interactive surprises—from the countdown confetti moment all the way to a hidden “stargarden” gallery.

## ✨ Highlights

- **Immersive countdown reveal** with floating hearts & balloons, celebration chime, and dual-layer confetti.
- **Romantic audio soundscape** that starts after the countdown finishes (no external files required).
- **Eighteen love-letter cards** that flip open like envelopes, each with reactions and blooming flourishes.
- **Lightbox photo timeline**, “Reasons I Love You” carousel, dreamy future scene, and a playful hidden-heart mini-game.
- **Cursor sparkles, flower petal particles, parallax glows,** and cuddly transitions optimized for desktop and mobile.
- **Downloadable PDF love letter** plus an optional `/secret-garden` gallery stub ready for your private memories.

## 🚀 Getting Started

```powershell
npm install
npm run dev
```

The dev build uses a 20-second countdown so you can preview transitions quickly. Production builds automatically count down to **October 14th** (adjustable).

### Production build

```powershell
npm run build
npm run preview
```

## 🛠️ Personalize It

| What | Where | Notes |
| --- | --- | --- |
| Target date | `src/App.tsx` (`targetDate` constant) | Update the month/day to match the real celebration. |
| Love messages | `src/data/messages.ts` | Edit or expand the `loveMessages`, `galleryMoments`, `reasonsILoveYou`, and `hiddenHeartCompliments` arrays. |
| Gallery art | `public/images/*.svg` | Replace the SVG placeholders with your own photos (keep filenames or update the data objects). |
| Hidden gallery | `public/secret-garden/` | Swap the stub page for a private gallery, add password logic, etc. |
| Color & fonts | `tailwind.config.js` + `src/index.css` | Tweak the palette, shadows, and typography in one place. |

### Background music
The romantic instrumental is generated on the fly with the Web Audio API. If you prefer an actual track, drop an MP3 into `public/audio/romantic.mp3` and replace the `useRomanticSoundscape` hook with a regular `<audio>` element.

## 🧱 Project Structure

```
src/
 ├─ components/          # Cards, gallery, carousel, particles, etc.
 ├─ data/messages.ts     # Love notes, reasons, compliments, gallery metadata
 ├─ hooks/               # Audio soundscape + utility hooks
 ├─ utils/sounds.ts      # Confetti celebration chime
 ├─ App.tsx              # Stage orchestrator + transitions
 └─ index.css            # Tailwind base, fonts, global styling
public/
 ├─ images/              # Romantic SVG illustrations (replace with photos)
 ├─ love-letter.pdf      # Download link in the final card
 └─ secret-garden/       # Hidden gallery stub page
```

## ♿ Accessibility & Responsiveness

- Every interactive element is keyboard focusable with visible styling.
- Cards reflow to single-column layouts on small screens, reducing heights and spacing for thumb-friendly interactions.
- Animations favor subtle movements and respect reduced-motion environments (via browser settings).

## 📦 Tech Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for theming & responsive design
- [Framer Motion](https://www.framer.com/motion/) for animations and transitions
- [react-countdown](https://github.com/ndresx/react-countdown) for the timer
- [@tsparticles/react](https://particles.js.org/) for heart & petal particles
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) + `react-confetti` for the celebratory moment

## 💡 Ideas for Extra Magic

- Swap the mini-game for a “How well do you know us?” quiz.
- Animate custom illustrations in `FutureSection` or add sound design to the hearts.
- Wire `/secret-garden` to a password prompt or private photo feed.

Enjoy gifting this little cinematic love letter! 💚
