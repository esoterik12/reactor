'use client'
import React, { useEffect, useState, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Dropdown } from './Dropdown'
import loadUnit from '@/lib/actions/loadUnit'
import {
  levels,
  units,
  spellingWeeks,
  vocabWeeks,
  UnitDataJSON,
  SpellingWeek,
  VocabWeek
} from '@/lib/constants/curriculum/curriculumSelectorValues'
import DefaultButton from '../buttons/DefaultButton'
import processInputContent from '@/lib/actions/processInputContent'
import filterCurriculumWords from '@/lib/utils/filterCurriculimWords'
import WeekWordsContainer from '../containers/WeekWordsContainer'
import { motion, AnimatePresence } from 'framer-motion'
import { RefButton } from '../buttons/RefButton'
import { CurriculumSelectorForm } from '@/types/curriculumSelector.types'
import { defaultSelectorValues } from '@/lib/constants/content/defaultSelectorValues'
import { InputField } from './InputField'
import { ZodSchema } from 'zod'
import { EditMetaDataProps, InfoTextData } from '@/types/input.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextareaInput } from './TextareaInput'
import GeneratingContent from '../shared/GeneratingContent'
import { AppError } from '@/lib/errors/AppError'
import InlineError from '../shared/InlineError'
import { FormTypes } from '@/types/form.types'

interface CurriculumSelectorProps<T> {
  icon: React.ReactNode
  formType: FormTypes
  zodSchema: ZodSchema
  info: InfoTextData
  contentTitle: string
  contentType: string
  setContent: React.Dispatch<SetStateAction<T | null>>
  setMetaData: React.Dispatch<SetStateAction<EditMetaDataProps>>
}

