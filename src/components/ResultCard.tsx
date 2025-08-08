import React from "react";

interface Props {
  score: number;
}

const ResultCard: React.FC<Props> = ({ score }) => {
  return (
    <div className="pixel-font w-full rounded-xl bg-white/10 backdrop-blur-glass shadow-glass p-6 flex flex-col items-center border-4 border-neonCyan">
      <div className="pixel-font text-2xl font-bold mb-2 bg-gradient-to-r from-neonPurple to-neonCyan bg-clip-text text-transparent">Your Score</div>
      <div className="pixel-font text-5xl font-bold text-neonCyan mb-2 border-4 border-neonPurple rounded-md p-2">{score}</div>
    </div>
  );
};

export default ResultCard;
