export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          avatar_image_url: string | null
          original_image_url: string | null
          profile_completed: boolean
          daily_like_count: number
          last_like_reset: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          avatar_image_url?: string | null
          original_image_url?: string | null
          profile_completed?: boolean
          daily_like_count?: number
          last_like_reset?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          avatar_image_url?: string | null
          original_image_url?: string | null
          profile_completed?: boolean
          daily_like_count?: number
          last_like_reset?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          nickname: string
          age: number
          gender: 'male' | 'female' | 'other'
          sexual_orientation: 'heterosexual' | 'homosexual' | 'bisexual' | 'other'
          location: string
          relationship_status: 'single' | 'married' | 'divorced' | 'other'
          seeking_type: 'same_sex' | 'rural_area' | 'second_partner'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nickname: string
          age: number
          gender: 'male' | 'female' | 'other'
          sexual_orientation: 'heterosexual' | 'homosexual' | 'bisexual' | 'other'
          location: string
          relationship_status: 'single' | 'married' | 'divorced' | 'other'
          seeking_type: 'same_sex' | 'rural_area' | 'second_partner'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nickname?: string
          age?: number
          gender?: 'male' | 'female' | 'other'
          sexual_orientation?: 'heterosexual' | 'homosexual' | 'bisexual' | 'other'
          location?: string
          relationship_status?: 'single' | 'married' | 'divorced' | 'other'
          seeking_type?: 'same_sex' | 'rural_area' | 'second_partner'
          created_at?: string
        }
      }
      personality_data: {
        Row: {
          id: string
          user_id: string
          question_answers: any
          ai_personality_vector: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question_answers: any
          ai_personality_vector: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question_answers?: any
          ai_personality_vector?: any
          created_at?: string
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user1_id: string
          user2_id: string
          conversation_log: any
          status: 'ongoing' | 'completed'
          started_at: string
          ended_at: string | null
        }
        Insert: {
          id?: string
          user1_id: string
          user2_id: string
          conversation_log?: any
          status?: 'ongoing' | 'completed'
          started_at?: string
          ended_at?: string | null
        }
        Update: {
          id?: string
          user1_id?: string
          user2_id?: string
          conversation_log?: any
          status?: 'ongoing' | 'completed'
          started_at?: string
          ended_at?: string | null
        }
      }
      likes: {
        Row: {
          id: string
          from_user_id: string
          to_user_id: string
          conversation_id: string
          created_at: string
        }
        Insert: {
          id?: string
          from_user_id: string
          to_user_id: string
          conversation_id: string
          created_at?: string
        }
        Update: {
          id?: string
          from_user_id?: string
          to_user_id?: string
          conversation_id?: string
          created_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          user1_id: string
          user2_id: string
          matched_at: string
          conversation_unlocked: boolean
        }
        Insert: {
          id?: string
          user1_id: string
          user2_id: string
          matched_at?: string
          conversation_unlocked?: boolean
        }
        Update: {
          id?: string
          user1_id?: string
          user2_id?: string
          matched_at?: string
          conversation_unlocked?: boolean
        }
      }
      direct_messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          created_at?: string
        }
      }
      blocks: {
        Row: {
          id: string
          blocker_id: string
          blocked_id: string
          created_at: string
        }
        Insert: {
          id?: string
          blocker_id: string
          blocked_id: string
          created_at?: string
        }
        Update: {
          id?: string
          blocker_id?: string
          blocked_id?: string
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          reported_user_id: string
          reason: string
          details: string | null
          created_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          reported_user_id: string
          reason: string
          details?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          reported_user_id?: string
          reason?: string
          details?: string | null
          created_at?: string
        }
      }
    }
  }
}