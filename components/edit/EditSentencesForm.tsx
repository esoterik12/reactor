'use client'
import React from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { editSentencesSchema } from '@/lib/zod/contentEdit.schema'
import { z } from 'zod'
import { EditMetaDataProps } from '@/types/input.types'

interface EditSentencesFormProps {
  generatedContent: string[]
  metaData: EditMetaDataProps
}

// Infer the form values from the schema
type EditSentencesFormValues = z.infer<typeof editSentencesSchema>

const EditSentencesForm = ({
  generatedContent,
  metaData
}: EditSentencesFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditSentencesFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editSentencesSchema),
    defaultValues: { sentences: generatedContent }
  })

  const handleSubmitButton = (data: EditSentencesFormValues) => {
    console.log('handleSubmitButton clicked')
    console.log('data in handleSubmitButton: ', data)
    console.log('metaData', metaData)
    // Here you can process the data (e.g., send it to an API)
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
        <div className='flex flex-col gap-1'>
          {generatedContent.map((_, index) => (
            <div className='flex flex-row items-center px-2 pb-2' key={index}>
              <div className='flex h-full min-w-[32px] items-center justify-center'>
                <p className='paragraph-text'>{index + 1}</p>
              </div>
              <InputField
                type='text'
                errorType='highlightInput'
                labelClasses='paragraph-text small-text'
                id={`sentence-${index}`}
                inputClasses='p-1 min-w-[800px] w-full'
                placeholder='Enter sentence'
                {...register(`sentences.${index}`)}
                error={errors.sentences?.[index]}
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

export default EditSentencesForm
