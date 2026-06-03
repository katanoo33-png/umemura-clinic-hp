import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  { id: "hero", label: "トップ" },
  { id: "about", label: "当院について" },
  { id: "gallery", label: "院内紹介" },
  { id: "outpatient", label: "外来診療" },
  { id: "online", label: "オンライン診療" },
  { id: "visit", label: "訪問診療" },
  { id: "features", label: "当院の特徴" },
  { id: "flow", label: "診療の流れ" },
  { id: "cost", label: "費用" },
  { id: "staff", label: "医師紹介" },
  { id: "area", label: "対応エリア" },
  { id: "faq", label: "よくある質問" },
  { id: "contact", label: "お問い合わせ" },
];

/* ── Logo ── */
function LogoMark({ size = 40, color = "#7a7a7a" }) {
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} fill="none">
      <path d="M50 8 C30 8,12 22,12 44 C12 58,18 70,28 88 C32 95,38 100,42 100 C46 100,48 92,50 82 C52 92,54 100,58 100 C62 100,68 95,72 88 C82 70,88 58,88 44 C88 22,70 8,50 8Z" stroke={color} strokeWidth="2.5" fill="none" opacity=".65"/>
      <path d="M36 32 C36 32,36 60,50 68 C64 60,64 32,64 32" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M30 28 C38 20,62 20,70 28" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".45"/>
      <circle cx="72" cy="36" r="2.5" fill={color} opacity=".55"/>
    </svg>
  );
}
function LogoFull({ size = 32, color = "#7a7a7a", textColor = "#3a3a3a" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <LogoMark size={size} color={color} />
      <div style={{ fontFamily: "'Noto Serif JP',serif", fontSize: size * 0.44, fontWeight: 500, color: textColor, letterSpacing: 1 }}>うめむら半蔵門内科歯科</div>
    </div>
  );
}

/* ── Photo Carousel ── */
function PhotoCarousel() {
  const trackRef = useRef(null);
  const [images, setImages] = useState([
    { id: 1, src: null, label: "受付" },
    { id: 2, src: null, label: "診察室" },
    { id: 3, src: null, label: "待合スペース" },
    { id: 4, src: null, label: "歯科診療室" },
    { id: 5, src: null, label: "点滴ルーム" },
    { id: 6, src: null, label: "外観" },
  ]);

  const handleImageUpload = useCallback((id) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => prev.map(img => img.id === id ? { ...img, src: ev.target.result } : img));
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, []);

  const scroll = (dir) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => scroll(-1)} style={{
        position: "absolute", left: -18, top: "50%", transform: "translateY(-50%)", zIndex: 10,
        width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "1px solid #e0dbd4",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, color: "#8a8078", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}>‹</button>
      <button onClick={() => scroll(1)} style={{
        position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", zIndex: 10,
        width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "1px solid #e0dbd4",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, color: "#8a8078", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}>›</button>
      <div ref={trackRef} style={{
        display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory",
        padding: "8px 4px 16px", scrollbarWidth: "none", msOverflowStyle: "none",
      }}>
        <style>{`.photo-track::-webkit-scrollbar{display:none}`}</style>
        {images.map(img => (
          <div key={img.id} onClick={() => handleImageUpload(img.id)} style={{
            minWidth: 300, height: 220, borderRadius: 18, overflow: "hidden",
            scrollSnapAlign: "start", cursor: "pointer", position: "relative",
            background: img.src ? `url(${img.src}) center/cover` : "linear-gradient(135deg, #f0ede8, #e6e2dc)",
            border: img.src ? "none" : "2px dashed #d0c9c0",
            transition: "transform .3s, box-shadow .3s", flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            {!img.src && (
              <div style={{
                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: "rgba(138,128,120,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, color: "#b0a898",
                }}>＋</div>
                <span style={{ fontSize: 13, color: "#a09688", letterSpacing: 1 }}>クリックして写真を選択</span>
                <span style={{ fontSize: 15, color: "#8a8078", fontWeight: 500, letterSpacing: 1 }}>{img.label}</span>
              </div>
            )}
            {img.src && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.45))",
                padding: "24px 20px 14px",
              }}>
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 500, letterSpacing: 1 }}>{img.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FadeIn ── */
function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
    }}>{children}</div>
  );
}

function SectionTitle({ sub, main }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#a09688", marginBottom: 10 }}>{sub}</p>
      <h2 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: "clamp(24px,4.2vw,32px)", fontWeight: 400, color: "#333", lineHeight: 1.7, margin: 0, letterSpacing: 2 }}>{main}</h2>
      <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #c5bfb6, transparent)", margin: "18px auto 0" }} />
    </div>
  );
}

