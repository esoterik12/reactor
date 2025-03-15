export const shuffleArray = (inputArr: string[]) => {
  for (let i = inputArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[inputArr[i], inputArr[j]] = [inputArr[j], inputArr[i]]
  }

  return inputArr
}

export const shuffle2DArray = (inputArr: string[][]) => {
  const rows = inputArr.length
  const flatArray = inputArr.flat()

  const shuffledArray = shuffleArray(flatArray)

  const new2DArray = Array.from({ length: rows }, (_, rowIndex) => {
    return shuffledArray.slice(rowIndex * rows, rowIndex * rows + rows)
  })

  return new2DArray
}
