import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { EditMetaDataProps } from '@/types/input.types'
import { capitalizeFirstLetter } from '@/lib/utils/capitalizeFirstLetter'

// This route takes pdf input data from a post request and dynamically
// imports the correct react-pdf component and uses renderToBuffer to
// render the document into a nodejs buffer

export interface GeneratePDFRequestBody {
  pdfData: {
    content: string
    metaData: EditMetaDataProps
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Parse JSON body
    const body: GeneratePDFRequestBody = await request.json()

    if (!body.pdfData.content || !body.pdfData.metaData) {
      return NextResponse.json(
        { error: 'Missing required data: metaData and content are required.' },
        { status: 400 }
      )
    }

    // parse the content (which is a string) in to js string array
    const inputDataParsed = JSON.parse(body.pdfData.content)

    // Dynamically import correct PDF components:
    // First letter is capitalized to fit with component naming
    const pdfModule = await import(
      `@/components/pdf/${capitalizeFirstLetter(body.pdfData.metaData.contentType)}PDF`
    )
    const MyDocument = pdfModule.default

    // Render the PDF document to a buffer (binary data)
    const pdfBuffer = await renderToBuffer(
      <MyDocument data={inputDataParsed} metaData={body.pdfData.metaData} />
    )

    // Here the pdfBuffer (binary data) is returned as the HTTP response body (no encoding required)
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=worksheet.pdf'
      }
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF.' },
      { status: 500 }
    )
  }
}
