import { StyleSheet } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'

registerPdfFonts()

export const riddlesPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 24 },
  mainContainer: {
    flexDirection: 'column',
    gap: 24,
    marginLeft: 48
  },
  riddleRow: {
    flexDirection: 'row'
  },
  numberContainer: {
    width: 30,
    flexDirection: 'column',
    alignContent: 'center'
  },
  riddleNumber: {
    color: colors.teal,
    fontSize: 18
  },
  answerPageContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 48
  },
  answerContainer: {
    flexDirection: 'column',
    gap: 12,
    borderWidth: 1,
    padding: 20,
    borderColor: colors.gray,
    borderRadius: 20
  },
  answerRow: {
    flexDirection: 'row'
  },
  numberNumberContainer: {
    width: '7%',
    flexDirection: 'column',
    alignContent: 'center'
  },
  answerLine: {
    width: '93%',
    flexDirection: 'row',
    borderBottom: 1
  }
})
