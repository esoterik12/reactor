'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { manualCurricululmOnlyTabs } from '@/lib/constants/tabOptions'
import { scrambledWordsGeneratedInfo } from '@/lib/constants/content/worksheetsContentInfo'
import IconScrambledWords from '@/components/icons/content/IconScrambledWords'
import {
  baseContentInputSchema,
  baseContentSelectorSchema
} from '@/lib/zod/input/baseContentInput.schema'
import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
import UnscrambleWords from '@/components/games/UnscrambleWords'

const UnscrambleWordsPage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconScrambledWords classes={contentIconStyles} />}
      formType='internal'
      zodSchema={baseContentInputSchema}
      info={scrambledWordsGeneratedInfo}
      contentTitle='Scrambled Words'
      contentType='scrambledWords'
      levelSelectionEnabled={false}
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Scrambled Words'
      contentType='scrambledWords'
      formType='internal'
      icon={<IconScrambledWords classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={scrambledWordsGeneratedInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={manualCurricululmOnlyTabs} tabContent={tabContent} />
      ) : (
        <UnscrambleWords
          generatedContent={content}
          metaData={metaData}
        />
      )}
    </>
  )
}

export default UnscrambleWordsPage
