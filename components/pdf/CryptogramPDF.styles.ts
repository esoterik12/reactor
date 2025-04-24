import { StyleSheet } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'

registerPdfFonts()

export const cryptogramPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 18 },

  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 10,
    paddingVertical: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 6
  },
  spaceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 30,
    height: 60
  },
  givenLetterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 30,
    height: 60
  },
  missingLetterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 30,
    height: 60,
    borderBottom: 1
  },
  number: {
    color: colors.gray,
    fontSize: 24,
    marginTop: 4
  },
  text: {
    color: colors.black,
    fontSize: 24,
    marginTop: 4
  }
})
