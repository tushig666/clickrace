import React, { useRef, useState } from "react";

interface Props {
  playing: boolean;
  onInput: (type: "click" | "swipe") => void;
}

const gunshotUrl = "/gunshot.mp3";
const GameCanvas: React.FC<Props> = ({ playing, onInput }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [flash, setFlash] = useState(false);
  let startX = 0, startY = 0, startTime = 0;

  // Handle click
  const handleClick = (e: React.MouseEvent) => {
    if (!playing) return;
    onInput("click");
    setFlash(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      // Try to play, fallback if blocked
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback: force play after user gesture
          setTimeout(() => {
            audioRef.current && audioRef.current.play();
          }, 100);
        });
      }
    }
    setTimeout(() => setFlash(false), 120);
  };

  // Handle swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!playing) return;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!playing) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dt = Date.now() - startTime;
    if (dist > 60 && dt < 500) {
      onInput("swipe");
      // TODO: trigger particle burst animation
    } else {
      onInput("click");
      // TODO: trigger click pop animation
    }
  };

  return (
    <div className="w-full flex justify-center">
      <audio ref={audioRef} src={gunshotUrl} preload="auto" id="gunshot-sfx" />
      {/* Background music moved to App.tsx */}
      <canvas
        ref={canvasRef}
        width={320}
        height={320}
        className={`rounded-xl bg-navy shadow-neon cursor-pointer touch-none transition-all duration-150 pixel-font border-4 border-neonCyan ${flash ? "ring-8 ring-neonCyan ring-opacity-100 shadow-[0_0_64px_16px_#06b6d4,0_0_128px_32px_#a855f7] bg-gradient-to-br from-neonPurple via-neonCyan to-white" : ""}`}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default GameCanvas;
