export const contentIconStyles = 'w-6 h-6 paragraph-text primary-text'

export const levelSelectionInfo = {
  title: 'Level Selecetion',
  inputInfo:
    'Providing a level selection can help improve the generated content to use level-appropriate language.'
}

// Memory Cards
export const memoryCardsGeneratedInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Describe content',
    inputInfo:
      'Provide a description of the content you would like the cards to contain. Being specific and giving a few examples will improve the results.',
    inputExample:
      "For example: 'Generate cards based around different rhyming pairs that use short vowel sounds like cat, rat, clock, sock.'"
  },
  secondaryInputInfo: {
    title: 'Matching criteria',
    inputInfo: 'Specify how you would like the pairs to be matched.',
    inputExample: 'For example: rhyming, synonyms, antonyms, definitions, etc.'
  },
  numberOfContent: {
    title: 'Number of pairs'
  }
}

export const memoryCardsManualInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide and even number of words in a comma-separated list with matching words listed together.',
    inputExample:
      "For example, 'cat, bat, log, dog' would make two pairs with the first and second being a matching pair and the third and fourth being the next mathching piar."
  }
}

// Choose Correct Spelling
export const spellingSecretMessage = {
  title: 'Secret message',
  inputInfo:
    'This is the secret message that players will decode by choosing the correct spelling of each word. It must be at least 15 non-whitespace characters in length.'
}

export const chooseSpellingGeneratedInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide a comma-separated list of spelling words. Plausible misspellings will be generated for each word to complete the activity.'
  },
  secondaryInputInfo: spellingSecretMessage
}

export const chooseSpellingManualInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide a comma-separated list of spelling words, with each word being followed by the misspelling you want to use in the activity.',
    inputExample: "For example, 'cat, kat, help, hlep' would create two pairs."
  },
  secondaryInputInfo: spellingSecretMessage
}

// Crazy Check Up
export const crazyCheckUpInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide a comma-separated list of words that can be used to generate Crazy Check Up commands. You can also enter some suggestions with each word to improve the results.',
    inputExample:
      'For example: legislation (write something), amendments (ask others for opinions), community, characteristics.'
  }
}

// Find Your Patner
export const findYourPartnerGeneratedInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Describe content',
    inputInfo:
      'Provide a description of the content you would like the activity to contain. Being specific and giving a few examples will improve the results.',
    inputExample:
      "For example: 'Generate matching sets based around different rhyming sounds that use short vowel sounds like cat, rat, clock, sock.'"
  },
  secondaryInputInfo: {
    title: 'Matching criteria',
    inputInfo: 'Specify how you would like the pairs to be matched.',
    inputExample:
      'For example: rhyming, synonyms, antonyms, definitions, sentence blanks, etc.'
  },
  numberOfContent: {
    title: 'Number of sets'
  },
  secondaryNumberOfContent: {
    title: 'Set size',
    inputInfo: 'This specifies how many items will be in each group or set.',
    inputExample: 'For example: you can have sets of two, three, or four.'
  }
}

export const findYourPartnerManualInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide and even number of words in a comma-separated list with matching words listed together.',
    inputExample:
      "For example, 'cat, bat, log, dog' would make two pairs with the first and second being a matching pair and the third and fourth being the next mathching piar."
  }
}

// Review Hunt
export const reviewHuntInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input concepts',
    inputInfo:
      'Provide a comma-separated list of concepts within the content that you want the questions to focus on.',
    inputExample:
      'For example: articles, demonstratives, adjextives, and proper adjectives'
  },
  textareaInputInfo: {
    title: 'Paste content',
    inputInfo:
      'Paste in content from a textbook, workbook, or assignment that you want to base your review questions around.'
  },
  numberOfContent: {
    title: 'Number of questions'
  }
}

export const reviewHuntSelectorInfo = {
  levelSelectionInfo,
  primaryInputInfo: reviewHuntInfo.primaryInputInfo,
  numberOfContent: reviewHuntInfo.numberOfContent
}

// Grammar Mistakes
export const grammarMistakesInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input concepts',
    inputInfo:
      'Provide a comma-separated list of concepts within the content that you want sentences to be based on.',
    inputExample:
      'For example: regular and irregular past tense verbs, subject-verb agreement, future simple tense'
  },
  textareaInputInfo: {
    title: 'Paste content',
    inputInfo:
      'Paste in content from a textbook, workbook, or assignment that you want to base your sentences around.'
  },
  numberOfContent: {
    title: 'Number of sentences'
  }
}

// Riddles
export const riddlesInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Riddle content',
    inputInfo:
      'Provide a comma-separated list of words you would like to create riddles for. You can provide phrases or full sentences as well as long as each is separated by a comma, just consider their feasability as answers to a riddle.',
    inputExample: 'For example: camouflage, evolution, predator'
  }
}
