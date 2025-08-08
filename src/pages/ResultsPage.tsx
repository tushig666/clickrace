import React from "react";
import { Page } from "../App";
import ResultCard from "../components/ResultCard";
import Leaderboard from "../components/Leaderboard";

interface Props {
  setPage: (page: Page) => void;
  score: number;
  standings: any[];
}

const ResultsPage: React.FC<Props> = ({ setPage, score, standings }) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <ResultCard score={score} />
      {standings.length > 0 && <Leaderboard leaderboard={standings} />}
      <button
        className="pixel-font mt-6 py-3 px-6 rounded border-4 border-neonCyan bg-gradient-neon text-white font-bold shadow-neon transition-transform hover:scale-105"
        onClick={() => setPage("home")}
      >
        <span className="pixel-font">Play Again</span>
      </button>
    </div>
  );
};

export default ResultsPage;
