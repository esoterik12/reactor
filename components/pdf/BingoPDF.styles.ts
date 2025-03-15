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
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    border: 2,
    borderColor: colors.teal,
    borderRadius: 5,
    padding: 12
  },
  cellText: {
    fontSize: 14,
    color: '#000000'
  }
})
