export function LogoMark({ size = 40, color = "#7a7a7a" }) {
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} fill="none">
      <path
        d="M50 8C30 8 12 22 12 44c0 14 6 26 16 44 4 7 10 12 14 12s6-8 8-18c2 10 4 18 8 18s10-5 14-12c10-18 16-30 16-44C88 22 70 8 50 8z"
        stroke={color} strokeWidth="2.5" fill="none" opacity=".65"
      />
      <path
        d="M36 32c0 0 0 28 14 36 14-8 14-36 14-36"
        stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"
      />
      <path
        d="M30 28c8-8 32-8 40 0"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".45"
      />
      <circle cx="72" cy="36" r="2.5" fill={color} opacity=".55" />
    </svg>
  );
}

export function LogoFull({ size = 32, color = "#7a7a7a", textColor = "#3a3a3a" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <LogoMark size={size} color={color} />
      <div style={{
        fontFamily: "'Noto Serif JP', serif",
        fontSize: size * 0.44,
        fontWeight: 500,
        color: textColor,
        letterSpacing: 1,
      }}>
        うめむら半蔵門内科歯科
      </div>
    </div>
  );
}
