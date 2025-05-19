import { StyleSheet } from '@react-pdf/renderer'
import { PDFColorPallete as colors } from '@/lib/constants/styles/colorPalette'
import { registerPdfFonts } from '@/lib/utils/pdf-utils/registerFont'

registerPdfFonts()

export const findYourPartnerPDFStyles = StyleSheet.create({
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
    width: '22%',
    height: 130,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    padding: 12
  },
  cellText: {
    fontSize: 14,
    color: '#000000'
  }
})
