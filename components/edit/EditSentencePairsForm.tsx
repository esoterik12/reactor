'use client'
import React from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ZodSchema } from 'zod'
import {
  EditSentencePairs,
  EditSentencePairsFormValues
} from '@/lib/zod/editSentencePairs.schema'

interface EditSentencePairsFormProps {
  firstWordLabel: string
  secondWordLabel: string
  zodSchema: ZodSchema
  generatedContent: EditSentencePairs
}

const EditSentencePairsForm = ({
  firstWordLabel = 'First word',
  secondWordLabel = 'Second word',
  generatedContent,
  zodSchema
}: EditSentencePairsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditSentencePairsFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(zodSchema),
    defaultValues: { sentencePairings: generatedContent }
  })

  const handleSubmitButton = (data: EditSentencePairsFormValues) => {
    console.log('handleSubmitButton clicked')
    console.log('data in handleSubmitButton: ', data)
  }

  return (
    <div className='container-background flex h-full w-full flex-col rounded-lg'>
      <div className='flex'>
        <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
          Edit Content
        </p>
      </div>
      <div className='relative z-0 -my-[2px] flex border-b-2 border-zinc-600'></div>

      <form
        className='flex h-full w-full flex-col justify-between p-4'
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        <div className='flex w-full flex-col'>
          <div className='flex flex-row gap-4'>
            <div className='flex h-full w-[2%]'></div>
            <div className='flex w-[49%]'>
              <p className='paragraph-text w-40'>{firstWordLabel}</p>
            </div>
            <div className='flex w-[49%]'>
              <p className='paragraph-text w-40'>{secondWordLabel}</p>
            </div>
          </div>

          {generatedContent.map((_, index) => (
            <div className='flex w-[100%] flex-row gap-4' key={index}>
              <div className='flex w-[2%] items-center justify-center'>
                <p className='paragraph-text'>{index + 1}</p>
              </div>
              <InputField
                type='text'
                errorType='highlightInput'
                labelClasses='paragraph-text small-text'
                id={`firstField-${index}`}
                inputClasses='p-1 w-full'
                containerClasses='w-[49%] py-2'
                placeholder=''
                {...register(`sentencePairings.${index}.correctSentence`)}
                error={errors.sentencePairings?.[index]?.correctSentence}
              />
              <InputField
                type='text'
                errorType='highlightInput'
                labelClasses='paragraph-text small-text'
                id={`secondField-${index}`}
                inputClasses='p-1 w-full'
                containerClasses='w-[49%] py-2'
                placeholder=''
                {...register(`sentencePairings.${index}.incorrectSentence`)}
                error={errors.sentencePairings?.[index]?.incorrectSentence}
              />
            </div>
          ))}
        </div>
        <DefaultButton
          ariaLabel='Submit button'
          btnType='submit'
          customClasses='w-32 mt-2 button-border primary-background p-1 hover-effect-primary'
        >
          <p className='button-text'>Submit</p>
        </DefaultButton>
      </form>
    </div>
  )
}

export default EditSentencePairsForm
