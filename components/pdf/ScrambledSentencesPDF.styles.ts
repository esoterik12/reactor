import { StyleSheet } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'

registerPdfFonts()

export const scrambledSentencesPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 18 },

  mainContainer: {
    flexDirection: 'column',
    gap: 6,
    marginHorizontal: 18
  },
  itemRow: {
    flexDirection: 'column',
    marginBottom: 12
  },
  sentenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  numberCell: {
    flexDirection: 'column',
    width: '4%'
  },
  numberText: {
    color: colors.teal,
    fontSize: 22,
    textAlign: 'left',
    padding: 6
  },
  sentenceCell: {
    flexDirection: 'row',
    width: '96%',
    gap: 6
  },
  wordCell: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    minWidth: 60,
  },
  sentenceText: {
    color: colors.black,
    fontSize: 22,
    textAlign: 'left',
    padding: 6
  },
  writingLineContainer: {
    flexDirection: 'column',
    width: '88%',
    height: 44,
    borderBottom: 1,
    borderColor: colors.black,
    marginLeft: 40
  }
})
