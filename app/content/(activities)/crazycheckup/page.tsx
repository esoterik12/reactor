'use client'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  crazyCheckUpInfo,
  contentIconStyles
} from '@/lib/constants/content/contentInfo'
import { baseContentSchema } from '@/lib/zod/contentInput.schema'
import ContentForm from '@/components/input/ContentForm'
import IconCrazyCheckUp from '@/components/icons/content/IconCrazyCheckUp'

const tabs = ['Generate Content', 'Curriculum Selector', 'Content Guide']

const CrazyCheckUpPage = () => {
  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconCrazyCheckUp classes={contentIconStyles} />}
      formType='generated'
      zodSchema={baseContentSchema}
      info={crazyCheckUpInfo}
      contentTitle='Crazy Check Up'
      contentType='crazyCheckUp'
    />,
    <p key='Tab 2'>Tab 2</p>,
    <p key='Tab 3'>Tab 3</p>
  ]

  return <ContentTabs tabs={tabs} tabContent={tabContent} />
}

export default CrazyCheckUpPage
