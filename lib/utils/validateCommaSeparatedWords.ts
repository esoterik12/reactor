export const validateCommaSeparatedWords = ({
  value,
  min = 10,
  max = 15
}: {
  value: string
  min: number
  max: number
}) => {
  const words = value
    .trim()
    .split(',')
    .map(word => word.trim())
    .filter(Boolean)
  return words.length >= min && words.length <= max
}
