'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import IconFindYourPartner from '@/components/icons/content/IconFindYourPartner'
import { ContentForm } from '@/components/input/ContentForm'
import {
  findYourPartnerGeneratedInfo,
  findYourPartnerManualInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import {
  generateFindYourPartnerSchema,
  manualPairsSchema
} from '@/lib/zod/contentInput.schema'
import { WordPairings } from '@/lib/zod/contentEdit.schema'
import EditWordPairsForm from '@/components/edit/EditWordPairsForm'

const tabs = [
  'Generate Content',
  'Manual Input',
  'Curriculum Selector',
  'Content Guide'
]

const FindYourPartnerPage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)

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
    />,
    <ContentForm
      key='Tab 2'
      icon={<IconFindYourPartner classes={contentIconStyles} />}
      formType='manual'
      zodSchema={manualPairsSchema}
      info={findYourPartnerManualInfo}
      contentType='findYourPartner'
      contentTitle='Find Your Partner'
      watchComponent='pairs'
      setContent={setContent}
    />,
    <p key='Tab 3'>Tab 3</p>,
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

export default FindYourPartnerPage
