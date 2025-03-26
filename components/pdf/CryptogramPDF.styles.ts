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

export const cryptogramPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 18 },

  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: 18,
    border: 1,
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
