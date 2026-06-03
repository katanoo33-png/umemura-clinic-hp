// グラデーション定義 + 洗練されたイラスト風アイコン
const createGradient = (id, color1, color2) => (
  <defs>
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style={{ stopColor: color1, stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: color2, stopOpacity: 1 }} />
    </linearGradient>
  </defs>
);

export const ICONS = {
  stethoscope: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-steth", "#D4C4B0", "#E8D9CC")}
      <circle cx="12" cy="8" r="3.5" fill="url(#grad-steth)" stroke={c} strokeWidth="0.8"/>
      <path d="M8.5 11.5C8.5 11.5 7 13 7 15c0 2.5 1.5 4 2.5 4.5" fill="none" stroke="url(#grad-steth)" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M15.5 11.5C15.5 11.5 17 13 17 15c0 2.5-1.5 4-2.5 4.5" fill="none" stroke="url(#grad-steth)" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="5" cy="18" r="1.2" fill={c}/>
      <circle cx="19" cy="18" r="1.2" fill={c}/>
    </svg>
  ),
  microscope: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-micro", "#C7DDE8", "#DDE9F2")}
      <ellipse cx="12" cy="8" rx="3.5" ry="4" fill="url(#grad-micro)" stroke={c} strokeWidth="0.8"/>
      <rect x="10" y="11.5" width="4" height="5" rx="0.8" fill={c} opacity="0.3"/>
      <line x1="12" y1="16.5" x2="12" y2="19" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="8" y="19" width="8" height="1.5" rx="0.5" fill={c} opacity="0.4"/>
      <path d="M5 12c0-3 2-5 5-5" fill="none" stroke="url(#grad-micro)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  skin: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-skin", "#F5D9D9", "#FADADF")}
      <circle cx="12" cy="12" r="8" fill="url(#grad-skin)" stroke={c} strokeWidth="0.8"/>
      <path d="M9.5 13.5C10.5 14.5 11.5 15 12 15C12.5 15 13.5 14.5 14.5 13.5" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="9.5" cy="10" r="1.2" fill={c}/>
      <circle cx="14.5" cy="10" r="1.2" fill={c}/>
    </svg>
  ),
  tooth: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-tooth", "#F0E8E0", "#F9F1EB")}
      <path d="M12 2C10 2 8 3 8 6c0 2 0.5 4 1 6c0.5 1.5 1 3 1.5 3.5c0.5 0.5 1 0.5 1.5 0.5s1 0 1.5-0.5c0.5-0.5 1-2 1.5-3.5c0.5-2 1-4 1-6c0-3-2-4-4-4z" fill="url(#grad-tooth)" stroke={c} strokeWidth="0.8"/>
      <path d="M11 7v5" stroke={c} strokeWidth="0.6" opacity="0.4"/>
    </svg>
  ),
  sparkle: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-spark", "#F5D4B0", "#FADADF")}
      <path d="M12 2L14 9L21 11L15 16L16.5 22L12 19L7.5 22L9 16L3 11L10 9Z" fill="url(#grad-spark)" stroke={c} strokeWidth="0.6"/>
      <circle cx="12" cy="11" r="2" fill={c} opacity="0.3"/>
    </svg>
  ),
  pill: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-pill", "#D9E8F5", "#E8F0FA")}
      <ellipse cx="9" cy="12" rx="2.5" ry="4.5" fill="url(#grad-pill)" stroke={c} strokeWidth="0.8"/>
      <ellipse cx="15" cy="12" rx="2.5" ry="4.5" fill={c} opacity="0.2" stroke={c} strokeWidth="0.8"/>
      <line x1="12" y1="7.5" x2="12" y2="16.5" stroke={c} strokeWidth="0.6" opacity="0.4"/>
    </svg>
  ),
  male: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-male", "#B8D4E8", "#D4E5F2")}
      <circle cx="10" cy="9" r="3.5" fill="url(#grad-male)" stroke={c} strokeWidth="0.8"/>
      <path d="M6 13.5C6 13.5 6 11 10 11C14 11 14 13.5 14 13.5L14 17C14 18 13 19 12 19" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="17" y1="6" x2="20" y2="9" stroke="url(#grad-male)" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="20 6 20 10 16 10" fill="none" stroke={c} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  iv: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-iv", "#D9E8D4", "#E8F0E0")}
      <rect x="8.5" y="10" width="7" height="5" rx="0.8" fill="url(#grad-iv)" stroke={c} strokeWidth="0.8"/>
      <line x1="12" y1="2" x2="12" y2="9.5" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="15" x2="12" y2="19" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 19l-1.5 3" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14.5 19l1.5 3" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="10" cy="2.5" r="0.6" fill={c}/>
    </svg>
  ),
  monitor: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-monitor", "#E0D4E8", "#F0E8F5")}
      <rect x="3" y="4" width="18" height="11" rx="1.2" fill="url(#grad-monitor)" stroke={c} strokeWidth="0.8"/>
      <line x1="6" y1="16" x2="18" y2="16" stroke={c} strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="16" x2="11" y2="18.5" stroke={c} strokeWidth="1" strokeLinecap="round"/>
      <path d="M7 8l2.5 3 3-4 3 2" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  home: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-home", "#D9E8D4", "#E8F0E0")}
      <path d="M3 11L12 3L21 11V20C21 21 20 22 19 22H5C4 22 3 21 3 20Z" fill="url(#grad-home)" stroke={c} strokeWidth="0.8"/>
      <rect x="9" y="13" width="6" height="9" fill={c} opacity="0.2"/>
      <line x1="12" y1="13" x2="12" y2="22" stroke={c} strokeWidth="0.6" opacity="0.4"/>
    </svg>
  ),
  dove: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-dove", "#D9E8F5", "#E8F0FA")}
      <ellipse cx="12" cy="13" rx="5" ry="4" fill="url(#grad-dove)" stroke={c} strokeWidth="0.8"/>
      <circle cx="15" cy="11" r="2.5" fill={c} opacity="0.3"/>
      <path d="M17 9C18.5 8.5 20 9 20 11C20 13 19 14.5 17.5 14.5" fill="none" stroke="url(#grad-dove)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M16 6.5C16.5 5.5 18 5 19 5.5" fill="none" stroke={c} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  phone: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-phone", "#D9E8D4", "#E8F0E0")}
      <rect x="4" y="2" width="16" height="20" rx="2" fill="url(#grad-phone)" stroke={c} strokeWidth="0.8"/>
      <rect x="5" y="3.5" width="14" height="14" fill={c} opacity="0.1"/>
      <circle cx="12" cy="19" r="1" fill={c}/>
      <path d="M6.5 5.5C6.8 4.8 7.5 4 8.5 4.2" fill="none" stroke={c} strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  ),
  mail: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-mail", "#F5D9D9", "#FADADF")}
      <rect x="2" y="5" width="20" height="14" rx="1.2" fill="url(#grad-mail)" stroke={c} strokeWidth="0.8"/>
      <path d="M2 5L12 12L22 5" fill="none" stroke={c} strokeWidth="1" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="12" y2="19" stroke={c} strokeWidth="0.6" opacity="0.4"/>
    </svg>
  ),
  doctor: (c) => (
    <svg viewBox="0 0 24 24" width={28} height={28}>
      {createGradient("grad-doctor", "#F5D4B0", "#FADADF")}
      <circle cx="12" cy="7" r="3.5" fill="url(#grad-doctor)" stroke={c} strokeWidth="0.8"/>
      <path d="M6 15C6 12 9 11 12 11C15 11 18 12 18 15V20C18 21 17.5 22 16 22H8C6.5 22 6 21 6 20Z" fill={c} opacity="0.2" stroke={c} strokeWidth="0.8"/>
      <line x1="12" y1="14" x2="12" y2="18" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10" y1="16" x2="14" y2="16" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};
