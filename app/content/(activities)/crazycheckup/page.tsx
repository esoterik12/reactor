'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  crazyCheckUpInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import {
  baseContentSchema,
  baseContentSelectorSchema
} from '@/lib/zod/contentInput.schema'
import { ContentForm } from '@/components/input/ContentForm'
import IconCrazyCheckUp from '@/components/icons/content/IconCrazyCheckUp'
import EditSentencesForm from '@/components/edit/EditSentencesForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'

const CrazyCheckUpPage = () => {
  const [content, setContent] = useState<string[] | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconCrazyCheckUp classes={contentIconStyles} />}
      formType='generated'
      zodSchema={baseContentSchema}
      info={crazyCheckUpInfo}
      contentTitle='Crazy Check Up'
      contentType='crazyCheckUp'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Crazy Check Up'
      contentType='crazyCheckUp'
      icon={<IconCrazyCheckUp classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={crazyCheckUpInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      ) : (
        <EditSentencesForm generatedContent={content} metaData={metaData} />
      )}
    </>
  )
}

export default CrazyCheckUpPage
