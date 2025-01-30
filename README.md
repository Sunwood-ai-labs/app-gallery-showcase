<div align="center">

![App Gallery Showcase Header](https://github.com/user-attachments/assets/24a2edc1-dc5e-4dda-8d1a-638ab29aede7)

# 📊 App Gallery Showcase

**プロジェクトを美しく魅力的に紹介するウェブアプリケーション**

[![GitHub stars](https://img.shields.io/github/stars/Sunwood-ai-labs/hf-space-card-showcase?style=social)](https://github.com/Sunwood-ai-labs/hf-space-card-showcase)
[![GitHub license](https://img.shields.io/github/license/Sunwood-ai-labs/hf-space-card-showcase)](https://github.com/Sunwood-ai-labs/hf-space-card-showcase/blob/main/LICENSE)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://next-auth.js.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

</div>

## 📖 はじめに
このリポジトリは、Hugging Face Spaces Galleryをベースにしたアプリケーションギャラリーのショーケースです。

## ✨ 特徴
- 最新のUIフレームワークを使用
- レスポンシブデザイン
- ユーザーフレンドリーなインターフェース

## 🛠️ セットアップ
1. リポジトリをクローンします。
2. 依存関係をインストールします。
   ```bash
   npm install
   ```
3. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```

## 🐳 Docker イメージのビルドとプッシュ
1.  Dockerfile を使用して Docker イメージをビルドします。
    ```bash
    docker build -t ghcr.io/<your-github-username>/hf-space-card-showcase:latest .
    ```
2.  GitHub Container Registry に Docker イメージをプッシュします。
    ```bash
    docker push ghcr.io/<your-github-username>/hf-space-card-showcase:latest
    ```
    - GitHub Actions ワークフローを使用すると、main ブランチへのプッシュ時に自動的に Docker イメージがビルドされ、プッシュされます。

## 🚀 アプリケーションの起動
- Docker を使用してアプリケーションを起動します。
    ```bash
    docker run -p 3000:3000 ghcr.io/<your-github-username>/hf-space-card-showcase:latest
    ```

## � コミットメッセージ形式
- コミットメッセージは以下の形式に従うこと:
  ```
  <絵文字> <タイプ> #<Issue番号>: <タイトル>
  <本文>
  <フッター>
  ```
- タイトル（コミットメッセージの1行目）の先頭には必ず絵文字を付与し、日本語で記述すること  
- タイプは以下のいずれかとする：
  - feat: 新機能  
  - fix: バグ修正  
  - docs: ドキュメントの変更  
  - style: コードスタイルの変更（動作に影響しない）  
  - refactor: リファクタリング  
  - perf: パフォーマンス改善  
  - test: テストの追加・修正  
  - chore: ビルドプロセスやツールの変更

## 📜 ライセンス
このプロジェクトはMITライセンスの下で公開されています。
