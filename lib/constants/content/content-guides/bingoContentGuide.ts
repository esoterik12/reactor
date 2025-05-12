import { ContentGuide } from '@/types/contentGuides.types'
import { bingoManualInfo, bingoGeneratedInfo } from '../worksheetsContentInfo'

export const bingoContentGuide: ContentGuide = {
  contentTitle: 'Bingo',
  description:
    'The Bingo tool helps you create customized printable Bingo cards using your own words or phrases. Perfect for reviewing vocabulary, grammar, or themed content in a fun and engaging way.',
  whyUseIt:
    'Bingo is a versatile and interactive game that reinforces key concepts while keeping students motivated. It can be easily adapted for different levels, topics, and age groups, making it ideal for both language practice and general subject review.',
  imageLink: '/images/bingo-example.jpg',
  imageCaption:
    'This Bingo game was created using a list of target vocabulary words. Each student receives a different randomized card for added challenge.',
  generationOptions: [
    {
      type: 'Manual',
      description: bingoManualInfo.primaryInputInfo.inputInfo,
      example: bingoManualInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Generated',
      description: bingoGeneratedInfo.primaryInputInfo.inputInfo,
      example: bingoGeneratedInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Select levels, units, and weeks and filter out spelling and vocabulary words you do not want to use.'
    }
  ]
}
