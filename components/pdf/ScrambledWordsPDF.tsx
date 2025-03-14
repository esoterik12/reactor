import { Document, Page, Text, View } from '@react-pdf/renderer'
import { scrambledWordsPDFStyles as styles } from './ScrambledWordsPDF.styles'
import { EditPairsFormValues } from '@/lib/zod/edit/editWordPairs.schema'

interface ScrambledWordsPDFProps {
  data: EditPairsFormValues
}

// Helper function to chunk an array into subarrays of a specified size
export const chunkArray = (arr: string[], size: number) => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const ScrambledWordsPDF: React.FC<ScrambledWordsPDFProps> = ({ data }) => {
  // Flatten the array of word pairs into a single array of words
  const scrambledWords = data.wordPairings.flatMap(pair => pair.wordTwo)

  const scrambledWordRows = chunkArray(scrambledWords, 4)

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* 4x4 Grid Layout */}
        <View style={styles.gridContainer}>
          {scrambledWordRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row} wrap={false}>
              {row.map((word, colIndex) => (
                <View key={colIndex} style={styles.cell}>
                  <Text style={styles.cellText}>{word}</Text>
                  <View style={styles.writingLine} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default ScrambledWordsPDF
