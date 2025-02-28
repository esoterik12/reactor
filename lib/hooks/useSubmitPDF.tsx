'use client'
import { useCallback } from 'react'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

interface UseSubmitPDFDataProps {
  pdfData: Data
  title: string
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  downloadBlob: (blob: Blob, filename: string) => void
}

interface Data {
  data: {
    title: string
    content: string
    secondaryInputData?: string | null
  }
  pdfType: string
  answerKey?: boolean
}

const useSubmitPDF = () => {
  const submitPDF = useCallback(
    async ({
      pdfData,
      title,
      setError,
      setIsLoading,
      downloadBlob
    }: UseSubmitPDFDataProps) => {
      setError(null)
      setIsLoading(true)

      pdfData.pdfType = capitalizeFirstLetter(pdfData.pdfType)

      try {
        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pdfData })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to generate PDF.')
        }

        const blob = await response.blob()
        const fileName = `${title} - ${pdfData.pdfType}`
        downloadBlob(blob, fileName)
      } catch (error) {
        console.log('Error submitting PDF: ', error)
        setError('An unexpected error occurred.')
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return submitPDF
}

export default useSubmitPDF
