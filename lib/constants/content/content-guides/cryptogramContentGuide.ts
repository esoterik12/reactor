import { cryptogramInfo } from '../worksheetsContentInfo'

export const cryptogramContentGuide = {
  contentTitle: 'Cryptogram',
  description:
    'The Cryptogram tool helps you create printable puzzles where letters in a sentence are replaced by numbers. Students must decode the message using logic and the given clues.',
  whyUseIt:
    'Cryptograms are a great way to build problem-solving, spelling, and vocabulary skills. They also offer a fun change of pace in language lessons and are easy to differentiate by adjusting the number of given letters.',
  imageLink: '/images/cryptogram-example.jpg',
  imageCaption:
    'This puzzle was created using the tool. Several letters are revealed to help guide students as they decode the message.',
  generationOptions: [
    {
      type: 'Manual',
      description: cryptogramInfo.primaryInputInfo.inputInfo
    }
  ]
}
