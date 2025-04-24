import { StyleSheet } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'

registerPdfFonts()

export const grammarMistakesPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 18 },

  mainContainer: {
    flexDirection: 'column',
    gap: 2,
    marginHorizontal: 18
  },
  itemRow: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray,
    padding: 4
  },
  sentenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6
  },
  numberCell: {
    flexDirection: 'column',
    width: '5%'
  },
  incorrectSentenceNumberText: {
    color: colors.red,
    fontSize: 20,
    textAlign: 'left'
  },
  correctSentenceNumberText: {
    color: colors.teal,
    fontSize: 20,
    textAlign: 'left'
  },
  sentenceCell: {
    flexDirection: 'column',
    width: '95%'
  },
  sentenceText: {
    color: colors.black,
    fontSize: 20,
    textAlign: 'left'
  },
  writingLineContainer: {
    flexDirection: 'column',
    width: '88%',
    height: 30,
    borderBottom: 1,
    borderColor: colors.black,
    marginLeft: 33
  },
  drawingContainer: {
    flexDirection: 'column',
    width: '60%',
    height: 120,
    borderWidth: 1,
    borderColor: colors.black,
    marginLeft: 33,
    marginTop: 8
  }
})
