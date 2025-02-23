import { EditPairsFormValues } from '@/lib/zod/contentEdit.schema'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { memoryCardsPDFStyles } from './MemoryCardsPDF.styles'

interface MemoryCardsPDFProps {
  title: string
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

const MemoryCardsPDF: React.FC<MemoryCardsPDFProps> = ({ title, data }) => {
  // Flatten the array of word pairs into a single array of words
  const words = data.wordPairings.flatMap(pair => [pair.wordOne, pair.wordTwo])
  const rows = chunkArray(words, 4)

  return (
    <Document>
      <Page size='A4' style={memoryCardsPDFStyles.page}>
        <View style={memoryCardsPDFStyles.titleContainer}>
          <Text style={memoryCardsPDFStyles.titleText}>{title}</Text>
        </View>

        {/* 4x4 Grid Layout */}
        <View style={memoryCardsPDFStyles.gridContainer}>
          {rows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={
                (rowIndex + 1) % 6 !== 0
                  ? memoryCardsPDFStyles.row
                  : memoryCardsPDFStyles.newPageRow
              }
              wrap={false}
            >
              {row.map((word, colIndex) => (
                <View key={colIndex} style={memoryCardsPDFStyles.cell}>
                  <Text style={memoryCardsPDFStyles.cellText}>{word}</Text>
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
