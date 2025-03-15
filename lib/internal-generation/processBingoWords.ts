import { AppError } from '../errors/AppError'

export const processBingoWords = ({
  primaryInputContent
}: {
  primaryInputContent: string
}) => {
  if (typeof primaryInputContent !== 'string') {
    throw new AppError(400, 'Invalid bingo input.')
  }

  return primaryInputContent
    .split(/[\s,]+/)
    .map(word => word.trim())
    .filter(word => word.length > 0)
}
