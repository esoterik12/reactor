import { reviewHuntInfo } from '../contentInfo'

export const reviewHuntGuide = {
  contentTitle: 'Review Hunt',
  description:
    'The Review Hunt activity helps you generate multiple choice questions that challenge students to apply words in context. Each sentence includes a blank, and students choose the correct word from a list of options. You can also paste in large amounts of text data to generate questions from.',
  whyUseIt:
    'Review Hunt promotes deeper word understanding by encouraging students to read context clues and eliminate incorrect choices. It supports reading comprehension, academic vocabulary growth, and test readiness.',
  imageLink: '/images/review-hunt-example.jpg',
  imageCaption:
    'In this example, students must complete the sentence “The _ of the planet was measured to be very large” by selecting the correct word from a list. Choices like “spheres” and “criteria” appear, but only “diameter” makes sense in context.',
  generationOptions: [
    {
      type: 'Manual Input',
      description: reviewHuntInfo.primaryInputInfo.inputInfo,
      example: reviewHuntInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Choose levels, units, and vocabulary sets to auto-generate review questions.'
    }
  ]
}
