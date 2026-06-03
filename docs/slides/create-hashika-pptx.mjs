import pptxgen from "pptxgenjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Umemura Clinic";
pptx.company = "Umemura Clinic";
pptx.subject = "ハシカ（麻しん）サマリー";
pptx.title = "ハシカ（麻しん）";
pptx.lang = "ja-JP";
pptx.theme = {
  headFontFace: "Yu Gothic",
  bodyFontFace: "Yu Gothic",
  lang: "ja-JP",
};
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";

const slide = pptx.addSlide();
slide.background = { color: "F7FBFD" };

const C = {
  ink: "17324D",
  muted: "5B6F82",
  line: "D9E4EC",
  accent: "D94835",
  teal: "0E7C78",
  blue: "2D70B7",
  pale: "EAF7F5",
  white: "FFFFFF",
};

function addText(text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: "Yu Gothic",
    margin: opts.margin ?? 0,
    breakLine: false,
    fit: "shrink",
    ...opts,
  });
}

function addCard({ x, y, w, h, bar, title, body, note }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.06,
    fill: { color: C.white },
    line: { color: C.white, transparency: 100 },
    shadow: { type: "outer", color: "17324D", opacity: 0.10, blur: 1, angle: 45, distance: 1 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: 0.08, h,
    fill: { color: bar },
    line: { color: bar },
  });
  addText(title, x + 0.26, y + 0.13, w - 0.36, 0.24, {
    fontSize: 16,
    bold: true,
    color: C.ink,
  });
  addText(body, x + 0.26, y + 0.45, w - 0.36, 0.42, {
    fontSize: 11.5,
    bold: true,
    color: C.ink,
    breakLine: false,
    valign: "mid",
  });
  addText(note, x + 0.26, y + 0.91, w - 0.36, 0.26, {
    fontSize: 8.4,
    color: C.muted,
    breakLine: false,
  });
}

// Soft background bands.
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.333, h: 7.5,
  fill: { color: "F7FBFD" },
  line: { color: "F7FBFD" },
});
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 3.1, h: 7.5,
  fill: { color: "EAF7F5", transparency: 8 },
  line: { color: "EAF7F5", transparency: 100 },
});
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.333, h: 1.45,
  fill: { color: "FDF1F0", transparency: 20 },
  line: { color: "FDF1F0", transparency: 100 },
});

// Header.
addText("感染症ミニサマリー", 0.58, 0.37, 2.7, 0.2, {
  fontSize: 10.5,
  bold: true,
  color: C.teal,
});
addText("ハシカ（麻しん）", 0.58, 0.64, 4.5, 0.48, {
  fontSize: 28,
  bold: true,
  color: C.ink,
});
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.85, y: 0.36, w: 3.9, h: 0.84,
  rectRadius: 0.06,
  fill: { color: C.white, transparency: 16 },
  line: { color: C.line, width: 1.2 },
});
addText("原因ウイルス", 9.05, 0.50, 1.3, 0.15, {
  fontSize: 9.2,
  bold: true,
  color: C.muted,
});
addText("Measles virus", 9.05, 0.70, 2.4, 0.26, {
  fontSize: 16.5,
  bold: true,
  color: C.ink,
});
addText("現行分類名の例: Measles morbillivirus / Morbillivirus hominis", 9.05, 0.99, 3.35, 0.14, {
  fontSize: 7.6,
  color: C.muted,
});
slide.addShape(pptx.ShapeType.line, {
  x: 0.58, y: 1.58, w: 12.18, h: 0,
  line: { color: C.line, width: 1.2 },
});

// Left cards.
const cardW = 3.02;
const cardH = 1.10;
const x1 = 0.58;
const x2 = 3.72;
const y1 = 1.90;
const y2 = 3.10;

addCard({
  x: x1, y: y1, w: cardW, h: cardH, bar: C.accent,
  title: "抗生物質は効かない",
  body: "ウイルス感染症のため、麻疹ウイルス自体に抗生物質は無効。",
  note: "細菌性肺炎・中耳炎など合併症では使う場合があります。",
});
addCard({
  x: x2, y: y1, w: cardW, h: cardH, bar: C.teal,
  title: "主な感染経路",
  body: "空気感染が重要。飛沫・接触でも広がります。",
  note: "空気中や表面で最大2時間感染性を保つことがあります。",
});
addCard({
  x: x1, y: y2, w: cardW, h: cardH, bar: C.blue,
  title: "感染力は非常に強い",
  body: "R0はおおむね12-18。インフルエンザの約10倍が目安。",
  note: "免疫がない濃厚接触者では最大9割が感染するとされます。",
});
addCard({
  x: x2, y: y2, w: cardW, h: cardH, bar: C.teal,
  title: "予防の要点",
  body: "最も有効な予防はMMR/MRワクチンの2回接種。",
  note: "発疹前から周囲へうつす可能性があります。",
});

