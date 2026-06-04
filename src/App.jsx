/**
 * うめむら半蔵門内科歯科 — App.jsx
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ⚠️ Claudeへ：
 *   このファイルは構造・機能の変更時のみ編集すること。
 *   写真・ロゴ・色などの設定変更は siteConfig.js を編集。
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { LOGO, DEFAULT_IMAGES, SITE_DEFAULTS, CLINIC, LINE, DOCTORS, SERVICES, MEDICAL_ADDITIONS, BOOKING_URL } from "./siteConfig";
import L from "leaflet";

// ══════════════════════════════════════════════════════════
// SETTINGS PERSISTENCE
// ══════════════════════════════════════════════════════════
const STORAGE_KEY = "umemura_site_settings";

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}

function usePersistentSettings() {
  const [settings, setSettingsState] = useState(() => {
    const saved = loadSettings();
    return {
      theme:  saved.theme  || SITE_DEFAULTS.defaultTheme,
      layout: saved.layout || SITE_DEFAULTS.defaultLayout,
      images: {
        ...DEFAULT_IMAGES,
        ...(saved.images || {}),
        // Keep first hero slide synced with project default image file.
        hero: DEFAULT_IMAGES.hero,
        // Keep second hero slide synced with configured image file.
        hero2: DEFAULT_IMAGES.hero2,
        // Keep third hero slide synced with configured image file.
        hero3: DEFAULT_IMAGES.hero3,
        // Keep fourth hero slide synced with configured image file.
        hero4: DEFAULT_IMAGES.hero4,
        // Keep first gallery image synced with the same uploaded image file.
        carousel1: DEFAULT_IMAGES.carousel1,
        // Keep exam room photo synced with configured image file.
        carousel2: DEFAULT_IMAGES.carousel2,
        // Keep waiting room photo synced with configured image file.
        carousel3: DEFAULT_IMAGES.carousel3,
        // Keep dental room photo synced with configured image file.
        carousel4: DEFAULT_IMAGES.carousel4,
        // Keep exterior photo synced with the same uploaded image file.
        carousel6: DEFAULT_IMAGES.carousel6,
        // Keep director photo synced with configured image file.
        doctor1: DEFAULT_IMAGES.doctor1,
        // Keep dentist photo synced with configured image file.
        doctor2: DEFAULT_IMAGES.doctor2,
        // Keep online illustration images synced with SVG files.
        online1: DEFAULT_IMAGES.online1,
        online2: DEFAULT_IMAGES.online2,
        online3: DEFAULT_IMAGES.online3,
      },
      logo: {
        ...LOGO,
        ...(saved.logo || {}),
        // Always prioritize project logo file from siteConfig.
        type: LOGO.type,
        logoUrl: LOGO.logoUrl,
      },
    };
  });

  const updateSettings = useCallback((patch) => {
    setSettingsState(prev => {
      const next = { ...prev, ...patch };
      saveSettings({
        theme:  next.theme,
        layout: next.layout,
        images: next.images,
        logo:   next.logo,
      });
      return next;
    });
  }, []);

  const updateImage = useCallback((key, url) => {
    setSettingsState(prev => {
      const next = { ...prev, images: { ...prev.images, [key]: url } };
      saveSettings({ theme: next.theme, layout: next.layout, images: next.images, logo: next.logo });
      return next;
    });
  }, []);

  const resetImages = useCallback(() => {
    setSettingsState(prev => {
      const next = { ...prev, images: { ...DEFAULT_IMAGES } };
      saveSettings({ theme: next.theme, layout: next.layout, images: next.images, logo: next.logo });
      return next;
    });
  }, []);

  const exportSettings = useCallback(() => {
    const data = loadSettings();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "umemura_settings.json";
    a.click();
  }, []);

  const importSettings = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        saveSettings(data);
        window.location.reload();
      } catch {
        alert("設定ファイルの読み込みに失敗しました。");
      }
    };
    reader.readAsText(file);
  }, []);

  return { settings, updateSettings, updateImage, resetImages, exportSettings, importSettings };
}

// ══════════════════════════════════════════════════════════
// THEMES
// ══════════════════════════════════════════════════════════
const THEMES = {
  silver: {
    name: "Silver", isDark: false,
    bg:        "#f7f9f8",
    surface:   "#ffffff",
    surface2:  "#edf3f1",
    border:    "rgba(20,88,82,.1)",
    text:      "#172322",
    textSub:   "#5f7370",
    accent:    "#2f746f",
    accentGrad:"linear-gradient(135deg,#4f938c,#28635f)",
    nav:       "rgba(247,249,248,.92)",
    serif:     "'Cormorant Garamond', serif",
    sans:      "'Noto Sans JP', sans-serif",
    footer:    "#1c1a18",
  },
  ocean: {
    name: "Ocean", isDark: false,
    bg:        "#f4f8fc",
    surface:   "#ffffff",
    surface2:  "#eaf2fa",
    border:    "rgba(0,60,120,.08)",
    text:      "#0a1a2f",
    textSub:   "#4a6880",
    accent:    "#2a7bbf",
    accentGrad:"linear-gradient(135deg,#2a7bbf,#1a5c9a)",
    nav:       "rgba(244,248,252,.92)",
    serif:     "'DM Serif Display', serif",
    sans:      "'Noto Sans JP', sans-serif",
    footer:    "#0a1a2f",
  },
  dark: {
    name: "Dark", isDark: true,
    bg:        "#111110",
    surface:   "#1c1b19",
    surface2:  "#242320",
    border:    "rgba(255,255,255,.07)",
    text:      "#e8e4dc",
    textSub:   "#9a9488",
    accent:    "#c9a96e",
    accentGrad:"linear-gradient(135deg,#d4b87a,#a8893e)",
    nav:       "rgba(17,17,16,.92)",
    serif:     "'Cormorant Garamond', serif",
    sans:      "'Noto Sans JP', sans-serif",
    footer:    "#0a0a09",
  },
  sage: {
    name: "Sage", isDark: false,
    bg:        "#f4f7f3",
    surface:   "#ffffff",
    surface2:  "#eaf2e8",
    border:    "rgba(0,80,20,.07)",
    text:      "#1a2a1c",
    textSub:   "#5a7a5c",
    accent:    "#4a7f46",
    accentGrad:"linear-gradient(135deg,#5a8f52,#3a6f36)",
    nav:       "rgba(244,247,243,.92)",
    serif:     "'Playfair Display', serif",
    sans:      "'Noto Sans JP', sans-serif",
    footer:    "#1a2a1c",
  },
  rose: {
    name: "Rose", isDark: false,
    bg:        "#fdf8f8",
    surface:   "#ffffff",
    surface2:  "#faeef0",
    border:    "rgba(160,40,60,.07)",
    text:      "#2a1a1e",
    textSub:   "#8a606a",
    accent:    "#b06070",
    accentGrad:"linear-gradient(135deg,#c07080,#904858)",
    nav:       "rgba(253,248,248,.92)",
    serif:     "'Playfair Display', serif",
    sans:      "'Noto Sans JP', sans-serif",
    footer:    "#2a1a1e",
  },
};

// ══════════════════════════════════════════════════════════
// LOGO COMPONENT
// ══════════════════════════════════════════════════════════
function LogoMark({ size = 32, color = "#8a8078" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4C12 4 8 10 8 16c0 4 1.5 7 4 9l2 9c.3 1.2 1.2 2 2.4 2h7.2c1.2 0 2.1-.8 2.4-2l2-9c2.5-2 4-5 4-9 0-6-4-12-12-12z" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M14 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M20 10v6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function LogoDisplay({ logo, T, size = 32 }) {
  if (logo.type === "image" && logo.logoUrl) {
    return <img src={logo.logoUrl} alt={logo.clinicName} style={{ height: size, width: "auto", objectFit: "contain", display: "block" }} />;
  }
  return <LogoMark size={size} color={T.accent} />;
}

function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.8 4.4 9.7 8c.4.7.2 1.5-.4 2l-1.1.9c1 2.1 2.8 3.9 5 5l.9-1.1c.5-.6 1.3-.8 2-.4l3.5 1.8c.7.4 1 1.1.8 1.9-.4 1.8-1.9 3-3.7 3C9.2 21.1 2.9 14.8 2.9 7.3c0-1.8 1.2-3.3 3-3.7.8-.2 1.5.1 1.9.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.2 4.2c2.8.5 5.1 2.7 5.6 5.6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
      <path d="M14 7.6c1 .3 1.9 1.1 2.2 2.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
    </svg>
  );
}

function OnlineCareIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="14" height="10.5" rx="2.4" stroke="currentColor" strokeWidth="1.7"/>
      <path d="m17 8.8 3.6-2.1c.5-.3 1.1.1 1.1.7v5.7c0 .6-.6 1-1.1.7L17 11.7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M10 8.6v3.5M8.2 10.4h3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════
// FADE IN
// ══════════════════════════════════════════════════════════
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ══════════════════════════════════════════════════════════
// PHOTO SLOT — クリックで画像差し替え
// ══════════════════════════════════════════════════════════
function PhotoSlot({ imgKey, url, style = {}, imgStyle = {}, children }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", ...imgStyle }} />
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION TITLE
// ══════════════════════════════════════════════════════════
function SectionTitle({ sub, main, T, light = false }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <p style={{ fontFamily: T.serif, fontSize: 12, letterSpacing: 5, textTransform: "uppercase",
        color: T.accent, marginBottom: 10 }}>{sub}</p>
      <h2 style={{ fontFamily: T.serif, fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 400,
        color: light ? "rgba(255,255,255,.95)" : T.text, letterSpacing: 1 }}>{main}</h2>
      <div style={{ width: 40, height: 1.5, background: T.accent, margin: "16px auto 0" }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// NAV
// ══════════════════════════════════════════════════════════
function Nav({ T, logo, activeSection, onOnlineClick, onPhoneClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#services", label: "診療内容" },
    { href: "#online",   label: "オンライン" },
    { href: "#visit",    label: "訪問診療" },
    { href: "#staff",    label: "医師紹介" },
    { href: "#visit",    label: "対応エリア" },
    { href: "#contact",  label: "お問い合わせ" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? T.nav : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      transition: "all .35s ease",
      padding: "0 20px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 68, gap: 12 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, minWidth: 0 }}>
          <div style={{
            width: 86,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            filter: scrolled
              ? "brightness(0) saturate(100%) invert(24%) sepia(26%) saturate(1026%) hue-rotate(126deg) brightness(92%) contrast(88%) drop-shadow(0 5px 12px rgba(20,88,82,.2))"
              : "brightness(0) invert(1) contrast(1.18) drop-shadow(0 3px 10px rgba(0,0,0,.35)) drop-shadow(0 0 10px rgba(255,255,255,.28))",
          }}>
            <LogoDisplay logo={logo} T={T} size={56} />
          </div>
          <div className="nav-clinic-text" style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: scrolled ? 0 : "4px 10px 5px",
            borderRadius: 8,
            background: scrolled ? "transparent" : "rgba(0,0,0,.18)",
          }}>
            <span style={{
              fontFamily: T.sans,
              fontSize: 10.5,
              color: scrolled ? T.accent : "rgba(255,255,255,.75)",
              letterSpacing: 2,
              fontWeight: 500,
              textTransform: "uppercase",
            }}>
              Clinic
            </span>
            <span style={{
              fontFamily: T.sans,
              fontSize: 20,
              color: scrolled ? T.text : "#fff",
              letterSpacing: .7,
              fontWeight: 700,
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              textShadow: scrolled ? "none" : "0 2px 8px rgba(0,0,0,.35)",
            }}>
              {CLINIC.name}
            </span>
          </div>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: 14, alignItems: "center", flexShrink: 0 }}>
          {links.map(l => (
            <a className="nav-menu-link" key={l.href} href={l.href} style={{
              fontFamily: T.sans, fontSize: 13, color: scrolled ? T.text : "rgba(255,255,255,.92)",
              textDecoration: "none", letterSpacing: .5,
              textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,.3)",
              transition: "opacity .2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.target.style.opacity = ".6"}
            onMouseLeave={e => e.target.style.opacity = "1"}
            >{l.label}</a>
          ))}
          <button className="nav-online" onClick={onOnlineClick} style={{
            background: scrolled ? "rgba(255,255,255,.78)" : "rgba(255,255,255,.92)",
            color: T.accent,
            padding: "7px 13px",
            borderRadius: 4,
            border: `1px solid ${scrolled ? T.border : "rgba(255,255,255,.42)"}`,
            fontFamily: T.sans,
            fontSize: 12.5,
            letterSpacing: .3,
            boxShadow: "0 3px 12px rgba(0,0,0,.12)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}><OnlineCareIcon size={15} />オンライン診療</button>
          <button className="nav-booking" onClick={onPhoneClick} style={{
            background: T.accentGrad, color: "#fff", padding: "7px 15px",
            borderRadius: 4, fontFamily: T.sans, fontSize: 12.5, border: "none",
            letterSpacing: .3, boxShadow: `0 3px 12px ${T.accent}40`,
            display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
            whiteSpace: "nowrap", flexShrink: 0,
          }}><PhoneIcon size={14} />予約</button>
        </div>
      </div>
    </nav>
  );
}

// ══════════════════════════════════════════════════════════
// HERO — Layout B (Full Image)
// ══════════════════════════════════════════════════════════
function HeroFullImage({ T, images, updateImage, onOnlineClick, onPhoneClick }) {
  const HERO_KEYS = ["hero", "hero2", "hero3", "hero4"];
  const HERO_FALLBACKS = {
    hero: DEFAULT_IMAGES.hero2,
    hero2: DEFAULT_IMAGES.hero3,
    hero3: DEFAULT_IMAGES.hero2,
    hero4: DEFAULT_IMAGES.hero,
  };
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // 自動スライドショー（5秒ごと）
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(c => (c + 1) % HERO_KEYS.length);
        setFade(true);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleFile = (idx) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateImage(HERO_KEYS[idx], ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      {/* スライドショー背景 */}
      {HERO_KEYS.map((key, i) => (
        <img key={key} src={images[key] || images.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          background: "transparent",
          opacity: i === current ? (fade ? 1 : 0) : 0,
          filter: key === "hero4" ? "blur(1.4px)" : "none",
          transform: key === "hero4" ? "scale(1.01)" : "scale(1)",
          transition: "opacity .8s ease, filter .8s ease, transform .8s ease",
          zIndex: 0,
        }}
        onError={(e) => {
          const fallback = HERO_FALLBACKS[key] || DEFAULT_IMAGES.hero2;
          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
        }}
        />
      ))}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to right, rgba(0,0,0,.58) 0%, rgba(0,0,0,.28) 60%, rgba(0,0,0,.1) 100%)",
      }} />

      {/* テキストコンテンツ */}
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex",
        alignItems: "center", padding: "0 clamp(24px,6vw,120px)" }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{ fontFamily: T.serif, fontSize: 13, letterSpacing: 5, color: "rgba(255,255,255,.75)",
            textTransform: "uppercase", marginBottom: 20 }}>Internal Medicine &amp; Dental</p>
          <h1 style={{ fontFamily: T.serif, fontSize: "clamp(34px,5vw,62px)", fontWeight: 400,
            color: "#fff", lineHeight: 1.3, marginBottom: 24, letterSpacing: 1 }}>
            内科も歯科も、<br />ひとつの場所で。
          </h1>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: "rgba(255,255,255,.88)",
            lineHeight: 2.1, marginBottom: 10, maxWidth: 520 }}>
            千代田区平河町の総合クリニック。<br />
            外来・オンライン・訪問診療など様々なニーズに対応致します。<br />
            地域の皆様の健康を全力でサポートします。
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#services" style={{
              background: T.accentGrad, color: "#fff", padding: "14px 32px",
              borderRadius: 4, fontFamily: T.sans, fontSize: 14, textDecoration: "none",
              letterSpacing: 1, boxShadow: `0 6px 24px ${T.accent}50`,
            }}>診療内容を見る</a>
            <button onClick={onOnlineClick} style={{
              background: "rgba(255,255,255,.94)", color: T.accent,
              padding: "14px 32px", borderRadius: 4, fontFamily: T.sans,
              fontSize: 14, border: "none", cursor: "pointer", letterSpacing: 1,
              boxShadow: "0 6px 24px rgba(0,0,0,.18)",
              display: "inline-flex", alignItems: "center", gap: 9,
            }}><OnlineCareIcon size={19} />オンライン診療を希望する</button>
            <button onClick={() => window.open(LINE.questionnaireUrl, '_blank')} style={{
              background: "linear-gradient(135deg,#4f938c,#2f746f)", color: "#fff",
              padding: "14px 32px", borderRadius: 4, fontFamily: T.sans,
              fontSize: 14, border: "none", cursor: "pointer", letterSpacing: 1,
              boxShadow: "0 6px 24px rgba(47,116,111,.3)",
            }}>オンライン問診票に回答する</button>
          </div>
        </div>
      </div>

      {/* ドットインジケーター */}
      <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)",
        zIndex: 3, display: "flex", gap: 8 }}>
        {HERO_KEYS.map((_, i) => (
          <button key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 300); }}
            style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 4,
              background: i === current ? "#fff" : "rgba(255,255,255,.4)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all .3s ease",
            }} />
        ))}
      </div>

    </section>
  );
}


