import { scrambledWordsGeneratedInfo } from '../worksheetsContentInfo'

export const scrambledWordsContentGuide = {
  contentTitle: 'Scrambled Words',
  description:
    'The Scrambled Words creator helps you build activities where letters of a word are mixed up and students must unscramble them to spell the word correctly.',
  whyUseIt:
    'Scrambled word puzzles are a fun and effective way to reinforce spelling, word recognition, and vocabulary retention.',
  imageLink: '/images/scrambled-words-example.jpg',
  imageCaption:
    'This word was created using the tool. Students must rearrange the letters "fufsY" to form the correct word: "fussy".',
  generationOptions: [
    {
      type: 'Manual Input',
      description: scrambledWordsGeneratedInfo.primaryInputInfo.inputInfo
    },
    {
      type: 'Curriculum Selector',
      description:
        'Choose levels, units, and weeks to generate scrambled words that match your curriculum focus.'
    }
  ]
}
