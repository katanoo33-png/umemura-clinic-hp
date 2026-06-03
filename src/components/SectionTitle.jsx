export function SectionTitle({ T, sub, main }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 44 }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: 14,
        letterSpacing: 5, color: T.accent, marginBottom: 8, textTransform: "uppercase",
      }}>{sub}</p>
      <h2 style={{
        fontFamily: "'Noto Serif JP', serif",
        fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 400,
        color: T.text, letterSpacing: 2,
      }}>{main}</h2>
      <div style={{
        width: 44, height: 1, margin: "14px auto 0",
        background: `linear-gradient(90deg, transparent, ${T.accent}80, transparent)`,
      }} />
    </div>
  );
}
