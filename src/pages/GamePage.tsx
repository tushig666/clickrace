import React, { useEffect, useRef, useState } from "react";
import { Page } from "../App";
import io from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents, StartEvent, ScoreUpdate, FinalResults } from "../../../shared/types";
import Countdown from "../components/Countdown";
import TimerBar from "../components/TimerBar";
import GameCanvas from "../components/GameCanvas";
import Leaderboard from "../components/Leaderboard";

interface Props {
  setPage: (page: Page) => void;
  username: string;
  roomId: string;
  setScore: (score: number) => void;
  setStandings: (standings: any[]) => void;
}

const socket: SocketIOClient.Socket = io("http://localhost:4000");

const GamePage: React.FC<Props> = ({ setPage, username, roomId, setScore, setStandings }) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [timer, setTimer] = useState<number>(5);
  const [score, updateScore] = useState<number>(0);
  const scoreRef = useRef(0);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [playing, setPlaying] = useState(false);
  const [countdownActive, setCountdownActive] = useState<boolean>(true);

  useEffect(() => {
    socket.on("start", (data: StartEvent) => {
      setCountdown(0);
      setPlaying(true);
      setTimer(data.duration / 1000);
    });
    socket.on("scoreUpdate", (data: ScoreUpdate) => {
      updateScore(data.score);
    });
    socket.on("finalResults", (data: FinalResults) => {
      setStandings(data.standings);
      setScore(score);
      setPage("results");
    });
    return () => {
      socket.off("start");
      socket.off("scoreUpdate");
      socket.off("finalResults");
    };
  }, [score, setPage, setScore, setStandings]);

  // Singleplayer fallback: 3→2→1 countdown, then start game
  useEffect(() => {
    if (!roomId) {
      setCountdown(3);
      setCountdownActive(true);
      let cd = 3;
      const cdInterval = setInterval(() => {
        cd--;
        setCountdown(cd);
        if (cd === 0) {
          clearInterval(cdInterval);
          setCountdownActive(false);
          setPlaying(true);
        }
      }, 1000);
      return () => clearInterval(cdInterval);
    }
  }, [roomId]);

  // End game after 5s and update score reliably
  useEffect(() => {
    if (!playing || roomId) return;
    const timeout = setTimeout(() => {
      setPlaying(false);
      setScore(scoreRef.current); // always use latest score
      setPage("results");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [playing, roomId, setPage, setScore]);

  useEffect(() => {
    if (!playing) return;
    setTimer(5);
    const interval = setInterval(() => {
      setTimer(t => t > 0 ? t - 0.1 : 0);
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <TimerBar timer={timer} />
      {countdownActive && <Countdown countdown={countdown} />}
      <GameCanvas playing={playing} onInput={(type) => {
        updateScore(s => {
          const newScore = s + (type === "click" ? 1 : 2);
          scoreRef.current = newScore;
          return newScore;
        });
        if (roomId) socket.emit("input", { type, clientTs: Date.now() });
      }} />
      {roomId && <Leaderboard leaderboard={leaderboard} />}
      <div className="mt-4 text-lg">Score: <span className="font-bold text-neonCyan">{score}</span></div>
    </div>
  );
};

export default GamePage;
