import { StyleSheet } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'

registerPdfFonts()

export const BingoPDFStyles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Raleway',
    paddingVertical: 36,
    paddingHorizontal: 34
  },
  
  // Grid Section
  gridContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: colors.gray
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell: {
    width: '22%',
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 4
  },
  cellText: {
    fontSize: 14,
    color: '#000000'
  }
})
