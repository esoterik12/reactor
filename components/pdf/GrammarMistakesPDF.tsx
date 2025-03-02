import { Document, Page, Text, View } from '@react-pdf/renderer'
import { grammarMistakesPDFStyles as styles } from './GrammarMistakesPDF.styles'
import { EditGrammarMistakesFormValues } from '@/lib/zod/editGrammarMistakes.schema'

interface GrammarMistakesPDFProps {
  data: EditGrammarMistakesFormValues
}

const GrammarMistakesPDF: React.FC<GrammarMistakesPDFProps> = ({ data }) => {
  return (
    <Document>
      {/* Grammar Mistakes Page */}
      <Page size='A4' style={styles.page}>
        <View style={styles.mainContainer}>
          {data.sentencePairings.map((item, index) => (
            <View key={`${index}`} style={styles.itemRow} wrap={false}>
              <View style={styles.sentenceRow}>
                <View style={styles.numberCell}>
                  <Text style={styles.incorrectSentenceNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.sentenceCell}>
                  <Text style={styles.sentenceText}>
                    {item.incorrectSentence}
                  </Text>
                </View>
              </View>
              <View style={styles.writingLineContainer}></View>
            </View>
          ))}
        </View>
      </Page>

      {/* Answer Sheet */}
      <Page size='A4' style={styles.page}>
        <View style={styles.mainContainer}>
          {data.sentencePairings.map((item, index) => (
            <View key={`${index}`} style={styles.itemRow} wrap={false}>
              <View style={styles.sentenceRow}>
                <View style={styles.numberCell}>
                  <Text style={styles.correctSentenceNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.sentenceCell}>
                  <Text style={styles.sentenceText}>
                    {item.correctSentence}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default GrammarMistakesPDF
