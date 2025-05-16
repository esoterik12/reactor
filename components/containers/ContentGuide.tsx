import React from 'react'
import Image from 'next/image'
import { GenerationOptions } from '@/types/contentGuides.types'

interface ContentGuideProps {
  icon: React.ReactNode
  contentTitle: string
  description: string
  whyUseIt: string
  imageLink: string
  imageCaption?: string
  generationOptions: GenerationOptions[]
}

const ContentGuide = ({
  icon,
  contentTitle,
  description,
  whyUseIt,
  imageLink,
  imageCaption,
  generationOptions
}: ContentGuideProps) => {
  return (
    <div className='container-background container-border flex h-full flex-col p-4'>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-row items-center gap-2'>
          {icon}
          <p className='large-text'>{contentTitle}</p>
        </div>
        <div className='mt-4 space-y-4'>
          <p className='paragraph-text'>{description}</p>

          <div>
            <h5 className='font-bold'>Why use it?</h5>
            <p className='paragraph-text'>{whyUseIt}</p>
          </div>
        </div>

        <div>
          <h5 className='font-bold'>Input Options:</h5>
          {generationOptions &&
            generationOptions.map((option, optionIndex) => (
              <div
                key={`${optionIndex}-${option.type}`}
                className='mt-2 space-y-2'
              >
                <ul className='paragraph-text ml-5 mt-2 list-disc'>
                  <li>
                    <strong>{option.type}:</strong> {option.description}
                  </li>
                </ul>
              </div>
            ))}
        </div>

        <p className='mb-2 font-semibold'>Example:</p>
        <Image
          src={imageLink}
          alt={`${contentTitle}-example-image`}
          width={600}
          height={400}
          className='rounded shadow'
        />
        {imageCaption && (
          <p className='paragraph-text mt-2 text-sm'>{imageCaption}</p>
        )}
      </div>
    </div>
  )
}

export default ContentGuide
