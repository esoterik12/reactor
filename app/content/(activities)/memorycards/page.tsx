'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import {
  memoryCardsGeneratedInfo,
  memoryCardsManualInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import {
  manualPairsSchema,
  generatePairsSchema,
  memorySelectorSchama
} from '@/lib/zod/contentInput.schema'
import IconMemoryCards from '@/components/icons/content/IconMemoryCards'
import { WordPairings } from '@/lib/zod/contentEdit.schema'
import EditWordPairsForm from '@/components/edit/EditWordPairsForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'

const tabs = [
  'Generate Content',
  'Manual Input',
  'Curriculum Selector',
  'Content Guide'
]

const MemoryCardsPage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)

  const tabContent = [
    <ContentForm<WordPairings>
      key='Tab 1'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      formType='generated'
      zodSchema={generatePairsSchema}
      info={memoryCardsGeneratedInfo}
      contentTitle='Memory Cards'
      contentType='memoryCards'
      setContent={setContent}
    />,
    <ContentForm
      key='Tab 2'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      formType='manual'
      zodSchema={manualPairsSchema}
      info={memoryCardsManualInfo}
      contentTitle='Memory Cards'
      contentType='memoryCards'
      watchComponent='pairs'
      setContent={setContent}
    />,
    <CurriculumSelector
      key='Tab 3'
      contentTitle='Choose Correct Spelling'
      contentType='memoryCards'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      setContent={setContent}
      zodSchema={memorySelectorSchama}
      info={memoryCardsGeneratedInfo}
    />,
    <p key='Tab 4'>Tab 4</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={tabs} tabContent={tabContent} />
      ) : (
        <EditWordPairsForm
          firstWordLabel='Word one'
          secondWordLabel='Word two'
          generatedContent={content}
        />
      )}
    </>
  )
}

export default MemoryCardsPage
