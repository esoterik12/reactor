'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { allTabs } from '@/lib/constants/tabOptions'
import {
  wordsearchInfo,
  wordsearchManualInfo,
  wordsearchSelectorInfo
} from '@/lib/constants/content/worksheetsContentInfo'
import { EditMetaDataProps } from '@/types/input.types'
import IconWordsearch from '@/components/icons/content/IconWordsearch'
import {
  wordsearchInputSchema,
  wordsearchManualInputSchema,
  wordsearchSelectorSchema
} from '@/lib/zod/input/wordsearchInput.schema'
import EditWordsearchForm from '@/components/edit/EditWordsearchForm'
import { EditWordsearchValues } from '@/lib/zod/edit/editWordsearch.schema'

const WordsearchPage = () => {
  const [content, setContent] = useState<EditWordsearchValues | null>(null)
  const [metaData, setMetaData] = useState<EditMetaDataProps>({
    title: '',
    contentType: '',
    numberOfContent: null
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconWordsearch classes={contentIconStyles} />}
      formType='generated'
      zodSchema={wordsearchInputSchema}
      info={wordsearchInfo}
      contentTitle='Wordsearch'
      contentType='wordsearch'
      setContent={setContent}
      setMetaData={setMetaData}
    />,

    <ContentForm
      key='Tab 2'
      icon={<IconWordsearch classes={contentIconStyles} />}
      formType='internal'
      zodSchema={wordsearchManualInputSchema}
      info={wordsearchManualInfo}
      contentTitle='Wordsearch'
      contentType='wordsearch'
      setContent={setContent}
      setMetaData={setMetaData}
    />,

    <CurriculumSelector
      key='Tab 3'
      icon={<IconWordsearch classes={contentIconStyles} />}
      formType='internal'
      zodSchema={wordsearchSelectorSchema}
      info={wordsearchSelectorInfo}
      contentTitle='Wordsearch'
      contentType='wordsearch'
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
        <EditWordsearchForm generatedContent={content} metaData={metaData} />
      )}
    </>
  )
}

export default WordsearchPage
