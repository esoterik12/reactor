import { grammarMistakesInfo } from '../contentInfo'

export const grammarMistakesGuide = {
  contentTitle: 'Grammar Mistakes',
  description:
    'The Grammar Mistakes activity helps students identify and correct errors related to specific language and grammar concepts. Students read sentences with intentional grammar mistakes and rewrite them correctly. You can paste in large amounts of content from things like workbooks and quizzes to generate these sentences.',
  whyUseIt:
    'This activity builds grammar awareness, editing skills, and attention to detail. It encourages students to apply their grammar knowledge in context, improving both their writing and comprehension abilities. It is also an effective diagnostic tool for teachers.',
  imageLink: '/images/grammar-mistakes-example.jpg',
  imageCaption:
    'In this example, students are given three incorrect sentences and must rewrite each one correctly, such as changing “Me read a chapter every night” to “I read a chapter every night.”',
  generationOptions: [
    {
      type: 'Manual Input',
      description: grammarMistakesInfo.primaryInputInfo.inputInfo,
      example: grammarMistakesInfo.primaryInputInfo.inputExample
    }
  ]
}
