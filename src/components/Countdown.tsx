import React, { useEffect, useState } from "react";

interface Props {
  countdown: number;
}

const Countdown: React.FC<Props> = ({ countdown }) => {
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    setAnim(true);
    const timeout = setTimeout(() => setAnim(false), 700);
    return () => clearTimeout(timeout);
  }, [countdown]);

  if (countdown <= 0) return null;

  return (
    <div
      className={`pixel-font text-6xl font-bold text-white mb-4 transition-all duration-500 ${anim ? "scale-125 opacity-100" : "scale-100 opacity-80"}`}
      style={{
        textShadow: "0 0 16px #a855f7, 0 0 32px #06b6d4",
        filter: "drop-shadow(0 0 8px #06b6d4)"
      }}
    >
      {countdown}
    </div>
  );
};

export default Countdown;
