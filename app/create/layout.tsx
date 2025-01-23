import React from 'react'
import { AccordionStack } from '@/components/containers/Accordion'
import { AccordionSidebarContent } from '@/lib/constants/AccordionSidebarContent'
import PageContainer from '@/components/containers/PageContainer'

const CreatePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer customClasses='py-2 px-2 flex flex-row '>
      <section className='h-full min-w-[200px] w-[18%] border-r border-zinc-600 pr-2'>
        <AccordionStack accordionContent={AccordionSidebarContent} />
      </section>
      <section className='h-full w-[82%] px-2'>{children}</section>
    </PageContainer>
  )
}

export default CreatePageLayout
