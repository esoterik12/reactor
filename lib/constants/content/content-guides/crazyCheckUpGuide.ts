import {
  crazyCheckUpInfo,
} from '../contentInfo'

export const crazyCheckUpGuide = {
  contentTitle: 'Crazy Check Up',
  description:
    'The Crazy Checkup activity helps students engage with vocabulary words in fun, unexpected, and meaningful ways. Prompts range from drawing and storytelling to peer interaction, encouraging creativity and deeper connection with the words.',
  whyUseIt:
    'This activity transforms vocabulary review into an interactive and student-centered experience. It promotes critical thinking, emotional engagement, and social learning, all while reinforcing word meaning and usage in diverse contexts.',
  imageLink: '/images/crazy-checkup-example.jpg',
  imageCaption:
    'This example shows prompts that mix physical actions, conversations, and personal reflection—all inspired by vocabulary words like “retreat,” “intensity,” and “endurance.”',
  generationOptions: [
    {
      type: 'Generated',
      description: crazyCheckUpInfo.primaryInputInfo.inputInfo,
      example: crazyCheckUpInfo.primaryInputInfo.inputExample
    },
    {
      type: 'Curriculum Selector',
      description:
        'Choose levels, units, and vocabulary lists to generate prompts based on curriculum-aligned words. Filter by skill type such as drawing, writing, or discussion.'
    }
  ]
}
