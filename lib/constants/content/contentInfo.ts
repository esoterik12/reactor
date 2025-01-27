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
}

export const memoryCardsManualInfo = {
  levelSelectionInfo,
  primaryInputInfo: {
    title: 'Input words',
    inputInfo:
      'Provide and even number of words in a comma-separated list with matching words listed together.',
    inputExample:
      "For example, 'cat, bat, log, dog' would make two pairs with the first and second being a matching pair and the third and fourth being the next mathching piar."
  },
}

// Choose Correct Spelling
const spellingSecretMessage = {
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
      'Provide a comma-separated list of spelling words. With each word being followed by the misspelling you want to use in the activity.',
    inputExample: "For example, 'cat, kat, help, hlep' would create two pairs."
  },
  secondaryInputInfo: spellingSecretMessage
}