["空気感染", "飛沫感染", "接触感染"].forEach((label, i) => {
  const x = 0.58 + i * 2.08;
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y: 4.38, w: 1.96, h: 0.42,
    rectRadius: 0.05,
    fill: { color: C.pale },
    line: { color: "C9E5DF", width: 0.8 },
  });
  addText(label, x, 4.50, 1.96, 0.15, {
    fontSize: 11.4,
    bold: true,
    align: "center",
    color: "0C625E",
  });
});

slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.58, y: 5.00, w: 6.16, h: 0.78,
  rectRadius: 0.05,
  fill: { color: C.white },
  line: { color: C.line, width: 1.2 },
});
addText("見逃しやすい初期症状", 0.80, 5.17, 2.6, 0.20, {
  fontSize: 15,
  bold: true,
  color: C.ink,
});
addText("発熱、咳、鼻水、結膜炎から始まり、2-3日後に口腔内のコプリック斑、その後に全身の発しんが目立ちます。", 0.80, 5.48, 5.64, 0.18, {
  fontSize: 10.5,
  bold: true,
  color: C.ink,
});

// Right figure.
const imagePath = path.join(__dirname, "cdc-measles-koplik-spots.jpg");
slide.addShape(pptx.ShapeType.roundRect, {
  x: 7.20, y: 1.90, w: 5.56, h: 2.82,
  rectRadius: 0.05,
  fill: { color: C.white },
  line: { color: C.line, width: 1.2 },
  shadow: { type: "outer", color: "17324D", opacity: 0.10, blur: 1, angle: 45, distance: 1 },
});
slide.addImage({
  path: imagePath,
  x: 7.20, y: 1.90, w: 5.56, h: 2.14,
  sizing: { type: "crop", x: 7.20, y: 1.90, w: 5.56, h: 2.14 },
});
addText("写真引用: CDC Public Health Image Library, ID #24415. Koplik spots due to measles infection.\nContent provider: CDC / Heinz F. Eichenwald, MD. Public domain.", 7.35, 4.15, 5.20, 0.33, {
  fontSize: 7,
  color: C.muted,
  breakLine: true,
});

slide.addShape(pptx.ShapeType.roundRect, {
  x: 7.20, y: 4.90, w: 2.28, h: 0.98,
  rectRadius: 0.05,
  fill: { color: C.ink },
  line: { color: C.ink },
});
addText("芒", 7.98, 5.16, 0.72, 0.28, {
  fontSize: 23,
  bold: true,
  align: "center",
  color: C.white,
});
addText("はしか・のぎ", 7.80, 5.55, 1.08, 0.13, {
  fontSize: 8.8,
  bold: true,
  align: "center",
  color: C.white,
});

slide.addShape(pptx.ShapeType.roundRect, {
  x: 9.62, y: 4.90, w: 3.14, h: 0.98,
  rectRadius: 0.05,
  fill: { color: C.white },
  line: { color: C.line, width: 1.2 },
});
addText("「はしか」は、稲や麦の穂先の硬い毛「芒（はしか）」に触れたような痛がゆさ・発しんに由来するという説があります。医学用語では「麻しん／麻疹（ましん）」。", 9.82, 5.06, 2.74, 0.64, {
  fontSize: 9,
  bold: true,
  color: C.ink,
  breakLine: false,
});

// Sources.
slide.addShape(pptx.ShapeType.line, {
  x: 0.58, y: 6.62, w: 12.18, h: 0,
  line: { color: C.line, width: 0.8 },
});
addText("Sources: 厚生労働省「麻しん（はしか）」 / WHO “Measles” fact sheet / CDC “How Measles Spreads,” “Clinical Overview of Measles,” “Photos of Measles” / 日本感染症学会「麻しん（はしか）に注意」 / NCBI Taxonomy “Measles morbillivirus” / 語源由来辞典「麻疹／はしか」", 0.58, 6.76, 12.18, 0.22, {
  fontSize: 6.8,
  color: C.muted,
});

const out = path.join(__dirname, "hashika-summary-slide-editable.pptx");
await pptx.writeFile({ fileName: out });
console.log(out);
