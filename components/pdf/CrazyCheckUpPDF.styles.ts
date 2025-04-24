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

export const crazyCheckUpPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 18 },

  mainContainer: {
    flexDirection: 'column',
    gap: 6,
    marginHorizontal: 18
  },
  itemRow: {
    flexDirection: 'column'
  },
  commandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6
  },
  numberCell: {
    flexDirection: 'column',
    width: '5%'
  },
  numberText: {
    color: colors.teal,
    fontSize: 20,
    textAlign: 'left'
  },
  commandCell: {
    flexDirection: 'column',
    width: '95%'
  },
  commandText: {
    color: colors.black,
    fontSize: 20,
    textAlign: 'left'
  },
  writingLineContainer: {
    flexDirection: 'column',
    width: '90%',
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
