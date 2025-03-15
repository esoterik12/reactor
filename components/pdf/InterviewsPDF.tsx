import { Document, Page, Text, View } from '@react-pdf/renderer'
import { interviewPDFStyles as styles } from './InterviewsPDF.styles'
import { EditMetaDataProps } from '@/types/input.types'
import { chunkArray } from '@/lib/utils/chunkArray'

interface InterviewsPDFProps {
  data: { data: string[] }
  metaData: EditMetaDataProps
}

const InterviewsPDF: React.FC<InterviewsPDFProps> = ({ data }) => {
  const pageSplitQuestions = chunkArray(data.data, 2)

  return (
    <Document>
      {pageSplitQuestions.map((interviewQuestionPair, pairIndex) => (
        <Page key={`questionPair-${pairIndex}}`} size='A4' style={styles.page}>
          <View style={styles.mainContainer}>
            {interviewQuestionPair.map((interviewQuestion, questionIndex) => (
              <View
                key={`question-${questionIndex}`}
                style={styles.questionContainer}
                wrap={false}
              >
                <View style={styles.sentenceRow}>
                  <View style={styles.numberCell}>
                    <Text style={styles.numberText}>
                      {questionIndex === 0
                        ? pairIndex * 2 + 1
                        : pairIndex * 2 + 2}
                    </Text>
                  </View>
                  <View style={styles.sentenceCell}>
                    <Text style={styles.sentenceText}>{interviewQuestion}</Text>
                  </View>
                </View>
                <View style={styles.writingLineContainer}></View>
                <View style={styles.writingLineContainer}></View>
                <View style={styles.writingLineContainer}></View>
                <View style={styles.writingLineContainer}></View>
                <View style={styles.writingLineContainer}></View>
                <View style={styles.writingLineContainer}></View>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  )
}

export default InterviewsPDF
