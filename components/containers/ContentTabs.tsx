'use client'
import React, { useState } from 'react'

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    'Introduction',
    'Generate Content',
    'Curriculum Selector',
    'Manual Input'
  ]
  const tabContent = [
    <p key='Tab 1'>Tab 1</p>,
    <p key='Tab 2'>Tab 2</p>,
    <p key='Tab 3'>Tab 3</p>,
    <p key='Tab 4'>Tab 4</p>
  ]

  return (
    <div className='container-background h-full w-full rounded-lg'>
      {/* Tabs Navigation */}
      <div className='relative flex w-full'>
        {tabs.map((tab, index) => (
          <button
            key={`${tab}-${index}`}
            className={`relative z-10 w-[180px] border-b-2 py-2 text-center ${
              activeTab === index
                ? 'border-sky-500' // Bring the button border above
                : 'paragraph-text border-transparent'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='relative z-0 -my-[2px] flex w-full border-b-2 border-zinc-600'></div>

      {/* Active Tab Content */}
      <div className='mt-4 p-4'>{tabContent[activeTab]}</div>
    </div>
  )
}

export default ContentTabs
