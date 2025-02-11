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
} from '@/lib/zod/contentInput.schema'
import { ContentForm } from '@/components/input/ContentForm'
import IconChooseCorrectSpelling from '@/components/icons/content/IconChooseCorrectSpelling'
import { WordPairings } from '@/lib/zod/contentEdit.schema'
import EditWordPairsForm from '@/components/edit/EditWordPairsForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'

const tabs = [
  'Generate Content',
  'Manual Input',
  'Curriculum Selector',
  'Content Guide'
]

const ChooseCorrectSpellingPage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconChooseCorrectSpelling classes={contentIconStyles} />}
      formType='generated'
      zodSchema={chooseCorrectSpellingSchema}
      info={chooseSpellingGeneratedInfo}
      levelSelectionEnabled={false}
      contentTitle='Choose Correct Spelling'
      contentType='chooseCorrectSpelling'
      setContent={setContent}
    />,
    <ContentForm
      key='Tab 2'
      icon={<IconChooseCorrectSpelling classes={contentIconStyles} />}
      formType='manual'
      zodSchema={chooseCorrectSpellingSchema}
      info={chooseSpellingManualInfo}
      contentTitle='Choose Correct Spelling'
      contentType='chooseCorrectSpelling'
      setContent={setContent}
    />,
    <CurriculumSelector
      key='Tab 3'
      contentTitle='Choose Correct Spelling'
      contentType='chooseCorrectSpelling'
      icon={<IconChooseCorrectSpelling classes={contentIconStyles} />}
      setContent={setContent}
      zodSchema={chooseCorrectSpellingSelectorSchema}
      info={chooseSpellingManualInfo}
    />,
    <p key='Tab 4'>Tab 4</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={tabs} tabContent={tabContent} />
      ) : (
        <EditWordPairsForm
          firstWordLabel='Correct word'
          secondWordLabel='Incorrect word'
          generatedContent={content}
        />
      )}
    </>
  )
}

export default ChooseCorrectSpellingPage
