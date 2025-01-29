'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  chooseSpellingGeneratedInfo,
  chooseSpellingManualInfo
} from '@/lib/constants/content/contentInfo'
import { chooseCorrectSpellingSchema } from '@/lib/zod/contentInput.schema'
import ContentForm from '@/components/input/ContentForm'

const tabs = ['Generate Content', 'Manual Input', 'Curriculum Selector', 'Content Guide']

const ChooseCorrectSpellingPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      formType='generated'
      zodSchema={chooseCorrectSpellingSchema}
      info={chooseSpellingGeneratedInfo}
      contentType='Choose Correct Spelling'
    />,
    <ContentForm
      key='Tab 2'
      formType='manual'
      zodSchema={chooseCorrectSpellingSchema}
      info={chooseSpellingManualInfo}
      contentType='Choose Correct Spelling'
    />,
    <p key='Tab 3'>Tab 3</p>,
    <p key='Tab 4'>Tab 4</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default ChooseCorrectSpellingPage
