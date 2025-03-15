import { Document, Page, Text, View } from '@react-pdf/renderer'
import { memoryCardsPDFStyles as styles } from './MemoryCardsPDF.styles'
import { EditPairsFormValues } from '@/lib/zod/edit/editWordPairs.schema'
import { chunkArray } from '@/lib/utils/chunkArray'

interface MemoryCardsPDFProps {
  data: EditPairsFormValues
}

const MemoryCardsPDF: React.FC<MemoryCardsPDFProps> = ({ data }) => {
  // Flatten the array of word pairs into a single array of words
  const words = data.wordPairings.flatMap(pair => [pair.wordOne, pair.wordTwo])
  const rows = chunkArray(words, 4)

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* 4x4 Grid Layout */}
        <View style={styles.gridContainer}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row} wrap={false}>
              {row.map((word, colIndex) => (
                <View key={colIndex} style={styles.cell}>
                  <Text style={styles.cellText}>{word}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default MemoryCardsPDF
