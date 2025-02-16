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
import { allTabs } from '@/lib/constants/tabOptions'

const FindYourPartnerPage = () => {
  const [content, setContent] = useState<WordPairings | null>(null)
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
      setMetaData={setMetaData}
      levelSelectionEnabled={false}
    />,
    <p key='Tab 3'>Tab 3</p>,
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

export default FindYourPartnerPage
