'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  crazyCheckUpInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import { baseContentSchema } from '@/lib/zod/contentInput.schema'
import { ContentForm } from '@/components/input/ContentForm'
import IconCrazyCheckUp from '@/components/icons/content/IconCrazyCheckUp'
import EditSentencesForm from '@/components/edit/EditSentencesForm'

const tabs = ['Generate Content', 'Curriculum Selector', 'Content Guide']

const CrazyCheckUpPage = () => {
  const [content, setContent] = useState<string[] | null>(null)

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
    />,
    <p key='Tab 2'>Tab 2</p>,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={tabs} tabContent={tabContent} />
      ) : (
        <EditSentencesForm generatedContent={content} />
      )}
    </>
  )
}

export default CrazyCheckUpPage
