import { Document, Page, Text, View } from '@react-pdf/renderer'
import { findYourPartnerPDFStyles as styles } from './FindYourPartnerPDF.styles'
import { EditSetsFormValues } from '@/lib/zod/edit/editSets.schema'
import { chunkArray } from '@/lib/utils/chunkArray'

interface FindYourPartnerPDFProps {
  data: EditSetsFormValues
}

const FindYourPartnerPDF: React.FC<FindYourPartnerPDFProps> = ({ data }) => {
  // Flatten the array of word pairs into a single array of words
  const words = data.data.flat()
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

export default FindYourPartnerPDF
