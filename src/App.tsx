import React, { useState } from "react";

import "../public/minecraft-font.css";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import ResultsPage from "./pages/ResultsPage";
import Starfield from "./components/Starfield";

export type Page = "home" | "lobby" | "game" | "results";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("home");
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [score, setScore] = useState(0);
  const [standings, setStandings] = useState<any[]>([]);
  const [pendingResults, setPendingResults] = useState(false);
  const [musicBlocked, setMusicBlocked] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  // Only English UI

  // When score updates and pendingResults is true, go to results page
  React.useEffect(() => {
    if (pendingResults) {
      setPage("results");
      setPendingResults(false);
    }
  }, [score, pendingResults]);

  // Page navigation and state passing
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pixel-font relative overflow-hidden">
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        autoPlay
        loop
        preload="auto"
        style={{ display: "none" }}
        id="bg-music"
        onPlay={() => setMusicBlocked(false)}
        onError={() => setMusicBlocked(true)}
      />
      {musicBlocked && (
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.play().then(() => setMusicBlocked(false)).catch(() => setMusicBlocked(true));
            }
          }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 text-lg pixel-font bg-gradient-to-br from-neonPurple via-neonCyan to-white text-black shadow-[0_0_32px_8px_#06b6d4,0_0_64px_16px_#a855f7] border-4 border-neonCyan rounded-xl hover:scale-105 hover:shadow-[0_0_64px_16px_#06b6d4,0_0_128px_32px_#a855f7] transition-all duration-150"
        >
          ▶ Play Music
        </button>
      )}
      <Starfield />
      {/* Language switcher removed, only English supported */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {page === "home" && <HomePage setPage={setPage} setUsername={setUsername} setRoomId={setRoomId} />}
        {page === "lobby" && <LobbyPage setPage={setPage} username={username} roomId={roomId} />}
        {page === "game" && <GamePage setPage={(p) => {
          if (p === "results") {
            setPendingResults(true);
          } else {
            setPage(p);
          }
        }} username={username} roomId={roomId} setScore={setScore} setStandings={setStandings} />}
        {page === "results" && <ResultsPage setPage={setPage} score={score} standings={standings} />}
      </div>
    </div>
  );
};

export default App;
