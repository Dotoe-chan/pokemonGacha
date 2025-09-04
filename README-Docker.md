# Pokemon Gacha App - Docker版

## 🐳 Docker Compose で起動

### 1. アプリケーションをビルド・起動
```bash
docker-compose up --build
```

### 2. バックグラウンドで起動
```bash
docker-compose up -d --build
```

### 3. 停止
```bash
docker-compose down
```

### 4. ログを確認
```bash
# 全サービスのログ
docker-compose logs

# 特定サービスのログ
docker-compose logs frontend
docker-compose logs backend
```

## 🌐 アクセス方法

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000
- **API ドキュメント**: http://localhost:8000/docs

## 🔧 開発用コマンド

### 個別にビルド
```bash
# バックエンドのみ
docker-compose build backend

# フロントエンドのみ  
docker-compose build frontend
```

### コンテナに入る
```bash
# バックエンドコンテナ
docker-compose exec backend bash

# フロントエンドコンテナ
docker-compose exec frontend sh
```

## 📋 必要な要件

- Docker
- Docker Compose

## 🎯 特徴

- **マルチステージビルド**: 効率的なイメージサイズ
- **ヘルスチェック**: コンテナの状態監視
- **自動再起動**: `unless-stopped`
- **依存関係管理**: フロントエンドがバックエンドを待機
