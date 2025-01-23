# ⚙️ セットアップ詳細

## 🗄️ データベースの作成

このプロジェクトでは、SQLiteデータベースを使用しています。以下の手順でデータベースを作成します。

1.  Prisma CLIを使用してデータベースを初期化します。
    ```bash
    npx prisma db push
    ```
    このコマンドは、`prisma/schema.prisma`ファイルに基づいてデータベースを作成し、スキーマを適用します。

## 🚀 アプリケーションの起動

1.  開発サーバーを起動します。
    ```bash
    npm run dev
    ```
    または
    ```bash
    yarn dev
    ```
    これにより、アプリケーションがローカルホストの3000番ポートで起動します。

2.  ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 📝 注意事項

-   データベースの変更を行った場合は、`npx prisma db push`コマンドを再度実行して、データベースを更新してください。
-   開発環境では、`npm run dev`または`yarn dev`コマンドを使用してください。
-   本番環境では、`npm run build`または`yarn build`コマンドでビルドした後、`npm start`または`yarn start`コマンドでアプリケーションを起動してください。
