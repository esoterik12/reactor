'use client'
import React from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  EditPairsFormValues,
  editPairsSchema,
  WordPairings
} from '@/lib/zod/contentEdit.schema'

interface EditPairsFormProps {
  firstWordLabel: string
  secondWordLabel: string
  generatedContent: WordPairings
}

const EditWordPairsForm = ({
  firstWordLabel = 'First word',
  secondWordLabel = 'Second word',
  generatedContent
}: EditPairsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditPairsFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editPairsSchema),
    defaultValues: { wordPairings: generatedContent }
  })

  const handleSubmitButton = (data: EditPairsFormValues) => {
    console.log('handleSubmitButton clicked')
    console.log('data in handleSubmitButton: ', data)
  }

  return (
    <div className='container-background flex h-full flex-col rounded-lg'>
      <div className='flex'>
        <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
          Edit Content
        </p>
      </div>
      <div className='relative z-0 -my-[2px] flex border-b-2 border-zinc-600'></div>

      <form
        className='flex h-full flex-col justify-between p-4'
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        <div className='grid max-w-[900px] grid-cols-2'>
          <div className='grid max-w-[400px] grid-cols-[30px,1fr,1fr] px-2 pb-1'>
            <div className='flex h-full items-center justify-center'>
              <p className='paragraph-text'>#</p>
            </div>
            <p className='paragraph-text w-40'>{firstWordLabel}</p>
            <p className='paragraph-text w-40'>{secondWordLabel}</p>
          </div>
          <div className='grid max-w-[400px] grid-cols-[30px,1fr,1fr] px-2 pb-1'>
            <div className='flex h-full items-center justify-center'>
              <p className='paragraph-text'>#</p>
            </div>
            <p className='paragraph-text w-40'>{firstWordLabel}</p>
            <p className='paragraph-text w-40'>{secondWordLabel}</p>
          </div>

          {generatedContent.map((_, index) => (
            <div
              className='grid max-w-[400px] grid-cols-[30px,1fr,1fr] px-2 pb-2'
              key={index}
            >
              <div className='flex h-full items-center justify-center'>
                <p className='paragraph-text'>{index + 1}</p>
              </div>
              <InputField
                type='text'
                errorType='highlightInput'
                labelClasses='paragraph-text small-text'
                id={`firstField-${index}`}
                inputClasses='p-1 w-40'
                placeholder=''
                {...register(`wordPairings.${index}.wordOne`)}
                error={errors.wordPairings?.[index]?.wordOne}
              />
              <InputField
                type='text'
                errorType='highlightInput'
                labelClasses='paragraph-text small-text'
                id={`secondField-${index}`}
                inputClasses='p-1 w-40'
                placeholder=''
                {...register(`wordPairings.${index}.wordTwo`)}
                error={errors.wordPairings?.[index]?.wordTwo}
              />
            </div>
          ))}
        </div>
        <DefaultButton
          btnType='submit'
          handleClick={handleSubmit(handleSubmitButton)}
          customClasses='w-32 mt-2 button-border primary-background p-1 hover-effect-primary'
        >
          <p className='button-text'>Submit</p>
        </DefaultButton>
      </form>
    </div>
  )
}

export default EditWordPairsForm
