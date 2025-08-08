import React from "react";

interface Props {
  leaderboard: { username: string; score: number }[];
}

const Leaderboard: React.FC<Props> = ({ leaderboard }) => {
  return (
    <div className="w-full mt-4 rounded-xl bg-white/10 backdrop-blur-glass shadow-glass p-4">
      <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-neonPurple to-neonCyan bg-clip-text text-transparent">Leaderboard</h3>
      <ul>
        {leaderboard.map((p, i) => (
          <li key={i} className="flex justify-between items-center py-2 px-4 rounded-lg bg-navy/80 text-white mb-2 shadow-glass animate-glow">
            <span>{p.username}</span>
            <span className="font-bold text-neonCyan">{p.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
