import { Font } from '@react-pdf/renderer'

let registered = false

export function registerPdfFonts() {
  if (registered) return

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

  registered = true
}