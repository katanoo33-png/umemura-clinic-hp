/**
 * ================================================================
 * うめむら半蔵門内科歯科 — サイト設定ファイル
 * ================================================================
 * ⚠️ Claudeへの指示：
 *   ・ロゴ変更 → LOGO セクションのみ編集
 *   ・写真変更 → IMAGES セクションのみ編集
 *   ・テーマ変更 → THEME セクションのみ編集
 *   ・App.jsx は構造変更がない限り触らない
 * ================================================================
 */

// ── LOGO ──────────────────────────────────────────────────────────
// logoType: "svg" | "image"
// logoSvg:  SVGコード文字列（typeがsvgの場合）
// logoUrl:  画像URL（typeがimageの場合）
const base = import.meta.env.BASE_URL;

export const LOGO = {
  type: "image",     // ← ロゴ変更時はここを編集
  logoUrl: `${base}images/logo-transparent.png`,
  clinicName: "うめむら半蔵門内科歯科",
};

// ── IMAGES ────────────────────────────────────────────────────────
// 各画像のデフォルトURL。UIから変更した場合はlocalStorageに保存され、
// こちらのデフォルトより優先されます。
export const DEFAULT_IMAGES = {
  hero:       `${base}images/hero1.jpg`,
  hero2:      `${base}images/hero2.jpg`,
  hero3:      `${base}images/hero3.png`,
  hero4:      `${base}images/hero4.jpg`,
  carousel1:  `${base}images/carousel1.jpg`,
  carousel2:  `${base}images/carousel2.JPG`,
  carousel3:  `${base}images/waiting_room_v4_clean.webp`,
  carousel4:  `${base}images/carousel4.JPG`,
  carousel6:  `${base}images/carousel6.jpg`,
  doctor1:    `${base}images/umemura_statoscope.png`,
  doctor2:    `${base}images/ito.png`,
  online1:    `${base}images/online-reservation-illustration.svg`,
  online2:    `${base}images/online-video-illustration.svg`,
  online3:    `${base}images/online-prescription-illustration.svg`,
};

// ── THEME ─────────────────────────────────────────────────────────
// defaultTheme: "silver" | "ocean" | "dark" | "sage" | "rose"
// defaultLayout: "A" | "B" | "C" | "D"
export const SITE_DEFAULTS = {
  defaultTheme: "silver",
  defaultLayout: "B",
};

// ── CLINIC INFO ───────────────────────────────────────────────────
export const CLINIC = {
  name:    "うめむら半蔵門内科歯科",
  zip:     "〒102-0093",
  address: "東京都千代田区平河町1丁目7番16号 102",
  tel:     "080-2127-3696",
  email:   "umemura.hanzoumon.929@gmail.com",
  station: "東京メトロ半蔵門線「半蔵門駅」より徒歩圏内",
  hours: {
    days: ["月", "火", "水", "木", "金", "土", "日", "祝"],
    rows: [
      { time: "10:00〜18:00", slots: ["-", "-", "-", "-", "-", "○", "○", "-"] },
      { time: "18:30〜21:30", slots: ["○", "-", "○", "○", "○", "-", "-", "-"] },
    ],
  },
};

// ── LINE QUESTIONNAIRE ────────────────────────────────────────────
// 実際のLINE公式アカウントURL・問診票URLが決まったらここだけ差し替えます。
export const LINE = {
  friendUrl:        "https://line.me/R/ti/p/@434xzywa",
  questionnaireUrl: `${base}line-questionnaire.html`,
};

// ── BOOKING ───────────────────────────────────────────────────────
export const BOOKING_URL = `${base}booking.html`;

// ── DOCTORS ───────────────────────────────────────────────────────
export const DOCTORS = [
  {
    name:       "梅村 隆輔",
    nameEn:     "Ryusuke Umemura",
    title:      "院長",
    specialty:  "内科・消化器内科・皮膚科",
    bio:        "総合内科専門医、消化器病専門医、内視鏡専門医、労働衛生コンサルタント。外来診療から訪問診療まで、専門性を活かした質の高い医療で皆様の健康をサポートいたします。",
    imageKey:   "doctor1",
  },
  {
    name:       "伊藤 恵",
    nameEn:     "Megumi Ito",
    title:      "歯科医師",
    specialty:  "一般歯科・口腔外科・訪問歯科",
    bio:        "予防から治療まで、歯の健康を通して全身の健康を支えます。痛みの少ない治療と丁寧なカウンセリングを大切にしています。",
    imageKey:   "doctor2",
  },
];

// ── MEDICAL ADDITIONS ─────────────────────────────────────────────
export const MEDICAL_ADDITIONS = [
  "口腔機能実地指導料",
  "遠隔電子処方箋活用加算",
  "機能強化加算",
  "在宅時医学総合管理料",
  "在宅療養支援診療所3",
];

// ── SERVICES ──────────────────────────────────────────────────────
export const SERVICES = {
  outpatient: [
    { icon: "🩺", name: "内科",          desc: "生活習慣病・感冒・インフルエンザ等の一般内科診療",  type: "保険" },
    { icon: "✨", name: "皮膚科",        desc: "湿疹・アトピー・ニキビなど皮膚疾患の治療",          type: "保険" },
    { icon: "🦷", name: "歯科",          desc: "むし歯・歯周病・入れ歯・口腔外科",                  type: "保険" },
    { icon: "💊", name: "ピル処方",      desc: "低用量ピル・アフターピル（当日処方可）",             type: "自由" },
    { icon: "♂",  name: "男性外来",      desc: "ED・AGA・男性ホルモン補充療法",                    type: "自由" },
    { icon: "💉", name: "点滴療法",      desc: "ビタミン点滴・にんにく注射・美容点滴",              type: "自由" },
  ],
  online: {
    title:  "オンライン診療",
    desc:   "ビデオ通話で診療・処方箋メール送付に対応。通院困難な方もご利用いただけます。",
  },
  visit: {
    title:  "訪問診療",
    desc:   "千代田区を中心に法令上の16km圏内に対応。24時間365日体制でお伺いします。",
    areas:  ["千代田区", "中央区", "港区", "新宿区", "文京区", "台東区", "渋谷区", "豊島区", "墨田区", "江東区", "品川区", "目黒区", "世田谷区", "杉並区", "荒川区"],
  },
};
