'use server'
import { AppError } from '../errors/AppError'
import generateContent from './generateContent'
import chooseCorrectSpellingMessage from '../gpt-messages/chooseCorrectSpellingMessage'
import crazyCheckUpMessage from '../gpt-messages/crazyCheckUpMessage'
import findYourPartnerMessage from '../gpt-messages/findYourPartnerMessage'
import grammarMistakesMessage from '../gpt-messages/grammarMistakesMessage'
import memoryCardsMessage from '../gpt-messages/memoryCardsMessage'
import reviewHuntMessage from '../gpt-messages/reviewHuntMessage'

interface ProcessInputContentProps {
  contentType: string
  levelSelection: string
  primaryInputContent: string
  secondaryInputContent?: string
  textareaInput?: string
  numberOfContent?: number | null
}

export default async function processInputContent({
  contentType,
  levelSelection,
  primaryInputContent,
  secondaryInputContent,
  textareaInput,
  numberOfContent
}: ProcessInputContentProps) {
  let generationMessage: string = ''

  console.log('contentType', contentType)

  try {
    switch (contentType) {
      case 'chooseCorrectSpelling':
        generationMessage = chooseCorrectSpellingMessage({
          data: primaryInputContent
        })
        break

      case 'crazyCheckUp':
        generationMessage = crazyCheckUpMessage({
          data: primaryInputContent,
          levelSelection
        })
        break

      case 'findYourPartner':
        generationMessage = findYourPartnerMessage({
          data: primaryInputContent,
          matchingCriteria:
            secondaryInputContent || 'Missing matching criteria',
          numberOfContent: numberOfContent || 8,
          levelSelection
        })
        break

      case 'grammarMistakes':
        generationMessage = grammarMistakesMessage({
          grammarConceptDescription: JSON.stringify(primaryInputContent),
          numberOfContent,
          levelSelection,
          textareaInput
        })
        break

      case 'memoryCards':
        generationMessage = memoryCardsMessage({
          data: JSON.stringify(primaryInputContent),
          matchingCriteria:
            secondaryInputContent || 'Missing matching criteria',
          levelSelection
        })
        break

      case 'reviewHunt':
        generationMessage = reviewHuntMessage({
          data: primaryInputContent,
          concepts: JSON.stringify(textareaInput),
          levelSelection,
          numberOfQuestions: numberOfContent || 8
        })
        break

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
