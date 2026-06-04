// ── うめむら半蔵門内科歯科 予約受付 GAS ──────────────────────
// Google Apps Script に貼り付けて「Web App」としてデプロイしてください
// 実行ユーザー: 自分、アクセス: 全員（匿名含む）

const SPREADSHEET_ID = '';  // ← デプロイ後に自動生成されたスプレッドシートIDを設定
const FOLDER_NAME    = 'うめむら保険証画像';

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
                     '問診票経由','画像ファイルURL']);
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
      imageUrls.join('\n'),
    ]);

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
