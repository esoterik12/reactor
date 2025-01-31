'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import IconFindYourPartner from '@/components/icons/content/IconFindYourPartner'
import ContentForm from '@/components/input/ContentForm'
import {
  findYourPartnerGeneratedInfo,
  findYourPartnerManualInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import { baseContentSchema } from '@/lib/zod/contentInput.schema'

const tabs = [
  'Generate Content',
  'Manual Input',
  'Curriculum Selector',
  'Content Guide'
]

const FindYourPartnerPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconFindYourPartner classes={contentIconStyles} />}
      formType='generated'
      zodSchema={baseContentSchema}
      info={findYourPartnerGeneratedInfo}
      contentType='findYourPartner'
      contentTitle='Find Your Partner'
    />,
    <ContentForm
      key='Tab 2'
      icon={<IconFindYourPartner classes={contentIconStyles} />}
      formType='manual'
      zodSchema={baseContentSchema}
      info={findYourPartnerManualInfo}
      contentType='findYourPartner'
      contentTitle='Find Your Partner'
      watchComponent='pairs'
    />,
    <p key='Tab 3'>Tab 3</p>,
    <p key='Tab 4'>Tab 4</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default FindYourPartnerPage
