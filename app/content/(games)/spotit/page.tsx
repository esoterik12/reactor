'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import { ContentForm } from '@/components/input/ContentForm'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'
import { manualCurricululmOnlyTabs } from '@/lib/constants/tabOptions'
import {
  baseContentInputSchema,
  baseContentSelectorSchema
} from '@/lib/zod/input/baseContentInput.schema'
import SpotItGame from '@/components/games/spotit/SpotItGame'
import { spotItInfo } from '@/lib/constants/content/gamesContentInfo'
import IconSpotIt from '@/components/icons/content/IconSpotIt'
import { SpotItWord } from '@/types/games.types'

interface SpotItContent {
  data: SpotItWord[]
}

const SpotItPage = () => {
  const [content, setContent] = useState<SpotItContent | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconSpotIt classes={contentIconStyles} />}
      formType='internal'
      zodSchema={baseContentInputSchema}
      info={spotItInfo}
      contentTitle='SpotIt'
      contentType='spotit'
      levelSelectionEnabled={false}
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='SpotIt'
      contentType='spotit'
      formType='internal'
      icon={<IconSpotIt classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={spotItInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={manualCurricululmOnlyTabs} tabContent={tabContent} />
      ) : (
        <SpotItGame generatedContent={content} metaData={metaData} />
      )}
    </>
  )
}

export default SpotItPage
