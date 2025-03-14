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
import EditWordPairsForm from '@/components/edit/EditWordPairsForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'

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
      zodSchema={generateMemoryCardsInputSchema}
      info={memoryCardsGeneratedInfo}
      contentTitle='Memory Cards'
      contentType='memoryCards'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Memory Cards'
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
      {!content ? (
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      ) : (
        <EditWordPairsForm
          firstWordLabel='Word one'
          secondWordLabel='Word two'
          generatedContent={content}
          metaData={metaData}
          shuffleEnabled={true}
        />
      )}
    </>
  )
}

export default MemoryCardsPage