// ══════════════════════════════════════════════════════════
// PHOTO CAROUSEL
// ══════════════════════════════════════════════════════════
function PhotoCarousel({ T, images, updateImage }) {
  const keys = ["carousel1","carousel2","carousel3","carousel4","carousel6"];
  const labels = ["受付","診察室","待合室","歯科診療室","施設外観"];
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const CARD_W = 320;
  const CARD_GAP = 16;

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: idx * (CARD_W + CARD_GAP), behavior: "smooth" });
    }
  }, [idx]);

  return (
    <section style={{ padding: "80px 0", background: T.surface2, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn>
          <SectionTitle sub="Gallery" main="院内のご紹介" T={T} />
        </FadeIn>
        <div ref={trackRef} style={{
          display: "flex", gap: CARD_GAP, overflowX: "auto", scrollBehavior: "smooth",
          paddingBottom: 16, scrollbarWidth: "none",
        }}>
          {keys.map((k, i) => (
            <div key={k} style={{ flexShrink: 0, width: CARD_W }}>
              <PhotoSlot imgKey={k} url={images[k]} onUpdate={updateImage}
                style={{ width: CARD_W, height: 220, borderRadius: 10 }} />
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textSub,
                textAlign: "center", marginTop: 10 }}>{labels[i]}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
          <button onClick={() => setIdx(Math.max(0, idx - 1))}
            style={{ width: 38, height: 38, borderRadius: "50%", border: `1px solid ${T.border}`,
              background: T.surface, cursor: "pointer", fontSize: 16 }}>←</button>
          <button onClick={() => setIdx(Math.min(keys.length - 1, idx + 1))}
            style={{ width: 38, height: 38, borderRadius: "50%", border: `1px solid ${T.border}`,
              background: T.surface, cursor: "pointer", fontSize: 16 }}>→</button>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// SERVICES
// ══════════════════════════════════════════════════════════
const _base = import.meta.env.BASE_URL;
const SERVICE_IMAGE_MAP = {
  "内科": `${_base}images/internal_medecine.jpg`,
  "皮膚科": `${_base}images/dermatology.png`,
  "歯科": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=80",
  "美容皮膚科": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
  "ピル処方": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&q=80",
  "男性外来": `${_base}images/male_madicine.png`,
  "点滴療法": `${_base}images/drip.png`,
};

function ServicesSection({ T }) {
  return (
    <section id="services" style={{ padding: "96px 0", background: T.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="Services" main="診療内容" T={T} /></FadeIn>
        <div className="services-grid" style={{ display: "grid", gap: 20 }}>
          {SERVICES.outpatient.map((s, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{
                background: T.surface, borderRadius: 12, padding: "28px 24px",
                border: `1px solid ${T.border}`,
                transition: "box-shadow .25s, transform .25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,.10)`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div style={{
                  width: "100%",
                  height: 140,
                  borderRadius: 10,
                  overflow: "hidden",
                  marginBottom: 14,
                  background: T.surface2,
                }}>
                  <img
                    src={SERVICE_IMAGE_MAP[s.name]}
                    alt={`${s.name}イメージ`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80";
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <h3 style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 600, color: T.text }}>{s.name}</h3>
                  <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 10,
                    background: s.type === "保険" ? `${T.accent}18` : "#e8f4ec",
                    color: s.type === "保険" ? T.accent : "#3a7a4a", letterSpacing: 1,
                  }}>{s.type}</span>
                </div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.textSub, lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p style={{ textAlign: "center", fontFamily: T.sans, fontSize: 13, color: T.textSub, marginTop: 28 }}>
          ※ 外来診療は完全予約制です
        </p>
      </div>
    </section>
  );
}



// ══════════════════════════════════════════════════════════
// ONLINE CONSULTATION
// ══════════════════════════════════════════════════════════
function OnlineSection({ T, images, updateImage, onBookingClick, onOnlineClick }) {
  const steps = [
    { n: "01", title: "Web予約", desc: "24時間いつでもオンラインで予約可能。", imgKey: "online1" },
    { n: "02", title: "ビデオ診療", desc: "スマホ・PCから医師がリアルタイムで診察。", imgKey: "online2" },
    { n: "03", title: "処方・連絡", desc: "処方箋メール送付・調剤薬局でお受け取り。", imgKey: "online3" },
  ];
  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardImageUpload = (idx) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateImage(steps[idx].imgKey, ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <section id="online" style={{ padding: "96px 0", background: T.isDark ? T.surface : T.surface2 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="Online" main="オンライン診療" T={T} /></FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ textAlign: "center", fontFamily: T.sans, fontSize: 15, color: T.textSub,
            lineHeight: 2, marginBottom: 52 }}>
            通院が難しい方、遠方の方、忙しい方も、<br />
            スマートフォン一つで医師に相談できます。
          </p>
        </FadeIn>
        <div className="online-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {steps.map((s, i) => {
            const cardBg = ["#DDEBE8", "#E5EFED", "#E7F0EE"][i];
            const isHovered = hoveredCard === i;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  position: "relative", textAlign: "center", borderRadius: 12, border: `1px solid ${T.border}`,
                  overflow: "hidden", height: 360, display: "flex", flexDirection: "column",
                  background: cardBg, cursor: "pointer",
                  boxShadow: isHovered ? "0 12px 36px rgba(0,0,0,.14)" : "0 4px 24px rgba(0,0,0,.08)",
                  transform: isHovered ? "translateY(-4px)" : "none",
                  transition: "transform .25s, box-shadow .25s",
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => inputRefs[i].current?.click()}>
                  <img src={images[s.imgKey]} alt={s.title} style={{
                    width: "100%", height: "260px", objectFit: "contain",
                    objectPosition: "center bottom",
                  }} />
                  <div style={{
                    padding: "16px 20px 20px",
                    background: "rgba(255,255,255,.6)",
                    borderTop: "1px solid rgba(47,116,111,.12)",
                    flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
                  }}>
                    <div style={{ fontFamily: T.serif, fontSize: 13, color: "rgba(47,116,111,.5)", marginBottom: 4, letterSpacing: 2 }}>{s.n}</div>
                    <h3 style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: "#1a3a38", marginBottom: 4 }}>{s.title}</h3>
                    <p style={{ fontFamily: T.sans, fontSize: 11.5, color: "#4a7370", lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                  {/* Web予約ホバーポップアップ */}
                  {i === 0 && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(20,70,65,.72)",
                      backdropFilter: "blur(3px)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 14,
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity .22s ease",
                      pointerEvents: isHovered ? "auto" : "none",
                    }}
                    onClick={(e) => { e.stopPropagation(); onBookingClick && onBookingClick(e); }}>
                      <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,.75)", letterSpacing: 2 }}>ONLINE BOOKING</p>
                      <button style={{
                        background: "#fff",
                        color: "#2f746f",
                        border: "none",
                        borderRadius: 8,
                        padding: "13px 28px",
                        fontFamily: T.sans,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: .5,
                        boxShadow: "0 4px 16px rgba(0,0,0,.18)",
                      }}>予約を取得する</button>
                    </div>
                  )}
                  {/* 処方・連絡ホバーポップアップ */}
                  {i === 2 && (
                    <div onClick={(e) => e.stopPropagation()} style={{
                      position: "absolute", inset: 0,
                      background: "rgba(20,70,65,.78)",
                      backdropFilter: "blur(3px)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      padding: "24px 20px",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity .22s ease",
                      pointerEvents: isHovered ? "auto" : "none",
                    }}>
                      <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,.65)", letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>PRESCRIPTION</p>
                      <p style={{
                        fontFamily: T.sans, fontSize: 13.5, color: "#fff",
                        lineHeight: 1.9, textAlign: "center", fontWeight: 500,
                        padding: "16px 18px",
                        background: "rgba(255,255,255,.12)",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,.2)",
                      }}>
                        ご希望の方は、当院のメールアドレスより処方箋をメールで送信させていただきます。
                      </p>
                    </div>
                  )}
                  {/* ビデオ診療ホバーポップアップ */}
                  {i === 1 && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(20,70,65,.72)",
                      backdropFilter: "blur(3px)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 14,
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity .22s ease",
                      pointerEvents: isHovered ? "auto" : "none",
                    }}
                    onClick={(e) => e.stopPropagation()}>
                      <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,.75)", letterSpacing: 2 }}>ONLINE MEDICAL CARE</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); onOnlineClick && onOnlineClick(e); }}
                        style={{
                          background: "#fff",
                          color: "#2f746f",
                          border: "none",
                          borderRadius: 8,
                          padding: "13px 28px",
                          fontFamily: T.sans,
                          fontSize: 15,
                          fontWeight: 700,
                          cursor: "pointer",
                          letterSpacing: .5,
                          boxShadow: "0 4px 16px rgba(0,0,0,.18)",
                        }}>オンライン診療を行う</button>
                    </div>
                  )}
                  <input ref={inputRefs[i]} type="file" accept="image/*" style={{ display: "none" }} onChange={handleCardImageUpload(i)} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// VISIT
