export const CLINIC_INFO = {
  name: "うめむら半蔵門内科歯科",
  nameEn: "UMEMURA HANZOMON",
  director: "梅村 隆輔",
  dentist: "伊藤 恵",
  zip: "〒102-0093",
  address: "東京都千代田区平河町1丁目7番16号 102",
  tel: "080-2127-3696",
  email: "umemura.hanzoumon.929@gmail.com",
  access: '東京メトロ半蔵門線「半蔵門駅」より徒歩圏内',
};

export const SERVICES = [
  { key: "stethoscope", title: "内科", desc: "生活習慣病・風邪など内科全般。健診・検査対応。" },
  { key: "microscope", title: "消化器内科", desc: "胃腸の不調・腹痛・肝臓疾患の専門診療。" },
  { key: "skin", title: "皮膚科", desc: "湿疹・アトピー・ニキビなど皮膚トラブル全般。" },
  { key: "tooth", title: "歯科", desc: "虫歯・歯周病・クリーニング・入れ歯対応。" },
  { key: "sparkle", title: "美容皮膚科", desc: "シミ・しわ・たるみの医療美容。", free: true },
  { key: "pill", title: "ピル処方", desc: "低用量ピル・アフターピル処方。", free: true },
  { key: "male", title: "男性外来", desc: "ED・AGA治療をプライバシー配慮で。", free: true },
  { key: "iv", title: "点滴療法", desc: "にんにく注射・ビタミン・美容点滴。", free: true },
];

export const VISIT_SERVICES = [
  { icon: "home", title: "内科訪問診療", desc: "定期診察・血液検査・点滴・褥瘡処置・在宅酸素" },
  { icon: "tooth", title: "訪問歯科診療", desc: "虫歯治療・口腔ケア・入れ歯調整・嚥下評価" },
  { icon: "dove", title: "緩和ケア・看取り", desc: "疼痛コントロール・終末期ケア・ご家族支援" },
];

export const ONLINE_STEPS = [
  "電話・メールで予約",
  "ビデオ通話リンク送付",
  "オンライン診察",
  "処方箋の送付",
];

export const FAQS = [
  { q: "外来の予約方法は？", a: "完全予約制です。お電話（080-2127-3696）またはメールにてご予約ください。" },
  { q: "オンライン診療の受診方法は？", a: "スマホやPCからビデオ通話で受診。事前予約後、専用リンクをお送りします。処方箋は薬局にFAX。" },
  { q: "訪問診療の対象は？", a: "通院困難な方なら病名・要介護度を問わず対象。お気軽にご相談ください。" },
  { q: "自由診療の費用は？", a: "美容皮膚科・ピル・男性外来・点滴は保険外。詳しくはお電話でお尋ねください。" },
  { q: "訪問エリアは？", a: "千代田区中心に23区対応。半径16km圏内が法令上の範囲です。" },
];

export const AREAS_PRIMARY = [
  "千代田区", "中央区", "港区", "新宿区", "文京区", "台東区", "渋谷区", "豊島区",
];

export const AREAS_SECONDARY = [
  "墨田区", "江東区", "品川区", "目黒区", "大田区", "世田谷区", "中野区", "杉並区",
  "北区", "荒川区", "板橋区", "練馬区", "足立区", "葛飾区", "江戸川区",
];

export const DOCTORS = [
  {
    name: "梅村 隆輔",
    role: "院長",
    spec: "内科・消化器内科・皮膚科",
    bio: "外来・オンライン・訪問の全チャネルで対応。美容皮膚科や自由診療まで幅広く。",
    imgKey: "doc1",
  },
  {
    name: "伊藤 恵",
    role: "歯科医師",
    spec: "一般歯科・口腔外科・訪問歯科",
    bio: "虫歯・歯周病から口腔ケアまで。訪問歯科にも対応。",
    imgKey: "doc2",
  },
];

export const PHOTO_LABELS = {
  reception: "受付",
  exam: "診察室",
  waiting: "待合スペース",
  dental: "歯科診療室",
  drip: "点滴ルーム",
  exterior: "外観",
};

export const COST_DATA = {
  insurance: [
    { label: "1割負担", price: "約 7,000円" },
    { label: "3割負担", price: "約 20,000円" },
  ],
  freeNote: "美容皮膚科・ピル・男性外来・点滴は保険外。オンライン診療は通常外来と同等。詳細はお問い合わせください。",
};