/* ══════ MAIN ══════ */
export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const faqs = [
    { q: "外来の予約方法を教えてください", a: "当院の外来は完全予約制です。お電話（03-6272-4156）またはメールにてご予約ください。初診の方もお気軽にお問い合わせください。" },
    { q: "オンライン診療はどのように受診しますか？", a: "スマートフォンやパソコンからビデオ通話で受診いただけます。事前にお電話またはメールでご予約のうえ、専用リンクをお送りします。処方箋はご指定の薬局にFAXいたします。" },
    { q: "内科と歯科を同日に受診できますか？", a: "はい、内科と歯科を併設しておりますので、同日にまとめて受診いただくことも可能です。ご予約時にお申し付けください。" },
    { q: "訪問診療はどのような方が対象ですか？", a: "通院が困難な方であれば、病名や要介護度を問わず対象です。ご高齢の方、お身体が不自由な方、退院後の在宅療養をご希望の方など、お気軽にご相談ください。" },
    { q: "自由診療の費用を教えてください", a: "美容皮膚科・ピル処方・男性外来・点滴療法は保険適用外です。施術内容により異なりますので、お電話またはご来院時にお尋ねください。" },
    { q: "訪問診療のエリアはどこまでですか？", a: "千代田区を中心に東京23区に対応。クリニックから半径16km圏内が法令上の訪問可能範囲です。詳細はお電話ください。" },
  ];

  const visitAreas = [
    { name: "千代田区", p: true }, { name: "中央区", p: true }, { name: "港区", p: true },
    { name: "新宿区", p: true }, { name: "文京区", p: true }, { name: "台東区", p: true },
    { name: "渋谷区", p: true }, { name: "豊島区", p: true },
    { name: "墨田区" }, { name: "江東区" }, { name: "品川区" }, { name: "目黒区" },
    { name: "大田区" }, { name: "世田谷区" }, { name: "中野区" }, { name: "杉並区" },
    { name: "北区" }, { name: "荒川区" }, { name: "板橋区" }, { name: "練馬区" },
    { name: "足立区" }, { name: "葛飾区" }, { name: "江戸川区" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Noto+Serif+JP:wght@200;300;400;500;600&family=Noto+Sans+JP:wght@200;300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'Noto Sans JP',sans-serif;color:#3a3a3a;background:#fefefe}
        ::selection{background:#e0d8cc;color:#333}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes breathe{0%,100%{opacity:.45}50%{opacity:.75}}
        @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-33.33%)}}
        @media(max-width:920px){.desktop-nav{display:none !important}.mobile-btn{display:flex !important}}
        @media(max-width:768px){.hero-grid{grid-template-columns:1fr !important;gap:36px !important;text-align:center}
          .hero-grid .hero-btns{justify-content:center}.hero-grid .hero-stats{justify-content:center}
          .two-col{grid-template-columns:1fr !important}}
        @media(max-width:500px){.cost-grid{grid-template-columns:1fr !important}.contact-grid{grid-template-columns:1fr !important}}
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr !important;gap:24px !important}}
      `}</style>

      {/* ━━ NAV ━━ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,194,184,0.25)" : "none",
        transition: "all .4s", padding: scrolled ? "10px 0" : "16px 0",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => scrollTo("hero")}><LogoFull size={28} color="#8a8078" textColor="#3a3a3a" /></div>
          <div style={{ display: "flex", gap: 22, alignItems: "center" }} className="desktop-nav">
            {SECTIONS.filter((_, i) => i > 0 && i < 10).map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                background: "none", border: "none", cursor: "pointer", fontFamily: "'Noto Sans JP',sans-serif",
                fontSize: 13, color: "#5a5a5a", fontWeight: 400, letterSpacing: .8, padding: "4px 0",
                borderBottom: "1.5px solid transparent", transition: "all .3s",
              }}
                onMouseEnter={e => { e.target.style.color = "#8a7a6a"; e.target.style.borderBottomColor = "#8a7a6a"; }}
                onMouseLeave={e => { e.target.style.color = "#5a5a5a"; e.target.style.borderBottomColor = "transparent"; }}
              >{s.label}</button>
            ))}
            <button onClick={() => scrollTo("contact")} style={{
              background: "linear-gradient(135deg, #9a8e7f, #7d7265)", color: "#fff", border: "none",
              borderRadius: 24, padding: "9px 22px", fontSize: 13, fontWeight: 500, cursor: "pointer",
              letterSpacing: 1, transition: "transform .2s", boxShadow: "0 4px 14px rgba(122,114,101,0.18)",
            }}
              onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >お問い合わせ</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-btn" style={{
            display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 1001,
            flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 22, height: 1.5, background: "#3a3a3a", transition: "all .3s", transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none" }} />
            <div style={{ width: 22, height: 1.5, background: "#3a3a3a", transition: "all .3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 1.5, background: "#3a3a3a", transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, animation: "fadeSlide .3s ease" }}>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{ background: "none", border: "none", fontFamily: "'Noto Serif JP',serif", fontSize: 19, color: "#333", cursor: "pointer", padding: "8px 16px", letterSpacing: 2 }}>{s.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ━━ HERO ━━ */}
      <section id="hero" style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        background: "linear-gradient(165deg, #ffffff 0%, #faf8f5 30%, #f5f2ed 60%, #faf8f5 100%)",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ position: "absolute", top: "6%", right: "5%", width: 380, height: 380, borderRadius: "50%", border: "1px solid rgba(200,194,184,0.12)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "3%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,170,155,0.06), transparent 70%)" }} />

        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "130px 24px 80px", width: "100%", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 56, alignItems: "center" }} className="hero-grid">
            <div>
              <FadeIn><div style={{ marginBottom: 24 }}><LogoMark size={60} color="#9a8e7f" /></div></FadeIn>
              <FadeIn delay={.1}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, letterSpacing: 5, color: "#a09688", marginBottom: 18 }}>
                  Internal Medicine · Dentistry · Online · Aesthetic
                </p>
              </FadeIn>
              <FadeIn delay={.2}>
                <h1 style={{
                  fontFamily: "'Noto Serif JP',serif", fontSize: "clamp(28px,4.8vw,46px)",
                  fontWeight: 300, color: "#333", lineHeight: 1.7, marginBottom: 24, letterSpacing: 2,
                }}>
                  からだと歯の健康を、<br />
                  <span style={{ fontWeight: 500, color: "#7d7265" }}>ひとつの場所</span>から。
                </h1>
              </FadeIn>
              <FadeIn delay={.35}>
                <p style={{ fontSize: 15.5, lineHeight: 2.2, color: "#666", marginBottom: 36, maxWidth: 520, letterSpacing: .5 }}>
                  内科・消化器内科・皮膚科・歯科に加え、美容皮膚科などの自由診療、
                  さらにオンライン診療にも対応。外来から訪問まで、
                  あなたの健康を包括的にサポートする総合クリニックです。
                </p>
              </FadeIn>
              <FadeIn delay={.5}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }} className="hero-btns">
                  <button onClick={() => scrollTo("contact")} style={{
                    background: "linear-gradient(135deg, #9a8e7f, #7d7265)", color: "#fff", border: "none",
                    borderRadius: 32, padding: "15px 36px", fontSize: 15, fontWeight: 400, cursor: "pointer",
                    letterSpacing: 1, boxShadow: "0 8px 28px rgba(122,114,101,0.2)", transition: "all .3s",
                  }}
                    onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 36px rgba(122,114,101,0.3)"; }}
                    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 28px rgba(122,114,101,0.2)"; }}
                  >ご予約・ご相談</button>
                  <button onClick={() => scrollTo("online")} style={{
                    background: "transparent", color: "#5a5a5a", border: "1.5px solid #ccc7bf",
                    borderRadius: 32, padding: "14px 32px", fontSize: 15, fontWeight: 400,
                    cursor: "pointer", letterSpacing: 1, transition: "all .3s",
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = "#9a8e7f"; e.target.style.color = "#7d7265"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "#ccc7bf"; e.target.style.color = "#5a5a5a"; }}
                  >オンライン診療</button>
                </div>
              </FadeIn>
              <FadeIn delay={.65}>
                <div style={{ display: "flex", gap: 32, marginTop: 44, flexWrap: "wrap" }} className="hero-stats">
                  {["内科", "歯科", "皮膚科", "オンライン", "訪問"].map((t, i) => (
                    <div key={i} style={{
                      padding: "8px 18px", borderRadius: 20, border: "1px solid #e0dbd4",
                      fontSize: 13.5, color: "#7d7265", fontWeight: 400, letterSpacing: 1, background: "rgba(255,255,255,0.7)",
                    }}>{t}</div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={.3}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: "100%", aspectRatio: "3/4", borderRadius: 24, position: "relative", overflow: "hidden",
                  background: "linear-gradient(160deg, #f5f2ed 0%, #ece8e2 40%, #e4e0da 100%)",
                  boxShadow: "0 28px 72px rgba(60,55,50,0.07)",
                }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LogoMark size={150} color="rgba(154,142,127,0.15)" />
                  </div>
                  {[
                    { top: "12%", right: "7%", t: "APPOINTMENT", v: "完全予約制", d: 0 },
                    { bottom: "16%", left: "5%", t: "ONLINE", v: "オンライン診療", d: 1.5 },
                    { top: "52%", right: "8%", t: "HOME VISIT", v: "訪問診療対応", d: .8 },
                  ].map((c, i) => (
                    <div key={i} style={{
                      position: "absolute", ...Object.fromEntries(Object.entries(c).filter(([k]) => ["top","bottom","left","right"].includes(k))),
                      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
                      borderRadius: 12, padding: "14px 18px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                      animation: `float ${5 + i * .5}s ease-in-out infinite ${c.d}s`,
                    }}>
                      <div style={{ fontSize: 11, color: "#a09688", letterSpacing: 1.5, marginBottom: 4 }}>{c.t}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#444" }}>{c.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ━━ TICKER ━━ */}
      <div style={{ background: "#4a4540", padding: "13px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", animation: "tickerScroll 24s linear infinite" }}>
          {[...Array(3)].flatMap((_, k) =>
            ["内科", "消化器内科", "皮膚科", "歯科", "オンライン診療", "美容皮膚科", "ピル処方", "男性外来", "点滴療法", "訪問診療"].map((t, i) => (
              <span key={`${k}-${i}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 3, display: "inline-flex", alignItems: "center", gap: 16 }}>
                <span style={{ color: "#b0a898" }}>◇</span> {t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ━━ ABOUT ━━ */}
      <section id="about" style={{ padding: "100px 24px", background: "#fefefe" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="About" main="当院について" /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="two-col">
            <FadeIn delay={.1}>
              <div style={{ background: "linear-gradient(135deg, #faf8f5, #f0ede8)", borderRadius: 20, padding: 40 }}>
                <div style={{ marginBottom: 20 }}><LogoMark size={48} color="#9a8e7f" /></div>
                <p style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 18, color: "#333", lineHeight: 2, fontWeight: 400, letterSpacing: 1 }}>
                  「からだ全体を、ひとつの<br />クリニックで診てもらいたい」
                </p>
                <p style={{ fontSize: 14.5, color: "#888", lineHeight: 1.8, marginTop: 16 }}>
                  その想いに応える、内科と歯科の総合クリニックです。
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={.2}>
              <div>
                <p style={{ fontSize: 15.5, lineHeight: 2.3, color: "#555", marginBottom: 20 }}>
                  うめむら半蔵門内科歯科は、内科・消化器内科・皮膚科に加え、
                  歯科診療、美容皮膚科やピル処方・男性外来などの自由診療、
                  さらには点滴療法まで幅広く対応する総合クリニックです。
                </p>
                <p style={{ fontSize: 15.5, lineHeight: 2.3, color: "#555", marginBottom: 20 }}>
                  外来診療は<strong style={{ color: "#3a3a3a" }}>完全予約制</strong>。
                  <strong style={{ color: "#3a3a3a" }}>オンライン診療</strong>にも対応しており、
                  ご自宅からもスムーズに受診いただけます。
                </p>
                <p style={{ fontSize: 15.5, lineHeight: 2.3, color: "#555" }}>
                  通院困難な方には訪問診療も提供。半蔵門駅すぐの好立地から、
                  あなたの健康を包括的に支えます。
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ━━ GALLERY ━━ */}
      <section id="gallery" style={{ padding: "80px 24px 100px", background: "#faf8f5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Gallery" main="院内のご紹介" /></FadeIn>
          <FadeIn delay={.1}><PhotoCarousel /></FadeIn>
          <FadeIn delay={.2}>
            <p style={{ fontSize: 13, color: "#aaa", textAlign: "center", marginTop: 20, letterSpacing: .5 }}>
              ※各写真をクリックして画像を差し替えることができます
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ━━ OUTPATIENT ━━ */}
      <section id="outpatient" style={{ padding: "100px 24px", background: "#fefefe" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Outpatient" main="外来診療のご案内" /></FadeIn>
          <FadeIn delay={.05}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ display: "inline-block", background: "linear-gradient(135deg, #9a8e7f, #7d7265)", color: "#fff", borderRadius: 20, padding: "8px 26px", fontSize: 13, letterSpacing: 2 }}>完全予約制</span>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {[
              { icon: "🩺", title: "内科", desc: "生活習慣病・風邪・インフルエンザなど内科全般の診察・治療。健康診断・各種検査にも対応。" },
              { icon: "🔬", title: "消化器内科", desc: "胃腸の不調、腹痛、逆流性食道炎、肝臓疾患など消化器に関する専門的な診療を提供。" },
              { icon: "🧴", title: "皮膚科", desc: "湿疹、アトピー、ニキビ、蕁麻疹など皮膚トラブル全般。丁寧な問診と適切な治療を行います。" },
              { icon: "🦷", title: "歯科", desc: "虫歯・歯周病治療、クリーニング、入れ歯の作製・調整。口腔の健康を総合的にサポート。" },
              { icon: "✨", title: "美容皮膚科", desc: "シミ・しわ・たるみ等のお悩みに対応。医療の力で美しく健やかな肌を目指します。", free: true },
              { icon: "💊", title: "ピル処方", desc: "低用量ピル・アフターピルの処方に対応。女性の健康とライフスタイルをサポート。", free: true },
              { icon: "👔", title: "男性外来", desc: "ED治療・AGA治療など、男性特有のお悩みをプライバシーに配慮した環境で診療。", free: true },
              { icon: "💉", title: "点滴療法", desc: "にんにく注射・ビタミン点滴・美容点滴など各種メニューをご用意しております。", free: true },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * .05}>
                <div style={{
                  background: "#fff", border: "1px solid #ebe7e1", borderRadius: 16, padding: "28px 24px",
                  position: "relative", transition: "all .35s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  {c.free && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 11, color: "#a09688", border: "1px solid #ddd6cc", borderRadius: 10, padding: "2px 9px", letterSpacing: 1 }}>自由診療</div>}
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{c.icon}</div>
                  <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 17, fontWeight: 500, color: "#333", margin: "14px 0 10px", letterSpacing: 1 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: "#777", lineHeight: 1.95 }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ ONLINE ━━ */}
      <section id="online" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #faf8f5, #fefefe)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Online" main="オンライン診療" /></FadeIn>
          <FadeIn delay={.1}>
            <div style={{
              background: "#fff", borderRadius: 24, padding: "48px 40px", border: "1px solid #ebe7e1",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="two-col">
                <div>
                  <div style={{ marginBottom: 20, fontSize: 42 }}>🖥️</div>
                  <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 22, fontWeight: 400, color: "#333", marginBottom: 16, letterSpacing: 1 }}>
                    ご自宅から、<br />スマホで受診。
                  </h3>
                  <p style={{ fontSize: 15, color: "#666", lineHeight: 2.2, marginBottom: 20 }}>
                    スマートフォンやパソコンからビデオ通話で診察を受けられます。
                    お忙しい方、遠方の方、外出が難しい方でも
                    ご自宅から手軽に内科の受診が可能です。
                  </p>
                  <p style={{ fontSize: 15, color: "#666", lineHeight: 2.2 }}>
                    処方箋はご指定の薬局にFAXいたします。
                    お薬の受け取りもスムーズです。
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 500, color: "#7d7265", marginBottom: 16, letterSpacing: 1 }}>ご利用の流れ</h4>
                  {[
                    { s: "01", t: "お電話・メールで予約", d: "ご希望の日時をお伝えください" },
                    { s: "02", t: "ビデオ通話リンクの送付", d: "専用URLをお送りします" },
                    { s: "03", t: "オンライン診察", d: "医師がビデオ通話で診察します" },
                    { s: "04", t: "処方箋の送付", d: "お近くの薬局へFAXいたします" },
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, marginBottom: 18, alignItems: "flex-start" }}>
                      <div style={{
                        minWidth: 36, height: 36, borderRadius: "50%",
                        background: i === 0 ? "linear-gradient(135deg, #9a8e7f, #7d7265)" : "#f5f2ed",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontWeight: 600,
                        color: i === 0 ? "#fff" : "#9a8e7f",
                      }}>{f.s}</div>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 500, color: "#444", marginBottom: 2 }}>{f.t}</div>
                        <div style={{ fontSize: 13, color: "#999" }}>{f.d}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 24, padding: "16px 20px", background: "#faf8f5", borderRadius: 14 }}>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>
                      ※初診の方もご利用いただけます<br />
                      ※自由診療のオンライン相談も対応可能です<br />
                      ※症状によっては対面診療をお勧めする場合がございます
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━ VISIT ━━ */}
      <section id="visit" style={{ padding: "100px 24px", background: "#4a4540", color: "#e5e0d9" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, letterSpacing: 5, color: "#b0a898", marginBottom: 10 }}>HOME VISIT</p>
              <h2 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: "clamp(24px,4.2vw,32px)", fontWeight: 400, color: "#f5f2ed", lineHeight: 1.7, letterSpacing: 2 }}>訪問診療</h2>
              <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #b0a898, transparent)", margin: "18px auto 0" }} />
            </div>
          </FadeIn>
          <FadeIn delay={.1}>
            <p style={{ fontSize: 15.5, lineHeight: 2.3, color: "rgba(229,224,217,0.8)", textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
              通院が困難な方のご自宅や入居施設に、医師・看護師・歯科医師が
              定期的に訪問し、診察・治療・健康管理を行います。<br />
              急な体調変化にも24時間365日対応いたします。
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))", gap: 20 }}>
            {[
              { title: "内科訪問診療", items: "定期診察・処方 / 血液検査・心電図 / 超音波検査 / 点滴・注射 / 褥瘡処置 / 在宅酸素療法" },
              { title: "訪問歯科診療", items: "虫歯・歯周病治療 / 口腔ケア / 入れ歯の調整 / 嚥下機能評価 / 口腔機能訓練" },
              { title: "緩和ケア・看取り", items: "がん性疼痛コントロール / 終末期ケア / 在宅看取り支援 / ご家族への相談・支援" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * .1}>
                <div style={{
                  border: "1px solid rgba(176,168,152,0.2)", borderRadius: 16, padding: "32px 28px",
                  background: "rgba(255,255,255,0.03)", transition: "all .3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(176,168,152,0.07)"; e.currentTarget.style.borderColor = "rgba(176,168,152,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(176,168,152,0.2)"; }}
                >
                  <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 18, fontWeight: 400, color: "#d0c9c0", marginBottom: 16, letterSpacing: 1 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(229,224,217,0.55)", lineHeight: 2.2 }}>{s.items}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ FEATURES ━━ */}
      <section id="features" style={{ padding: "100px 24px", background: "#fefefe" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Features" main="当院が選ばれる理由" /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 20 }}>
            {[
              { n: "01", t: "内科・歯科・美容の総合診療", d: "一つのクリニックで内科から歯科、美容皮膚科まで。複数の医療機関に通う必要がありません。" },
              { n: "02", t: "完全予約制で丁寧な診療", d: "お一人おひとりに十分な時間を確保。待ち時間を最小限に、じっくりと診察いたします。" },
              { n: "03", t: "オンライン診療に対応", d: "ご自宅からスマホやPCで受診可能。お忙しい方も気軽に受診できます。" },
              { n: "04", t: "外来＋訪問の柔軟な対応", d: "通院可能な方は外来で、困難な方には訪問で。ライフステージに合わせた医療を。" },
              { n: "05", t: "自由診療メニューの充実", d: "美容皮膚科・ピル処方・男性外来・各種点滴など、保険外のニーズにもお応えします。" },
              { n: "06", t: "半蔵門駅すぐの好アクセス", d: "東京メトロ半蔵門線「半蔵門駅」より徒歩圏内。千代田区平河町の好立地です。" },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * .07}>
                <div style={{
                  padding: "32px 28px", borderRadius: 16, border: "1px solid #ebe7e1", transition: "all .3s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#faf8f5"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.transform = ""; }}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 300, color: "#d0c9c0", marginBottom: 12 }}>{f.n}</div>
                  <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 17, fontWeight: 500, color: "#333", marginBottom: 10, letterSpacing: 1 }}>{f.t}</h3>
                  <p style={{ fontSize: 14, color: "#777", lineHeight: 1.95 }}>{f.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ FLOW ━━ */}
      <section id="flow" style={{ padding: "100px 24px", background: "#faf8f5" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Flow" main="診療の流れ" /></FadeIn>
          {[
            { s: "01", t: "ご予約・お問い合わせ", d: "お電話（03-6272-4156）またはメールにてご予約。外来は完全予約制です。訪問診療やオンライン診療のご相談も承ります。" },
            { s: "02", t: "ご来院 / オンライン接続 / 初回面談", d: "外来の方はご来院、オンラインの方はビデオ通話で接続。訪問診療は初回面談で病状やご希望をお伺いします。" },
            { s: "03", t: "診察・治療", d: "医師が丁寧に診察し、必要な検査・治療・処方を行います。訪問診療は月2回以上定期的に伺います。" },
            { s: "04", t: "継続的なサポート", d: "定期的な通院・訪問・オンラインを通じて健康を管理。地域の医療介護機関とも連携します。" },
          ].map((f, i) => (
            <FadeIn key={i} delay={i * .1}>
              <div style={{
                display: "flex", gap: 24, marginBottom: 24, padding: "24px 28px", borderRadius: 16,
                background: i % 2 === 0 ? "rgba(240,237,232,0.5)" : "transparent",
              }}>
                <div style={{
                  minWidth: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #9a8e7f, #7d7265)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, color: "#fff",
                }}>{f.s}</div>
                <div>
                  <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 17, fontWeight: 500, color: "#333", marginBottom: 8, letterSpacing: 1 }}>{f.t}</h3>
                  <p style={{ fontSize: 14.5, color: "#666", lineHeight: 2 }}>{f.d}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ━━ COST ━━ */}
      <section id="cost" style={{ padding: "100px 24px", background: "#fefefe" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Cost" main="費用について" /></FadeIn>
          <FadeIn delay={.1}>
            <div style={{ background: "#faf8f5", borderRadius: 20, padding: "40px 36px", border: "1px solid #ebe7e1" }}>
              <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 18, fontWeight: 500, color: "#333", marginBottom: 20, letterSpacing: 1 }}>訪問診療（保険適用）</h3>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 2, marginBottom: 24 }}>
                訪問診療は<strong style={{ color: "#3a3a3a" }}>健康保険が適用</strong>されます。月2回の定期訪問の場合：
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }} className="cost-grid">
                {[{ l: "1割負担の方", p: "約 7,000円" }, { l: "3割負担の方", p: "約 20,000円" }].map((c, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", textAlign: "center", border: "1px solid #ebe7e1" }}>
                    <div style={{ fontSize: 13, color: "#999", marginBottom: 8, letterSpacing: 1 }}>{c.l}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 600, color: "#3a3a3a" }}>{c.p}<span style={{ fontSize: 14, color: "#999" }}>/月</span></div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #ebe7e1", paddingTop: 20 }}>
                <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 18, fontWeight: 500, color: "#333", marginBottom: 12, letterSpacing: 1 }}>自由診療 / オンライン診療</h3>
                <p style={{ fontSize: 14, color: "#888", lineHeight: 2 }}>
                  美容皮膚科・ピル処方・男性外来・点滴療法は保険適用外です。
                  オンライン診療の費用は通常の外来診療と同等です。<br />
                  詳しくはお電話またはご来院時にお問い合わせください。
                </p>
              </div>
              <p style={{ fontSize: 12.5, color: "#aaa", lineHeight: 1.8, marginTop: 16 }}>
                ※各種検査・医療機器使用時は別途費用がかかります。<br />
                ※高額療養費制度・指定難病医療費助成制度もご利用いただけます。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ━━ STAFF ━━ */}
      <section id="staff" style={{ padding: "100px 24px", background: "#faf8f5" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Doctors" main="医師紹介" /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="two-col">
            {[
              { name: "梅村 隆輔", role: "院長", spec: "内科・消化器内科・皮膚科", bio: "内科全般から消化器内科、皮膚科、さらに美容皮膚科や各種自由診療まで幅広く対応。外来・オンライン・訪問の全チャネルで、一人ひとりの患者様に丁寧に向き合います。", color: "#9a8e7f", emoji: "👨‍⚕️" },
              { name: "伊藤 恵", role: "歯科医師", spec: "一般歯科・口腔外科・訪問歯科", bio: "虫歯・歯周病治療から入れ歯、口腔ケアまで歯科全般を担当。外来はもちろん、通院困難な方への訪問歯科診療にも対応し、お口の健康を守ります。", color: "#a09688", emoji: "👩‍⚕️" },
            ].map((d, i) => (
              <FadeIn key={i} delay={i * .15}>
                <div style={{
                  background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #ebe7e1", transition: "box-shadow .3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <div style={{ height: 110, background: `linear-gradient(135deg, ${d.color}, ${d.color}cc)`, position: "relative" }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%", background: "#f5f2ed", border: "3px solid #fff",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34,
                      position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    }}>{d.emoji}</div>
                  </div>
                  <div style={{ padding: "52px 28px 32px", textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "#a09688", fontWeight: 500, marginBottom: 6, letterSpacing: 2 }}>{d.role}</div>
                    <h3 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: 23, fontWeight: 500, color: "#333", marginBottom: 4, letterSpacing: 2 }}>{d.name}</h3>
                    <div style={{ fontSize: 13, color: d.color, marginBottom: 16, letterSpacing: 1 }}>{d.spec}</div>
                    <p style={{ fontSize: 14, color: "#777", lineHeight: 2 }}>{d.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ AREA ━━ */}
      <section id="area" style={{ padding: "100px 24px", background: "#fefefe" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="Area" main="訪問診療 対応エリア" /></FadeIn>
          <FadeIn delay={.1}>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 2, textAlign: "center", marginBottom: 12 }}>
              千代田区平河町の当クリニックを起点に、<strong style={{ color: "#3a3a3a" }}>半径16km圏内</strong>で訪問診療に対応しています。
            </p>
            <p style={{ fontSize: 13, color: "#999", textAlign: "center", marginBottom: 36 }}>※保険医療機関から半径16km以内が法令上の対応可能範囲です</p>
          </FadeIn>
          <FadeIn delay={.15}>
            <p style={{ fontSize: 13, color: "#a09688", fontWeight: 500, marginBottom: 12, letterSpacing: 2, textAlign: "center" }}>● 重点エリア</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 28 }}>
              {visitAreas.filter(a => a.p).map((a, i) => (
                <span key={i} style={{ background: "linear-gradient(135deg, #9a8e7f, #7d7265)", color: "#fff", borderRadius: 24, padding: "9px 22px", fontSize: 14, letterSpacing: 1 }}>{a.name}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={.2}>
            <p style={{ fontSize: 13, color: "#bbb", fontWeight: 500, marginBottom: 12, letterSpacing: 2, textAlign: "center" }}>○ 対応可能エリア</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {visitAreas.filter(a => !a.p).map((a, i) => (
                <span key={i} style={{ background: "#f5f2ed", border: "1px solid #e4e0da", color: "#888", borderRadius: 24, padding: "8px 18px", fontSize: 13.5 }}>{a.name}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={.25}><p style={{ fontSize: 13, color: "#bbb", textAlign: "center", marginTop: 28 }}>※エリア外でも対応可能な場合がございます。お気軽にお問い合わせください。</p></FadeIn>
        </div>
      </section>

      {/* ━━ FAQ ━━ */}
      <section id="faq" style={{ padding: "100px 24px", background: "#faf8f5" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <FadeIn><SectionTitle sub="FAQ" main="よくある質問" /></FadeIn>
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * .05}>
              <div style={{
                marginBottom: 10, borderRadius: 14, overflow: "hidden",
                border: "1px solid #ebe7e1", background: openFaq === i ? "#fff" : "transparent", transition: "all .3s",
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", background: "none", border: "none", padding: "22px 24px",
                  cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left",
                }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#333", display: "flex", alignItems: "center", gap: 12, letterSpacing: .5 }}>
                    <span style={{ color: "#a09688", fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600 }}>Q</span>{f.q}
                  </span>
                  <span style={{ fontSize: 20, color: "#a09688", transform: openFaq === i ? "rotate(45deg)" : "", transition: "transform .3s", flexShrink: 0, marginLeft: 12 }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 320 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
                  <div style={{ padding: "0 24px 22px 54px", fontSize: 14.5, color: "#666", lineHeight: 2 }}>{f.a}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ━━ CONTACT ━━ */}
      <section id="contact" style={{ padding: "100px 24px", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #4a4540, #555049, #4a4540)" }}>
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(176,168,152,0.07), transparent 70%)" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}><LogoMark size={48} color="rgba(208,201,192,0.45)" /></div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, letterSpacing: 5, color: "#b0a898", marginBottom: 10 }}>CONTACT</p>
            <h2 style={{ fontFamily: "'Noto Serif JP',serif", fontSize: "clamp(24px,4.2vw,32px)", fontWeight: 400, color: "#f5f2ed", lineHeight: 1.7, marginBottom: 16, letterSpacing: 2 }}>ご予約・お問い合わせ</h2>
            <p style={{ fontSize: 15, color: "rgba(229,224,217,0.65)", lineHeight: 2, marginBottom: 40 }}>
              外来は完全予約制です。オンライン診療・訪問診療のご相談も承ります。
            </p>
          </FadeIn>
          <FadeIn delay={.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }} className="contact-grid">
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(176,168,152,0.2)", borderRadius: 16, padding: "28px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>📞</div>
                <div style={{ fontSize: 12, color: "#b0a898", margin: "2px 0 8px", letterSpacing: 2 }}>お電話</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, color: "#f5f2ed", letterSpacing: 1 }}>03-6272-4156</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(176,168,152,0.2)", borderRadius: 16, padding: "28px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>✉️</div>
                <div style={{ fontSize: 12, color: "#b0a898", margin: "2px 0 8px", letterSpacing: 2 }}>メール</div>
                <div style={{ fontSize: 13.5, color: "#f5f2ed", wordBreak: "break-all" }}>umemura.hanzoumon.929<br />@gmail.com</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={.25}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(176,168,152,0.15)", borderRadius: 16, padding: "24px 28px", marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: "#b0a898", marginBottom: 10, letterSpacing: 2 }}>ACCESS</div>
              <p style={{ fontSize: 15, color: "#e5e0d9", lineHeight: 1.8, letterSpacing: .5 }}>〒102-0093<br />東京都千代田区平河町1丁目7番16号 102</p>
              <p style={{ fontSize: 13, color: "rgba(229,224,217,0.5)", marginTop: 8 }}>東京メトロ半蔵門線「半蔵門駅」より徒歩圏内</p>
            </div>
          </FadeIn>
          <FadeIn delay={.3}>
            <button style={{
              background: "linear-gradient(135deg, #d0c9c0, #b0a898)", color: "#fff", border: "none",
              borderRadius: 32, padding: "16px 46px", fontSize: 15, fontWeight: 400, cursor: "pointer",
              letterSpacing: 1, boxShadow: "0 8px 28px rgba(176,168,152,0.25)", transition: "all .3s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 36px rgba(176,168,152,0.35)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 8px 28px rgba(176,168,152,0.25)"; }}
            >お問い合わせフォームへ</button>
          </FadeIn>
        </div>
      </section>

      {/* ━━ FOOTER ━━ */}
      <footer style={{ background: "#363330", padding: "52px 24px 28px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 36, marginBottom: 32 }} className="footer-grid">
            <div>
              <div style={{ marginBottom: 16 }}><LogoFull size={24} color="#888" textColor="#bbb" /></div>
              <p style={{ fontSize: 13, color: "rgba(200,200,200,0.4)", lineHeight: 1.9 }}>
                〒102-0093<br />東京都千代田区平河町1丁目7番16号 102<br /><br />
                TEL: 03-6272-4156<br />MAIL: umemura.hanzoumon.929@gmail.com
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, color: "#a09688", marginBottom: 14, fontWeight: 500, letterSpacing: 2 }}>MENU</h4>
              {SECTIONS.slice(1, 7).map(s => (
                <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: "block", background: "none", border: "none", color: "rgba(200,200,200,0.45)", fontSize: 13, cursor: "pointer", padding: "5px 0", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#d0c9c0"} onMouseLeave={e => e.target.style.color = "rgba(200,200,200,0.45)"}
                >{s.label}</button>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 12, color: "#a09688", marginBottom: 14, fontWeight: 500, letterSpacing: 2 }}>INFO</h4>
              {SECTIONS.slice(7).map(s => (
                <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: "block", background: "none", border: "none", color: "rgba(200,200,200,0.45)", fontSize: 13, cursor: "pointer", padding: "5px 0", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#d0c9c0"} onMouseLeave={e => e.target.style.color = "rgba(200,200,200,0.45)"}
                >{s.label}</button>
              ))}
              <button style={{ display: "block", background: "none", border: "none", color: "rgba(200,200,200,0.45)", fontSize: 13, cursor: "pointer", padding: "5px 0" }}>プライバシーポリシー</button>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(176,168,152,0.1)", paddingTop: 18, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "rgba(200,200,200,0.2)", letterSpacing: 1.5 }}>© 2026 うめむら半蔵門内科歯科 All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ━━ FLOATING TEL ━━ */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
        <button style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #9a8e7f, #7d7265)", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(122,114,101,0.3)", animation: "breathe 2.5s ease-in-out infinite",
          fontSize: 24, color: "#fff",
        }}>
          📞
        </button>
      </div>
    </>
  );
}
