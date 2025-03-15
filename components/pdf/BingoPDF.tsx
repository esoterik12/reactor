import { Document, Page, Text, View } from '@react-pdf/renderer'
import { BingoPDFStyles as styles } from './BingoPDF.styles'
import { chunkArray } from '@/lib/utils/chunkArray'
import { EditBingoFormValues } from '@/lib/zod/edit/editBingo.schema'
import { shuffle2DArray } from '@/lib/utils/shuffleArray'
import { EditMetaDataProps } from '@/types/input.types'
import { AppError } from '@/lib/errors/AppError'

interface BingoPDFProps {
  data: EditBingoFormValues
  metaData: EditMetaDataProps
}

const BingoPDF: React.FC<BingoPDFProps> = ({ data, metaData }) => {
  const rows = chunkArray(data.bingoWords, 5)

  if (!metaData || !metaData.numberOfContent) {
    throw new AppError(400, 'Unable to process PDF: Invalid input data.')
  }

  const cardArrays = []

  for (let i = 0; i < metaData.numberOfContent; i++) {
    cardArrays.push(shuffle2DArray(rows))
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
                    <Text style={styles.cellText}>{word}</Text>
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
