'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import {
  memoryCardsGeneratedInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import {
  generateMemoryCardsInputSchema,
  memoryCardsSelectorSchama
} from '@/lib/zod/input/memoryCardsInput.schema'
import IconMemoryCards from '@/components/icons/content/IconMemoryCards'
import { WordPairings } from '@/lib/zod/edit/editWordPairs.schema'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import MemoryGame from '@/components/games/memorygame/MemoryGame'
import EditMemoryGame from '@/components/edit/EditMemoryGame'

const MemoryGamePage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)
  const [stage, setStage] = useState<'input' | 'game'>('input')
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm<WordPairings>
      key='Tab 1'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      formType='generated'
      zodSchema={generateMemoryCardsInputSchema}
      info={memoryCardsGeneratedInfo}
      contentTitle='Memory Game'
      contentType='memoryCards'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Memory Game'
      contentType='memoryCards'
      formType='generated'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={memoryCardsSelectorSchama}
      info={memoryCardsGeneratedInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content && (
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      )}
      {content && stage === 'input' && (
        <EditMemoryGame
          firstWordLabel='Word one'
          secondWordLabel='Word two'
          setContent={setContent}
          generatedContent={content}
          setStageFunction={setStage}
        />
      )}
      {content && stage === 'game' && (
        <MemoryGame metaData={metaData} generatedContent={content} />
      )}
    </>
  )
}

export default MemoryGamePage
