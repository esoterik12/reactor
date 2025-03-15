'use client'
import { useState, useCallback } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EditMetaDataProps } from '@/types/input.types'
import { TextareaInput } from '../input/TextareaInput'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import { capitalizeFirstLetter } from '@/lib/utils/capitalizeFirstLetter'
import InlineError from '../shared/InlineError'
import { editRiddlesSchema } from '@/lib/zod/edit/editRiddles.schema'

interface EditSentencesFormProps {
  generatedContent: string[]
  metaData: EditMetaDataProps
}

// Infer the form values from the schema
type EditSentencesFormValues = z.infer<typeof editRiddlesSchema>

// Note, this is using the editSentencesShcema
const EditParagraphsForm = ({
  generatedContent,
  metaData
}: EditSentencesFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditSentencesFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editRiddlesSchema),
    defaultValues: { data: generatedContent }
  })

  const handleSubmitButton = useCallback(
    async (data: EditSentencesFormValues) => {
      setError(null)
      setIsLoading(true)
      const pdfType = capitalizeFirstLetter(metaData.contentType)

      const pdfData = {
        content: JSON.stringify(data.data),
        metaData
      }

      try {
        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pdfData })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to generate PDF.')
        }

        const blob = await response.blob()
        const fileName = `${metaData.title} - ${pdfType}`
        downloadBlob(blob, fileName)
      } catch (error) {
        setError('An unexpected error occurred.')
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    },
    [metaData, downloadBlob]
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
            <div className='flex flex-row px-2 pb-2' key={index}>
              <div className='flex h-full min-w-[32px] items-center justify-center'>
                <p className='paragraph-text'>{index + 1}</p>
              </div>
              <TextareaInput
                labelClasses='paragraph-text small-text'
                id={`sentence-${index}`}
                inputClasses='p-1 min-w-[800px] w-full h-28'
                placeholder='Enter sentence'
                isDisabled={false}
                {...register(`data.${index}`)}
                error={errors.data?.[index]}
              />
            </div>
          ))}
        </div>
        <div className='ml-10 mt-4 flex flex-row gap-4'>
          <DefaultButton
            btnType='submit'
            handleClick={handleSubmit(handleSubmitButton)}
            customClasses='w-[100px] button-border primary-background p-1 hover-effect-primary'
            isDisabled={isLoading}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <p className='button-text'>Submit</p>
            )}
          </DefaultButton>
          {error && (
            <InlineError classes=''>
              <p>{error}</p>
            </InlineError>
          )}
        </div>
        {/* Hidden download link */}
        <a ref={linkRef} className='hidden'>
          Download
        </a>
      </form>
    </div>
  )
}

export default EditParagraphsForm
