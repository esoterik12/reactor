export const shuffleArray = (inputArr: string[]) => {
  for (let i = inputArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[inputArr[i], inputArr[j]] = [inputArr[j], inputArr[i]]
  }

  return inputArr
}
