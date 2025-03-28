import { Document, Page, Text, View } from '@react-pdf/renderer'
import { riddlesPDFStyles as styles } from './RiddlesPDF.styles'
import { chunkArray } from '@/lib/utils/chunkArray'

interface RiddlesPDFProps {
  data: string[]
}
const RiddlePDF: React.FC<RiddlesPDFProps> = ({ data }) => {
  // If there are more than 7 items, calculate how many pages are needed.
  const numPages = data.length > 7 ? Math.ceil(data.length / 7) : 1

  // Calculate chunk size to evenly split the data
  const chunkSize = Math.ceil(data.length / numPages)
  const dataChunks = chunkArray(data, chunkSize)

  return (
    <Document>
      {/* Riddle pages */}
      {dataChunks.map((chunk, pageIndex) => (
        <Page key={`riddles-${pageIndex}`} size='A4' style={styles.page}>
          <View style={styles.mainContainer}>
            {chunk.map((item, index) => (
              <View
                key={`riddle-${pageIndex}-${index}`}
                style={styles.riddleRow}
                wrap={false}
              >
                <View style={styles.numberContainer}>
                  <Text style={styles.riddleNumber}>
                    {pageIndex * chunkSize + index + 1}
                  </Text>
                </View>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
        </Page>
      ))}

      {/* Answer pages */}
      <Page size='A4' style={styles.page}>
        <View style={styles.answerPageContainer}>
          <View style={styles.answerContainer}>
            {data.map((item, index) => (
              <View
                key={`answer-${index} - ${item[0]}`}
                style={styles.answerRow}
                wrap={false}
              >
                <View style={styles.numberNumberContainer}>
                  <Text style={styles.riddleNumber}>{index + 1}</Text>
                </View>
                <View style={styles.answerLine}></View>
              </View>
            ))}
          </View>
        </View>

        {/* If there are fewer than 11 riddles, we can put two answer sheets on a single page */}
        {data.length < 11 && (
          <View style={styles.answerPageContainer}>
            <View style={styles.answerContainer}>
              {data.map((item, index) => (
                <View
                  key={`answer-${index} - ${item[0]}`}
                  style={styles.answerRow}
                  wrap={false}
                >
                  <View style={styles.numberNumberContainer}>
                    <Text style={styles.riddleNumber}>{index + 1}</Text>
                  </View>
                  <View style={styles.answerLine}></View>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}

export default RiddlePDF
