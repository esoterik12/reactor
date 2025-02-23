import { Document, Page, Text, View } from '@react-pdf/renderer'
import { EditCorrectSpellingFormValues } from '@/lib/zod/contentEdit.schema'
import { chooseCorrectSpellingStyles as styles } from './ChooseCorrectSpellingPDF.styles'
import { createSpellingMessages } from '@/lib/utils/pdf-utils/createSpellingMessages'

interface EditCorrectSpellingProps {
  title: string
  data: EditCorrectSpellingFormValues
  secondaryInputContent: string
}

const EditCorrectSpellingPDF: React.FC<EditCorrectSpellingProps> = ({
  title,
  data,
  secondaryInputContent
}) => {
  const combinedResult = createSpellingMessages({
    numberOfPairs: data.wordPairings.length,
    secondaryInputContent,
    wordPairings: data.wordPairings
  })

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        <View style={styles.mainContainer}>
          {combinedResult.map((question, index) => {
            const isCorrectFirst = Math.random() < 0.5
            return (
              <View
                key={`${index} - ${question.correctWord.word}`}
                style={
                  index === 0 || index % 7 !== 0
                    ? styles.questionRowContainer
                    : styles.questionNextRowContainer
                }
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
    </Document>
  )
}

export default EditCorrectSpellingPDF
