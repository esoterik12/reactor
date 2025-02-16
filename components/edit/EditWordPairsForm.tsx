'use client'
import { useState, useCallback } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  EditPairsFormValues,
  editPairsSchema,
  WordPairings
} from '@/lib/zod/contentEdit.schema'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import { EditMetaDataProps } from '@/types/input.types'
import { capitalizeFirstLetter } from '@/lib/utils/capitalizeFirstLetter'
import InlineError from '../shared/InlineError'

interface EditPairsFormProps {
  firstWordLabel: string
  secondWordLabel: string
  generatedContent: WordPairings
  metaData: EditMetaDataProps
}

const EditWordPairsForm = ({
  firstWordLabel = 'First word',
  secondWordLabel = 'Second word',
  generatedContent,
  metaData
}: EditPairsFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()

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

  const handleSubmitButton = useCallback(
    async (data: EditPairsFormValues) => {
      setIsLoading(true)
      setError(null)
      const pdfData = {
        data: {
          title: metaData.title,
          content: JSON.stringify(data)
        },
        pdfType: capitalizeFirstLetter(metaData.contentType)
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
        const fileName = `${metaData.title} - ${capitalizeFirstLetter(
          metaData.contentType
        )}.pdf`
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
        <div className='ml-10 mt-4 flex flex-row'>
          <DefaultButton
            btnType='submit'
            handleClick={handleSubmit(handleSubmitButton)}
            customClasses='w-32 button-border primary-background p-1 hover-effect-primary'
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

export default EditWordPairsForm
