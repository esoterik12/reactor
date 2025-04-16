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

// Bingo
export const bingoGeneratedInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Describe content',
    inputInfo:
      'Provide a description of what kind of word you would like generated for the bingo cards. You can also provide a few words and follow it up with a description of extra words you would like generated.',
    inputExample:
      'For example, you might ask for Grade 1 Sight Words, long vowel words, CVC words, words related to the environment.'
  },
  numberOfContent: {
    title: 'Number of game cards'
  }
}

export const bingoManualInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide a comma-separated list of 25 words to be used to create five-by-five bingo grids.',
    inputExample:
      'For example, "achievement, technology, community, attain, preserve..."'
  },
  numberOfContent: {
    title: 'Number of game cards'
  }
}

// Interviews
export const interviewsGeneratedInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Questions topcis',
    inputInfo: 'Describe what topics the questions should be based around.',
    inputExample:
      'For example, they could be general get to know you questions, questions about a specific topics, or questions that use a set of words.'
  },
  numberOfContent: {
    title: 'Number of questions'
  }
}

export const interviewsSelectorInfo = {
  levelSelectionInfo,
  primaryInputInfo: interviewsGeneratedInfo.primaryInputInfo
}

// Cryptogram
export const cryptogramInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Text to decode',
    inputInfo:
      'Enter a sentence that will be encoded with numbers replacing the letters.'
  },
  secondaryInputInfo: {
    title: 'Given letters',
    inputInfo:
      'You can provide some letters to start to make the puzzle easier. For young learners, it will work best providing 5-8 letters to start.'
  }
}

// Wordsearch
export const wordsearchInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Describe content',
    inputInfo:
      'Provide a description of what kind of word you would like generated for the bingo cards. You can also provide a few words and follow it up with a description of extra words you would like generated.',
    inputExample:
      'For example, you might ask for Grade 1 Sight Words, compound words, CVC words, words related to the environment.'
  },
  numberOfContent: {
    title: 'Number of versions'
  },
  secondaryNumberOfContent: {
    title: 'Number of words'
  }
}

export const wordsearchSelectorInfo = {
  levelSelectionInfo,
  primaryInputInfo: wordsearchInfo.primaryInputInfo,
  numberOfContent: wordsearchInfo.numberOfContent
}

export const wordsearchManualInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide a comma-separated list of words to be used to create a wordsearch.',
    inputExample:
      'For example, "achievement, technology, community, attain, preserve..."'
  },
  numberOfContent: {
    title: 'Number of versions'
  }
}
