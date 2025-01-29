'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import ContentForm from '@/components/input/ContentForm'
import {
  findYourPartnerGeneratedInfo,
  findYourPartnerManualInfo
} from '@/lib/constants/content/contentInfo'
import { baseContentSchema } from '@/lib/zod/contentInput.schema'

const tabs = ['Generate Content', 'Manual Input', 'Curriculum Selector', 'Content Guide']

const FindYourPartnerPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      formType='generated'
      zodSchema={baseContentSchema}
      info={findYourPartnerGeneratedInfo}
      contentType='Find Your Partner'
    />,
    <ContentForm
      key='Tab 2'
      formType='manual'
      zodSchema={baseContentSchema}
      info={findYourPartnerManualInfo}
      contentType='Find Your Partner'
      watchComponent='pairs'
    />,
    <p key='Tab 3'>Tab 3</p>,
    <p key='Tab 4'>Tab 4</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default FindYourPartnerPage
