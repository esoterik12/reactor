'use client'
import { useEffect, useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { ContentForm } from '@/components/input/ContentForm'
import { manualTabs } from '@/lib/constants/tabOptions'
import { cryptogramInfo } from '@/lib/constants/content/worksheetsContentInfo'
import IconCryptogram from '@/components/icons/content/IconCryptogram'
import { cryptogramInputSchema } from '@/lib/zod/input/cryptogramInput.schema'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import useSubmitPDF from '@/lib/hooks/useSubmitPDF'
import InlineError from '@/components/shared/InlineError'
import ContentGuide from '@/components/containers/ContentGuide'
import { cryptogramContentGuide as guide } from '@/lib/constants/content/content-guides/cryptogramContentGuide'

const CryptogramPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [content, setContent] = useState<string[] | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: 'cryptogram'
  })

  const { linkRef, downloadBlob } = useBlobDownloader()
  const submitPDF = useSubmitPDF()

  useEffect(() => {
    if (!content) return

    const handleSubmit = () => {
      const pdfData = {
        content: JSON.stringify(content),
        metaData
      }

      submitPDF({
        pdfData,
        setError,
        downloadBlob
      })
    }

    handleSubmit()
  }, [content, metaData, submitPDF, downloadBlob])

  if (error)
    return (
      <InlineError classes='p-2 h-full w-full flex flex-grow flex-col items-center justify-center'>
        <p className='secondary-text mb-4'>
          An unexpected error occured; please try again
        </p>
      </InlineError>
    )

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconCryptogram classes={contentIconStyles} />}
      formType='internal'
      levelSelectionEnabled={false}
      zodSchema={cryptogramInputSchema}
      info={cryptogramInfo}
      contentTitle='Cryptogram'
      contentType='cryptogram'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <ContentGuide
      key='Tab 2'
      icon={<IconCryptogram classes={contentIconStyles} />}
      contentTitle='Cryptogram'
      description={guide.description}
      whyUseIt={guide.whyUseIt}
      imageLink={guide.imageLink}
      imageCaption={guide.imageCaption}
      generationOptions={guide.generationOptions}
    />
  ]

  return (
    <>
      <ContentTabs tabs={manualTabs} tabContent={tabContent} />
      {/* Hidden download link */}
      <a ref={linkRef} className='hidden'>
        Download
      </a>
    </>
  )
}

export default CryptogramPage
