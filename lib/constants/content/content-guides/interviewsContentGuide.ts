import { interviewsGeneratedInfo } from '../worksheetsContentInfo'

export const interviewsContentGuide = {
  contentTitle: 'Interviews',
  description:
    'The Interviews creator helps you create and edit sets of questions based around target language.',
  whyUseIt:
    'Interview questions are a great way to get all of the class speaking to each other and using target language.',
  imageLink: '/images/interviews-example.jpg',
  imageCaption:
    'This question was created using the tool. It uses the target word "fussy" to create an easy and egaging question students can ask each other.',
  generationOptions: [
    {
      type: 'Generated',
      description: interviewsGeneratedInfo.primaryInputInfo.inputInfo,
      example: interviewsGeneratedInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Select levels, units, and weeks and filter out spelling and vocabulary words you do not want to use.'
    }
  ]
}
