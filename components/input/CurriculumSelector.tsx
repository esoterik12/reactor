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

interface CurriculumSelectorProps<T> {
  icon: React.ReactNode
  contentTitle: string
  contentType: string
  setContent: React.Dispatch<SetStateAction<T | null>>
}

export interface CurriculumSelectorForm {
  spellingWeeks: {
    week1: boolean
    week2: boolean
    week3: boolean
    week4: boolean
    week5: boolean
  }
  vocabWeeks: {
    week12: boolean
    week34: boolean
    week5: boolean
  }
}

export function CurriculumSelector<T>({
  icon,
  contentTitle,
  contentType,
  setContent
}: CurriculumSelectorProps<T>) {
  const [level, setLevel] = useState<string | null>(null)
  const [unit, setUnit] = useState<string | null>(null)
  const [unitData, setUnitData] = useState<UnitDataJSON | null>(null)
  const [loading, setLoading] = useState(false)
  const [wordsToFilter, setWordsToFilter] = useState<string[]>([])

  const {
    control,
    watch,
    reset
    // formState: { errors }
  } = useForm<CurriculumSelectorForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      spellingWeeks: {
        week1: false,
        week2: false,
        week3: false,
        week4: false,
        week5: false
      },
      vocabWeeks: {
        week12: false,
        week34: false,
        week5: false
      }
    }
  })

  const watchSpelling = watch('spellingWeeks')
  const watchVocab = watch('vocabWeeks')

  useEffect(() => {
    async function fetchUnitData() {
      if (level && unit) {
        try {
          setLoading(true)
          setWordsToFilter([])
          reset()
          const result: UnitDataJSON = await loadUnit({ level, unit })
          setUnitData(result)
        } catch (error) {
          // TODO errors
          console.error('Error loading unit data:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchUnitData()
  }, [level, unit, reset])

  const handleGenerate = async () => {
    setLoading(true)

    if (level && unit && unitData) {
      try {
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

        const filteredWords = filterCurriculumWords({
          unitDataArray,
          wordsToFilter
        })

        const generationResults = await processInputContent({
          contentType,
          levelSelection: level || 'No selection',
          primaryInputContent: JSON.stringify(filteredWords)
        })

        setContent(generationResults.result.data)
      } catch (error) {
        // TODO add error handling
        console.error('Error loading unit data:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section className='flex min-h-screen flex-col'>
      <div className='mb-2 flex items-center gap-2 px-4 pt-4'>
        {icon}
        <h2 className='large-text'>{contentTitle}</h2>
      </div>
      {/* Left Panel: Selectors & Checkboxes */}
      <div className='border-color w-full border-b px-4 pb-4'>
        {/* Dropdowns */}
        <div className='mt-2 flex flex-row gap-x-10'>
          <div className='w-[150px]'>
            <h3 className='label-text mb-1'>Select level:</h3>
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
            <h3 className='label-text mb-1'>Select unit:</h3>
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
                      customClasses={`w-10 h-9 input-border p-1 ${value ? 'secondary-background' : 'page-background hover-effect '}`}
                    >
                      <p>{item.weekName.split(' ')[1]}</p>
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
                      customClasses={`w-10 h-9 input-border p-1  ${value ? 'primary-background' : 'page-background hover-effect'}`}
                    >
                      <p>{item.weekId.split('')[0]}</p>
                    </RefButton>
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <DefaultButton
          ariaLabel='Submit button'
          btnType='button'
          handleClick={handleGenerate}
          customClasses='w-[150px] mt-6 button-border primary-background p-1 hover-effect-primary'
          isDisabled={loading}
        >
          <p className='button-text'>Generate</p>
        </DefaultButton>
      </div>

      {/* Right Panel: Word Display */}
      {/* This maps over ALL unit data spelling content and creates a div for each spelling week
          Inside that div, we check to see if the mapped spelling week is true in watchSpelling object from useForm
          If so, we map over all the words in that array and show the answer (word)
      */}
      <div className='p-4'>
        {loading ? (
          <div className='text-center text-lg'>Loading...</div>
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
