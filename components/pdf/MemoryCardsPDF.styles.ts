import { StyleSheet } from '@react-pdf/renderer'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'

registerPdfFonts()

export const memoryCardsPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', paddingVertical: 36},

  // Grid Section
  gridContainer: {
    flexDirection: 'column',
    gap: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  },
  cell: {
    width: '21%',
    height: 120,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  cellText: {
    fontSize: 14,
    color: '#000000'
  }
})
