'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  chooseSpellingGeneratedInfo,
  
} from '@/lib/constants/content/contentInfo'
import { baseContentSchema } from '@/lib/zod/contentInput.schema'
import ContentForm from '@/components/input/ContentForm'

const tabs = ['Generate Content', 'Curriculum Selector']

const CrazyCheckUpPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      formType='generated'
      zodSchema={baseContentSchema}
      info={chooseSpellingGeneratedInfo}
      contentType='Crazy Check Up'
    />,
    <p key='Tab 2'>Tab 1</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default CrazyCheckUpPage
