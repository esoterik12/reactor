'use client'
import React, { useCallback, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DefaultButton from '@/components/buttons/DefaultButton'
import { z } from 'zod'
import {
  EditMultipleChoiceValues,
  editMultipleChoiceSchema
} from '@/lib/zod/edit/editMultipleChoice.schema'
import EditQuestionForm from './EditQuestionForm'
import { EditMetaDataProps } from '@/types/input.types'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import { capitalizeFirstLetter } from '@/lib/utils/capitalizeFirstLetter'
import InlineError from '../shared/InlineError'
import ResetPageButton from '../buttons/ResetPageButton'

interface EditMultipleChoiceProps {
  generatedContent: EditMultipleChoiceValues
  metaData: EditMetaDataProps
  resetPage: () => void
}

type EditMultipleChoiceFormValues = z.infer<typeof editMultipleChoiceSchema>

const EditMultipleChoice = ({
  generatedContent,
  metaData,
  resetPage
}: EditMultipleChoiceProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<EditMultipleChoiceFormValues>({
    resolver: zodResolver(editMultipleChoiceSchema),
    defaultValues: { questions: generatedContent }
  })

  /*
    useFieldArray is a custom hook provided by React Hook Form that simplifies the process of 
    working with an array of input fields. It keeps track of the current state of each field in the array, and 
    it provides helper functions (like append, remove, etc.) to modify the array dynamically.
    For each item in the defaultQuestions array, useFieldArray creates a corresponding field object
  */
  const { fields, append, remove } = useFieldArray({
    control, // useFieldArray uses the control object (provided by useForm) to subscribe to changes in the questions field.
    name: 'questions'
  })

  const handleSubmitButton = useCallback(
    async (data: EditMultipleChoiceFormValues) => {
      setError(null)
      setIsLoading(true)

      const pdfType = capitalizeFirstLetter(metaData.contentType)

      const pdfData = {
        content: JSON.stringify(data),
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
        const fileName = `${metaData.title} - ${pdfType}.pdf`
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
    <div className='container-background shadow-border-md flex flex-col rounded-lg'>
      <div className='flex flex-row justify-between'>
        <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
          Edit Content
        </p>
        <ResetPageButton resetPage={resetPage} />
      </div>
      <div className='relative z-0 -my-[2px] flex border-b-2 border-zinc-600'></div>

      <form
        className='flex h-full flex-col justify-between'
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        {fields.map((question, index) => (
          <EditQuestionForm
            key={question.id}
            control={control}
            register={register}
            errors={errors}
            questionIndex={index}
            removeQuestion={remove}
          />
        ))}
        <div className='flex space-x-2 p-4'>
          <DefaultButton
            btnType='submit'
            isDisabled={isLoading}
            customClasses='w-[120px] button-border primary-background p-1 hover-effect-primary'
          >
            <p className='button-text'>Submit</p>
          </DefaultButton>
          <DefaultButton
            btnType='button'
            handleClick={() =>
              append({
                sentenceWithBlank: '',
                correctAnswer: '',
                possibleAnswers: [
                  { answer: '' },
                  { answer: '' },
                  { answer: '' },
                  { answer: '' }
                ] // Start with one empty option
              })
            }
            customClasses='w-[120px] p-1 container-background button-border hover-effect'
          >
            <p className='paragraph-text'>+ Question</p>
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
        </div>
      </form>
    </div>
  )
}

export default EditMultipleChoice
