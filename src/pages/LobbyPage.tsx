import React, { useEffect, useState } from "react";
import { Page } from "../App";
import io from "socket.io-client";
import { RoomState, ServerToClientEvents, ClientToServerEvents } from "../../../shared/types";

interface Props {
  setPage: (page: Page) => void;
  username: string;
  roomId: string;
}

const socket: SocketIOClient.Socket = io("http://localhost:4000");

const LobbyPage: React.FC<Props> = ({ setPage, username, roomId }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("waiting");
  const [countdownTs, setCountdownTs] = useState<number | undefined>(undefined);

  useEffect(() => {
    socket.emit("joinRoom", { roomId, username });
    socket.on("roomState", (data: RoomState) => {
      setPlayers(data.players.map(p => p.username));
      setStatus(data.status);
      setCountdownTs(data.countdownTs);
    });
    return () => {
      socket.off("roomState");
    };
  }, [roomId, username]);

  useEffect(() => {
    if (status === "countdown") {
      setTimeout(() => {
        socket.emit("ready");
      }, 500);
    }
    if (status === "playing") {
      setPage("game");
    }
  }, [status, setPage]);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-white/10 backdrop-blur-glass shadow-glass w-full max-w-sm">
      <h2 className="text-xl font-bold mb-2">Room: <span className="bg-gradient-to-r from-neonPurple to-neonCyan bg-clip-text text-transparent">{roomId}</span></h2>
      <div className="w-full">
        <div className="mb-2 text-lg">Players:</div>
        <ul className="space-y-2">
          {players.map((p, i) => (
            <li key={i} className="px-4 py-2 rounded bg-navy/80 text-white shadow-glass">{p}</li>
          ))}
        </ul>
      </div>
      <button
        className="w-full py-3 rounded-lg bg-gradient-neon text-white font-bold shadow-neon transition-transform hover:scale-105"
        onClick={() => socket.emit("ready")}
        disabled={status !== "waiting"}
      >
        Ready
      </button>
      {status === "countdown" && <div className="text-2xl animate-pulse">Countdown...</div>}
    </div>
  );
};

export default LobbyPage;
