export type Gender = 'male' | 'female' | 'other'
export type SexualOrientation = 'heterosexual' | 'homosexual' | 'bisexual' | 'other'
export type RelationshipStatus = 'single' | 'married' | 'divorced' | 'other'
export type SeekingType = 'same_sex' | 'rural_area' | 'second_partner'
export type ConversationStatus = 'ongoing' | 'completed'

export interface User {
  id: string
  email: string
  created_at: string
  avatar_image_url?: string
  original_image_url?: string
  profile_completed: boolean
  daily_like_count: number
  last_like_reset: string
}

export interface UserProfile {
  id: string
  user_id: string
  nickname: string
  age: number
  gender: Gender
  sexual_orientation: SexualOrientation
  location: string
  relationship_status: RelationshipStatus
  seeking_type: SeekingType
  created_at: string
}

export interface PersonalityData {
  id: string
  user_id: string
  question_answers: QuestionAnswer[]
  ai_personality_vector: AIPersonalityVector
  created_at: string
}

export interface QuestionAnswer {
  questionId: string
  answer: string | string[] | number
}

export interface AIPersonalityVector {
  systemPrompt: string
  characteristics: {
    speakingStyle: string
    values: string[]
    romanticView: string
    personalityTraits: string[]
    conversationTendencies: string[]
  }
}

export interface AIConversation {
  id: string
  user1_id: string
  user2_id: string
  conversation_log: Message[]
  status: ConversationStatus
  started_at: string
  ended_at?: string
}

export interface Message {
  id: string
  sender_id: string
  content: string
  timestamp: string
}

export interface Like {
  id: string
  from_user_id: string
  to_user_id: string
  conversation_id: string
  created_at: string
}

export interface Match {
  id: string
  user1_id: string
  user2_id: string
  matched_at: string
  conversation_unlocked: boolean
}

export interface DirectMessage {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}

export interface Block {
  id: string
  blocker_id: string
  blocked_id: string
  created_at: string
}

export interface Report {
  id: string
  reporter_id: string
  reported_user_id: string
  reason: string
  details?: string
  created_at: string
}