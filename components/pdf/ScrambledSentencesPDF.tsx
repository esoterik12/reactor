import { Document, Page, Text, View } from '@react-pdf/renderer'
import { scrambledSentencesPDFStyles as styles } from './ScrambledSentencesPDF.styles'
import { EditScrambledSentencesFormValues } from '@/lib/zod/edit/editScrambledSentences.schema'
import { shuffleArray } from '@/lib/utils/shuffleArray'

interface ScrambledSentencesPDFProps {
  data: EditScrambledSentencesFormValues
}

const ScrambledSentencesPDF: React.FC<ScrambledSentencesPDFProps> = ({
  data
}) => {
  // This needs to create a new 2d array of scrambled sentences - for now, by words
  const scrambledSentences = data.data.map(sentence => {
    return shuffleArray(sentence.split(' '))
  })

  // TODO Improvement ... What would be best, is if short words (1-3 letters) would be combined with
  // their preview or following words. complex but doable

  return (
    <Document>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.mainContainer}>
          {scrambledSentences.map((item, index) => (
            <View
              key={`${index}-${item[0]}`}
              style={styles.itemRow}
              wrap={false}
            >
              <View style={styles.sentenceRow}>
                <View style={styles.numberCell}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <View style={styles.sentenceCell}>
                  {item.map((word, index) => (
                    <View key={`${word}-${index}`} style={styles.wordCell}>
                      <Text style={styles.sentenceText}>{word}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.writingLineContainer}></View>
            </View>
          ))}
        </View>
      </Page>

      {/* Answer key */}
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.mainContainer}>
          {data.data.map((item, index) => (
            <View key={`${index}`} style={styles.itemRow} wrap={false}>
              <View style={styles.sentenceRow}>
                <View style={styles.numberCell}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <View style={styles.sentenceCell}>
                  <Text style={styles.sentenceText}>{item}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default ScrambledSentencesPDF
