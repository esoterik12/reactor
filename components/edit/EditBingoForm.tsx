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
  EditBingoFormValues,
  editBingoSchema,
  EditBingoValues
} from '@/lib/zod/edit/editBingo.schema'
import IconXCircle from '../icons/IconXCircle'
import IconPlusCircle from '../icons/IconPlusCircle'
import ResetPageButton from '../buttons/ResetPageButton'

interface EditBingoForm {
  generatedContent: EditBingoValues
  metaData: EditMetaDataProps
  resetPage: () => void
}

const EditBingoForm = ({
  generatedContent,
  metaData,
  resetPage
}: EditBingoForm) => {
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
  } = useForm<EditBingoFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editBingoSchema),
    defaultValues: { bingoWords: generatedContent }
  })

  const { fields, remove, append } = useFieldArray<EditBingoFormValues>({
    control,
    name: 'bingoWords'
  })

  const handleSubmitButton = (data: EditBingoFormValues) => {
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

  const sufficientBingoWords = watch('bingoWords').length >= 25

  return (
    <section className='container-background shadow-border-md flex h-full flex-col rounded-lg'>
      <div className='flex flex-row justify-between'>
        <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
          Edit Content
        </p>
        <ResetPageButton resetPage={resetPage} />
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
                {...register(`bingoWords.${index}.word`)}
                error={errors.bingoWords?.[index]?.word}
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
              isDisabled={isLoading || !sufficientBingoWords}
            >
              {isLoading ? (
                <span className='button-text'>Loading...</span>
              ) : (
                <p className='button-text'>Submit</p>
              )}
            </DefaultButton>

            <DefaultButton
              customClasses='ml-1'
              handleClick={() => append({ word: '' })}
            >
              <IconPlusCircle
                classes={`h-5 w-5 muted-transition-effect ${!sufficientBingoWords ? 'secondary-text' : 'paragraph-text'}`}
              />
            </DefaultButton>
          </div>

          {error && (
            <InlineError classes='flex h-8 items-center justify-center'>
              <p className='secondary-text'>Error: {error}</p>
            </InlineError>
          )}

          {!sufficientBingoWords && (
            <InlineError classes='flex h-9 items-center justify-center'>
              <p className='secondary-text'>You must have 25 words or more.</p>
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

export default EditBingoForm
