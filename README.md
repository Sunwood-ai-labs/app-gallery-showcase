<div align="center">

![App Gallery Showcase Header](assets/header.svg)

# 🎉 App Gallery Showcase v0.5.0

**プロジェクトを美しく魅力的に紹介する次世代Webアプリケーション**

[![GitHub Release](https://img.shields.io/github/v/release/Sunwood-ai-labs/hf-space-card-showcase?style=flat-square)](https://github.com/Sunwood-ai-labs/hf-space-card-showcase/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/sunwoodai/app-gallery-showcase?style=flat-square)](https://github.com/Sunwood-ai-labs/hf-space-card-showcase/pkgs/container/hf-space-card-showcase)

</div>

## 🚀 特徴
- 🐳 マルチアーキテクチャDockerサポート
- 🔄 GitHub ActionsによるCI/CD
- 🛡️ 防御的プログラミング実装
- 🎨 DiceBear連携の動的アバター
- 📦 最適化されたPrismaクライアント

## 🛠️ セットアップ

### 📦 ローカル開発
```bash
git clone https://github.com/Sunwood-ai-labs/hf-space-card-showcase.git
cd hf-space-card-showcase
npm install
cp .env.example .env.local
npm run dev
```

### 🐳 Docker環境
```bash
# マルチアーキテクチャイメージの取得
docker pull ghcr.io/sunwood-ai-labs/app-gallery-showcase:latest

# コンテナ起動
docker run -p 3000:3000 \
  --env-file .env.local \
  ghcr.io/sunwood-ai-labs/app-gallery-showcase:latest
```

## ⚙️ 環境変数
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_SITE_NAME="App Gallery Showcase"
NEXT_PUBLIC_FONT_IMPORT="Noto+Sans+JP:wght@400;500;700"
```

## 🔄 CI/CDパイプライン
- 自動ビルド＆デプロイ
- マルチプラットフォームビルド（linux/amd64, arm64）
- Semverタグ管理

## 📜 コミットメッセージ
```
✨ feat #123: 新機能を追加
📝 docs #45: ドキュメント更新
🐛 fix #67: バグ修正
```

## 📚 詳細ドキュメント
- [開発ガイド](docs/DEVELOPMENT.md)
- [デプロイ手順](docs/DEPLOYMENT.md)
- [APIリファレンス](docs/API.md)

## 📊 MEMORY要件
- Dockerコンテナのメモリ使用量を最適化
- Docker Composeによるコンテナ管理
- Docker Hubへのイメージプッシュ

## 📜 ライセンス
このプロジェクトはMITライセンスの下で公開されています。
