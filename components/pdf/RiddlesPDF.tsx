import { Document, Page, Text, View } from '@react-pdf/renderer'
import { riddlesPDFStyles } from './RiddlesPDF.styles'

interface RiddlesPDFProps {
  data: string[]
}

export const memoryCardsColors = {
  lightBlue: '#76cff0',
  green: '#78d8a3',
  gray: '#e8e8e8',
  teal: '#02bec1'
}

const RiddlePDF: React.FC<RiddlesPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size='A4' style={riddlesPDFStyles.page}>
        <View style={riddlesPDFStyles.mainContainer}>
          {data.map((item, index) => (
            <View
              key={`${index} - ${item[0]}`}
              style={
                (index + 1) % 8 !== 0
                  ? riddlesPDFStyles.riddleRow
                  : riddlesPDFStyles.newRiddleRow
              }
              wrap={false}
            >
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default RiddlePDF
