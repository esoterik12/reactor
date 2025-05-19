'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { manualTabs } from '@/lib/constants/tabOptions'
import PictureRevealForm from '@/components/input/PictureRevealForm'

const PictureRevealPage = () => {
  const [images, setImages] = useState<File[]>([])

  const tabContent = [
    <PictureRevealForm key='Tab 1' setImages={setImages} images={images} />,
    <p key='Tab 2'>Tab 2</p>
  ]

  return (
    <>
      {images.length === 0 ? (
        <ContentTabs tabs={manualTabs} tabContent={tabContent} />
      ) : (
        <p>ss</p>
      )}
    </>
  )
}

export default PictureRevealPage
