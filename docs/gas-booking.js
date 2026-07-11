// ── うめむら半蔵門内科歯科 予約受付 GAS ──────────────────────
// Google Apps Script に貼り付けて「Web App」としてデプロイしてください
// 実行ユーザー: 自分、アクセス: 全員（匿名含む）
//
// ⚠️ LINE予約確定メッセージを送るには、スクリプトプロパティに
//    LINE_ACCESS_TOKEN（@434xzywaのチャネルアクセストークン）を設定してください。
//    未設定の場合はメッセージ送信をスキップし、通常通り予約は記録されます。
//
// ⚠️ スタッフへのSlack通知（#clinic）には、スクリプトプロパティに
//    SLACK_WEBHOOK_URL を設定してください（refill-intake / questionnaire-intake
//    と同じ値でOK。00_ダッシュボード/dashboard.env 参照）。
//    未設定の場合は通知をスキップし、通常通り予約は記録されます。

const SPREADSHEET_ID = '1jaHI4DR6YoFnRRczlsS88QClaT9Y8icMYXMj1EvkiQc';
const FOLDER_NAME    = 'うめむら保険証画像';
const LINE_PUSH_URL  = 'https://api.line.me/v2/bot/message/push';

// ── スプレッドシート初期化 ──────────────────────────────────
function getOrCreateSheet() {
  let ss;
  if (SPREADSHEET_ID) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } else {
    // 初回のみ自動生成（ログからIDをコピーして上の定数に設定）
    ss = SpreadsheetApp.create('うめむら予約台帳');
    console.log('新しいスプレッドシートID: ' + ss.getId());
    PropertiesService.getScriptProperties().setProperty('SS_ID', ss.getId());
  }
  let sheet = ss.getSheetByName('予約');
  if (!sheet) {
    sheet = ss.insertSheet('予約');
    sheet.appendRow(['受付日時','診療内容','希望日','希望時間','患者名','フリガナ',
                     '生年月日','性別','電話番号','メール','症状','初診/再診',
                     '問診票経由','LINE UserID','画像ファイルURL',
                     '1日前リマインド済','1時間前リマインド済']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// ── Driveフォルダ取得/作成 ────────────────────────────────
function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  const folder = DriveApp.createFolder(FOLDER_NAME);
  console.log('フォルダID: ' + folder.getId());
  return folder;
}

// ── LINE Push送信 ─────────────────────────────────────────
function sendLinePush_(userId, text) {
  const token = PropertiesService.getScriptProperties().getProperty('LINE_ACCESS_TOKEN');
  if (!token) {
    console.log('LINE_ACCESS_TOKEN未設定のためpush送信スキップ');
    return;
  }
  try {
    UrlFetchApp.fetch(LINE_PUSH_URL, {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + token },
      payload: JSON.stringify({
        to: userId,
        messages: [{ type: 'text', text: text }],
      }),
      muteHttpExceptions: true,
    });
  } catch (err) {
    console.error('LINE push送信エラー:', err);
  }
}

function formatDateJp_(dateStr) {
  // dateStr: 'YYYY-MM-DD' → '◯月◯日'
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return dateStr;
  return `${parseInt(m[2], 10)}月${parseInt(m[3], 10)}日`;
}

// ── スタッフへSlack通知（#clinic） ────────────────────────
function notifySlack_(data, imageUrls) {
  const url = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL');
  if (!url) { console.log('SLACK_WEBHOOK_URL未設定 — Slack通知スキップ'); return; }

  const lines = [
    '*📅 新しい予約が入りました*',
    `• 診療内容: ${data.service || '—'}`,
    `• 希望日時: ${data.date || '—'} ${data.time || ''}`.trim(),
    `• 患者名: ${data.name || '—'}（${data.kana || 'フリガナ未入力'}）`,
    `• 生年月日: ${data.dob || '—'} / 性別: ${data.gender || '—'}`,
    `• 電話: ${data.tel || '—'} / メール: ${data.email || '—'}`,
    `• 初診/再診: ${data.visitType || '—'}`,
    data.symptoms ? `• 症状・相談: ${data.symptoms}` : '',
    data.fromQuestionnaire ? '• 問診票経由での予約です' : '',
    imageUrls && imageUrls.length ? `• 保険証画像: ${imageUrls.length}枚アップロード済み` : '',
    data.lineUserId ? '• LINE連携あり（確定メッセージ送信済み）' : '• LINE未連携（LINE外からの予約、または未ログイン）',
  ].filter(Boolean);

  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: lines.join('\n') }),
    muteHttpExceptions: true,
  });
}

// ── POST受信 ──────────────────────────────────────────────
function doPost(e) {
  const cors = ContentService.createTextOutput();
  cors.setMimeType(ContentService.MimeType.JSON);

  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    const folder = getOrCreateFolder();
    const now = new Date();

    // 画像をDriveに保存
    const imageUrls = [];
    if (data.images && data.images.length > 0) {
      data.images.forEach((img, idx) => {
        try {
          const bytes = Utilities.base64Decode(img.data);
          const blob  = Utilities.newBlob(bytes, img.mimeType,
            `${Utilities.formatDate(now, 'Asia/Tokyo', 'yyyyMMdd_HHmmss')}_${data.name || 'unknown'}_${idx + 1}.${img.mimeType.split('/')[1] || 'jpg'}`
          );
          const file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          imageUrls.push(file.getUrl());
        } catch(imgErr) { console.error('画像保存エラー:', imgErr); }
      });
    }

    // スプレッドシートに行追加
    sheet.appendRow([
      Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
      data.service    || '',
      data.date       || '',
      data.time       || '',
      data.name       || '',
      data.kana       || '',
      data.dob        || '',
      data.gender     || '',
      data.tel        || '',
      data.email      || '',
      data.symptoms   || '',
      data.visitType  || '',
      data.fromQuestionnaire ? '○' : '',
      data.lineUserId || '',
      imageUrls.join('\n'),
      '', '',
    ]);

    // 予約確定メッセージ送信（LINE友達登録済みの場合のみ）
    if (data.lineUserId && data.date && data.time) {
      sendLinePush_(data.lineUserId,
        `ご予約ありがとうございます。\n${formatDateJp_(data.date)} ${data.time}より診療を開始いたします。\nお時間になりましたらご来院ください。`
      );
    }

    // スタッフへSlack通知
    notifySlack_(data, imageUrls);

    cors.setContent(JSON.stringify({ status: 'ok', imageUrls }));
  } catch(err) {
    console.error('doPost error:', err);
    cors.setContent(JSON.stringify({ status: 'error', message: err.message }));
  }
  return cors;
}

// ── CORS対応（OPTIONSプリフライト） ──────────────────────
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
