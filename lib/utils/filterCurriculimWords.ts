import {
  SpellingWeek,
  VocabWeek
} from '../constants/curriculum/curriculumSelectorValues'

interface FilterCurriculumWords {
  unitDataArray: (SpellingWeek | VocabWeek)[]
  wordsToFilter: string[]
}

export default function filterCurriculumWords({
  unitDataArray,
  wordsToFilter
}: FilterCurriculumWords) {
  const words: string[] = []

  unitDataArray.forEach(weekObj => {
    weekObj.words.forEach(wordsObj => {
      words.push(wordsObj.answer)
    })
  })

  const filteredWords = words.filter(word => !wordsToFilter.includes(word))

  return filteredWords
}
