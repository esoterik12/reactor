'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  crazyCheckUpInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import { ContentForm } from '@/components/input/ContentForm'
import IconCrazyCheckUp from '@/components/icons/content/IconCrazyCheckUp'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import { CrazyCheckUpCommand } from '@/lib/zod/edit/editCrazyCheckUp.schema'
import EditCrazyCheckUp from '@/components/edit/EditCrazyCheckUp'
import {
  baseContentInputSchema,
  baseContentSelectorSchema
} from '@/lib/zod/input/baseContentInput.schema'
import ContentGuide from '@/components/containers/ContentGuide'
import { crazyCheckUpGuide as guide } from '@/lib/constants/content/content-guides/crazyCheckUpGuide'

const CrazyCheckUpPage = () => {
  const [content, setContent] = useState<CrazyCheckUpCommand[] | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
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
      icon={<IconCrazyCheckUp classes={contentIconStyles} />}
      formType='generated'
      zodSchema={baseContentInputSchema}
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
      formType='generated'
      icon={<IconCrazyCheckUp classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={crazyCheckUpInfo}
    />,
    <ContentGuide
      key='Tab 3'
      icon={<IconCrazyCheckUp classes={contentIconStyles} />}
      contentTitle={guide.contentTitle}
      description={guide.description}
      whyUseIt={guide.whyUseIt}
      imageLink={guide.imageLink}
      imageCaption={guide.imageCaption}
      generationOptions={guide.generationOptions}
    />
  ]

  return (
    <>
      {!content ? (
        <ContentTabs
          tabs={generateOnlyTabs}
          tabContent={tabContent}
        />
      ) : (
        <EditCrazyCheckUp
          generatedContent={content}
          metaData={metaData}
          resetPage={resetPage}
        />
      )}
    </>
  )
}

export default CrazyCheckUpPage
