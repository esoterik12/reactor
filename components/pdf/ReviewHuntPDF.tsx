import { Document, Page, Text, View } from '@react-pdf/renderer'
import { reviewHuntPDFStyles as styles } from './ReviewHuntPDF.styles'
import { EditMultipleChoiceFormValues } from '@/lib/zod/contentEdit.schema'
import { shuffleArray } from '@/lib/utils/shuffleArray'

interface ReviewHuntPDFProps {
  data: EditMultipleChoiceFormValues
}

export const memoryCardsColors = {
  lightBlue: '#76cff0',
  green: '#78d8a3',
  gray: '#e8e8e8',
  teal: '#02bec1'
}

const ReviewHuntPDF: React.FC<ReviewHuntPDFProps> = ({ data }) => {
  return (
    <Document>
      {/* Questions page(s) */}
      <Page size='A4' style={styles.page}>
        <View style={styles.mainContainer}>
          {data.questions.map((item, index) => (
            <View
              key={`${index} - ${item.correctAnswer[0]}`}
              style={styles.questionRow}
              wrap={false}
            >
              <View style={styles.numberContainer}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>
                  {item.sentenceWithBlank}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>

      {/* Answer student sheet page */}
      <Page size='A4' style={styles.page}>
        <View style={styles.answerSheetContainer}>
          {data.questions.map((question, index) => {
            const possibleAnswers = question.possibleAnswers.map(
              obj => obj.answer
            )
            const shuffledAnswers = shuffleArray(possibleAnswers)
            return (
              <View
                key={`${index} - ${question.correctAnswer}`}
                style={styles.optionsRow}
              >
                <View style={styles.optionsNumberCell}>
                  <Text style={styles.optionsNumberText}>{index + 1}</Text>
                </View>
                {shuffledAnswers.map((option: string, optIdx) => (
                  <View
                    key={`${optIdx} - ${option}`}
                    style={styles.optionsCell}
                  >
                    <Text style={styles.optionsText}>{option}</Text>
                  </View>
                ))}
              </View>
            )
          })}
        </View>
      </Page>

      {/* Answer Key */}
      <Page size='A4' style={styles.page}>
        <View style={styles.answerSheetContainer}>
          {data.questions.map((question, index) => {
            const possibleAnswers = question.possibleAnswers.map(
              obj => obj.answer
            )
            const shuffledAnswers = shuffleArray(possibleAnswers)
            return (
              <View
                key={`${index} - ${question.correctAnswer}`}
                style={styles.optionsRow}
              >
                <View style={styles.optionsNumberCell}>
                  <Text style={styles.optionsNumberText}>{index + 1}</Text>
                </View>
                {shuffledAnswers.map((option: string, optIdx) => (
                  <View
                    key={`${optIdx} - ${option}`}
                    style={styles.optionsCell}
                  >
                    <Text
                      style={
                        option === question.correctAnswer
                          ? styles.correctOptionsText
                          : styles.optionsText
                      }
                    >
                      {option}
                    </Text>
                  </View>
                ))}
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
}

export default ReviewHuntPDF
