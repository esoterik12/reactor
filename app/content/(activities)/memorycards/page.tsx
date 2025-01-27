'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import ContentForm from '@/components/input/ContentForm'
import {
  memoryCardsGeneratedInfo,
  memoryCardsManualInfo
} from '@/lib/constants/content/contentInfo'
import { baseContentSchema } from '@/lib/zod/contentInput.schema'

const tabs = ['Generate Content', 'Manual Input', 'Curriculum Selector']

const MemoryCardsPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      formType='generated'
      zodSchema={baseContentSchema}
      info={memoryCardsGeneratedInfo}
      contentType='Memory Cards'
    />,
    <ContentForm
      key='Tab 2'
      formType='manual'
      zodSchema={baseContentSchema}
      info={memoryCardsManualInfo}
      contentType='Memory Cards'
      watchComponent='pairs'
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default MemoryCardsPage
