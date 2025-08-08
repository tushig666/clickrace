# Click Race

A modern, visually appealing, and minimal click speed game with a retro pixel/arcade style, vibrant neon effects, and continuous background music.

## Features
- Pixel/arcade UI with Minecraft-style font
- Animated space/starfield background with vibrant meteors
- Gunshot sound effect on every click
- Continuous background music (autoplay, with Play Music button if blocked)
- Responsive for desktop and mobile
- English-only UI

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Install & Run
```bash
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) or the port shown in your terminal.

### Build for Production
```bash
npm run build
```

## Project Structure
- `src/` — React components and pages
- `public/` — Static assets (fonts, mp3 files)
- `App.tsx` — Main app logic and background music
- `GameCanvas.tsx` — Game area and click logic
- `Starfield.tsx` — Animated background

## Sound & Music
- Place your `gunshot.mp3` and `background-music.mp3` in the `public/` folder.
- If music does not start automatically, click the Play Music button (𓁿) near the top.

## License
MIT

---
Made with ❤️ by tushig666
