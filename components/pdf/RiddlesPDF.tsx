import { Document, Page, Text, View } from '@react-pdf/renderer'
import { riddlesPDFStyles } from './RiddlesPDF.styles'

interface RiddlesPDFProps {
  data: string[]
}
const RiddlePDF: React.FC<RiddlesPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size='A4' style={riddlesPDFStyles.page}>
        <View style={riddlesPDFStyles.mainContainer}>
          {data.map((item, index) => (
            <View
              key={`${index} - ${item[0]}`}
              style={riddlesPDFStyles.riddleRow}
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
