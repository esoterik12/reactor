'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { allTabs } from '@/lib/constants/tabOptions'
import {
  bingoGeneratedInfo,
  bingoManualInfo,
  scrambledWordsGeneratedInfo
} from '@/lib/constants/content/worksheetsContentInfo'
import IconBingo from '@/components/icons/content/IconBingo'
import EditBingoForm from '@/components/edit/EditBingoForm'
import { EditMetaDataProps } from '@/types/input.types'
import {
  bingoInputSchema,
  bingoSelectorSchema
} from '@/lib/zod/input/bingoInput.schema'

const BingoPage = () => {
  const [content, setContent] = useState<string[] | null>(null)
  const [metaData, setMetaData] = useState<EditMetaDataProps>({
    title: '',
    contentType: '',
    numberOfContent: null
  })

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
      zodSchema={bingoInputSchema}
      info={bingoManualInfo}
      contentTitle='Bingo'
      contentType='bingo'
      levelSelectionEnabled={false}
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 3'
      contentTitle='Bingo'
      contentType='bingo'
      formType='internal'
      icon={<IconBingo classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={bingoSelectorSchema}
      info={scrambledWordsGeneratedInfo}
    />,
    <p key='Tab 4'>Tab 4</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={allTabs} tabContent={tabContent} />
      ) : (
        <EditBingoForm generatedContent={content} metaData={metaData} />
      )}
    </>
  )
}

export default BingoPage