export function CurriculumSelector<T>({
  icon,
  formType,
  zodSchema,
  info,
  contentTitle,
  contentType,
  setContent,
  setMetaData
}: CurriculumSelectorProps<T>) {
  const [level, setLevel] = useState<string | null>(null)
  const [unit, setUnit] = useState<string | null>(null)
  const [unitData, setUnitData] = useState<UnitDataJSON | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [wordsToFilter, setWordsToFilter] = useState<string[]>([])

  const {
    control,
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CurriculumSelectorForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(zodSchema),
    defaultValues: defaultSelectorValues
  })

  const watchSpelling = watch('spellingWeeks')
  const watchVocab = watch('vocabWeeks')

  useEffect(() => {
    async function fetchUnitData() {
      if (level && unit) {
        try {
          setIsLoading(true)
          setWordsToFilter([])
          reset()
          const result: UnitDataJSON = await loadUnit({ level, unit })
          setUnitData(result)
        } catch (err: unknown) {
          if (err instanceof AppError) {
            setError(err.message)
          } else {
            setError(
              'An unexpected error occurred while fetching curriculum content.'
            )
          }
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchUnitData()
  }, [level, unit, reset])

  const handleGenerateButton = async (data: CurriculumSelectorForm) => {
    // Note: Here data contains only title and numberOfContent
    // The words are in wordsToFilter useState
    setError(null)
    if (level && unit && unitData) {
      try {
        setIsLoading(true)

        // Creates holding array and adds unitData if it is selected in the form state
        const unitDataArray: (SpellingWeek | VocabWeek)[] = []
        unitData?.spelling.forEach(spellingWeek => {
          if (watchSpelling[`week${spellingWeek.week}`]) {
            unitDataArray.push(spellingWeek)
          }
        })
        unitData?.vocab.forEach(vocabWeek => {
          if (watchVocab[`week${vocabWeek.week}`]) {
            unitDataArray.push(vocabWeek)
          }
        })

        if (unitDataArray.length === 0) {
          setError('No content selected.')
          return
        }

        const filteredWords = filterCurriculumWords({
          unitDataArray,
          wordsToFilter
        }).join(',')

        const generationResults = await processInputContent({
          contentType,
          formType,
          levelSelection: level || 'No selection',
          primaryInputContent: filteredWords,
          secondaryInputContent: data.secondaryInputContent,
          textareaInput: data.textareaInputContent,
          numberOfContent: data.numberOfContent || null,
          secondaryNumberOfContent: data.secondaryNumberOfContent || null
        })

        if (generationResults.code === 200) {
          setContent(generationResults.result.data)
          setMetaData({
            title: data.title,
            contentType,
            secondaryInputContent: data.secondaryInputContent,
            numberOfContent: data.numberOfContent,
            secondaryNumberOfContent: data.secondaryNumberOfContent
          })
        } else {
          throw new AppError(400, 'Error generating content.')
        }
      } catch (err: unknown) {
        if (err instanceof AppError) {
          setError(err.message)
        } else {
          setError('An unexpected error occurred while generating content.')
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <section className='flex shadow-border-md  min-h-[613px] flex-col'>
      <div className='mb-2 flex items-center gap-2 px-4 pt-4'>
        {icon}
        <h2 className='large-text'>{contentTitle}</h2>
      </div>
      {/* Left Panel: Selectors & Checkboxes */}
      <form
        onSubmit={handleSubmit(handleGenerateButton)}
        className='border-color w-full border-b px-4 pb-4'
      >
        {/* Dropdowns */}
        <div className='mt-2 flex flex-row gap-x-10'>
          <div className='w-[150px]'>
            <h3 className='label-text mb-0.5'>Select level:</h3>
            <Dropdown
              dropdownItems={levels}
              selectedItem={level}
              setSelectedItem={setLevel}
              secondaryState={unit}
              setSecondaryState={setUnit}
              placeholder='...'
            />
          </div>
          <div className='w-[150px]'>
            <h3 className='label-text mb-0.5'>Select unit:</h3>
            <Dropdown
              dropdownItems={units}
              selectedItem={unit}
              setSelectedItem={setUnit}
              placeholder='...'
              prefix='Unit'
            />
          </div>

          {/* Spelling Buttons */}
          <div className='flex flex-col'>
            <h3 className='label-text mb-0.5'>Spelling weeks:</h3>
            <div className='flex flex-row gap-2'>
              {spellingWeeks.map(item => (
                <Controller
                  name={`spellingWeeks.week${item.weekId}`}
                  key={item.weekId}
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <RefButton
                      ref={ref}
                      onClick={() => onChange(!value)}
                      isDisabled={!unitData}
                      customClasses={`w-10 h-9 shadow-border-sm input-border p-1 ${value ? 'secondary-background' : 'page-background hover-effect '}`}
                    >
                      <p className={`${value ? 'text-white' : ''}`}>
                        {item.weekName.split(' ')[1]}
                      </p>
                    </RefButton>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Vocab Buttons */}
          <div className='flex flex-col'>
            <h3 className='label-text mb-0.5'>Vocabulary weeks:</h3>
            <div className='flex flex-row gap-2'>
              {vocabWeeks.map(item => (
                <Controller
                  name={`vocabWeeks.week${item.weekId}`}
                  key={item.weekId}
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <RefButton
                      ref={ref}
                      onClick={() => onChange(!value)}
                      isDisabled={!unitData}
                      customClasses={`w-10 h-9 shadow-border-sm input-border p-1  ${value ? 'primary-background' : 'page-background hover-effect'}`}
                    >
                      <p className={`${value ? 'text-white' : ''}`}>
                        {item.weekId.split('')[0]}
                      </p>
                    </RefButton>
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Title and Inputs */}
        <div className='mt-8 flex flex-row gap-10'>
          <div className='w-[340px]'>
            <h3 className='label-text mb-0.5'>Title:</h3>
            <InputField
              type='text'
              id='inputTitle'
              placeholder=''
              inputClasses='p-1 w-full'
              error={errors.title}
              {...register('title')}
              isDisabled={isLoading}
            />
          </div>

          {info.secondaryInputInfo && (
            <div className='w-[410px]'>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='label-text mb-0.5'>
                  {info.secondaryInputInfo.title}:
                </h3>
              </div>
              <InputField
                type='text'
                id='secondaryInputContent'
                placeholder=''
                inputClasses='p-1 w-full'
                error={errors.secondaryInputContent}
                {...register('secondaryInputContent')}
                isDisabled={isLoading}
              />
            </div>
          )}

          {/* Textarea Paste Input */}
          {info.textareaInputInfo && (
            <div className='w-[410px]'>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='label-text mb-0.5'>
                  {info.textareaInputInfo.title}:
                </h3>
              </div>
              <div>
                <TextareaInput
                  id='textareaInputContent'
                  placeholder=''
                  inputClasses='w-full h-9 p-1'
                  error={errors.textareaInputContent}
                  {...register('textareaInputContent')}
                  isDisabled={isLoading}
                />
              </div>
            </div>
          )}
        </div>

        {/* Form Bottom Submit & # of content */}
        <div className='items-centers flex flex-row gap-10'>
          {/* Number of Questions */}
          {info.numberOfContent && (
            <div>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='label-text mb-1'>
                  {info.numberOfContent.title}:
                </h3>
              </div>
              <InputField
                type='text'
                id='numberOfContent'
                placeholder=''
                inputClasses='p-1 w-32'
                error={errors.numberOfContent}
                {...register('numberOfContent')}
                isDisabled={isLoading}
              />
            </div>
          )}
          {info.secondaryNumberOfContent && (
            <div>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='label-text mb-0.5'>
                  {info.secondaryNumberOfContent.title}:
                </h3>
              </div>
              <InputField
                type='text'
                id='secondaryNumberOfContent'
                placeholder=''
                inputClasses='p-1 w-[150px]'
                error={errors.secondaryNumberOfContent}
                {...register('secondaryNumberOfContent')}
                isDisabled={isLoading}
              />
            </div>
          )}
          <DefaultButton
            ariaLabel='Submit button'
            btnType='submit'
            handleClick={handleSubmit(handleGenerateButton)}
            customClasses='w-32 h-9 mt-6 button-border shadow-border-md primary-background p-1 hover-effect-primary'
            isDisabled={isLoading}
          >
            <p className='button-text'>Generate</p>
          </DefaultButton>

          {error && (
            <InlineError classes='flex h-9 my-5 items-center justify-center'>
              <p className='secondary-text'>Error: {error}</p>
            </InlineError>
          )}
        </div>
      </form>

      {/* Right Panel: Word Display */}
      {/* This maps over ALL unit data spelling content and creates a div for each spelling week
          Inside that div, we check to see if the mapped spelling week is true in watchSpelling object from useForm
          If so, we map over all the words in that array and show the answer (word)
      */}
      <div className='p-4'>
        {isLoading ? (
          <div className='text-center'>
            <GeneratingContent />
          </div>
        ) : unitData ? (
          <motion.div
            layout
            className='container-border grid grid-cols-6 gap-2'
          >
            <AnimatePresence>
              {unitData.spelling.map((spellingItem, index) => (
                <WeekWordsContainer
                  key={`spelling-week-${spellingItem.week}`}
                  weekItem={spellingItem}
                  wordsToFilter={wordsToFilter}
                  setWordsToFilter={setWordsToFilter}
                  weekName={spellingWeeks[index]?.weekName}
                  weekSelected={watchSpelling[`week${spellingItem.week}`]}
                  title={<span className='secondary-text'>Spelling&nbsp;</span>}
                  columnNumber={2}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {unitData.vocab.map((vocabItem, index) => (
                <WeekWordsContainer
                  key={`vocab-week-${vocabItem.week}`}
                  weekItem={vocabItem}
                  wordsToFilter={wordsToFilter}
                  setWordsToFilter={setWordsToFilter}
                  weekName={vocabWeeks[index]?.weekName}
                  weekSelected={watchVocab[`week${vocabItem.week}`]}
                  title={<span className='primary-text'>Vocab&nbsp;</span>}
                  columnNumber={1}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p className='paragraph-text text-center'>
            Select a level and unit to view the content.
          </p>
        )}
      </div>
    </section>
  )
}
