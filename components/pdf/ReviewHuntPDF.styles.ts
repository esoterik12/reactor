import { StyleSheet, Font } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'

// Register font
Font.register({
  family: 'Raleway',
  fonts: [
    {
      src: `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Raleway-Regular.ttf`,
      fontWeight: 'normal'
    },
    {
      src: `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Raleway-Bold.ttf`,
      fontWeight: 'bold'
    }
  ]
})

// Disables hyphenating
Font.registerHyphenationCallback(word => {
  // Return entire word as unique part
  return [word]
})

export const reviewHuntPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 24 },

  mainContainer: {
    flexDirection: 'column',
    gap: 2,
    marginHorizontal: 24
  },

  // Questions
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 4,
    borderRadius: 8,
    marginBottom: 2,
    minHeight: 110
  },

  questionText: {
    fontSize: 30,
    marginTop: 8,
    marginBottom: 4
  },
  numberContainer: {
    flex: 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  },
  questionContainer: {
    flex: 0.93,
    padding: 6
  },
  numberText: {
    color: colors.teal,
    fontWeight: 12,
    fontSize: 32
  },

  // Answer options
  answerSheetContainer: {
    marginHorizontal: 24,
    border: 2,
    borderRadius: 12,
    borderColor: colors.gray
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24
  },
  optionsNumberCell: {
    flexDirection: 'column',
    width: '8%'
  },
  optionsNumberText: {
    fontSize: 16,
    color: colors.teal
  },
  optionsCell: {
    flexDirection: 'column',
    width: '23%'
  },
  optionsText: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'left'
  },
  correctOptionsText: {
    color: colors.orange,
    fontSize: 16,
    textAlign: 'left'
  }
})