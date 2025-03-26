'use client'
import { useCallback, useRef } from 'react'

const useBlobDownloader = () => {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    if (linkRef.current) {
      // Set href and download attributes of the anchor elements
      linkRef.current.href = url
      linkRef.current.download = filename

      // Programmatically click the anchor to trigger download
      linkRef.current.click()

      // Clean up by revoking the Blob URL and resetting the href
      window.URL.revokeObjectURL(url)
    }
  }, [])

  return { linkRef, downloadBlob }
}

export default useBlobDownloader
