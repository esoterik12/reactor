import { AppError } from '../errors/AppError'

export const processBingoWords = ({
  primaryInputContent
}: {
  primaryInputContent: string
}) => {
  if (typeof primaryInputContent !== 'string') {
    throw new AppError(400, 'Invalid bingo input.')
  }

  // If the content comes from CurriculumSelector then it will be in JSON as an array
  // Conver to a string array
  const arrayData: string[] = JSON.parse(primaryInputContent)

  // Now convert it to a single comma-spearated string to mirror the data the GPT API would return
  const string = arrayData.join(', ')

  return string
    .split(/[\s,]+/)
    .map((word: string) => word.trim())
    .filter((word: string) => word.length > 0)
    .map((word: string) => ({ word }))
}
