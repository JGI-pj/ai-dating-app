#!/bin/bash

# バックアップスクリプト
# 使用方法: ./scripts/backup.sh "バックアップの説明"

if [ -z "$1" ]; then
    echo "使用方法: ./scripts/backup.sh \"バックアップの説明\""
    exit 1
fi

# 現在の日時を取得
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BRANCH_NAME="backup/${TIMESTAMP}"
DESCRIPTION="$1"

# 現在のブランチを保存
CURRENT_BRANCH=$(git branch --show-current)

# バックアップブランチを作成
git checkout -b "$BRANCH_NAME"
git add -A
git commit -m "backup: $DESCRIPTION" || echo "変更なし"

# タグも作成
TAG_NAME="backup-${TIMESTAMP}"
git tag -a "$TAG_NAME" -m "Backup: $DESCRIPTION"

# 元のブランチに戻る
git checkout "$CURRENT_BRANCH"

echo "✅ バックアップ完了！"
echo "ブランチ: $BRANCH_NAME"
echo "タグ: $TAG_NAME"
echo ""
echo "復元方法:"
echo "  git checkout $TAG_NAME"