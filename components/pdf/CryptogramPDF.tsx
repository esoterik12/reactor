import { Document, Page, Text, View } from '@react-pdf/renderer'
import { cryptogramPDFStyles as styles } from './CryptogramPDF.styles'

interface CryptogramPDFProps {
  data: CryptogramObject[]
}

type CryptogramObject = { number: number; letter: string; given: boolean }

const CryprogramPDF: React.FC<CryptogramPDFProps> = ({ data }) => {
  function chunkCryptogramText(
    array: CryptogramObject[]
  ): CryptogramObject[][] {
    const cryptogramPageChunks: CryptogramObject[][] = [[]]
    const maxRowLength = 16

    let currentRow = 0
    let currentRowIndexCounter = 0
    let i = 0

    while (i < array.length) {
      // Find the word from current index to next space (or end of array)
      const word: CryptogramObject[] = []
      let j = i

      while (j < array.length && array[j].letter !== 'space') {
        word.push(array[j])
        j++
      }

      // Add the space (if exists) to the word
      if (j < array.length && array[j].letter === 'space') {
        word.push(array[j])
        j++
      }

      // If the word fits in current row
      if (currentRowIndexCounter + word.length <= maxRowLength) {
        cryptogramPageChunks[currentRow].push(...word)
        currentRowIndexCounter += word.length
      } else {
        // Move to next row
        currentRow++
        cryptogramPageChunks.push([...word])
        currentRowIndexCounter = word.length
      }

      i = j // Skip past the word we just added
    }

    // if the last element in hunk is a space character, remove it for document alignment purposes
    cryptogramPageChunks.forEach(chunk => {
      if (chunk[chunk.length - 1].letter === 'space') {
        chunk.pop()
      }
    })

    return cryptogramPageChunks
  }

  const cryptogramPageChunks = chunkCryptogramText(data)

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.mainContainer}>
          {cryptogramPageChunks.map((chunk, chunkIndex) => (
            <View
              key={`${chunkIndex}-${chunk[0].letter}`}
              style={styles.rowContainer}
            >
              {chunk.map((item, index) => {
                const itemKey = `${item.letter}-${item.number}-${index}`
                if (item.letter === 'space') {
                  return (
                    <View
                      key={itemKey}
                      style={styles.givenLetterContainer}
                    ></View>
                  )
                } else if (item.given && item.letter !== 'space') {
                  return (
                    <View key={itemKey} style={styles.givenLetterContainer}>
                      <Text style={styles.number}>{item.number}</Text>
                      <Text style={styles.text}>{item.letter}</Text>
                    </View>
                  )
                } else if (!item.given) {
                  return (
                    <View key={itemKey} style={styles.missingLetterContainer}>
                      <Text style={styles.number}>{item.number}</Text>
                    </View>
                  )
                }
              })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default CryprogramPDF
