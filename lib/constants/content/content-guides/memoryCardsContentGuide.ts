import { memoryCardsGeneratedInfo, memoryCardsManualInfo } from '../contentInfo'

export const memoryCardsContentGuide = {
  contentTitle: 'Memory Cards',
  description:
    'The Memory Cards creator helps you generate printable word pairs based on selected matching criteria, such as synonyms, rhyming words, or translations.',
  whyUseIt:
    'Memory card games are a hands-on and engaging way to reinforce vocabulary and language connections. They help build recall, concentration, and pattern recognition in a collaborative classroom setting.',
  imageLink: '/images/memory-cards-example.jpg',
  imageCaption:
    'This card pair was generated using the synonym option. Students must match the word "happy" with "joyful" during the game.',
  generationOptions: [
    {
      type: 'Generated',
      description: memoryCardsGeneratedInfo.primaryInputInfo.inputInfo,
      example: memoryCardsGeneratedInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Manual Input',
      description: memoryCardsManualInfo.primaryInputInfo.inputInfo,
      example: memoryCardsManualInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Select levels, units, and weeks, then choose the type of matching logic—such as synonyms, antonyms, rhymes, or word-picture pairs—to create your memory card set.'
    }
  ]
}
