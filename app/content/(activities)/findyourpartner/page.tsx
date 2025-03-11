'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import IconFindYourPartner from '@/components/icons/content/IconFindYourPartner'
import { ContentForm } from '@/components/input/ContentForm'
import {
  findYourPartnerGeneratedInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import {
  generateFindYourPartnerSchema,
  generateFindYourPartnerSelectorSchema
} from '@/lib/zod/input/findYourPartners.schema'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import EditSetsForm from '@/components/edit/EditSetsForm'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'

const FindYourPartnerPage = () => {
  const [content, setContent] = useState<string[][] | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconFindYourPartner classes={contentIconStyles} />}
      formType='generated'
      zodSchema={generateFindYourPartnerSchema}
      info={findYourPartnerGeneratedInfo}
      contentType='findYourPartner'
      contentTitle='Find Your Partner'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 3'
      contentType='findYourPartner'
      contentTitle='Find Your Partner'
      icon={<IconFindYourPartner classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={generateFindYourPartnerSelectorSchema}
      info={findYourPartnerGeneratedInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      ) : (
        <EditSetsForm
          generatedContent={{ data: content }}
          metaData={metaData}
          shuffleEnabled={true}
        />
      )}
    </>
  )
}

export default FindYourPartnerPage
