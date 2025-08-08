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
        src="/background-music.mp3"
        autoPlay
        loop
        preload="auto"
        style={{ display: "none" }}
        id="bg-music"
      />
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
