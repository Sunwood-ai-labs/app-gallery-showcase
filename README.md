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

## ✨ 特徴

### 🎨 UIと設計
- モダンなカードベースのレイアウト
- レスポンシブデザイン
- Next.jsによる効率的なルーティング
- TypeScriptによる型安全性の確保
- Tailwind CSSによるスタイリング
- カスタマイズ可能なグラデーションデザイン

### 🔐 認証と管理
- NextAuthによるセキュアな認証システム
- ユーザープロフィール管理機能
- スペースの作成・編集・削除機能
- 公開/非公開設定

### 📊 分析と統計
- スペースごとのアクセス分析
- リアルタイムのクリック追跡
- カテゴリ別統計
- トレンド分析

### 🔍 探索と検索
- カテゴリ別フィルタリング
- キーワード検索
- ソート機能（トレンド順、最新順、人気順）
- レコメンデーション機能

## 🏗️ アーキテクチャ

### フロントエンド
- Next.jsによるSSRとCSR
- TypeScriptによる型安全性
- Tailwind CSSによるUIコンポーネント
- コンポーネントベースの設計

### バックエンド
- Next.js API Routesによるサーバーレス機能
- PrismaによるORM
- SQLiteによるデータベース
- NextAuthによる認証

### データベース設計
- ユーザーテーブル
- スペーステーブル
- アクセスログテーブル
- いいねテーブル

## 🛠️ 前提条件

- Node.js (v16以降)
- npm または yarn

## 📦 セットアップ

[セットアップ詳細](docs/SETUP.md)

1. リポジトリをクローン:
```bash
git clone https://github.com/Sunwood-ai-labs/hf-space-card-showcase.git
cd hf-space-card-showcase
```

2. 依存関係をインストール:
```bash
npm install
# または
yarn install
```

3. データベースをセットアップ:
```bash
# データベースを初期化（初回のみ）
npx prisma db push

# スキーマ変更後にデータベースを更新
npx prisma db push

# （オプション）Prisma Studioでデータを確認
npx prisma studio
```

4. 開発サーバーを起動:
```bash
npm run dev
# または
yarn dev
```

5. ブラウザで [http://localhost:3000](http://localhost:3000) を開きます

## 💾 データベース管理

このプロジェクトはPrismaとSQLiteを使用しています。データベースに関する主な操作：

### データベースの初期化
```bash
npx prisma db push
```

### スキーマ変更後の更新
スキーマを変更した場合（新しいフィールドの追加など）は、以下のコマンドを実行してデータベースを更新します：
```bash
npx prisma db push
```

### データの確認
Prisma Studioを使用してデータベースの内容を確認・編集できます：
```bash
npx prisma studio
```

詳細なデータベース操作については[セットアップ詳細](docs/SETUP.md)を参照してください。

## 🚀 本番ビルド

```bash
npm run build
# または
yarn build
```

## 🔧 使用技術

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型付き JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [Prisma](https://www.prisma.io/) - データベースORM
- [NextAuth.js](https://next-auth.js.org/) - 認証ライブラリ
- [SQLite](https://www.sqlite.org/) - データベース

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下でオープンソース公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🤝 コントリビューション

改善の提案や問題の報告は大歓迎です！プルリクエストをお待ちしております。

## 🌊 Windsurf Editor Performance Verification Project

> [!NOTE]
このリポジトリは、Windsurf AIエディタの性能と機能を検証するための実験的プロジェクトです。Windsurf は革新的なAIコーディング支援ツールであり、このプロジェクトはその capabilities と効率性を実証することを目的としています。
*This repository is an experimental project designed to verify the performance and capabilities of the Windsurf AI Editor. It serves as a comprehensive test bed to demonstrate the editor's advanced AI-assisted coding features and development efficiency.*

### 🚀 プロジェクトの目的 / Project Objectives
- Windsurf エディタの AI コーディング支援機能の実証
- リアルタイムのコード生成と提案の検証
- AI と開発者の協働ワークフローの探求

*Demonstrate Windsurf editor's AI coding assistance capabilities*
*Validate real-time code generation and suggestions*
*Explore collaborative workflows between AI and developers*
