import { levelSelectionInfo } from './contentInfo'

// Scrambled Sentences
export const scrambledSentencesGeneratedInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Describe content',
    inputInfo:
      'Provide a description of the content you would like the sentences to be generated around. Being specific and giving a few examples will improve the results.',
    inputExample:
      "For example: 'Generate simple sentences that use the past simple tense, with both regular and irregular verbs.'"
  },
  numberOfContent: {
    title: 'Number of sentences'
  },
  secondaryNumberOfContent: {
    title: 'Words per sentence',
    inputInfo:
      'This specifies roughly how many words will be in each sentence.',
    inputExample:
      'For example: entering 6 will ensure sentences have 6 words per sentence, +-2 words.'
  }
}

// Scrambled Words
export const scrambledWordsGeneratedInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo: 'Provide a comma-separated list of words to scramble.'
  }
}
