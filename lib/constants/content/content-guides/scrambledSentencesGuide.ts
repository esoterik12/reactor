import { scrambledSentencesGeneratedInfo } from '../worksheetsContentInfo'

export const scrambledSentencesContentGuide = {
  contentTitle: 'Scrambled Sentences',
  description:
    'The Scrambled Sentences creator helps you generate sentence-based activities where students must rearrange words into the correct order.',
  whyUseIt:
    'Scrambled sentences are an excellent way to reinforce grammar, sentence structure, and word order while keeping students actively engaged.',
  imageLink: '/images/scrambled-sentences-example.jpg',
  generationOptions: [
    {
      type: 'Generated',
      description: scrambledSentencesGeneratedInfo.primaryInputInfo.inputInfo,
      example: scrambledSentencesGeneratedInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Select levels, units, and weeks to generate scrambled sentences based on curriculum-based vocabulary and sentence patterns.'
    }
  ]
}
