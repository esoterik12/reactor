'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { allTabs } from '@/lib/constants/tabOptions'
import {
  bingoGeneratedInfo,
  bingoManualInfo
} from '@/lib/constants/content/worksheetsContentInfo'
import IconBingo from '@/components/icons/content/IconBingo'
import EditBingoForm from '@/components/edit/EditBingoForm'
import { EditMetaDataProps } from '@/types/input.types'
import {
  bingoInputSchema,
  bingoManualInputSchema,
  bingoSelectorSchema
} from '@/lib/zod/input/bingoInput.schema'
import { EditBingoValues } from '@/lib/zod/edit/editBingo.schema'
import ContentGuide from '@/components/containers/ContentGuide'
import { bingoContentGuide } from '@/lib/constants/content/content-guides/bingoContentGuide'

const BingoPage = () => {
  const [content, setContent] = useState<EditBingoValues | null>(null)
  const [metaData, setMetaData] = useState<EditMetaDataProps>({
    title: '',
    contentType: '',
    numberOfContent: null
  })

  const resetPage = () => {
    setContent(null)
    setMetaData({
      title: '',
      contentType: ''
    })
  }

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconBingo classes={contentIconStyles} />}
      formType='generated'
      zodSchema={bingoInputSchema}
      info={bingoGeneratedInfo}
      contentTitle='Bingo'
      contentType='bingo'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <ContentForm
      key='Tab 2'
      icon={<IconBingo classes={contentIconStyles} />}
      formType='internal'
      zodSchema={bingoManualInputSchema}
      info={bingoManualInfo}
      contentTitle='Bingo'
      contentType='bingo'
      levelSelectionEnabled={false}
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 3'
      icon={<IconBingo classes={contentIconStyles} />}
      formType='generated'
      zodSchema={bingoSelectorSchema}
      info={bingoGeneratedInfo}
      contentTitle='Bingo'
      contentType='bingo'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <ContentGuide
      key='Tab 4'
      icon={<IconBingo classes={contentIconStyles} />}
      contentTitle={bingoContentGuide.contentTitle}
      description={bingoContentGuide.description}
      whyUseIt={bingoContentGuide.whyUseIt}
      imageCaption={bingoContentGuide.imageCaption}
      imageLink={bingoContentGuide.imageLink}
      generationOptions={bingoContentGuide.generationOptions}
    />
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={allTabs} tabContent={tabContent} />
      ) : (
        <EditBingoForm
          generatedContent={content}
          metaData={metaData}
          resetPage={resetPage}
        />
      )}
    </>
  )
}

export default BingoPage
