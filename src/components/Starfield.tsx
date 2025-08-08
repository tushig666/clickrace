import React, { useRef, useEffect } from "react";

const STAR_COUNT = 220;
const BASE_STAR_SPEED = 0.22;
const STAR_SIZE = [1, 2, 3, 4];
const STAR_COLORS = ["#a855f7", "#06b6d4", "#00ffe7"]; // Only vibrant neon colors

const METEOR_CHANCE = 0.04; // Much more frequent
const METEOR_LENGTH = 80;
const METEOR_COLORS = ["#a855f7", "#06b6d4", "#00ffe7", "#ff00cc"]; // Vibrant meteors

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const width = 640;
  const height = 480;
  // Gunshot audio ref
  const gunshotRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Initialize stars
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(-width / 2, width / 2),
      y: randomBetween(-height / 2, height / 2),
      z: randomBetween(0, width / 2),
      size: STAR_SIZE[Math.floor(Math.random() * STAR_SIZE.length)],
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
    }));

    let animationFrame: number;
    const ctx = canvasRef.current?.getContext("2d");

    function playGunshot() {
      if (gunshotRef.current) {
        gunshotRef.current.currentTime = 0;
        gunshotRef.current.play();
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      for (let star of stars.current) {
        // Move star towards viewer
        // Closer stars move faster, distant stars move slower for parallax
        const speed = BASE_STAR_SPEED * (1.2 + (1 - star.z / (width / 2)) * 2.5);
        star.z -= speed * (star.size);
        if (star.z < 1) {
          // Reset star to far distance
          star.x = randomBetween(-width / 2, width / 2);
          star.y = randomBetween(-height / 2, height / 2);
          star.z = width / 2;
          star.size = STAR_SIZE[Math.floor(Math.random() * STAR_SIZE.length)];
          star.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        }
        // Perspective projection
        const k = 128 / star.z;
        const sx = star.x * k;
        const sy = star.y * k;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.85 + 0.15 * (star.size / 4);
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 12 * star.size;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // Meteor streaks (soliriin boroo)
      let meteorDrawn = false;
      if (Math.random() < METEOR_CHANCE) {
        for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) { // Multiple meteors per frame
          const angle = randomBetween(-Math.PI / 4, Math.PI / 4);
          const startX = randomBetween(-width / 2, width / 2);
          const startY = randomBetween(-height / 2, height / 2);
          const color = METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)];
          ctx.save();
          ctx.translate(width / 2, height / 2);
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + Math.cos(angle) * METEOR_LENGTH, startY + Math.sin(angle) * METEOR_LENGTH);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2.5 + Math.random() * 2;
          ctx.shadowColor = color;
          ctx.shadowBlur = 32;
          ctx.globalAlpha = 0.85;
          ctx.stroke();
          ctx.restore();
          meteorDrawn = true;
        }
      }
      if (meteorDrawn) {
        playGunshot();
      }
      ctx.restore();
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-navy to-black"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default Starfield;
