import { riddlesInfo } from '../contentInfo'

export const riddlesGuide = {
  contentTitle: 'Riddles',
  description:
    'The Riddles activity helps you generate fun and engaging riddles where the answers are vocabulary words. Each riddle gives clues about the meaning, usage, or characteristics of a target word, challenging students to guess and discuss the answer. They can also be cut up and stuck around a classroom for a more active experience.',
  whyUseIt:
    'Riddles offer a playful yet intellectually stimulating way to deepen vocabulary understanding. They support inference skills, introduce more complex language structures, and provide natural opportunities for public speaking, group discussion, and creative thinking.',
  imageLink: '/images/riddles-example.jpg',
  imageCaption:
    'In this example, a riddle hints at the words "retreat" and "irritating" through contextual clues. Students must think critically and recall vocabulary meaning to solve it.',
  generationOptions: [
    {
      type: 'Generated',
      description: riddlesInfo.primaryInputInfo.inputInfo,
      example: riddlesInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Choose levels, units, and vocabulary sets to automatically generate riddles based on curriculum-aligned words. Generated language will try to correspond to the curriculum level.'
    }
  ]
}
