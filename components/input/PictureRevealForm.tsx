'use client'
import React, { SetStateAction } from 'react'
import DefaultButton from '../buttons/DefaultButton'
import IconPictureReveal from '../icons/content/IconPictureReveal'
import { contentIconStyles } from '@/lib/constants/content/contentInfo'
import Image from 'next/image'

interface PictureRevealFormProps {
  setImages: React.Dispatch<SetStateAction<File[]>>
  images: File[]
}

const PictureRevealForm = ({ setImages, images }: PictureRevealFormProps) => {
  // const [error, setError] = useState<null | ''>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (files.length + images.length > 20) {
      alert('You can only upload up to 20 images')
      return
    }

    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    setImages(prev => [...prev, ...imageFiles])
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='flex w-[65%] flex-col justify-between p-4'>
      <div className='mb-4 flex flex-row items-center gap-2'>
        <IconPictureReveal classes={contentIconStyles} />
        <p className='large-text'>Picture Reveal</p>
      </div>
      <div className='mb-2 flex flex-row items-center justify-between'>
        <h3 className='label-text mb-0.5'>Upload Images (max 20)</h3>
      </div>

      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleImageChange}
        className='file:bg-primary mb-2 block w-full rounded border border-gray-300 bg-white p-1 text-sm file:mr-4 file:rounded file:border-0 file:px-4 file:py-1 file:text-white'
      />
      <p className='secondary-text mb-4'>
        {images.length} / 20 images selected
      </p>

      {images.length > 0 && (
        <div className='grid grid-cols-4 gap-4'>
          {images.map((image, index) => (
            <div key={index} className='relative'>
              <Image
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className='h-auto w-full rounded border border-gray-300 shadow'
                height={500}
                width={500}
              />
              <DefaultButton
                ariaLabel='Remove image'
                btnType='button'
                handleClick={() => handleRemoveImage(index)}
                customClasses='mt-2 w-full h-8 button-border text-red-600 border-red-300 hover:bg-red-50'
              >
                <p className='button-text text-sm'>Remove</p>
              </DefaultButton>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PictureRevealForm
