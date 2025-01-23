'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateIcon from '../icons/IconTriangleToggle'
import { AccordionSidebarContentProps } from '@/types/accordion.types'

interface AccordionProps {
  i: number
  links: AccordionSidebarContentProps
  expanded: boolean | number
  setExpanded: React.Dispatch<React.SetStateAction<false | number>>
}

const Accordion = ({ i, links, expanded, setExpanded }: AccordionProps) => {
  const isOpen = i === expanded

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <div className='container-background mb-2 rounded-lg'>
      {/* Header section for selecting accordion */}
      <motion.header
        className={`flex h-10 cursor-pointer flex-row items-center`}
        initial={false}
        animate={{ backgroundColor: isOpen ? '' : '' }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <div className='custom-small-text md:custom-text ml-3 flex flex-row items-center gap-2'>
          <AnimateIcon icon={links.icon} isOpen={isOpen} />
          <p>{links.title}</p>
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className='overflow-hidden rounded-b-lg'
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.45, ease: [0.14, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 1 }, open: { scale: 1 } }}
              transition={{ duration: 0.4 }}
              className='mb-4 ml-4'
            >
              <div className='px-4'>
                {links.links.map(link => (
                  <p key={link.linkId} className='paragraph-text m-2'>
                    {link.contentTitle}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export const AccordionStack = ({
  accordionContent
}: {
  accordionContent: AccordionSidebarContentProps[]
}) => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = useState<false | number>(false)

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
