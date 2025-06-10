# 開発ガイドライン

## ブランチ運用

- `main`: 安定版（動作確認済みのコードのみ）
- `feature/xxx`: 新機能開発用
- `backup/xxx`: バックアップ用

## 開発フロー

1. **新機能開発開始時**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/機能名
   ```

2. **こまめなコミット**
   - 1機能 = 1コミット
   - 動作確認後にコミット
   - わかりやすいコミットメッセージ

3. **バックアップ作成**
   ```bash
   ./scripts/backup.sh "プロフィール画面実装前"
   ```

4. **問題発生時の復元**
   ```bash
   # 特定のコミットに戻る
   git log --oneline
   git checkout <commit-hash>
   
   # タグから復元
   git tag -l
   git checkout <tag-name>
   ```

5. **機能完成後**
   ```bash
   git checkout main
   git merge feature/機能名
   git push origin main
   ```

## エラー対処法

### ローカルの変更を破棄して特定の状態に戻る
```bash
git reset --hard <commit-hash>
```

### 作業中の変更を一時保存
```bash
git stash
# 別の作業
git stash pop
```

### 最新の安定版に戻る
```bash
git checkout main
git pull origin main
```

## 重要なタグ

- `v0.1.0-day1-complete`: Day 1完了時点（認証機能実装済み）

## トラブルシューティング

1. **npm installでエラー**: `rm -rf node_modules package-lock.json && npm install`
2. **Supabaseエラー**: 環境変数を確認
3. **ビルドエラー**: `npm run build`で事前確認