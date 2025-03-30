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

const BingoPage = () => {
  const [content, setContent] = useState<EditBingoValues | null>(null)
  const [metaData, setMetaData] = useState<EditMetaDataProps>({
    title: '',
    contentType: '',
    numberOfContent: null
  })

  /*
    Have to decide how this will work:

    Generated content:
      Based only on description
      creates a message using the usual routes and sends content to bingo edit form
      This will create exactly 25 words and use the level selection to keep language appropriate
      1. The schema can require 25 words

    Manual input:
      I want this to by-pass generation if there are 25 words or more
      it should also have a watch component that shows how many words - and shows "extra words will be generated"

    Curriculum selector:
      This DOES NOT have a watch component - this may be necessary 
      This will also by-pass generation if there are 25 words or more

    Let's make it all without watch first
  */

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

    // Manual Input:
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
