'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dropdown } from './Dropdown'
import loadUnit from '@/lib/actions/loadUnit'
import {
  levels,
  units,
  spellingWeeks,
  vocabWeeks,
  UnitDataJSON
} from '@/lib/constants/curriculum/curriculumSelectorValues'
import DefaultButton from '../buttons/DefaultButton'

interface CurriculumSelectorProps {
  icon: React.ReactNode
  contentTitle: string
}

const CurriculumSelector = ({
  icon,
  contentTitle
}: CurriculumSelectorProps) => {
  const [level, setLevel] = useState<string | null>(null)
  const [unit, setUnit] = useState<string | null>(null)
  const [unitData, setUnitData] = useState<UnitDataJSON | null>(null)
  const [loading, setLoading] = useState(false)
  const [filteredWords, setFilteredWords] = useState<string[]>([])

  const {
    register,
    watch,
    // formState: { errors }
  } = useForm({
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
          setFilteredWords([])
          setLoading(true)
          const result: UnitDataJSON = await loadUnit({ level, unit })
          setUnitData(result)
        } catch (error) {
          console.error('Error loading unit data:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchUnitData()
  }, [level, unit])

  const handleFilterToggle = (clickedWord: string) => {
    console.log('word', clickedWord)
    const currentFilteredWords = [...filteredWords]

    if (currentFilteredWords.includes(clickedWord)) {
      setFilteredWords(
        currentFilteredWords.filter(word => word !== clickedWord)
      )
    } else {
      setFilteredWords([...currentFilteredWords, clickedWord])
    }

    console.log('filteredWords', filteredWords)
  }

  const handleSubmit = () => {
    console.log('filteredWords', filteredWords)
    console.log('watchVocab', watchVocab)
    console.log('watchSpelling', watchSpelling)
  }

  return (
    <section className='flex flex-col md:flex-row'>
      {/* Left Panel: Selectors & Checkboxes */}
      <div className='w-full max-w-[330px] p-4 md:w-1/3'>
        <div className='mb-2 flex items-center gap-2'>
          {icon}
          <h2 className='large-text'>{contentTitle}</h2>
        </div>

        {/* Dropdowns */}
        <div className='space-y-2'>
          <div className='w-[250px]'>
            <h3 className='paragraph-text mb-1'>Select level:</h3>
            <Dropdown
              dropdownItems={levels}
              selectedItem={level}
              setSelectedItem={setLevel}
              secondaryState={unit}
              setSecondaryState={setUnit}
              placeholder='Choose level'
            />
          </div>
          <div className='w-[250px]'>
            <h3 className='paragraph-text mb-1'>Select unit:</h3>
            <Dropdown
              dropdownItems={units}
              selectedItem={unit}
              setSelectedItem={setUnit}
              placeholder='Choose unit'
              prefix='Unit'
            />
          </div>
        </div>

        {/* Spelling Checkboxes */}
        <div className='mt-2'>
          <h3 className='paragraph-text'>Spelling Words:</h3>
          <div className='ml-4'>
            {spellingWeeks.map(item => (
              <label
                key={item.weekId}
                className='grid cursor-pointer grid-cols-[100px,auto] items-center gap-2 py-1'
              >
                <span className='text-sm'>{item.weekName}</span>
                <input
                  type='checkbox'
                  className='checked:secondary-background h-4 w-4 appearance-none rounded-sm border border-gray-300 checked:border-transparent focus:outline-none'
                  {...register(`spellingWeeks.week${item.weekId}`)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Vocabulary Checkboxes */}
        <div className=''>
          <h3 className='paragraph-text'>Vocabulary:</h3>
          <div className='ml-4'>
            {vocabWeeks.map(item => (
              <label
                key={item.weekId}
                className='grid cursor-pointer grid-cols-[100px,auto] items-center gap-2 py-1'
              >
                <span className='text-sm'>{item.weekName}</span>
                <input
                  type='checkbox'
                  className='checked:primary-background h-4 w-4 appearance-none rounded-sm border border-gray-300 checked:border-transparent focus:outline-none'
                  {...register(`vocabWeeks.week${item.weekId}`)}
                />
              </label>
            ))}
          </div>
        </div>

        <DefaultButton
          ariaLabel='Submit button'
          btnType='button'
          handleClick={handleSubmit}
          customClasses='w-32 mt-4 button-border primary-background p-1 hover-effect-primary'
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
      <div className='mt-2 w-2/3 p-2'>
        {loading ? (
          <div className='text-center text-lg'>Loading...</div>
        ) : unitData ? (
          <div className='container-border grid grid-cols-4 gap-2'>
            {unitData.spelling.map((spellingItem, index) => (
              <div
                key={`spelling-week-${spellingItem.week}`}
                className='border-color h-[244px] rounded border p-2'
              >
                <h4 className='mb-2 text-sm font-medium'>
                  <span className='secondary-text'>Spelling</span>{' '}
                  {spellingWeeks[index]?.weekName ||
                    `Week ${spellingItem.week}`}
                </h4>
                {spellingItem.week &&
                watchSpelling[`week${spellingItem.week}`] ? (
                  <div className='grid grid-cols-2'>
                    {spellingItem.words.map((word, spIndex) => (
                      <button
                        key={`${word.answer}-${spIndex}`}
                        className='paragraph-text flex items-start text-sm'
                        onClick={() => handleFilterToggle(word.answer)}
                      >
                        <p
                          className={
                            filteredWords.includes(word.answer)
                              ? 'text-zinc-600'
                              : ''
                          }
                        >
                          {word.answer}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className='text-xs text-gray-500'>Not selected</p>
                )}
              </div>
            ))}
            {unitData.vocab.map((vocabItem, index) => (
              <div
                key={`vocab-week-${vocabItem.week}`}
                className='border-color h-[244px] rounded border p-2'
              >
                <h4 className='mb-2 text-sm font-medium'>
                  <span className='primary-text'>Vocabulary</span>{' '}
                  {spellingWeeks[index]?.weekName || `Week ${vocabItem.week}`}
                </h4>
                {vocabItem.week && watchVocab[`week${vocabItem.week}`] ? (
                  <div className='grid grid-cols-1'>
                    {vocabItem.words.map((word, vocIndex) => (
                      <button
                        key={`${word.answer}-${vocIndex}`}
                        className='paragraph-text flex items-start text-sm'
                        onClick={() => handleFilterToggle(word.answer)}
                      >
                        <p
                          className={
                            filteredWords.includes(word.answer)
                              ? 'text-zinc-600'
                              : ''
                          }
                        >
                          {word.answer}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className='text-xs text-gray-500'>Not selected</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='paragraph-text text-center'>
            Select a level and unit to view the content.
          </p>
        )}
      </div>
    </section>
  )
}

export default CurriculumSelector
