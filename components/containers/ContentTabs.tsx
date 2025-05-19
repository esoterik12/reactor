'use client'
import React, { useState } from 'react'

const ContentTabs = ({
  tabs,
  tabContent
}: {
  tabs: string[]
  tabContent: React.ReactNode[]
}) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className='container-background flex h-full w-full flex-col rounded-lg'>
      {/* Tabs Navigation */}
      <div className='flex w-full flex-row justify-between'>
        <div>
          {tabs.map((tab, index) => (
            <button
              key={`${tab}-${index}`}
              className={`z-10 w-[200px] border-b-2 py-2 text-center ${
                activeTab === index
                  ? 'border-sky-500'
                  : 'paragraph-text border-transparent'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className='relative z-0 -my-[2px] flex w-full border-b-2 border-zinc-300 dark:border-zinc-600'></div>

      {/* Active Tab Content */}
      <div className='flex-grow'>{tabContent[activeTab]}</div>
    </div>
  )
}

export default ContentTabs
