import { ContentFormInput } from './input.types'

export interface CurriculumSelectorForm extends ContentFormInput {
  spellingWeeks: {
    week1: boolean
    week2: boolean
    week3: boolean
    week4: boolean
    week5: boolean
  }
  vocabWeeks: {
    week12: boolean
    week34: boolean
    week5: boolean
  }
}
