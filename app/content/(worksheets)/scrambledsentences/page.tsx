'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import IconScrambledSentences from '@/components/icons/content/IconScrambledSentences'
import { scrambledSentencesGeneratedInfo } from '@/lib/constants/content/worksheetsContentInfo'
import EditSentencesForm from '@/components/edit/EditSentencesForm'
import {
  scrambledSentencesFormSchema,
  scrambledSentencesSelectorSchema
} from '@/lib/zod/input/scrambledSentencesInput.schema'

const ScrambledSentencesPage = () => {
  const [content, setContent] = useState<string[] | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconScrambledSentences classes={contentIconStyles} />}
      formType='generated'
      zodSchema={scrambledSentencesFormSchema}
      info={scrambledSentencesGeneratedInfo}
      contentTitle='Scrambled Sentences'
      contentType='scrambledSentences'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Scrambled Sentences'
      contentType='scrambledSentences'
      formType='generated'
      icon={<IconScrambledSentences classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={scrambledSentencesSelectorSchema}
      info={scrambledSentencesGeneratedInfo}
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

export default ScrambledSentencesPage
