# 🚨 緊急復元ガイド

## すぐに元に戻したい場合

### 1. Day 1完了時点（認証機能のみ）に戻る
```bash
npm run restore:day1
```

### 2. 最新の安定版に戻る
```bash
npm run reset
```

### 3. 現在の状態を確認
```bash
npm run status
```

## バックアップから復元

### バックアップ一覧を見る
```bash
git tag -l | grep backup
```

### 特定のバックアップに戻る
```bash
git checkout backup-20250110_120000  # 例
```

## 作業を一時保存して後で再開

### 現在の作業を保存
```bash
git stash save "作業中の内容"
```

### 保存した作業を再開
```bash
git stash list  # 一覧表示
git stash pop   # 最新を復元
```

## 完全にやり直す場合

```bash
# 1. mainブランチに戻る
git checkout main

# 2. 全ての変更を破棄
git reset --hard origin/main

# 3. node_modulesを再インストール
rm -rf node_modules package-lock.json
npm install

# 4. 開発サーバー起動
npm run dev
```

## 重要なチェックポイント

| タグ名 | 内容 | 復元コマンド |
|--------|------|--------------|
| v0.1.0-day1-complete | Day 1: 認証機能完了 | `npm run restore:day1` |

## それでも解決しない場合

1. CLAUDE.mdの開発ガイドラインを確認
2. GitHubから新規クローン：
   ```bash
   cd ..
   git clone https://github.com/JGI-pj/ai-dating-app.git ai-dating-app-fresh
   cd ai-dating-app-fresh
   npm install
   ```