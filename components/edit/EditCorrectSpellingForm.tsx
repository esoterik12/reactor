'use client'
import { useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from '@/components/input/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useBlobDownloader from '@/lib/hooks/useBlobDownloader'
import { EditMetaDataProps } from '@/types/input.types'
import InlineError from '../shared/InlineError'
import { shuffleArray } from '@/lib/utils/shuffleArray'
import useSubmitPDF from '@/lib/hooks/useSubmitPDF'
import {
  editChooseCorrectSpellingSchema,
  SpellingWordPairings,
  EditCorrectSpellingFormValues
} from '@/lib/zod/edit/editChooseCorrectSpelling.schema'

interface EditCorrectSpellingFormProps {
  firstWordLabel: string
  secondWordLabel: string
  generatedContent: SpellingWordPairings
  metaData: EditMetaDataProps
  shuffleEnabled?: boolean
}

const EditCorrectSpellingForm = ({
  firstWordLabel = 'First word',
  secondWordLabel = 'Second word',
  generatedContent,
  metaData,
  shuffleEnabled = false
}: EditCorrectSpellingFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()
  const [isShuffled, setIsShuffled] = useState(false)
  const submitPDF = useSubmitPDF()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<EditCorrectSpellingFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editChooseCorrectSpellingSchema),
    defaultValues: {
      wordPairings: generatedContent,
      secondaryInputContent: ''
    }
  })

  const handleSubmitButton = (data: EditCorrectSpellingFormValues) => {
    const pdfData = {
      data: {
        title: metaData.title,
        content: JSON.stringify(data),
        secondaryInputContent: data.secondaryInputContent
      },
      pdfType: metaData.contentType
    }

    submitPDF({
      pdfData,
      title: metaData.title,
      setError,
      setIsLoading,
      downloadBlob
    })
  }

  const shuffleWords = () => {
    const wordsArray: string[] = []
    generatedContent.map(word => {
      wordsArray.push(word.wordOne)
      wordsArray.push(word.wordTwo)
    })

    const shuffledWordsArray = shuffleArray(wordsArray)

    const finalShuffle = []

    for (let i = 0; i < shuffledWordsArray.length; i += 2) {
      finalShuffle.push({
        wordOne: shuffledWordsArray[i],
        wordTwo: shuffledWordsArray[i + 1]
      })
    }

    setValue('wordPairings', finalShuffle, {
      shouldValidate: true
    })
    setIsShuffled(true)
  }

  const unshuffleWords = () => {
    setValue('wordPairings', generatedContent, {
      shouldValidate: true
    })
    setIsShuffled(false)
  }

  return (
    <section className='container-background flex h-full flex-col rounded-lg'>
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

        {/* Secret Message Input */}
        <div className='ml-7 mt-2 p-2'>
          <p className='paragraph-text w-40 mb-1'>Secret Message</p>
          <InputField
            type='text'
            errorType='textBelow'
            labelClasses='paragraph-text small-text'
            id='secondaryInputContent'
            inputClasses='p-1 w-[450px]'
            placeholder=''
            {...register('secondaryInputContent')}
            error={errors.secondaryInputContent}
          />
        </div>
        <div className='ml-9 flex flex-row gap-4'>
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

export default EditCorrectSpellingForm
