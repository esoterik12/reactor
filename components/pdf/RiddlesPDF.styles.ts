import { StyleSheet, Font } from '@react-pdf/renderer'

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

export const riddlesPDFStyles = StyleSheet.create({
  page: { backgroundColor: 'white', fontFamily: 'Raleway', marginVertical: 24 },
  mainContainer: {
    flexDirection: 'column',
    gap: 24,
    marginLeft: 48
  },
  riddleRow: {
    flexDirection: 'column'
  }
})
