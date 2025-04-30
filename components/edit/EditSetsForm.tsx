'use client'
import { useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  EditSetsFormValues,
  editSetsSchema
} from '@/lib/zod/edit/editSets.schema'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import { EditMetaDataProps } from '@/types/input.types'
import InlineError from '../shared/InlineError'
import { shuffleArray } from '@/lib/utils/shuffleArray'
import useSubmitPDF from '@/lib/hooks/useSubmitPDF'

interface EditSetsFormProps {
  generatedContent: EditSetsFormValues
  metaData: EditMetaDataProps
  shuffleEnabled?: boolean
}

const EditSetsForm = ({
  generatedContent,
  metaData,
  shuffleEnabled = false
}: EditSetsFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()
  const [isShuffled, setIsShuffled] = useState(false)
  const submitPDF = useSubmitPDF()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<EditSetsFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editSetsSchema),
    defaultValues: { data: generatedContent.data }
  })

  const handleSubmitButton = (data: EditSetsFormValues) => {
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

  const shuffleWords = () => {
    // Important: access the current data in form in case edits are made
    const currentData = watch('data')
    
    const numberOfSets = currentData.length
    const setSize = currentData[0].length

    const flattenedArray = currentData.flat()
    const shuffledArray = shuffleArray(flattenedArray)

    const newData: string[][] = []
    for (let i = 0; i < numberOfSets; i++) {
      const start = i * setSize
      const end = start + setSize
      newData.push(shuffledArray.slice(start, end))
    }

    setValue('data', newData, { shouldValidate: true })
    setIsShuffled(true)
  }

  const unshuffleWords = () => {
    setValue('data', generatedContent.data, {
      shouldValidate: true
    })
    setIsShuffled(false)
  }

  const getGridColsClass = (setSize: number) => {
    const map: Record<number, string> = {
      2: 'grid-cols-[30px,1fr,1fr]',
      3: 'grid-cols-[30px,1fr,1fr,1fr]',
      4: 'grid-cols-[30px,1fr,1fr,1fr,1fr]',
      5: 'grid-cols-[30px,1fr,1fr,1fr,1fr,1fr]'
    }
    return map[setSize] || 'grid-cols-[30px,1fr,1fr]' // Fallback
  }

  return (
    <section className='container-background shadow-border-md  flex h-full flex-col rounded-lg'>
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
        <div
          className={`grid ${getGridColsClass(generatedContent.data[0].length)} px-2 pb-1`}
        >
          <div className='flex h-full items-center justify-center'>
            <p className='paragraph-text'>#</p>
          </div>
          {generatedContent.data[0].map((_, numberIndex) => (
            <p key={`number-${numberIndex}`} className='paragraph-text w-40'>
              Word {numberIndex + 1}
            </p>
          ))}
        </div>

        {generatedContent.data.map((set, qIndex) => (
          <div
            key={`${set[0]}-${qIndex}`}
            className={`grid ${getGridColsClass(generatedContent.data[0].length)} px-2 pb-2`}
          >
            <div className='flex h-full items-center justify-center'>
              <p className='paragraph-text'>{qIndex + 1}</p>
            </div>

            {set.map((word, setIndex) => (
              <InputField
                key={`${word}-${qIndex}-${setIndex}`}
                type='text'
                errorType='highlightInput'
                labelClasses='paragraph-text small-text'
                id={`firstField-${qIndex}`}
                inputClasses='p-1 w-48'
                placeholder=''
                {...register(`data.${qIndex}.${setIndex}`)}
                error={errors.data?.[qIndex]?.[setIndex]}
              />
            ))}
          </div>
        ))}
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

          {shuffleEnabled && (
            <>
              <DefaultButton
                btnType='button'
                handleClick={shuffleWords}
                customClasses='w-[100px] button-border p-1 hover-effect'
                isDisabled={isLoading}
              >
                <p className='secondary-text'>
                  {!isShuffled ? 'Shuffle' : 'Reshuffle'}
                </p>
              </DefaultButton>
              <DefaultButton
                btnType='button'
                handleClick={unshuffleWords}
                customClasses='w-[100px] button-border p-1 hover-effect'
                isDisabled={isLoading || !isShuffled}
              >
                <p
                  className={`${!isShuffled ? 'paragraph-text' : 'tertiary-text'}`}
                >
                  Unshuffle
                </p>
              </DefaultButton>
            </>
          )}
          {error && (
            <InlineError classes='flex h-9 my-5 items-center justify-center'>
              <p className='secondary-text'>Error: {error}</p>
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

export default EditSetsForm
