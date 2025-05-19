'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { ContentForm } from '@/components/input/ContentForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import { baseContentSelectorSchema } from '@/lib/zod/input/baseContentInput.schema'
import IconInterviews from '@/components/icons/content/IconInterviews'
import EditSentencesForm from '@/components/edit/EditSentencesForm'
import {
  interviewsGeneratedInfo,
  interviewsSelectorInfo
} from '@/lib/constants/content/worksheetsContentInfo'
import { interviewsInputSchema } from '@/lib/zod/input/interviewsInput.schema'
import ContentGuide from '@/components/containers/ContentGuide'
import { interviewsContentGuide as guide } from '@/lib/constants/content/content-guides/interviewsContentGuide'

const InterviewsPage = () => {
  const [content, setContent] = useState<string[] | null>(null)
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
      icon={<IconInterviews classes={contentIconStyles} />}
      formType='generated'
      zodSchema={interviewsInputSchema}
      info={interviewsGeneratedInfo}
      contentTitle='Interviews'
      contentType='interviews'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Interviews'
      contentType='interviews'
      formType='generated'
      icon={<IconInterviews classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={interviewsSelectorInfo}
    />,
    <ContentGuide
      key='Tab 3'
      icon={<IconInterviews classes={contentIconStyles} />}
      contentTitle={guide.contentTitle}
      description={guide.description}
      whyUseIt={guide.whyUseIt}
      imageCaption={guide.imageCaption}
      imageLink={guide.imageLink}
      generationOptions={guide.generationOptions}
    />
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      ) : (
        <EditSentencesForm
          generatedContent={content}
          metaData={metaData}
          resetPage={resetPage}
        />
      )}
    </>
  )
}

export default InterviewsPage
