import {
  findYourPartnerGeneratedInfo,
  findYourPartnerManualInfo
} from '../contentInfo'

export const findYourPartnerGuide = {
  contentTitle: 'Find Your Partner',
  description:
    'The Find Your Partner activity creates sets of 2, 3, or 4 vocabulary words that share a specific relationship—such as synonyms, rhymes, or thematic categories. Students receive a card with a single word and must circulate to find their matching partner(s). It can also be used as a matching game where students cut out and sort the words into their sets.',
  whyUseIt:
    'This activity brings vocabulary to life through movement and collaboration. It encourages peer interaction, improves word recognition and categorization, and deepens understanding of word relationships such as synonymy, rhyme, or semantic grouping.',
  imageLink: '/images/find-your-partner-example.jpg',
  imageCaption:
    'In this example, students work together to group cards like “retreated,” “withdrew,” and “pulled back,” or “stamina,” “toughness,” and “endurance.” Each student holds one word and must find others whose cards belong to the same set.',
  generationOptions: [
    {
      type: 'Generated',
      description: findYourPartnerGeneratedInfo.secondaryInputInfo.inputInfo,
      example: findYourPartnerGeneratedInfo.secondaryInputInfo.inputExample
    },
    {
      type: 'Manual',
      description: findYourPartnerManualInfo.primaryInputInfo.inputInfo,
      example: findYourPartnerManualInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Choose levels, units, and vocabulary lists to generate prompts based on curriculum-aligned words.'
    }
  ]
}
