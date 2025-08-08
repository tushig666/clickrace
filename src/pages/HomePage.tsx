import React, { useState } from "react";
import { Page } from "../App";

interface Props {
  setPage: (page: Page) => void;
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
// ...existing code...
}

const HomePage: React.FC<Props> = ({ setPage, setUsername, setRoomId }) => {
  const [username, updateUsername] = useState("");
  const [roomId, updateRoomId] = useState("");

  // Only English UI
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-white/10 backdrop-blur-glass shadow-glass w-full max-w-sm">
      <h1
        className="pixel-font text-5xl font-bold bg-gradient-to-r from-neonPurple via-neonCyan to-white bg-clip-text text-transparent mb-4 px-4 py-2 animate-gradient-x"
        style={{
          textShadow: "4px 4px 0 #222, 0 0 16px #a855f7, 0 0 32px #06b6d4, 0 0 8px #fff",
          filter: "drop-shadow(0 0 8px #a855f7) drop-shadow(0 0 16px #06b6d4)",
          border: "none"
        }}
      >
        Click Race
      </h1>
      <input
        className="pixel-font w-full p-3 rounded border-4 border-neonPurple focus:border-neonCyan bg-navy text-white placeholder-gray-400 outline-none shadow-[0_0_8px_#a855f7]"
        placeholder="Enter username"
        value={username}
        onChange={e => updateUsername(e.target.value)}
        maxLength={16}
      />
      <input
        className="pixel-font w-full p-3 rounded border-4 border-neonPurple focus:border-neonCyan bg-navy text-white placeholder-gray-400 outline-none shadow-[0_0_8px_#a855f7]"
        placeholder="Room ID (for multiplayer)"
        value={roomId}
        onChange={e => updateRoomId(e.target.value)}
        maxLength={8}
      />
      <div className="flex gap-4 w-full">
        <button
          className="pixel-font flex-1 py-3 rounded border-4 border-neonCyan bg-gradient-neon text-white font-bold shadow-neon transition-transform hover:scale-105"
          onClick={() => {
            setUsername(username || "Player");
            setPage("game");
          }}
        >
          Singleplayer
        </button>
        <button
          className="pixel-font flex-1 py-3 rounded border-4 border-neonPurple bg-gradient-neon text-white font-bold shadow-neon transition-transform hover:scale-105"
          onClick={() => {
            setUsername(username || "Player");
            setRoomId(roomId || Math.random().toString(36).slice(2, 8));
            setPage("lobby");
          }}
        >
          Multiplayer
        </button>
      </div>
    </div>
  );
};

export default HomePage;
