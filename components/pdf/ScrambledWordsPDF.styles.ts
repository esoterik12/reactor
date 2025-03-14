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
    border: 1,
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
