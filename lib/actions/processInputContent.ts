'use server'
import { AppError } from '../errors/AppError'
import generateContent from './generateContent'
import chooseCorrectSpellingMessage from '../gpt-messages/chooseCorrectSpellingMessage'
import crazyCheckUpMessage from '../gpt-messages/crazyCheckUpMessage'
import findYourPartnerMessage from '../gpt-messages/findYourPartnerMessage'
import grammarMistakesMessage from '../gpt-messages/grammarMistakesMessage'
import memoryCardsMessage from '../gpt-messages/memoryCardsMessage'
import reviewHuntMessage from '../gpt-messages/reviewHuntMessage'
import riddlesMessage from '../gpt-messages/riddlesMessage'
import scrambledSentencesMessage from '../gpt-messages/scrambledSentencesMessage'
import { FormTypes } from '@/types/form.types'
import { generateScrambledWords } from '../internal-generation/generateScrambledWords'
import bingoMessage from '../gpt-messages/bingoMessage'
import { processBingoWords } from '../internal-generation/processBingoWords'
import interviewsMessage from '../gpt-messages/interviewsMessage'
import { generateCryptogram } from '../internal-generation/generateCryptogram'

interface ProcessInputContentProps {
  contentType: string
  formType: FormTypes
  levelSelection: string
  primaryInputContent: string
  secondaryInputContent?: string
  textareaInput?: string
  numberOfContent?: number | null
  secondaryNumberOfContent?: number | null
}

export default async function processInputContent({
  contentType,
  formType,
  levelSelection,
  primaryInputContent,
  secondaryInputContent,
  textareaInput,
  numberOfContent,
  secondaryNumberOfContent
}: ProcessInputContentProps) {
  if (formType === 'generated') {
    // This holds a content-specific generation message that is sent to GPT API
    let generationMessage: string = ''

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
            levelSelection,
            secondaryNumberOfContent: secondaryNumberOfContent || 2
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
            levelSelection,
            numberOfContent
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

        case 'riddles':
          generationMessage = riddlesMessage({
            data: primaryInputContent,
            levelSelection
          })
          break

        case 'scrambledSentences':
          generationMessage = scrambledSentencesMessage({
            data: primaryInputContent,
            levelSelection,
            numberOfSentences: numberOfContent || 8,
            wordsPerSentence: secondaryNumberOfContent || 8
          })
          break

        case 'bingo':
          generationMessage = bingoMessage({
            data: primaryInputContent,
            levelSelection
          })
          break

        case 'interviews':
          generationMessage = interviewsMessage({
            data: primaryInputContent,
            levelSelection,
            numberOfContent
          })
          break

        default:
          throw new AppError(404, `Unsupported content type: ${contentType}`)
      }
    } catch (error) {
      generationMessage = 'Error processing input content for API generation.'
      console.log(generationMessage, error)
    }

    const generationResults = generateContent({
      message: generationMessage,
      secondaryInput: secondaryInputContent
    })

    return generationResults
  } else {
    // Creation result is used to describe things that are generated internally without GPT API
    let creationResult

    try {
      switch (contentType) {
        case 'scrambledWords':
          creationResult = generateScrambledWords({ primaryInputContent })
          break

        case 'bingo':
          creationResult = processBingoWords({ primaryInputContent })
          break

        case 'cryptogram':
          creationResult = generateCryptogram({
            primaryInputContent,
            secondaryInputContent
          })
          break

        default:
          throw new AppError(404, `Unsupported content type: ${contentType}`)
      }
    } catch (error) {
      const creationResultError =
        'Error processing input content for internal generation.'
      console.log(creationResultError, error)
      return {
        message: creationResultError,
        code: 400
      }
    }

    // TODO: there appears to be a type-mismatch with creationResult
    // May need to be converted to JSON here instead of route.tsx

    const generationResults = {
      message: 'Content generated successfully.',
      code: 200,
      result: creationResult
    }

    return generationResults
  }
}
