'use client'
import React, { useCallback, useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { editSentencesSchema } from '@/lib/zod/edit/editSentences.schema'
import { z } from 'zod'
import { EditMetaDataProps } from '@/types/input.types'
import useSubmitPDF from '@/lib/hooks/useSubmitPDF'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import InlineError from '../shared/InlineError'

interface EditSentencesFormProps {
  generatedContent: string[]
  metaData: EditMetaDataProps
}

type EditSentencesFormValues = z.infer<typeof editSentencesSchema>

const EditSentencesForm = ({
  generatedContent,
  metaData
}: EditSentencesFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()
  const submitPDF = useSubmitPDF()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditSentencesFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editSentencesSchema),
    defaultValues: { data: generatedContent }
  })

  const handleSubmitButton = useCallback(
    async (data: EditSentencesFormValues) => {
      const pdfData = {
        content: JSON.stringify(data),
        metaData
      }

      submitPDF({
        pdfData,
        setError,
        setIsLoading,
        downloadBlob
      })
    },
    [downloadBlob, metaData, submitPDF]
  )

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
                {...register(`data.${index}`)}
                error={errors.data?.[index]}
              />
            </div>
          ))}
        </div>
        <DefaultButton
          btnType='submit'
          isDisabled={isLoading}
          handleClick={handleSubmit(handleSubmitButton)}
          customClasses='w-32 mt-1 ml-10 button-border primary-background p-1 hover-effect-primary'
        >
          <p className='button-text'>Submit</p>
        </DefaultButton>
        {error && (
          <InlineError classes='flex h-9 my-5 items-center justify-center'>
            <p className='secondary-text'>Error: {error}</p>
          </InlineError>
        )}
        {/* Hidden download link */}
        <a ref={linkRef} className='hidden'>
          Download
        </a>
      </form>
    </div>
  )
}

export default EditSentencesForm
