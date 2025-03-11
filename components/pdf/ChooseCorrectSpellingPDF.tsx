import { Document, Page, Text, View } from '@react-pdf/renderer'
import { EditCorrectSpellingFormValues } from '@/lib/zod/edit/editChooseCorrectSpelling.schema'
import { chooseCorrectSpellingStyles as styles } from './ChooseCorrectSpellingPDF.styles'
import { createSpellingMessages } from '@/lib/utils/pdf-utils/createSpellingMessages'

interface EditCorrectSpellingProps {
  data: EditCorrectSpellingFormValues
  secondaryInputContent: string
}

const EditCorrectSpellingPDF: React.FC<EditCorrectSpellingProps> = ({
  data,
  secondaryInputContent
}) => {

  console.log('data in EditCorrectSpellingPDF: ', data)
  console.log('secondaryInputContent in EditCorrectSpellingPDF: ', secondaryInputContent)


  const combinedResult = createSpellingMessages({
    numberOfPairs: data.wordPairings.length,
    secondaryInputContent,
    wordPairings: data.wordPairings
  })


  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.mainContainer}>
          {combinedResult.map((question, index) => {
            const isCorrectFirst = Math.random() < 0.5
            return (
              <View
                key={`${index} - ${question.correctWord.word}`}
                style={styles.questionRowContainer}
                wrap={false}
              >
                <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>

                {isCorrectFirst ? (
                  <>
                    <View style={styles.wordMessageContainer}>
                      <Text style={styles.messageText}>
                        {question.correctWord.correctMessage}
                      </Text>
                      <Text style={styles.wordText}>
                        {question.correctWord.word}
                      </Text>
                    </View>
                    <View style={styles.wordMessageContainer}>
                      <Text style={styles.messageText}>
                        {question.incorrectWord.incorrectMessage}
                      </Text>
                      <Text style={styles.wordText}>
                        {question.incorrectWord.word}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.wordMessageContainer}>
                      <Text style={styles.messageText}>
                        {question.incorrectWord.incorrectMessage}
                      </Text>
                      <Text style={styles.wordText}>
                        {question.incorrectWord.word}
                      </Text>
                    </View>
                    <View style={styles.wordMessageContainer}>
                      <Text style={styles.messageText}>
                        {question.correctWord.correctMessage}
                      </Text>
                      <Text style={styles.wordText}>
                        {question.correctWord.word}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )
          })}
        </View>
      </Page>

      <Page size='A4' style={styles.page}>
        {/* Student Answer Strip */}
        {[1, 2, 3, 4].map(item => (
          <View wrap={false} key={item} style={styles.answerStripContainer}>
            {combinedResult.map((question, index) => (
              <View
                key={`${index} - ${question.correctWord}`}
                style={styles.answerStripCell}
              >
                <Text style={styles.answerNumberCell}>{index + 1}</Text>
              </View>
            ))}
            {/* Overlay view for the outer border */}
            <View style={styles.outerBorder} />
          </View>
        ))}
      </Page>

      {/* Answer key */}
      <Page size='A4' style={styles.page}>
        <View wrap={false} style={styles.answerStripContainer}>
          {combinedResult.map((question, index) => (
            <View
              key={`${index} - ${question.correctWord}`}
              style={styles.answerStripCell}
            >
              <Text style={styles.answerNumberCell}>{index + 1}</Text>
              <Text>{question.correctWord.correctMessage}</Text>
            </View>
          ))}
          {/* Overlay view for the outer border */}
          <View style={styles.outerBorder} />
        </View>
      </Page>
    </Document>
  )
}

export default EditCorrectSpellingPDF
