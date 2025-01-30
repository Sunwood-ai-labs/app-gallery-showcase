# ベースイメージとして Node.js を使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# アプリケーションのソースコードをコピー
COPY . .

# 依存関係をインストール
RUN npm install

# 環境変数を設定
# COPY .env.local .env
# RUN sed -i 's/=/\=/g' .env

RUN rm .env

# ビルド
RUN npm run build

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
