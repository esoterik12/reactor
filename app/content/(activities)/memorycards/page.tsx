'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import ContentForm from '@/components/input/ContentForm'
import {
  memoryCardsGeneratedInfo,
  memoryCardsManualInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import {
  baseContentSchema,
  generatePairsSchema
} from '@/lib/zod/contentInput.schema'
import IconMemoryCards from '@/components/icons/content/IconMemoryCards'

const tabs = [
  'Generate Content',
  'Manual Input',
  'Curriculum Selector',
  'Content Guide'
]

const MemoryCardsPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      formType='generated'
      zodSchema={generatePairsSchema}
      info={memoryCardsGeneratedInfo}
      contentTitle='Memory Cards'
      contentType='memoryCards'
    />,
    <ContentForm
      key='Tab 2'
      icon={<IconMemoryCards classes={contentIconStyles} />}
      formType='manual'
      zodSchema={baseContentSchema}
      info={memoryCardsManualInfo}
      contentTitle='Memory Cards'
      contentType='memoryCards'
      watchComponent='pairs'
    />,
    <p key='Tab 3'>Tab 3</p>,
    <p key='Tab 4'>Tab 4</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default MemoryCardsPage
