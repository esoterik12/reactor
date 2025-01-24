'use client'
import { useEffect, useState } from 'react'
import { AccordionSidebarContentProps } from '@/types/accordion.types'
import { setUser } from '@/redux/slices/inputSlice'
import Accordion from './Accordion'
import { useAppDispatch } from '@/redux/hooks'

export const AccordionStack = ({
  accordionContent,
  username,
  userEmail,
  userImage
}: {
  accordionContent: AccordionSidebarContentProps[]
  username: string
  userEmail: string
  userImage: string
}) => {
  const dispatch = useAppDispatch()
  const [expanded, setExpanded] = useState<false | number>(false)

  useEffect(() => {
    console.log('triggering userEffect for setUser')
    dispatch(setUser({ username, userEmail, userImage }))
  }, [dispatch, username, userEmail, userEmail])

  return (
    <div className='flex w-full flex-col'>
      {accordionContent.map((links, idx) => (
        <Accordion
          key={links.id}
          links={links}
          i={idx}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </div>
  )
}