// ══════════════════════════════════════════════════════════
function VisitSection({ T }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // アニメーション CSS をページに注入
    const styleId = "clinic-map-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .clinic-pin { width: 60px; height: 60px; position: relative; }
        .clinic-pin-dot {
          width: 20px; height: 20px; background: #F97316;
          border: 3px solid #fff; border-radius: 50%;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%); z-index: 2;
          box-shadow: 0 2px 10px rgba(249,115,22,.6);
        }
        .clinic-pin-ring {
          width: 20px; height: 20px;
          border: 2.5px solid #F97316; border-radius: 50%;
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: clinicPulse 2.4s ease-out infinite;
        }
        .clinic-pin-ring:nth-child(2) { animation-delay: 0.8s; }
        .clinic-pin-ring:nth-child(3) { animation-delay: 1.6s; }
        @keyframes clinicPulse {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: .9; }
          100% { transform: translate(-50%,-50%) scale(4); opacity: 0; }
        }
        .clinic-popup .leaflet-popup-content-wrapper {
          background: rgba(255,255,255,.97);
          border-radius: 10px;
          box-shadow: 0 8px 28px rgba(0,0,0,.18);
          border: 1px solid rgba(47,116,111,.2);
        }
        .clinic-popup .leaflet-popup-tip { background: rgba(255,255,255,.97); }
      `;
      document.head.appendChild(style);
    }

    const map = L.map(mapRef.current, {
      center: [35.6869, 139.7398],
      zoom: 11,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    // 16km 圏内の円
    L.circle([35.6869, 139.7398], {
      radius: 16000,
      color: "#F97316",
      fillColor: "#F97316",
      fillOpacity: 0.10,
      weight: 2.5,
      dashArray: "10, 6",
    }).addTo(map);

    // アニメーション付きピンマーカー
    const pinIcon = L.divIcon({
      html: `<div class="clinic-pin">
        <div class="clinic-pin-ring"></div>
        <div class="clinic-pin-ring"></div>
        <div class="clinic-pin-ring"></div>
        <div class="clinic-pin-dot"></div>
      </div>`,
      className: "",
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      popupAnchor: [0, -32],
    });

    L.marker([35.6869, 139.7398], { icon: pinIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'Noto Sans JP',sans-serif; padding:4px 2px; min-width:160px;">
          <p style="font-size:11px; color:#2f746f; font-weight:700; letter-spacing:1px; margin-bottom:4px;">CLINIC</p>
          <p style="font-size:15px; font-weight:700; color:#172322; margin-bottom:2px;">うめむら半蔵門内科歯科</p>
          <p style="font-size:12px; color:#5f7370;">千代田区平河町1-7-16</p>
        </div>
      `, { className: "clinic-popup" })
      .openPopup();

    mapInstanceRef.current = map;
    return () => { map.remove(); mapInstanceRef.current = null; };
  }, []);

  return (
    <section id="visit" style={{ padding: "96px 0", background: T.accent, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.25)" }} />
      <div className="visit-inner" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn>
          <p style={{ fontFamily: T.serif, fontSize: 12, letterSpacing: 5, textTransform: "uppercase",
            color: "rgba(255,255,255,.7)", marginBottom: 12, textAlign: "center" }}>Home Visit</p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(28px,4vw,44px)", fontWeight: 400,
            color: "#fff", marginBottom: 48, textAlign: "center" }}>訪問診療</h2>
        </FadeIn>
        <div className="visit-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <FadeIn delay={0.1}>
            <div>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: "rgba(255,255,255,.85)",
                lineHeight: 2.2, marginBottom: 32 }}>{SERVICES.visit.desc}</p>
              <div className="visit-areas" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SERVICES.visit.areas.map(a => (
                  <span key={a} style={{
                    background: "rgba(255,255,255,.15)", color: "#fff",
                    padding: "6px 16px", borderRadius: 20, fontFamily: T.sans,
                    fontSize: 13, border: "1px solid rgba(255,255,255,.3)",
                  }}>{a}</span>
                ))}
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 24 }}>
                ※ 法令上の16km圏内を対象としております
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="visit-map-wrap" style={{
              borderRadius: 16, overflow: "hidden", height: 440,
              border: "2px solid rgba(255,255,255,.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,.35)",
            }}>
              <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,.45)",
              textAlign: "center", marginTop: 10 }}>
              ● クリニック位置　赤破線：訪問診療16km圏内
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// STAFF
// ══════════════════════════════════════════════════════════
function StaffSection({ T, images, updateImage }) {
  return (
    <section id="staff" style={{ padding: "96px 0", background: T.bg }}>
      <div className="staff-inner" style={{ maxWidth: 1060, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="Doctors" main="医師紹介" T={T} /></FadeIn>
        <div className="staff-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(460px,1fr))", gap: 28 }}>
          {DOCTORS.map((doc, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="doctor-card" style={{
                display: "flex",
                gap: 28,
                background: T.surface,
                borderRadius: 16,
                padding: "32px",
                border: `1px solid ${T.border}`,
                height: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,.03)"
              }}>
                <PhotoSlot imgKey={doc.imageKey} url={images[doc.imageKey]} onUpdate={updateImage}
                  style={{ width: 130, height: 130, borderRadius: 12, flexShrink: 0 }}
                  imgStyle={{ objectFit: "cover", objectPosition: "top center" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: T.serif, fontSize: 11, letterSpacing: 3, color: T.accent,
                    textTransform: "uppercase", marginBottom: 8 }}>{doc.title}</p>
                  <h3 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.text, marginBottom: 6 }}>{doc.name}</h3>
                  <p style={{ fontFamily: T.sans, fontSize: 12, color: T.accent, marginBottom: 16,
                    letterSpacing: 1, fontWeight: 700 }}>{doc.specialty}</p>
                  <p style={{ 
                    fontFamily: T.sans, 
                    fontSize: 13.5, 
                    color: T.textSub, 
                    lineHeight: 1.85,
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>{doc.bio}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// HOURS + CONTACT
// ══════════════════════════════════════════════════════════
const ACCESS_GROUPS = [
  {
    label: "徒歩5分以内",
    tone: "primary",
    stations: [
      { name: "半蔵門駅", lines: "半蔵門線", time: "徒歩2〜3分", exit: "1番・6番出口" },
      { name: "麹町駅", lines: "有楽町線", time: "徒歩5分", exit: "1番出口" },
    ],
  },
  {
    label: "徒歩10分以内",
    tone: "secondary",
    stations: [
      { name: "永田町駅", lines: "有楽町線・半蔵門線・南北線", time: "徒歩7〜8分", exit: "4番・5番・9番出口" },
      { name: "赤坂見附駅", lines: "銀座線・丸ノ内線", time: "徒歩8〜10分", exit: "D出口 / 弁慶橋方面" },
      { name: "四ツ谷駅", lines: "JR中央・総武線、南北線・丸ノ内線", time: "徒歩10分", exit: "麹町口" },
    ],
  },
];

function ContactSection({ T, onPhoneClick }) {
  return (
    <section id="contact" style={{ padding: "96px 0", background: T.isDark ? T.surface : T.surface2 }}>
      <div className="contact-inner" style={{ maxWidth: 1060, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="Access" main="アクセス・診療時間" T={T} /></FadeIn>
        <FadeIn delay={0.05}>
          <div style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: "30px 30px 28px",
            marginBottom: 28,
            boxShadow: "0 12px 34px rgba(20,88,82,.07)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 22 }}>
              <div>
                <p style={{ fontFamily: T.serif, fontSize: 12, letterSpacing: 4, color: T.accent, textTransform: "uppercase", marginBottom: 8 }}>
                  Multi Station Access
                </p>
                <h3 style={{ fontFamily: T.serif, fontSize: "clamp(24px,3vw,34px)", fontWeight: 400, color: T.text, lineHeight: 1.35 }}>
                  半蔵門・麹町エリアから、<br />複数路線でアクセスできます
                </h3>
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textSub, lineHeight: 1.8, maxWidth: 340 }}>
                半蔵門駅から徒歩2〜3分。永田町・赤坂見附・四ツ谷方面からも徒歩圏内です。
              </p>
            </div>
            <div className="access-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14 }}>
              {ACCESS_GROUPS.map((group) => (
                <div key={group.label} style={{
                  border: `1px solid ${T.border}`,
                  borderRadius: 12,
                  padding: 18,
                  background: group.tone === "primary" ? `${T.accent}0f` : T.surface2,
                }}>
                  <p style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "5px 10px",
                    borderRadius: 999,
                    background: group.tone === "primary" ? T.accentGrad : T.surface,
                    color: group.tone === "primary" ? "#fff" : T.accent,
                    border: group.tone === "primary" ? "none" : `1px solid ${T.border}`,
                    fontFamily: T.sans,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: .8,
                    marginBottom: 14,
                  }}>
                    {group.label}
                  </p>
                  <div style={{ display: "grid", gap: 12 }}>
                    {group.stations.map((station) => (
                      <div key={station.name} style={{ display: "grid", gap: 4 }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                          <p style={{ fontFamily: T.sans, fontSize: 16, color: T.text, fontWeight: 700 }}>
                            {station.name}
                          </p>
                          <p style={{ fontFamily: T.sans, fontSize: 14, color: T.accent, fontWeight: 700, whiteSpace: "nowrap" }}>
                            {station.time}
                          </p>
                        </div>
                        <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textSub, lineHeight: 1.6 }}>
                          {station.lines} / {station.exit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <div className="contact-hours-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <FadeIn delay={0.1}>
            <div className="contact-card" style={{ background: T.surface, borderRadius: 14, padding: "32px 28px", border: `1px solid ${T.border}` }}>
              <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.text, marginBottom: 20 }}>診療時間</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="hours-table" style={{ width: "100%", borderCollapse: "collapse", minWidth: 430, fontFamily: T.sans }}>
                  <thead>
                    <tr>
                      <th style={{ border: `1px solid ${T.border}`, padding: "8px 6px", fontSize: 13, color: T.text, background: T.surface2, fontWeight: 600 }}>診療時間</th>
                      {CLINIC.hours.days.map(day => (
                        <th key={day} style={{ border: `1px solid ${T.border}`, padding: "8px 6px", fontSize: 13, color: day === "祝" ? "#c0392b" : T.text, background: T.surface2, fontWeight: 600 }}>{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CLINIC.hours.rows.map(row => (
                      <tr key={row.time}>
                        <th style={{ border: `1px solid ${T.border}`, padding: "9px 6px", fontSize: 13, color: T.text, fontWeight: 500, whiteSpace: "nowrap", textAlign: "left" }}>{row.time}</th>
                        {row.slots.map((slot, i) => (
                          <td key={`${row.time}-${i}`} style={{ border: `1px solid ${T.border}`, padding: "9px 6px", textAlign: "center", fontSize: 15, color: slot === "○" ? T.accent : T.textSub, fontWeight: slot === "○" ? 700 : 400 }}>{slot}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textSub, lineHeight: 1.8, marginTop: 12 }}>
                ○：診療あり　-：休診
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="contact-card" style={{ background: T.surface, borderRadius: 14, padding: "32px 28px", border: `1px solid ${T.border}` }}>
              <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 400, color: T.text, marginBottom: 20 }}>クリニック情報</h3>
              {[
                { label: "住所", value: `${CLINIC.zip} ${CLINIC.address}` },
                { label: "電話", value: CLINIC.tel },
                { label: "メール", value: CLINIC.email },
              ].map((r, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, letterSpacing: 1.5, marginBottom: 4 }}>{r.label}</p>
                  <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text, wordBreak: "break-all", overflowWrap: "break-word" }}>{r.value}</p>
                </div>
              ))}
              <button onClick={onPhoneClick} style={{
                display: "block", marginTop: 20, width: "100%", background: T.accentGrad,
                color: "#fff", padding: "14px", borderRadius: 8, textAlign: "center",
                fontFamily: T.sans, fontSize: 14, border: "none", cursor: "pointer", letterSpacing: 1,
              }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <PhoneIcon size={17} />ご予約・お問い合わせ
                </span>
              </button>
            </div>
          </FadeIn>
        </div>
        {/* Google Map placeholder */}
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 32, borderRadius: 14, overflow: "hidden", border: `1px solid ${T.border}`, height: 300 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.6!2d139.7398!3d35.6869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzEyLjgiTiAxMznCsDQ0JzIzLjMiRQ!5e0!3m2!1sja!2sjp!4v1"
              width="100%" height="300" style={{ border: 0 }} loading="lazy" title="map"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function InquirySection({ T }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // 実際の運用ではここでAPIを叩きます。
    // 今回は送信完了のデモンストレーションとして、2秒後に成功状態へ移行させます。
    setTimeout(() => {
      setStatus("success");
      e.target.reset();
    }, 2000);
  };

  const inputStyle = {
    width: "100%",
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    padding: "12px 13px",
    fontFamily: T.sans,
    fontSize: 14,
    color: T.text,
    background: T.surface,
    outline: "none",
  };

  return (
    <section id="inquiry" style={{ padding: "96px 0", background: T.bg }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="Contact Form" main="お問い合わせフォーム" T={T} /></FadeIn>
        <div className="inquiry-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 28, alignItems: "start" }}>
          <FadeIn delay={0.05}>
            <div style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 14, padding: 26 }}>
              <h3 style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.text, marginBottom: 14 }}>
                ご相談・ご予約前の確認に
              </h3>
              <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.textSub, lineHeight: 1.9, marginBottom: 16 }}>
                必要事項を入力して送信してください。内容を確認次第、担当者より折り返しご連絡を差し上げます。
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textSub, lineHeight: 1.8 }}>
                緊急性のある症状、当日の診療予約、予約変更はお電話またはLINE問診をご利用ください。
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 28 }}>
              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
                  <h4 style={{ fontFamily: T.sans, fontSize: 18, color: T.text, marginBottom: 12 }}>送信が完了しました</h4>
                  <p style={{ fontFamily: T.sans, fontSize: 14, color: T.textSub, lineHeight: 1.6 }}>
                    お問い合わせありがとうございます。<br />
                    内容を確認し、近日中にご連絡させていただきます。
                  </p>
                  <button onClick={() => setStatus("idle")} style={{
                    marginTop: 24, background: "none", border: `1px solid ${T.accent}`,
                    color: T.accent, padding: "8px 20px", borderRadius: 6, cursor: "pointer",
                    fontFamily: T.sans, fontSize: 13
                  }}>戻る</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <label style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub, display: "grid", gap: 7 }}>
                      お名前
                      <input name="name" required style={inputStyle} disabled={status === "sending"} />
                    </label>
                    <label style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub, display: "grid", gap: 7 }}>
                      ふりがな
                      <input name="kana" style={inputStyle} disabled={status === "sending"} />
                    </label>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <label style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub, display: "grid", gap: 7 }}>
                      メールアドレス
                      <input name="email" type="email" required style={inputStyle} disabled={status === "sending"} />
                    </label>
                    <label style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub, display: "grid", gap: 7 }}>
                      電話番号
                      <input name="tel" type="tel" style={inputStyle} disabled={status === "sending"} />
                    </label>
                  </div>
                  <label style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub, display: "grid", gap: 7 }}>
                    お問い合わせ種別
                    <select name="category" style={inputStyle} defaultValue="診療・予約について" disabled={status === "sending"}>
                      <option>診療・予約について</option>
                      <option>オンライン診療について</option>
                      <option>訪問診療について</option>
                      <option>歯科診療について</option>
                      <option>その他</option>
                    </select>
                  </label>
                  <label style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub, display: "grid", gap: 7 }}>
                    お問い合わせ内容
                    <textarea name="message" required rows={6} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }} disabled={status === "sending"} />
                  </label>
                  <button type="submit" disabled={status === "sending"} style={{
                    border: "none",
                    borderRadius: 8,
                    padding: "14px 18px",
                    background: status === "sending" ? T.textSub : T.accentGrad,
                    color: "#fff",
                    fontFamily: T.sans,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: .8,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}>
                    {status === "sending" ? "送信中..." : "内容を送信する"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ title, children, T, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}`, overflow: "hidden" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          outline: "none"
        }}
      >
        <span style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.text }}>{title}</span>
        <span style={{ 
          fontSize: 12, 
          color: T.accent, 
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease"
        }}>▼</span>
      </button>
      <div style={{
        maxHeight: isOpen ? "1000px" : "0",
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transition: "all 0.4s ease",
        paddingBottom: isOpen ? 20 : 0
      }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, color: T.textSub, lineHeight: 1.85 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function FaqSection({ T }) {
  const faqs = [
    { q: "外来診療の予約方法を教えてください。", a: "完全予約制です。LINE問診票にご回答いただくと受付がスムーズです。お急ぎの場合はお電話でもご相談ください。" },
    { q: "オンライン診療はどのように受診しますか。", a: "事前予約後、ビデオ診療のご案内をお送りします。診療後は処方箋メール送付・調剤薬局でのお受け取りに対応します。" },
    { q: "内科と歯科を同じ日に相談できますか。", a: "診療内容や予約状況により調整可能です。お問い合わせ時にご希望内容をお知らせください。" },
    { q: "訪問診療の対応エリアはどこですか。", a: "千代田区を中心に、法令上の16km圏内を対象としております。詳細は個別にご相談ください。" },
  ];

  return (
    <section id="faq" style={{ padding: "96px 0", background: T.isDark ? T.surface : T.surface2 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="FAQ" main="よくある質問" T={T} /></FadeIn>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "10px 30px" }}>
          {faqs.map((item, i) => (
            <AccordionItem key={i} title={`Q. ${item.q}`} T={T}>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ color: T.accent, fontWeight: 700 }}>A.</span>
                <span>{item.a}</span>
              </div>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function MedicalAdditionsSection({ T }) {
  const additions = [
    { title: "当クリニックの施設基準について", content: "当クリニックは、厚生労働省が定める以下の診療報酬加算を取得しており、より質の高い医療サービスをご提供しています。" },
    ...MEDICAL_ADDITIONS.map(title => ({ title, content: "詳細な施設基準に基づき、適切な診療体制を整えております。" }))
  ];

  return (
    <section id="medical-additions" style={{ padding: "96px 0", background: T.bg }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="Medical Additions" main="診療報酬加算" T={T} /></FadeIn>
        <FadeIn delay={0.05}>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "10px 30px" }}>
            {additions.map((item, i) => (
              <AccordionItem key={i} title={item.title} T={T}>
                {item.content}
              </AccordionItem>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PrivacyPolicySection({ T }) {
  const policies = [
    { title: "個人情報の取得", body: "当院は、診療予約、問診、お問い合わせ対応、医療サービスの提供に必要な範囲で、適法かつ公正な手段により個人情報を取得します。" },
    { title: "利用目的", body: "取得した個人情報は、診療・看護・歯科医療の提供、予約管理、患者様への連絡、会計、医療機関・薬局等との連携、お問い合わせへの回答に利用します。" },
    { title: "第三者提供", body: "法令に基づく場合、生命・身体の保護に必要な場合、医療提供上必要な連携を行う場合を除き、本人の同意なく第三者へ提供しません。" },
    { title: "安全管理", body: "個人情報の漏えい、紛失、改ざん等を防ぐため、院内での管理体制を整備し、必要かつ適切な安全管理措置を講じます。" },
    { title: "開示・訂正等", body: "ご本人から個人情報の開示、訂正、利用停止等のご希望があった場合は、法令に従い適切に対応します。" },
    { title: "お問い合わせ窓口", body: `${CLINIC.name}　${CLINIC.email} / ${CLINIC.tel}` },
  ];

  return (
    <section id="privacy" style={{ padding: "96px 0", background: T.bg }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
        <FadeIn><SectionTitle sub="Privacy Policy" main="プライバシーポリシー" T={T} /></FadeIn>
        <FadeIn delay={0.05}>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "10px 30px" }}>
            <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.textSub, lineHeight: 1.9, padding: "20px 0", borderBottom: `1px solid ${T.border}` }}>
              当院は、患者様の個人情報を適切に取り扱うことが医療機関としての重要な責務であると認識し、個人情報保護に関する法令および関連ガイドラインを遵守します。
            </p>
            {policies.map((item, i) => (
              <AccordionItem key={i} title={item.title} T={T}>
                {item.body}
              </AccordionItem>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════
function Footer({ T, logo }) {
  const menuLinks = [
    { label: "外来診療", href: "#services" },
    { label: "オンライン診療", href: "#online" },
    { label: "訪問診療", href: "#visit" },
    { label: "医師紹介", href: "#staff" },
  ];
  const infoLinks = [
    { label: "対応エリア", href: "#visit" },
    { label: "よくある質問", href: "#faq" },
    { label: "お問い合わせ", href: "#inquiry" },
    { label: "プライバシーポリシー", href: "#privacy" },
  ];
  const footerLinkStyle = {
    display: "block",
    fontFamily: T.sans,
    fontSize: 12.5,
    color: "rgba(220,230,228,.58)",
    padding: "5px 0",
    textDecoration: "none",
    transition: "color .2s",
  };

  return (
    <footer style={{ background: T.footer, padding: "48px 32px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 32, marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <LogoDisplay logo={logo} T={{ ...T, accent: "#888" }} size={22} />
              <span style={{ fontFamily: T.sans, fontSize: 13, color: "#bbb", letterSpacing: .5 }}>{CLINIC.name}</span>
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 12.5, color: "rgba(200,200,200,.4)", lineHeight: 2 }}>
              {CLINIC.zip} {CLINIC.address}<br />TEL: {CLINIC.tel}<br />MAIL: {CLINIC.email}
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, marginBottom: 14, letterSpacing: 2 }}>MENU</h4>
            {menuLinks.map((l) => (
              <a key={l.label} href={l.href} style={footerLinkStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(220,230,228,.58)"}
              >{l.label}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, marginBottom: 14, letterSpacing: 2 }}>INFO</h4>
            {infoLinks.map((l) => (
              <a key={l.label} href={l.href} style={footerLinkStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(220,230,228,.58)"}
              >{l.label}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 18, textAlign: "center" }}>
          <p style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(200,200,200,.2)", letterSpacing: 1.5 }}>
            © 2026 {CLINIC.name} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════
// LINE QUESTIONNAIRE POPUP
// ══════════════════════════════════════════════════════════
function LineQuestionnairePopup({ T }) {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const lineTone = "#2f746f";
  const lineToneLight = "#4f938c";
  const lineGrad = `linear-gradient(135deg,${lineToneLight},${lineTone})`;

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => setShowContent(true), 270);
  };
  const handleClose = () => {
    setShowContent(false);
    setOpen(false);
  };

  return (
    <div className="line-widget" style={{
      position: "fixed",
      right: 22,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1500,
      width: open ? 332 : 58,
      transition: "width .25s ease",
    }}>
      {open ? (
        <div style={{
          background: "#fff",
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          boxShadow: "0 18px 54px rgba(20,60,58,.18)",
          overflow: "hidden",
          opacity: showContent ? 1 : 0,
          transition: "opacity .2s ease",
        }}>
          <div style={{
            background: lineGrad,
            color: "#fff",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}>
            <div>
              <p style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: 2.4, marginBottom: 5 }}>
                LINE MEDICAL FORM
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 20, fontWeight: 700, letterSpacing: .4 }}>
                LINE問診票
              </p>
            </div>
            <button type="button" onClick={handleClose} aria-label="LINE問診案内を閉じる" style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.45)",
              background: "rgba(255,255,255,.16)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
              lineHeight: 1,
            }}>×</button>
          </div>
          <div style={{ padding: "22px 20px 20px" }}>
            <p style={{ fontFamily: T.sans, fontSize: 15, color: T.text, fontWeight: 700, lineHeight: 1.7, marginBottom: 12 }}>
              ご来院前にLINEで問診票へ回答できます
            </p>
            <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textSub, lineHeight: 1.9, marginBottom: 18 }}>
              友だち追加後、LINEのトーク画面に問診票URLが届きます。先にご回答いただくと、受付から診療までの流れがスムーズです。
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              <button onClick={() => window.open(import.meta.env.BASE_URL + 'line-add.html', '_blank')} style={{
                display: "block",
                textAlign: "center",
                background: lineGrad,
                color: "#fff",
                padding: "14px 16px",
                borderRadius: 8,
                fontFamily: T.sans,
                fontSize: 13,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                lineHeight: 1.5,
                boxShadow: "0 6px 16px rgba(47,116,111,.26)",
                outline: "none",
                WebkitUserDrag: "none",
                userSelect: "none",
                WebkitAppearance: "none",
              }}>LINEで友だち登録をして<br />問診票に回答する</button>
              <button onClick={() => { window.open(LINE.questionnaireUrl, '_blank'); }} style={{
                display: "block",
                textAlign: "center",
                background: T.surface2,
                color: T.text,
                padding: "11px 14px",
                borderRadius: 8,
                border: `1px solid ${T.border}`,
                fontFamily: T.sans,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}>オンライン問診票に回答する（直接）</button>
            </div>
          </div>
        </div>
      ) : (
        <button type="button" onClick={handleOpen} aria-label="LINE問診案内を開く" style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "none",
          background: lineGrad,
          color: "#fff",
          cursor: "pointer",
          fontFamily: T.sans,
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1.25,
          boxShadow: "0 10px 28px rgba(47,116,111,.32)",
        }}>LINE<br />問診</button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PHONE CONFIRM MODAL
// ══════════════════════════════════════════════════════════
function PhoneConfirmModal({ T, open, onClose, note }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 3000,
      background: "rgba(12,24,23,.52)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 22,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(380px,100%)", background: T.surface, borderRadius: 16,
        overflow: "hidden", boxShadow: "0 24px 72px rgba(0,0,0,.3)",
        border: `1px solid ${T.border}`,
      }}>
        <div style={{ background: T.accentGrad, padding: "18px 22px", color: "#fff" }}>
          <p style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>PHONE CONTACT</p>
          <h3 style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 700 }}>お電話でのご連絡</h3>
        </div>
        <div style={{ padding: "22px 22px 20px" }}>
          {note && (
            <div style={{
              background: "#FFF7ED", border: "1px solid #FDBA74", borderRadius: 8,
              padding: "10px 14px", marginBottom: 16,
              fontFamily: T.sans, fontSize: 13, color: "#92400E", lineHeight: 1.7,
            }}>⚠️ {note}</div>
          )}
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textSub, marginBottom: 14, lineHeight: 1.8 }}>
            下記番号にお電話ください。受付時間内にお気軽にお問い合わせいただけます。
          </p>
          <div style={{
            background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 12,
            padding: "16px", textAlign: "center", marginBottom: 18,
          }}>
            <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub, marginBottom: 4 }}>受付電話番号</p>
            <p style={{ fontFamily: T.sans, fontSize: 26, fontWeight: 700, color: T.accent, letterSpacing: 1 }}>
              📞 {CLINIC.tel}
            </p>
          </div>
          <a href={`tel:${CLINIC.tel}`} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: T.accentGrad, color: "#fff", borderRadius: 8,
            padding: "14px", fontFamily: T.sans, fontSize: 15, fontWeight: 700,
            textDecoration: "none", marginBottom: 10,
            boxShadow: `0 6px 18px ${T.accent}36`,
          }} onClick={onClose}>
            <PhoneIcon size={17} />発信する
          </a>
          <button onClick={onClose} style={{
            width: "100%", background: "none", border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "11px", fontFamily: T.sans, fontSize: 14,
            color: T.textSub, cursor: "pointer",
          }}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// ONLINE CHOICE MODAL
// ══════════════════════════════════════════════════════════
function OnlineChoiceModal({ T, open, onClose, onPhoneForOnline }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 3000,
      background: "rgba(12,24,23,.52)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 22,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(440px,100%)", background: T.surface, borderRadius: 16,
        overflow: "hidden", boxShadow: "0 24px 72px rgba(0,0,0,.3)",
        border: `1px solid ${T.border}`,
      }}>
        <div style={{ background: T.accentGrad, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,.8)", marginBottom: 4 }}>ONLINE MEDICAL CARE</p>
            <h3 style={{ fontFamily: T.sans, fontSize: 19, fontWeight: 700, color: "#fff" }}>オンライン診療</h3>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.4)", borderRadius: "50%", width: 30, height: 30, color: "#fff", cursor: "pointer", fontSize: 17 }}>×</button>
        </div>
        <div style={{ padding: "22px 22px 20px" }}>
          <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.textSub, marginBottom: 20, lineHeight: 1.8 }}>
            ご希望の方法をお選びください。
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {/* 選択肢1: 今すぐ */}
            <button onClick={onPhoneForOnline} style={{
              background: T.surface2, border: `1.5px solid ${T.border}`,
              borderRadius: 10, padding: "16px 18px", textAlign: "left", cursor: "pointer",
              transition: "border-color .2s, box-shadow .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow = `0 4px 16px ${T.accent}22`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
              <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>
                📞 今すぐオンライン診療を希望する
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 12, color: "#B45309", lineHeight: 1.6 }}>
                ※ まずは電話での予約が必要です
              </p>
            </button>
            {/* 選択肢2: 予約取得 */}
            <button onClick={() => { onClose(); window.open(BOOKING_URL, "_blank"); }} style={{
              background: T.accentGrad, border: "none",
              borderRadius: 10, padding: "16px 18px", textAlign: "left", cursor: "pointer",
              boxShadow: `0 6px 18px ${T.accent}36`,
            }}>
              <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                🗓 オンライン診療の予約取得をする
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,.8)", lineHeight: 1.6 }}>
                オンライン予約フォームで日時・内容を選択できます
              </p>
            </button>
          </div>
          <button onClick={onClose} style={{
            marginTop: 14, width: "100%", background: "none", border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "10px", fontFamily: T.sans, fontSize: 13,
            color: T.textSub, cursor: "pointer",
          }}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}

function BookingGuidanceModal({ T, open, onClose, onPhoneClick }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-guidance-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2600,
        background: "rgba(12,24,23,.46)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 22,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(440px,100%)",
          background: T.surface,
          borderRadius: 14,
          overflow: "hidden",
          border: `1px solid ${T.border}`,
          boxShadow: "0 24px 72px rgba(0,0,0,.26)",
        }}
      >
        <div style={{
          background: T.accentGrad,
          color: "#fff",
          padding: "20px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
        }}>
          <div>
            <p style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>
              RESERVATION GUIDE
            </p>
            <h3 id="booking-guidance-title" style={{ fontFamily: T.sans, fontSize: 19, lineHeight: 1.45, fontWeight: 700 }}>
              ご予約前のご案内
            </h3>
          </div>
          <button type="button" onClick={onClose} aria-label="予約案内を閉じる" style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.45)",
            background: "rgba(255,255,255,.14)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}>×</button>
        </div>
        <div style={{ padding: "24px 22px 22px" }}>
          <p style={{ fontFamily: T.sans, fontSize: 15, color: T.text, fontWeight: 700, lineHeight: 1.75, marginBottom: 10 }}>
            オンライン問診票にご回答いただくと、受付から診療までがスムーズです。
          </p>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textSub, lineHeight: 1.9, marginBottom: 20 }}>
            問診票のご回答後、診察がスムーズになります。お急ぎの場合はお電話でもご対応いたします。
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            <button onClick={() => { onClose(); window.open(LINE.questionnaireUrl, "_blank"); }} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              minHeight: 52, borderRadius: 8, background: T.accentGrad,
              color: "#fff", fontFamily: T.sans, fontSize: 15, fontWeight: 700,
              border: "none", cursor: "pointer", boxShadow: `0 8px 22px ${T.accent}36`,
            }}>
              オンライン問診票に回答する
            </button>
            <button onClick={onPhoneClick} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 9, minHeight: 50, borderRadius: 8,
              border: `1px solid ${T.border}`, background: T.surface2,
              color: T.text, fontFamily: T.sans, fontSize: 14, fontWeight: 700,
              cursor: "pointer",
            }}>
              <PhoneIcon size={18} />直接電話をかける
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SETTINGS PANEL
// ══════════════════════════════════════════════════════════
function SettingsPanel({ T, settings, updateSettings, resetImages, exportSettings, importSettings }) {
  const [open, setOpen] = useState(false);
  const importRef = useRef(null);
  const themeNames = Object.entries(THEMES).map(([k, v]) => ({ key: k, name: v.name }));
  const layouts = ["A", "B", "C", "D"];
  const layoutLabels = { A: "Classic", B: "Full Hero", C: "Split", D: "Minimal" };

  return (
    <>
      {/* Toggle button */}
      <div style={{ position: "fixed", top: 80, right: 20, zIndex: 2000 }}>
        <button onClick={() => setOpen(o => !o)} style={{
          background: T.accentGrad, color: "#fff", border: "none", cursor: "pointer",
          borderRadius: 6, padding: "8px 14px", fontFamily: T.sans, fontSize: 12,
          boxShadow: `0 4px 16px ${T.accent}40`, letterSpacing: .5,
        }}>⚙ 設定</button>
      </div>
      {/* Panel */}
      {open && (
        <div style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 280, zIndex: 1999,
          background: T.surface, borderLeft: `1px solid ${T.border}`,
          padding: "80px 24px 32px", overflowY: "auto",
          boxShadow: "-8px 0 32px rgba(0,0,0,.15)",
        }}>
          <button onClick={() => setOpen(false)} style={{
            position: "absolute", top: 20, right: 20, background: "none",
            border: "none", cursor: "pointer", fontSize: 22, color: T.textSub,
          }}>×</button>
          <h3 style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 24 }}>サイト設定</h3>

          {/* Theme */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, letterSpacing: 2, marginBottom: 10 }}>カラーテーマ</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {themeNames.map(t => (
                <button key={t.key} onClick={() => updateSettings({ theme: t.key })} style={{
                  padding: "5px 12px", borderRadius: 4, fontFamily: T.sans, fontSize: 12,
                  border: `1.5px solid ${settings.theme === t.key ? T.accent : T.border}`,
                  background: settings.theme === t.key ? `${T.accent}18` : T.surface,
                  color: settings.theme === t.key ? T.accent : T.textSub, cursor: "pointer",
                }}>{t.name}</button>
              ))}
            </div>
          </div>

          {/* Layout */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, letterSpacing: 2, marginBottom: 10 }}>レイアウト</p>
            <div style={{ display: "flex", gap: 6 }}>
              {layouts.map(l => (
                <button key={l} onClick={() => updateSettings({ layout: l })} style={{
                  padding: "5px 12px", borderRadius: 4, fontFamily: T.sans, fontSize: 12,
                  border: `1.5px solid ${settings.layout === l ? T.accent : T.border}`,
                  background: settings.layout === l ? `${T.accent}18` : T.surface,
                  color: settings.layout === l ? T.accent : T.textSub, cursor: "pointer",
                }}>{l}: {layoutLabels[l]}</button>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, letterSpacing: 2, marginBottom: 10 }}>ロゴ</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10,
              padding: "12px", background: T.surface2, borderRadius: 8, border: `1px solid ${T.border}` }}>
              <LogoDisplay logo={settings.logo} T={T} size={32} />
              <span style={{ fontFamily: T.sans, fontSize: 12, color: T.textSub }}>現在のロゴ</span>
            </div>
            <input type="file" accept="image/*" style={{ display: "none" }}
              id="logo-upload-input"
              onChange={e => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  updateSettings({ logo: { ...settings.logo, type: "image", logoUrl: ev.target.result } });
                };
                reader.readAsDataURL(file);
              }} />
            <button onClick={() => document.getElementById("logo-upload-input").click()} style={{
              width: "100%", marginBottom: 8, padding: "8px", borderRadius: 6, fontFamily: T.sans,
              fontSize: 13, border: `1px solid ${T.border}`, background: T.surface2,
              color: T.text, cursor: "pointer",
            }}>📁 ロゴ画像をアップロード</button>
            <button onClick={() => updateSettings({ logo: { ...settings.logo, type: "svg", logoUrl: "" } })} style={{
              width: "100%", padding: "8px", borderRadius: 6, fontFamily: T.sans,
              fontSize: 13, border: `1px solid ${T.border}`, background: T.surface2,
              color: T.textSub, cursor: "pointer",
            }}>デフォルトロゴに戻す</button>
          </div>

          {/* Photo reset */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, letterSpacing: 2, marginBottom: 10 }}>写真</p>
            <button onClick={resetImages} style={{
              width: "100%", padding: "8px", borderRadius: 6, fontFamily: T.sans,
              fontSize: 13, border: `1px solid ${T.border}`, background: T.surface2,
              color: T.textSub, cursor: "pointer",
            }}>デフォルト写真に戻す</button>
          </div>

          {/* Export / Import */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, letterSpacing: 2, marginBottom: 10 }}>設定の保存・復元</p>
            <button onClick={exportSettings} style={{
              width: "100%", marginBottom: 8, padding: "9px", borderRadius: 6,
              fontFamily: T.sans, fontSize: 13, border: "none",
              background: T.accentGrad, color: "#fff", cursor: "pointer",
            }}>⬇ 設定をエクスポート (.json)</button>
            <button onClick={() => importRef.current?.click()} style={{
              width: "100%", padding: "9px", borderRadius: 6,
              fontFamily: T.sans, fontSize: 13, border: `1px solid ${T.border}`,
              background: T.surface2, color: T.textSub, cursor: "pointer",
            }}>⬆ 設定をインポート (.json)</button>
            <input ref={importRef} type="file" accept=".json" style={{ display: "none" }}
              onChange={e => { if (e.target.files[0]) importSettings(e.target.files[0]); }} />
          </div>

          <p style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textSub, lineHeight: 1.8, marginTop: 20 }}>
            💡 設定はブラウザに自動保存されます。写真の差し替えは各画像をクリックしてください。
          </p>
        </div>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════
export default function App() {
  const { settings, updateSettings, updateImage, resetImages, exportSettings, importSettings } = usePersistentSettings();
  const T = THEMES[settings.theme] || THEMES.silver;
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [onlineChoiceOpen, setOnlineChoiceOpen] = useState(false);
  const [phoneConfirmOpen, setPhoneConfirmOpen] = useState(false);
  const [phoneConfirmNote, setPhoneConfirmNote] = useState("");

  const openBookingGuidance = useCallback((e) => {
    e.preventDefault();
    setBookingModalOpen(true);
  }, []);

  const openOnlineChoice = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    setOnlineChoiceOpen(true);
  }, []);

  const openPhoneConfirm = useCallback((e, note) => {
    e.preventDefault();
    setPhoneConfirmNote(note || "");
    setPhoneConfirmOpen(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Serif+Display&family=Noto+Sans+JP:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400&family=Playfair+Display:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;overflow-x:hidden}
        body{background:${T.bg};color:${T.text};font-family:${T.sans};overflow-x:hidden}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-track{background:${T.surface2}}
        ::-webkit-scrollbar-thumb{background:${T.accent}66;border-radius:3px}
        @keyframes breathe{0%,100%{box-shadow:0 6px 24px ${T.accent}40}50%{box-shadow:0 8px 36px ${T.accent}70}}
        .services-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
        @media (max-width:900px){.access-grid{grid-template-columns:1fr!important}}
        @media (max-width:900px){.services-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (max-width:620px){.services-grid{grid-template-columns:1fr}}
        @media (max-width:980px){
          .nav-menu-link{display:none!important}
          .nav-links{gap:12px!important}
        }
        @media (max-width:760px){
          nav{padding:0 14px!important}
          .nav-menu-link{display:none!important}
          .nav-clinic-text{display:none!important}
          .nav-links{gap:8px!important}
          .nav-online{padding:6px 10px!important;font-size:11.5px!important}
          .nav-booking{padding:6px 11px!important;font-size:11.5px!important}
          .line-widget{right:16px!important;top:auto!important;bottom:92px!important;transform:none!important}
          .online-grid{grid-template-columns:1fr!important;gap:16px!important}
          .visit-grid{grid-template-columns:1fr!important;gap:28px!important}
          .visit-inner{padding:0 16px!important}
          .visit-areas{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important}
          .visit-map-wrap{height:300px!important;border-radius:12px!important}
          .staff-inner{padding:0 16px!important}
          .staff-grid{grid-template-columns:1fr!important}
          .doctor-card{flex-direction:column!important;padding:20px 16px!important;gap:16px!important;align-items:flex-start!important}
          .inquiry-grid{grid-template-columns:1fr!important;gap:20px!important}
          .footer-grid{grid-template-columns:1fr!important;gap:24px!important}
          .contact-hours-grid{grid-template-columns:1fr!important;gap:20px!important}
          .contact-inner{padding:0 16px!important}
          .contact-card{padding:20px 16px!important}
          .hours-table{min-width:0!important;width:100%!important}
          .hours-table th,.hours-table td{padding:6px 3px!important;font-size:11.5px!important}
        }
        @media (max-width:900px) and (min-width:761px){
          .online-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      <Nav T={T} logo={settings.logo} onOnlineClick={openOnlineChoice} onPhoneClick={openPhoneConfirm} />
      <HeroFullImage T={T} images={settings.images} updateImage={updateImage} onOnlineClick={openOnlineChoice} onPhoneClick={openPhoneConfirm} />
      <ServicesSection T={T} />
      <PhotoCarousel T={T} images={settings.images} updateImage={updateImage} />
      <OnlineSection T={T} images={settings.images} updateImage={updateImage} onBookingClick={() => window.open(BOOKING_URL, "_blank")} onOnlineClick={openOnlineChoice} />
      <VisitSection T={T} />
      <StaffSection T={T} images={settings.images} updateImage={updateImage} />
      <ContactSection T={T} onPhoneClick={openPhoneConfirm} />
          <InquirySection T={T} />
          <FaqSection T={T} />
          <MedicalAdditionsSection T={T} />
          <PrivacyPolicySection T={T} />
      <Footer T={T} logo={settings.logo} />
      <LineQuestionnairePopup T={T} />
      <BookingGuidanceModal T={T} open={bookingModalOpen} onClose={() => setBookingModalOpen(false)} onPhoneClick={(e) => { setBookingModalOpen(false); openPhoneConfirm(e); }} />
      <OnlineChoiceModal T={T} open={onlineChoiceOpen} onClose={() => setOnlineChoiceOpen(false)}
        onPhoneForOnline={() => { setOnlineChoiceOpen(false); setPhoneConfirmNote("オンライン診療をご希望の場合は、まずお電話にてご予約をお取りください。"); setPhoneConfirmOpen(true); }} />
      <PhoneConfirmModal T={T} open={phoneConfirmOpen} onClose={() => setPhoneConfirmOpen(false)} note={phoneConfirmNote} />

    </>
  );
}
