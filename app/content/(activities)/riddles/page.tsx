'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import {
  contentIconStyles,
  riddlesInfo
} from '@/lib/constants/content/contentInfo'
import {
  baseContentSchema,
  baseContentSelectorSchema
} from '@/lib/zod/contentInput.schema'
import { ContentForm } from '@/components/input/ContentForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import IconRiddles from '@/components/icons/content/IconRiddles'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import EditParagraphsForm from '@/components/edit/EditParagraphsForm'

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
      zodSchema={baseContentSchema}
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
      icon={<IconRiddles classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={riddlesInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  console.log('content in /riddles/page.tsx', content)

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
