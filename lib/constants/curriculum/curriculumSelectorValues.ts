// These match the names of keys in the default values for useForm
// AND the week names in the JSON data
type VocabWeekIds = '12' | '34' | '5'
type SpellingWeekIds = '1' | '2' | '3' | '4' | '5'

// These two are used in defining the useForm default values
export interface VocabWeeks {
  weekId: VocabWeekIds
  weekName: 'Weeks 1 & 2' | 'Weeks 3 & 4' | 'Week 5'
}

export interface SpellingWeeks {
  weekId: SpellingWeekIds
  weekName: 'Week 1' | 'Week 2' | 'Week 3' | 'Week 4' | 'Week 5'
}

// These four define the JSON data for the curriculum
export interface UnitDataJSON {
  spelling: SpellingWeek[]
  vocab: VocabWeek[]
}

export interface SpellingWeek {
  week: SpellingWeekIds
  words: Word[]
}

export interface VocabWeek {
  week: VocabWeekIds
  words: Word[]
}

export interface Word {
  prompt: string
  answer: string
}

export const levels = ['K', '1', '2', '3', '4', '5']
export const units = ['1', '2', '3', '4', '5', '6']

export const spellingWeeks: SpellingWeeks[] = [
  {
    weekId: '1',
    weekName: 'Week 1'
  },
  {
    weekId: '2',
    weekName: 'Week 2'
  },
  {
    weekId: '3',
    weekName: 'Week 3'
  },
  {
    weekId: '4',
    weekName: 'Week 4'
  },
  {
    weekId: '5',
    weekName: 'Week 5'
  }
]

export const vocabWeeks: VocabWeeks[] = [
  {
    weekId: '12',
    weekName: 'Weeks 1 & 2'
  },
  {
    weekId: '34',
    weekName: 'Weeks 3 & 4'
  },
  {
    weekId: '5',
    weekName: 'Week 5'
  }
]
