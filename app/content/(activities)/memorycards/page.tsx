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
import ContentGuide from '@/components/containers/ContentGuide'
import { memoryCardsContentGuide as guide } from '@/lib/constants/content/content-guides/memoryCardsContentGuide'

const MemoryCardsPage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const resetPage = () => {
    setContent(null)
    setMetaData({
      title: '',
      contentType: ''
    })
  }

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
    <ContentGuide
      key='Tab 3'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      contentTitle={guide.contentTitle}
      description={guide.description}
      whyUseIt={guide.whyUseIt}
      imageLink={guide.imageLink}
      generationOptions={guide.generationOptions}
    />
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
          resetPage={resetPage}
        />
      )}
    </>
  )
}

export default MemoryCardsPage
