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

export const colors = {
  lightBlue: '#76cff0',
  green: '#78d8a3',
  gray: '#e8e8e8',
  teal: '#02bec1',
  red: '#ff6b6b',
  orange: '#ffb26b',
  purple: '#b98cff'
}

export const chooseCorrectSpellingStyles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Raleway',
    padding: 24
  },

  titleContainer: {
    textAlign: 'center',
    marginBottom: 24
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  mainContainer: {
    flexDirection: 'column'
  },
  questionRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 4,
    borderRadius: 8,
    marginBottom: 2
  },
  questionNextRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 4,
    borderRadius: 8,
    marginBottom: 2,
    marginTop: 48
  },
  numberContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 4
  },
  wordMessageContainer: {
    flex: 0.45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4
  },

  messageText: {
    color: colors.red,
    fontSize: 26,
    marginTop: 4
  },
  wordText: {
    fontSize: 26,
    marginTop: 8,
    marginBottom: 4
  },
  numberText: {
    color: colors.teal,
    fontWeight: 12,
    fontSize: 32
  }
})
