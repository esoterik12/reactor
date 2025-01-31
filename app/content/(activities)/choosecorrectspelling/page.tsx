'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  chooseSpellingGeneratedInfo,
  chooseSpellingManualInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import { chooseCorrectSpellingSchema } from '@/lib/zod/contentInput.schema'
import ContentForm from '@/components/input/ContentForm'
import IconChooseCorrectSpelling from '@/components/icons/content/IconChooseCorrectSpelling'

const tabs = [
  'Generate Content',
  'Manual Input',
  'Curriculum Selector',
  'Content Guide'
]

const ChooseCorrectSpellingPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconChooseCorrectSpelling classes={contentIconStyles} />}
      formType='generated'
      zodSchema={chooseCorrectSpellingSchema}
      info={chooseSpellingGeneratedInfo}
      contentTitle='Choose Correct Spelling'
      contentType='chooseCorrectSpelling'
    />,
    <ContentForm
      key='Tab 2'
      icon={<IconChooseCorrectSpelling classes={contentIconStyles} />}
      formType='manual'
      zodSchema={chooseCorrectSpellingSchema}
      info={chooseSpellingManualInfo}
      contentTitle='Choose Correct Spelling'
      contentType='chooseCorrectSpelling'
    />,
    <p key='Tab 3'>Tab 3</p>,
    <p key='Tab 4'>Tab 4</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default ChooseCorrectSpellingPage
