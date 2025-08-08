module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0a1020",
        neonPurple: "#c183ffff",
        neonCyan: "#4cc0f6ff"
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(90deg, #8d1cffff 0%, #3ae2ffff 100%)'
      },
      boxShadow: {
        glass: "0 4px 32px 0 rgba(0,0,0,0.25)",
        neon: "0 0 8px 2px #a855f7, 0 0 16px 4px #06b6d4"
      },
      blur: {
        glass: "8px"
      }
    }
  },
  plugins: []
};
