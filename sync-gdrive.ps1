# ======================================================================
# うめむら半蔵門内科歯科 - Google Drive 同期スクリプト
# ======================================================================

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $scriptPath

# ログカラー設定
function Write-Info { Write-Host "[INFO] $args" -ForegroundColor Cyan }
function Write-Success { Write-Host "[√] $args" -ForegroundColor Green }
function Write-Warn { Write-Host "[!] $args" -ForegroundColor Yellow }
function Write-Error { Write-Host "[X] $args" -ForegroundColor Red }

Write-Host "
開発サーバーを起動中...
" -ForegroundColor Green

# Node.js確認
$nodeVersion = node -v 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Node.js がインストールされていません"
    exit 1
}
Write-Success "Node.js $nodeVersion が検出されました"

# npm確認
Write-Info "npm パッケージをインストール中..."
npm install

# サーバー起動
Write-Success "開発サーバーを起動します"
Write-Host "ブラウザで http://localhost:5173 を開いてください
" -ForegroundColor Cyan
npm run dev
