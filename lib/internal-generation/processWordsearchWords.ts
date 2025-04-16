import { AppError } from '../errors/AppError'

export const processWordsearchWords = ({
  primaryInputContent
}: {
  primaryInputContent: string
}) => {
  if (typeof primaryInputContent !== 'string') {
    throw new AppError(400, 'Invalid wordsearch input.')
  }

  return {
    data: primaryInputContent
      .split(/[\s,]+/)
      .map((word: string) => word.trim())
      .filter((word: string) => word.length > 0)
      .map((word: string) => ({ word }))
  }
}
