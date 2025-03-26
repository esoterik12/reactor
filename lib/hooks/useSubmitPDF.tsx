'use client'
import { useCallback } from 'react'
import { EditMetaDataProps } from '@/types/input.types'

interface UseSubmitPDFDataProps {
  pdfData: Data
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  downloadBlob: (blob: Blob, filename: string) => void
}

interface Data {
  content: string
  metaData: EditMetaDataProps
}

const useSubmitPDF = () => {
  const submitPDF = useCallback(
    async ({
      pdfData,
      setError,
      setIsLoading,
      downloadBlob
    }: UseSubmitPDFDataProps) => {
      setError(null)
      if (setIsLoading) setIsLoading(true)

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
        const fileName = `${pdfData.metaData.title} - ${pdfData.metaData.contentType}`
        downloadBlob(blob, fileName)
      } catch (error) {
        console.log('Error submitting PDF: ', error)
        setError('An unexpected error occurred.')
      } finally {
        if (setIsLoading) setIsLoading(false)
      }
    },
    []
  )

  return submitPDF
}

export default useSubmitPDF
