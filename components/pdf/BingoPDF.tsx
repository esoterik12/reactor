import { Document, Page, Text, View } from '@react-pdf/renderer'
import { BingoPDFStyles as styles } from './BingoPDF.styles'
import { EditBingoFormValues } from '@/lib/zod/edit/editBingo.schema'
import { EditMetaDataProps } from '@/types/input.types'
import { AppError } from '@/lib/errors/AppError'
import { EditBingoValues } from '@/lib/zod/edit/editBingo.schema'

interface BingoPDFProps {
  data: EditBingoFormValues
  metaData: EditMetaDataProps
}

const BingoPDF: React.FC<BingoPDFProps> = ({ data, metaData }) => {
  // Helper function to select random words if more than 25 provided for each card
  const getRandomWords = (
    words: EditBingoValues,
    count: number
  ): EditBingoValues => {
    const shuffled = [...words].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  // Helper function to split the 25 words into 5 rows of 5
  const chunkArray = (
    arr: EditBingoValues,
    size: number
  ): EditBingoValues[] => {
    const result = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }
    return result
  }

  if (!metaData || !metaData.numberOfContent) {
    throw new AppError(400, 'Unable to process PDF; Invalid input data.')
  }

  const cardArrays: EditBingoValues[][] = []

  for (let i = 0; i < metaData.numberOfContent; i++) {
    const rows = chunkArray(getRandomWords(data.bingoWords, 25), 5)
    cardArrays.push(rows)
  }

  return (
    <Document>
      {cardArrays.map((card, cardIndex) => (
        <Page key={`Card-${cardIndex}`} size='A4' style={styles.page}>
          <View style={styles.gridContainer}>
            {card.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row} wrap={false}>
                {row.map((word, colIndex) => (
                  <View key={colIndex} style={styles.cell}>
                    <Text style={styles.cellText}>{word.word}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  )
}

export default BingoPDF
