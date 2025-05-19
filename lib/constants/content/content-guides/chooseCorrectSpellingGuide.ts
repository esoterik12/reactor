import {
  chooseSpellingGeneratedInfo,
  chooseSpellingManualInfo
} from '../contentInfo'

export const chooseCorrectSpellingGuide = {
  contentTitle: 'Choose Correct Spelling',
  description:
    'The Choose Correct Spelling activity helps create a quick way to review spelling words. Strips can be stuck around the room and students fill in the letters that match the correct spelling of each words to complete a secret message.',
  whyUseIt:
    'This activity makes spelling practice more engaging by combining word recognition with puzzle-solving. It encourages careful attention to detail and gives learners an extra incentive to get each answer right as they work toward solving the secret message.',
  imageLink: '/images/choose-correct-spelling-example.jpg',
  imageCaption:
    'In this example, students decide which spelling is correct—"mood" or "moodd"—and then copy the corresponding code into the boxes to solve the hidden word.',
  generationOptions: [
    {
      type: 'Generated',
      description: chooseSpellingGeneratedInfo.primaryInputInfo.inputInfo
    },
    {
      type: 'Manual Input',
      description: chooseSpellingManualInfo.primaryInputInfo.inputInfo,
      example: chooseSpellingManualInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Select levels, units, and weeks, then choose the type of matching logic—such as synonyms, antonyms, rhymes, or word-picture pairs—to create your memory card set.'
    }
  ]
}
