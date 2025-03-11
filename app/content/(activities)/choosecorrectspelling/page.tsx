'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import {
  chooseSpellingGeneratedInfo,
  chooseSpellingManualInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import {
  chooseCorrectSpellingSchema,
  chooseCorrectSpellingSelectorSchema
} from '@/lib/zod/input/chooseCorrectSpellingInput.schema'
import { ContentForm } from '@/components/input/ContentForm'
import IconChooseCorrectSpelling from '@/components/icons/content/IconChooseCorrectSpelling'
import EditCorrectSpellingForm from '@/components/edit/EditCorrectSpellingForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import { SpellingWordPairings } from '@/lib/zod/edit/editChooseCorrectSpelling.schema'

const ChooseCorrectSpellingPage = () => {
  const [content, setContent] = useState<SpellingWordPairings | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconChooseCorrectSpelling classes={contentIconStyles} />}
      formType='generated'
      zodSchema={chooseCorrectSpellingSchema}
      info={chooseSpellingGeneratedInfo}
      contentTitle='Choose Correct Spelling'
      contentType='chooseCorrectSpelling'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Choose Correct Spelling'
      contentType='chooseCorrectSpelling'
      icon={<IconChooseCorrectSpelling classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={chooseCorrectSpellingSelectorSchema}
      info={chooseSpellingManualInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      ) : (
        <EditCorrectSpellingForm
          firstWordLabel='Correct word'
          secondWordLabel='Incorrect word'
          generatedContent={content}
          metaData={metaData}
        />
      )}
    </>
  )
}

export default ChooseCorrectSpellingPage
