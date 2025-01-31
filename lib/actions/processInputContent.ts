'use server'

import { AppError } from '../errors/AppError'
import generateContent from './generateContent'

interface ProcessInputContentProps {
  // title: string
  contentType: string
  levelSelection: string
  primaryInputContent: string
  secondaryInputContent?: string
  textareaInput?: string
  numberOfContent?: number | null
}

export default async function processInputContent({
  // title,
  contentType,
  levelSelection,
  primaryInputContent,
  secondaryInputContent,
  textareaInput,
  numberOfContent
}: ProcessInputContentProps) {
  let generationMessage: string = ''

  const moduleFunction = await import(`../gpt-messages/${contentType}Message`)
  const messageFunction = moduleFunction.default

  try {
    switch (contentType) {
      case 'chooseCorrectSpelling':
        generationMessage = messageFunction({
          data: JSON.stringify(primaryInputContent)
        })
        break

      case 'crazyCheckUp':
        generationMessage = messageFunction({
          data: JSON.stringify(primaryInputContent),
          levelSelection: levelSelection
        })
        break

      case 'findYourPartner':
        generationMessage = messageFunction({
          data: JSON.stringify(primaryInputContent),
          matchingCriteria: secondaryInputContent || 'Missing matching criteria'
        })
        break

      case 'grammarMistakes':
        generationMessage = messageFunction({
          grammarConceptDescription: JSON.stringify(primaryInputContent),
          numberOfMistakesPerSentence: numberOfContent || 1
        })
        break

      case 'memoryCards':
        console.log('memory')
        generationMessage = messageFunction({
          data: JSON.stringify(primaryInputContent),
          matchingCriteria: secondaryInputContent || 'Missing matching criteria'
        })
        break

      case 'reviewHunt':
        generationMessage = messageFunction({
          data: JSON.stringify(primaryInputContent),
          concepts: JSON.stringify(textareaInput),
          levelSelection: levelSelection,
          numberOfQuestions: numberOfContent || 8
        })

      default:
        throw new AppError(404, `Unsupported content type: ${contentType}`)
    }
  } catch (error) {
    console.error('Error processing input content:', error)
    generationMessage = 'Error generating content'
  }

  const generationResults = generateContent({ message: generationMessage })

  return generationResults
}
