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

export const reportColors = {
  lightBlue: '#76cff0',
  green: '#78d8a3',
  gray: '#e8e8e8',
  teal: '#02bec1'
}

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
    backgroundColor: reportColors.gray,
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
