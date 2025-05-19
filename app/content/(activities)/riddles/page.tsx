'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import {
  contentIconStyles,
  riddlesInfo
} from '@/lib/constants/content/contentInfo'
import {
  baseContentInputSchema,
  baseContentSelectorSchema
} from '@/lib/zod/input/baseContentInput.schema'
import { ContentForm } from '@/components/input/ContentForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import IconRiddles from '@/components/icons/content/IconRiddles'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import EditParagraphsForm from '@/components/edit/EditParagraphsForm'
import ContentGuide from '@/components/containers/ContentGuide'
import { riddlesGuide as guide } from '@/lib/constants/content/content-guides/riddlesGuide'

const RiddlesPage = () => {
  const [content, setContent] = useState<string[] | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconRiddles classes={contentIconStyles} />}
      formType='generated'
      zodSchema={baseContentInputSchema}
      info={riddlesInfo}
      levelSelectionEnabled={true}
      contentTitle='Riddles'
      contentType='riddles'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Riddles'
      contentType='riddles'
      formType='generated'
      icon={<IconRiddles classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={riddlesInfo}
    />,
    <ContentGuide
      key='Tab 3'
      icon={<IconRiddles classes={contentIconStyles} />}
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
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      ) : (
        <EditParagraphsForm generatedContent={content} metaData={metaData} />
      )}
    </>
  )
}

export default RiddlesPage
