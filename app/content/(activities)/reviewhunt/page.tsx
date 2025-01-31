'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  reviewHuntInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import { huntAndMistakesSchema } from '@/lib/zod/contentInput.schema'
import ContentForm from '@/components/input/ContentForm'
import IconReviewHunt from '@/components/icons/content/IconReviewHunt'

const tabs = ['Generate Content', 'Curriculum Selector', 'Content Guide']

const ReviewHuntPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconReviewHunt classes={contentIconStyles} />}
      formType='generated'
      zodSchema={huntAndMistakesSchema}
      info={reviewHuntInfo}
      contentTitle='Review Hunt'
      contentType='reviewHunt'
    />,
    <p key='Tab 2'>Tab 2</p>,
    <p key='Tab 3'>Tab 3</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default ReviewHuntPage
