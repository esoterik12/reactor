import { Document, Page, Text, View } from '@react-pdf/renderer'
import { crazyCheckUpPDFStyles as styles } from './CrazyCheckUpPDF.styles'
import { EditCrazyCheckUpFormValues } from '@/lib/zod/editCrazyCheckUp.schema'

interface CrazyCheckUpPDFProps {
  data: EditCrazyCheckUpFormValues
}

const CrazyCheckUpPDF: React.FC<CrazyCheckUpPDFProps> = ({ data }) => {
  console.log('data', data)

  /*
    Simple sentence types: 
      doAnAction, speakOrAsk, useWhiteBoard, useScrapPaper

    Write on a line type:
      writeOnThisPaper

    Draw in a box (wide box):
      drawOnThispaper

  */
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.mainContainer}>
          {data.data.map((item, index) => (
            <View key={`${index}`} style={styles.itemRow} wrap={false}>
              <View style={styles.commandRow}>
                <View style={styles.numberCell}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <View style={styles.commandCell}>
                  <Text style={styles.commandText}>{item.command}</Text>
                </View>
              </View>
              {item.commandType === 'writeOnThisPaper' && (
                <View style={styles.writingLineContainer}></View>
              )}
              {item.commandType === 'drawOnThisPaper' && (
                <View style={styles.drawingContainer}></View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default CrazyCheckUpPDF
