#!/bin/bash
# ============================================
# ChatKit React インストールスクリプト
# ============================================

set -e  # エラーが発生したら停止

echo "📦 パッケージのインストールを開始します..."
echo ""

# プロジェクトディレクトリに移動
cd "$(dirname "$0")"
pwd

echo ""
echo "🧹 既存のnode_modulesをクリーンアップ..."
rm -rf node_modules
rm -f package-lock.json

echo ""
echo "📥 基本パッケージをインストール..."
npm install

echo ""
echo "🔧 ChatKit React (公式リリース版) をインストール..."
# ChatKit Reactの正式版をインストール
npm install @openai/chatkit-react@latest

echo ""
echo "🔧 OpenAI SDK をインストール..."
npm install openai@latest

echo ""
echo "✅ インストール完了！"
echo ""
echo "📋 インストールされたバージョン:"
npm list @openai/chatkit-react
npm list openai

echo ""
echo "🚀 次のコマンドでローカル開発サーバーを起動できます:"
echo "   npm run dev"
echo ""
echo "🌐 Vercelにデプロイする場合:"
echo "   vercel --prod"


