# AIデートアプリ

AIアバター同士のデート会話を観察して、価値観の合う相手とマッチングする恋愛アプリ。

## 開発進捗状況
更新日: 2025年1月10日

### Phase 1: 基盤構築（3日間）- Day 1 ✅ 完了

**完了項目:**
1. ✅ Supabase DB設計（2時間）
   - 9テーブル作成SQL
   - RLSポリシー設定  
   - トリガー作成

2. ✅ Next.jsプロジェクト構造（1時間）
   - ディレクトリ構造作成
   - 基本的なファイル配置

3. ✅ Supabase初期設定（30分）
   - クライアント/サーバー/middleware設定

4. ✅ 型定義（30分）
   - Database型
   - アプリケーション型

5. ✅ 認証画面実装（2時間）
   - ログインページ
   - サインアップページ
   - **追加: Google OAuth認証**

6. ✅ 認証Middleware（30分）

7. ✅ 動作確認（1時間）

### 残りのタスク:

**Day 2: プロフィール作成（8時間）**
- ✅ 質問データ定義（完了済み）
- ⏳ プロフィール作成画面
- ⏳ 質問回答画面
- ⏳ プロフィール完成API

**Day 3: UIフロー完成（8時間）**
- ⏳ レイアウト実装
- ⏳ ホーム画面
- ⏳ エラー処理
- ⏳ テストデータ作成

**Day 4-5: AI機能（2日間）**
- ⏳ OpenAI API連携
- ⏳ ConversationManager
- ⏳ 会話観察画面

**Day 6-7: マッチング機能（2日間）**
- ⏳ マッチング画面
- ⏳ 1対1チャット
- ⏳ 通報・ブロック
- ⏳ 最終調整

### 進捗率: 約15%（Day 1/7日完了）

## 技術スタック

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **AI**: OpenAI API, Replicate API
- **認証**: Supabase Auth (メール/パスワード + Google OAuth)

## セットアップ

### 1. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
```

### 2. データベースの初期化

1. Supabaseダッシュボードにログイン
2. SQL Editorで`/supabase/init.sql`を実行
3. Storageで`avatars`バケットを作成（公開設定）

### 3. Google OAuth設定

1. Google Cloud ConsoleでOAuth 2.0クライアントIDを作成
2. SupabaseダッシュボードでGoogle認証を有効化
3. Client IDとClient Secretを設定

### 4. 開発サーバーの起動

```bash
npm install
npm run dev
```

## 機能

- ✅ ユーザー認証（メール/パスワード、Google）
- ⏳ プロフィール作成
- ⏳ 50問の質問による性格診断
- ⏳ AI人格生成
- ⏳ AIアバター同士の会話観察
- ⏳ いいね機能
- ⏳ マッチング機能
- ⏳ 1対1チャット

## データベース構造

- users - ユーザー基本情報
- user_profiles - プロフィール詳細
- personality_data - 性格データとAI人格
- ai_conversations - AI会話ログ
- likes - いいね履歴
- matches - マッチング情報
- direct_messages - ダイレクトメッセージ
- blocks - ブロック情報
- reports - 通報情報
