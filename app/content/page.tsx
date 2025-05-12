import IconPaperAirplane from '@/components/icons/IconPaperAirplane'
import IconPuzzle from '@/components/icons/IconPuzzle'
import IconRocket from '@/components/icons/IconRocket'
import IconStars from '@/components/icons/IconStars'
import React from 'react'

const CreateMainPage = async () => {
  return (
    <div className='container-background container-border flex h-full flex-col p-4'>
      <div className='p-y'>
        <h2 className='subheader'>Welcome!</h2>
        <p className='paragraph-text'>
          Use our content generators to quickly assemble lesson plan materials.
        </p>
      </div>
      <div className='mt-6 flex flex-col'>
        <div className='flex flex-row items-center gap-2'>
          <IconPuzzle classes='h-8 w-8 primary-text' />
          <h3>Activities & Games</h3>
        </div>
        <p className='paragraph-text'>
          Create paper-based games and activities to add to your lessons.
        </p>
      </div>
      <div className='mt-6 flex flex-col'>
        <div className='flex flex-row items-center gap-2'>
          <IconPaperAirplane classes='h-8 w-8 primary-text' />
          <h3>Worksheets</h3>
        </div>
        <p className='paragraph-text'>
          Create paper-based practice materials to review curriculum content.
        </p>
      </div>
      <div className='mt-6 flex flex-col'>
        <div className='flex flex-row items-center gap-2'>
          <IconRocket classes='h-8 w-8 primary-text' />
          <h3>Projected Games</h3>
        </div>
        <p className='paragraph-text'>
          Use our games on projectors or interactive whiteboards to enhance your lessons.
        </p>
      </div>
      <div className='mt-6 flex flex-col'>
        <div className='flex flex-row items-center gap-2'>
          <IconStars classes='h-8 w-8 primary-text' />
          <h3>Presentations</h3>
        </div>
        <p className='paragraph-text'>
          Quickly generate presentations to introduce complex topics and vocabulary. 
        </p>
      </div>
    </div>
  )
}

export default CreateMainPage
