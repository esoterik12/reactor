import { StyleSheet, Font } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'

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

export const chooseCorrectSpellingStyles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Raleway',
    padding: 24
  },
  mainContainer: {
    flexDirection: 'column'
  },
  questionRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: colors.black,
    padding: 4,
    borderRadius: 8,
    marginBottom: 2
  },
  numberContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 4,
    borderWidth: 0.5,
    borderColor: colors.gray,
    height: '100%'
  },
  wordMessageContainer: {
    flex: 0.45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 4
  },
  messageText: {
    color: colors.red,
    fontSize: 24,
    marginTop: 4
  },
  wordText: {
    fontSize: 24,
    marginTop: 8,
    marginBottom: 4
  },
  numberText: {
    color: colors.teal,
    fontWeight: 12,
    fontSize: 32
  },

  answerStripContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // allow wrapping onto new rows
    position: 'relative', // needed for the overlay positioning
    borderRadius: 4,
    marginBottom: 2
  },
  answerStripCell: {
    flexBasis: '10%', // each cell takes up 10% of the width
    height: 80,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    textAlign: 'center'
  },
  answerNumberCell: {
    borderBottomWidth: 1,
    padding: 4,
    borderColor: colors.gray,
    textAlign: 'center'
  },
  // Overlay that draws the outer border on top of the cells
  outerBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: colors.black,
    pointerEvents: 'none' // so it doesn't interfere with touch events
  }
})
