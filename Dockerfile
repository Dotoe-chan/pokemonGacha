# Node.js 18をベースイメージとして使用
FROM node:18-alpine AS base

# 依存関係をインストールするステージ
FROM base AS deps
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./
RUN npm ci --only=production

# ビルドステージ
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# アプリケーションコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN npm run build

# 本番実行ステージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 必要なファイルのみをコピー
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# ポート3000を公開
EXPOSE 3000

ENV PORT 3000

# Next.jsサーバーを起動
CMD ["npm", "start"]
