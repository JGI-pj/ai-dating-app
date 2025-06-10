export type QuestionType = 'single' | 'multiple' | 'scale' | 'text'
export type QuestionCategory = 'basic' | 'trouble' | 'values' | 'behavior' | 'mental'

export interface Question {
  id: string
  category: QuestionCategory
  type: QuestionType
  question: string
  options?: string[]
  maxSelect?: number
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: { min: string; max: string }
}

export const questions: Question[] = [
  // 基本的な恋愛観（10問）
  {
    id: '1',
    category: 'basic',
    type: 'single',
    question: '理想のデートプランは？',
    options: ['カフェ', '映画', '遊園地', '美術館', 'アウトドア', '家']
  },
  {
    id: '2',
    category: 'basic',
    type: 'single',
    question: '恋愛で最も大切にしている価値観は？',
    options: ['信頼', '共感', '刺激', '安定', '成長', '自由']
  },
  {
    id: '3',
    category: 'basic',
    type: 'multiple',
    question: 'パートナーに求める要素を3つ選んでください',
    options: ['優しさ', 'ユーモア', '誠実さ', '知性', '経済力', '外見', '価値観', '趣味'],
    maxSelect: 3
  },
  {
    id: '4',
    category: 'basic',
    type: 'scale',
    question: '束縛についてどう思いますか？',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: '自由が大切', max: '束縛も愛情表現' }
  },
  {
    id: '5',
    category: 'basic',
    type: 'single',
    question: '理想の連絡頻度は？',
    options: ['毎日複数回', '毎日1回', '週数回', '週1回', 'もっと少なく']
  },
  {
    id: '6',
    category: 'basic',
    type: 'single',
    question: '記念日は大切にする？',
    options: ['とても大切', 'まあ大切', 'どちらでも', 'あまり気にしない', '全く気にしない']
  },
  {
    id: '7',
    category: 'basic',
    type: 'single',
    question: '愛情表現の方法は？',
    options: ['言葉', '行動', 'プレゼント', '時間', 'スキンシップ']
  },
  {
    id: '8',
    category: 'basic',
    type: 'single',
    question: '結婚についての考えは？',
    options: ['すぐにでも', 'いずれは', 'わからない', '考えていない', 'したくない']
  },
  {
    id: '9',
    category: 'basic',
    type: 'single',
    question: '子供は欲しい？',
    options: ['絶対欲しい', 'できれば欲しい', 'どちらでも', 'あまり欲しくない', '欲しくない']
  },
  {
    id: '10',
    category: 'basic',
    type: 'single',
    question: '理想の関係性は？',
    options: ['対等なパートナー', 'リードしたい', 'リードされたい']
  },

  // トラブル対処法（10問）
  {
    id: '11',
    category: 'trouble',
    type: 'single',
    question: 'パートナーと意見が対立した時は？',
    options: ['話し合う', '譲る', '主張する', '時間を置く', 'その他']
  },
  {
    id: '12',
    category: 'trouble',
    type: 'single',
    question: '嫉妬した時の行動は？',
    options: ['正直に伝える', '我慢する', 'さりげなく確認', '相手を試す', '気にしない']
  },
  {
    id: '13',
    category: 'trouble',
    type: 'multiple',
    question: '浮気の定義は？',
    options: ['身体関係', 'デート', '連絡', '気持ち', 'その他']
  },
  {
    id: '14',
    category: 'trouble',
    type: 'single',
    question: '元恋人との連絡は？',
    options: ['完全NG', '事前相談', '事後報告', '自由', '状況による']
  },
  {
    id: '15',
    category: 'trouble',
    type: 'single',
    question: '喧嘩の仲直り方法は？',
    options: ['すぐ謝る', '話し合う', '時間を置く', 'プレゼント', 'スキンシップ']
  },
  {
    id: '16',
    category: 'trouble',
    type: 'single',
    question: '価値観の違いを感じたら？',
    options: ['話し合う', '受け入れる', '妥協点を探す', '諦める', '別れを考える']
  },
  {
    id: '17',
    category: 'trouble',
    type: 'single',
    question: '相手の嫌な部分を見つけたら？',
    options: ['直接伝える', 'やんわり伝える', '我慢', '受け入れる', '様子を見る']
  },
  {
    id: '18',
    category: 'trouble',
    type: 'single',
    question: '距離を置きたいと言われたら？',
    options: ['理由を聞く', '受け入れる', '引き止める', '自分も考える', '別れを覚悟']
  },
  {
    id: '19',
    category: 'trouble',
    type: 'single',
    question: '相手が落ち込んでいる時は？',
    options: ['励ます', '話を聞く', 'そっとしておく', '気分転換', '一緒にいる']
  },
  {
    id: '20',
    category: 'trouble',
    type: 'single',
    question: '自分が悪い時の謝り方は？',
    options: ['すぐ謝る', '理由を説明', '行動で示す', 'プレゼント', '時間をかけて']
  },

  // 深い価値観・性格（10問）
  {
    id: '21',
    category: 'values',
    type: 'single',
    question: '人生で最も大切なものは？',
    options: ['家族', '仕事', '恋人', '友人', '趣味', 'お金', '健康', '自由']
  },
  {
    id: '22',
    category: 'values',
    type: 'single',
    question: 'ストレス解消法は？',
    options: ['運動', '食事', '睡眠', '趣味', '人と話す', '一人になる']
  },
  {
    id: '23',
    category: 'values',
    type: 'single',
    question: '休日の過ごし方は？',
    options: ['アクティブ', 'のんびり', '予定を詰める', '気分次第', 'パートナーと']
  },
  {
    id: '24',
    category: 'values',
    type: 'single',
    question: 'お金の使い方は？',
    options: ['計画的', '衝動的', '貯金重視', '経験重視', 'バランス型']
  },
  {
    id: '25',
    category: 'values',
    type: 'single',
    question: '仕事とプライベートのバランスは？',
    options: ['仕事優先', 'プライベート優先', 'バランス重視', '状況次第']
  },
  {
    id: '26',
    category: 'values',
    type: 'single',
    question: '友人関係は？',
    options: ['狭く深く', '広く浅く', '一人が好き', 'パートナー中心', 'バランス型']
  },
  {
    id: '27',
    category: 'values',
    type: 'single',
    question: '家族との関係は？',
    options: ['とても親密', '良好', '普通', '少し距離', '疎遠']
  },
  {
    id: '28',
    category: 'values',
    type: 'text',
    question: '将来の夢は？'
  },
  {
    id: '29',
    category: 'values',
    type: 'text',
    question: '苦手なタイプは？'
  },
  {
    id: '30',
    category: 'values',
    type: 'text',
    question: '長所と短所は？'
  },

  // 恋愛における具体的行動（10問）
  {
    id: '31',
    category: 'behavior',
    type: 'single',
    question: 'デート代は？',
    options: ['全額出す', '割り勘', '相手に任せる', '交互', '収入に応じて']
  },
  {
    id: '32',
    category: 'behavior',
    type: 'single',
    question: 'サプライズは？',
    options: ['大好き', '嬉しい', '普通', '苦手', '嫌い']
  },
  {
    id: '33',
    category: 'behavior',
    type: 'single',
    question: '人前でのスキンシップは？',
    options: ['積極的', '普通', '控えめ', 'しない', '相手に合わせる']
  },
  {
    id: '34',
    category: 'behavior',
    type: 'single',
    question: 'SNSでの恋人公開は？',
    options: ['積極的', '普通', '限定的', 'しない', '相手に合わせる']
  },
  {
    id: '35',
    category: 'behavior',
    type: 'single',
    question: '同棲するなら？',
    options: ['すぐにでも', '1年後', '結婚前提', '結婚後', 'しない']
  },
  {
    id: '36',
    category: 'behavior',
    type: 'single',
    question: '相手の友人との付き合いは？',
    options: ['積極的', '普通', '必要最低限', '避ける', '相手に任せる']
  },
  {
    id: '37',
    category: 'behavior',
    type: 'single',
    question: '自分の趣味の時間は？',
    options: ['とても大切', '大切', '普通', '削ってもいい', '相手優先']
  },
  {
    id: '38',
    category: 'behavior',
    type: 'single',
    question: 'ペットは？',
    options: ['飼いたい', '飼ってもいい', 'どちらでも', '苦手', '絶対無理']
  },
  {
    id: '39',
    category: 'behavior',
    type: 'single',
    question: '旅行の計画は？',
    options: ['綿密に', 'ざっくり', '行き当たりばったり', '相手に任せる', '一緒に']
  },
  {
    id: '40',
    category: 'behavior',
    type: 'single',
    question: '記念日の過ごし方は？',
    options: ['豪華に', '普通に特別', 'いつも通り', '忘れがち', '気にしない']
  },

  // メンタル・性癖関連（10問）
  {
    id: '41',
    category: 'mental',
    type: 'scale',
    question: '感情の起伏は？',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: '安定', max: '激しい' }
  },
  {
    id: '42',
    category: 'mental',
    type: 'scale',
    question: '依存度は？',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: '自立', max: '依存的' }
  },
  {
    id: '43',
    category: 'mental',
    type: 'single',
    question: '一人の時間は？',
    options: ['絶対必要', 'あった方がいい', 'どちらでも', 'なくてもいい', 'いらない']
  },
  {
    id: '44',
    category: 'mental',
    type: 'scale',
    question: '愛情の重さは？',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'さっぱり', max: '重い' }
  },
  {
    id: '45',
    category: 'mental',
    type: 'scale',
    question: '独占欲は？',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'ない', max: '強い' }
  },
  {
    id: '46',
    category: 'mental',
    type: 'single',
    question: '構ってほしい頻度は？',
    options: ['常に', 'よく', '普通', 'たまに', 'あまり']
  },
  {
    id: '47',
    category: 'mental',
    type: 'single',
    question: '感情表現は？',
    options: ['得意', '普通', '苦手', 'しない', '相手による']
  },
  {
    id: '48',
    category: 'mental',
    type: 'single',
    question: '弱音を吐ける？',
    options: ['よく吐く', 'たまに', 'あまり吐かない', '吐かない', '相手による']
  },
  {
    id: '49',
    category: 'mental',
    type: 'single',
    question: '求めるものは？',
    options: ['精神的繋がり', '身体的繋がり', '両方同じくらい', '状況による', 'わからない']
  },
  {
    id: '50',
    category: 'mental',
    type: 'text',
    question: '過去の恋愛から学んだことは？'
  }
]