'use client'
import { useState } from 'react'
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
import InlineError from '../shared/InlineError'
import { shuffleArray } from '@/lib/utils/shuffleArray'
import { useAppSelector } from '@/redux/hooks'
import useSubmitPDF from '@/lib/hooks/useSubmitPDF'

interface EditPairsFormProps {
  firstWordLabel: string
  secondWordLabel: string
  generatedContent: WordPairings
  metaData: EditMetaDataProps
  shuffleEnabled?: boolean
  answerKeyEnabled?: boolean
}

const EditWordPairsForm = ({
  firstWordLabel = 'First word',
  secondWordLabel = 'Second word',
  generatedContent,
  metaData,
  shuffleEnabled = false,
  answerKeyEnabled = false
}: EditPairsFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { linkRef, downloadBlob } = useBlobDownloader()
  const submitPDF = useSubmitPDF()
  const secondaryInputContent = useAppSelector(
    state => state.input.secondaryInputContent
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<EditPairsFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editPairsSchema),
    defaultValues: { wordPairings: generatedContent, answerKey: false }
  })

  const answerKey = watch('answerKey')

  const handleSubmitButton = (data: EditPairsFormValues) => {
    const pdfData = {
      data: {
        title: metaData.title,
        content: JSON.stringify(data),
        secondaryInputContent
      },
      pdfType: metaData.contentType,
      answerKey: data.answerKey
    }

    submitPDF({
      pdfData,
      title: metaData.title,
      setError,
      setIsLoading,
      downloadBlob
    })
  }

  // TODO: move this to utils
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
  }

  const unshuffleWords = () => {
    setValue('wordPairings', generatedContent, {
      shouldValidate: true
    })
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
          {answerKeyEnabled && (
            <DefaultButton
              btnType='button'
              handleClick={() => setValue('answerKey', !answerKey)}
              customClasses={`w-[100px] ${answerKey ? 'tertiary-background' : 'page-background hover-effect'} button-border `}
              isDisabled={isLoading}
            >
              <p className={answerKey ? 'button-text' : 'paragraph-text'}>
                Answers
              </p>
            </DefaultButton>
          )}
          {shuffleEnabled && (
            <>
              <DefaultButton
                btnType='button'
                handleClick={shuffleWords}
                customClasses='w-[100px] button-border p-1 hover-effect'
                isDisabled={isLoading}
              >
                <p className='secondary-text'>Shuffle</p>
              </DefaultButton>
              <DefaultButton
                btnType='button'
                handleClick={unshuffleWords}
                customClasses='w-[100px] button-border p-1 hover-effect'
                isDisabled={isLoading}
              >
                <p className='tertiary-text'>Unshuffle</p>
              </DefaultButton>
            </>
          )}
          <p>Differentiate</p>
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
    </div>
  )
}

export default EditWordPairsForm
