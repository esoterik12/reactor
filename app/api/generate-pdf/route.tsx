import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'

// This route takes pdf input data from a post request and dynamically
// imports the correct react-pdf component and uses renderToBuffer to
// render the document into a nodejs buffer

export interface GeneratePDFRequestBody {
  pdfData: {
    data: {
      title: string
      content: string
      secondaryInputContent: string | null
    }
    pdfType: string
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Parse JSON body
    const body: GeneratePDFRequestBody = await request.json()

    const { pdfData } = body

    if (!pdfData || !pdfData.data || !pdfData.pdfType) {
      return NextResponse.json(
        { error: 'Missing required data: title and content are required.' },
        { status: 400 }
      )
    }

    // parse the content (which is a string) in to js string array
    const inputData = JSON.parse(pdfData.data.content)

    // Dynamically import correct PDF components:
    const pdfModule = await import(`@/components/pdf/${pdfData.pdfType}PDF`)
    const MyDocument = pdfModule.default

    // Render the PDF document to a buffer (binary data)
    const pdfBuffer = await renderToBuffer(
      <MyDocument
        data={inputData}
        secondaryInputContent={pdfData.data.secondaryInputContent}
      />
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
