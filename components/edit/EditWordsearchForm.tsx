'use client'
import { useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import { EditMetaDataProps } from '@/types/input.types'
import InlineError from '../shared/InlineError'
import useSubmitPDF from '@/lib/hooks/useSubmitPDF'
import {
  editWordsearchSchema,
  EditWordsearchFormValues,
  EditWordsearchValues
} from '@/lib/zod/edit/editWordsearch.schema'
import IconXCircle from '../icons/IconXCircle'
import IconPlusCircle from '../icons/IconPlusCircle'

interface EditWordsearchForm {
  generatedContent: EditWordsearchValues
  metaData: EditMetaDataProps
}

const EditWordsearchForm = ({
  generatedContent,
  metaData
}: EditWordsearchForm) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()
  const submitPDF = useSubmitPDF()

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<EditWordsearchFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editWordsearchSchema),
    defaultValues: { wordsearchWords: generatedContent }
  })

  const { fields, remove, append } = useFieldArray<EditWordsearchFormValues>({
    control,
    name: 'wordsearchWords'
  })

  const handleSubmitButton = (data: EditWordsearchFormValues) => {
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
  }

  const incorrectNumberOfWords =
    watch('wordsearchWords').length < 6 ||
    watch('wordsearchWords').length > 18

  return (
    <section className='container-background flex h-full flex-col rounded-lg'>
      <div className='flex'>
        <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
          Edit Content
        </p>
      </div>
      <div className='relative z-0 -my-[2px] flex border-b-2 border-zinc-600'></div>

      <form
        className='flex min-h-96 flex-col justify-between p-4'
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        <div className='grid w-full grid-cols-5'>
          {fields.map((_, index) => (
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
                inputClasses='p-1 w-32'
                placeholder=''
                {...register(`wordsearchWords.${index}.word`)}
                error={errors.wordsearchWords?.[index]?.word}
              />
              <DefaultButton
                customClasses='ml-1'
                handleClick={() => remove(index)}
              >
                <IconXCircle classes='h-5 w-5 muted-transition-effect paragraph-text' />
              </DefaultButton>
            </div>
          ))}
        </div>
        <div className='ml-10 mt-4 flex flex-row'>
          <div className='mr-10 flex flex-row justify-center'>
            <DefaultButton
              btnType='submit'
              handleClick={handleSubmit(handleSubmitButton)}
              customClasses='w-32 h-9 button-border primary-background p-1 hover-effect-primary'
              isDisabled={isLoading || incorrectNumberOfWords}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <p className='button-text'>Submit</p>
              )}
            </DefaultButton>

            <DefaultButton
              customClasses='ml-1'
              handleClick={() => append({ word: '' })}
            >
              <IconPlusCircle
                classes={`h-5 w-5 muted-transition-effect ${incorrectNumberOfWords ? 'secondary-text' : 'paragraph-text'}`}
              />
            </DefaultButton>
          </div>

          {error && (
            <InlineError classes='flex h-8 items-center justify-center'>
              <p className='secondary-text'>Error: {error}</p>
            </InlineError>
          )}

          {incorrectNumberOfWords && (
            <InlineError classes='flex h-9 items-center justify-center'>
              <p className='secondary-text'>
                You must have between 6 or 18 words.
              </p>
            </InlineError>
          )}
        </div>
        {/* Hidden download link */}
        <a ref={linkRef} className='hidden'>
          Download
        </a>
      </form>
    </section>
  )
}

export default EditWordsearchForm
