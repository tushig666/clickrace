import React from "react";

interface Props {
  timer: number;
}

const TimerBar: React.FC<Props> = ({ timer }) => {
  const percent = Math.max(0, Math.min(100, (timer / 5) * 100));
  return (
    <div className="w-full h-3 bg-navy rounded-full overflow-hidden mb-4">
      <div
        className="h-full bg-gradient-to-r from-neonPurple to-neonCyan transition-all duration-100"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default TimerBar;
