# 🤖 FAQ検索エージェント (React版)

OpenAI Agent BuilderとChatKit Reactを使用したFAQ検索エージェントアプリです。

## 🚀 機能

- ✅ OpenAI Agent Builderで構築したFAQエージェント
- ✅ ChatKit Reactによる美しいチャットUI
- ✅ Vercelで無料ホスティング
- ✅ レスポンシブデザイン対応

## 📋 セットアップ手順

### 1. 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定してください：

```
OPENAI_API_KEY=your-openai-api-key-here
```

### 2. デプロイ

```bash
# Vercel CLIでデプロイ
vercel --prod
```

または、GitHubにpushすれば自動デプロイされます。

## 🛠️ ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 📚 技術スタック

- **フロントエンド**: React 19 + Vite
- **UI**: ChatKit React
- **バックエンド**: Vercel Serverless Functions
- **AI**: OpenAI Agent Builder
- **ホスティング**: Vercel

## 🔧 プロジェクト構造

```
faq-agent-react/
├── src/
│   ├── App.jsx          # メインコンポーネント
│   ├── App.css          # スタイル
│   └── main.jsx         # エントリーポイント
├── api/
│   └── chatkit/
│       └── session.js   # ChatKitセッション作成API
├── vercel.json          # Vercel設定
└── package.json         # 依存関係
```

## 📝 ライセンス

MIT License

## 👨‍💻 作成者

Daisuke Miyata (@miyatti777)