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
import { allTabs } from '@/lib/constants/tabOptions'

const MemoryCardsPage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

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
      setMetaData={setMetaData}
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
      setMetaData={setMetaData}
      levelSelectionEnabled={false}
    />,
    <CurriculumSelector
      key='Tab 3'
      contentTitle='Memory Cards'
      contentType='memoryCards'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={memorySelectorSchama}
      info={memoryCardsGeneratedInfo}
    />,
    <p key='Tab 4'>Tab 4</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={allTabs} tabContent={tabContent} />
      ) : (
        <EditWordPairsForm
          firstWordLabel='Word one'
          secondWordLabel='Word two'
          generatedContent={content}
          metaData={metaData}
        />
      )}
    </>
  )
}

export default MemoryCardsPage
