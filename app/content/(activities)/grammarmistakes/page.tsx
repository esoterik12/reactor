'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  grammarMistakesInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import { huntAndMistakesSchema } from '@/lib/zod/contentInput.schema'
import ContentForm from '@/components/input/ContentForm'
import IconGrammarMistakes from '@/components/icons/content/IconGrammarMistakes'

const tabs = ['Generate Content', 'Curriculum Selector', 'Content Guide']

const GrammarMistakesPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconGrammarMistakes classes={contentIconStyles} />}
      formType='generated'
      zodSchema={huntAndMistakesSchema}
      info={grammarMistakesInfo}
      contentType='Grammar Mistakes'
    />,
    <p key='Tab 2'>Tab 2</p>,
    <p key='Tab 3'>Tab 3</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default GrammarMistakesPage
