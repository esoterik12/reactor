export const grammarMistakesStructure = {
  enteredDescription:
    'generate mistakes with past tense regular and irregular verbs',
  numberOfMistakesPerSentence: 3,
  sentencePairings: [
    {
      correctSentence: 'My mom went to the library with my brother.',
      incorrectSentence: 'my mom goed to the library wiff my brother.'
    },
    {
      correctSentence: 'Jenny skipped her class on Monday.',
      incorrectSentence: 'jenny skiped she class on Monday.'
    },
    {
      correctSentence: 'Last week, my brother ate six pineapples.',
      incorrectSentence: 'last week, my brother eated six pineapple.'
    },
    {
      correctSentence: 'Sam and Karl made a cake for my birthday.',
      incorrectSentence: 'Sam and Karl maked a cake for me birthday'
    }
  ]
}
