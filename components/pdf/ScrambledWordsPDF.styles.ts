import { StyleSheet } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'

registerPdfFonts()

export const scrambledWordsPDFStyles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Raleway',
    paddingVertical: 36,
    paddingHorizontal: 36,
    alignItems: 'center'
  },

  // Grid Section
  gridContainer: {
    flexDirection: 'column',
    gap: 4
  },
  row: {
    flexDirection: 'row',
    gap: 4
  },
  cell: {
    width: '24%',
    height: 130,
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  cellText: {
    fontSize: 14,
    color: '#000000'
  },
  writingLine: {
    height: 60,
    width: 80,
    borderBottom: 1,
    borderBottomColor: colors.blue
  }
})
