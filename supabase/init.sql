-- UUID拡張を有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum型の作成
CREATE TYPE gender AS ENUM ('male', 'female', 'other');
CREATE TYPE sexual_orientation AS ENUM ('heterosexual', 'homosexual', 'bisexual', 'other');
CREATE TYPE relationship_status AS ENUM ('single', 'married', 'divorced', 'other');
CREATE TYPE seeking_type AS ENUM ('same_sex', 'rural_area', 'second_partner');
CREATE TYPE conversation_status AS ENUM ('ongoing', 'completed');

-- 1. usersテーブル
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  avatar_image_url TEXT,
  original_image_url TEXT,
  profile_completed BOOLEAN DEFAULT FALSE NOT NULL,
  daily_like_count INTEGER DEFAULT 0 NOT NULL,
  last_like_reset DATE DEFAULT CURRENT_DATE NOT NULL
);

-- 2. user_profilesテーブル
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL CHECK (char_length(nickname) >= 2 AND char_length(nickname) <= 20),
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  gender gender NOT NULL,
  sexual_orientation sexual_orientation NOT NULL,
  location TEXT NOT NULL,
  relationship_status relationship_status NOT NULL,
  seeking_type seeking_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3. personality_dataテーブル
CREATE TABLE public.personality_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  question_answers JSONB NOT NULL,
  ai_personality_vector JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. ai_conversationsテーブル
CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  conversation_log JSONB DEFAULT '[]'::jsonb NOT NULL,
  status conversation_status DEFAULT 'ongoing' NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT different_users CHECK (user1_id != user2_id)
);

-- 5. likesテーブル
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  CONSTRAINT unique_like UNIQUE(from_user_id, to_user_id, conversation_id),
  CONSTRAINT different_users CHECK (from_user_id != to_user_id)
);

-- 6. matchesテーブル
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  conversation_unlocked BOOLEAN DEFAULT TRUE NOT NULL,
  CONSTRAINT unique_match UNIQUE(user1_id, user2_id),
  CONSTRAINT different_users CHECK (user1_id != user2_id)
);

-- 7. direct_messagesテーブル
CREATE TABLE public.direct_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  CONSTRAINT different_users CHECK (sender_id != receiver_id)
);

-- 8. blocksテーブル
CREATE TABLE public.blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  CONSTRAINT unique_block UNIQUE(blocker_id, blocked_id),
  CONSTRAINT different_users CHECK (blocker_id != blocked_id)
);

-- 9. reportsテーブル
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reported_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  CONSTRAINT different_users CHECK (reporter_id != reported_user_id)
);

-- インデックスの作成
CREATE INDEX idx_ai_conversations_users ON public.ai_conversations(user1_id, user2_id);
CREATE INDEX idx_ai_conversations_status ON public.ai_conversations(status);
CREATE INDEX idx_likes_from_user ON public.likes(from_user_id);
CREATE INDEX idx_likes_to_user ON public.likes(to_user_id);
CREATE INDEX idx_matches_users ON public.matches(user1_id, user2_id);
CREATE INDEX idx_direct_messages_sender_receiver ON public.direct_messages(sender_id, receiver_id);
CREATE INDEX idx_direct_messages_created_at ON public.direct_messages(created_at DESC);
CREATE INDEX idx_blocks_blocker ON public.blocks(blocker_id);
CREATE INDEX idx_blocks_blocked ON public.blocks(blocked_id);

-- 新規ユーザー作成時のトリガー
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 日次いいねリセット関数
CREATE OR REPLACE FUNCTION reset_daily_likes()
RETURNS void AS $$
BEGIN
  UPDATE public.users
  SET daily_like_count = 0, last_like_reset = CURRENT_DATE
  WHERE last_like_reset < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- RLSポリシーを有効化
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personality_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- RLSポリシーの作成
-- users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- user_profiles table
CREATE POLICY "Users can view all profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- personality_data table
CREATE POLICY "Users can view their own personality data" ON public.personality_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own personality data" ON public.personality_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own personality data" ON public.personality_data
  FOR UPDATE USING (auth.uid() = user_id);

-- ai_conversations table
CREATE POLICY "Users can view conversations they are part of" ON public.ai_conversations
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- likes table
CREATE POLICY "Users can view likes" ON public.likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own likes" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- matches table
CREATE POLICY "Users can view their matches" ON public.matches
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- direct_messages table
CREATE POLICY "Users can view their messages" ON public.direct_messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.direct_messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- blocks table
CREATE POLICY "Users can view their blocks" ON public.blocks
  FOR SELECT USING (auth.uid() = blocker_id);

CREATE POLICY "Users can insert blocks" ON public.blocks
  FOR INSERT WITH CHECK (auth.uid() = blocker_id);

CREATE POLICY "Users can delete their blocks" ON public.blocks
  FOR DELETE USING (auth.uid() = blocker_id);

-- reports table
CREATE POLICY "Users can insert reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Storageバケットの作成（Supabase管理画面で実行）
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);