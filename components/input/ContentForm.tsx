'use client'
import React, { useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from './InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { setInput } from '@/redux/slices/inputSlice'
import { useAppDispatch } from '@/redux/hooks'
import {
  ContentFormInput,
  InfoTextData,
  InfoTextObject
} from '@/types/input.types'
import IconMemoryContent from '../icons/content/IconMemoryContent'
import IconInfo from '../icons/IconInfo'
import { defaultValues } from '@/lib/constants/content/defaultFormValues'
import { ZodSchema } from 'zod'
import { levelSelections } from '@/lib/constants/LevelSelections'
import { Dropdown } from './Dropdown'
import SelectWatchComponent from './watchComponents/SelectWatchComponent'

interface ContentFormProps {
  formType: 'manual' | 'generated' | 'curriculum'
  zodSchema: ZodSchema
  info: InfoTextData
  contentType: string
  watchComponent?: 'pairs'
}

const ContentForm = ({
  formType,
  zodSchema,
  info,
  contentType,
  watchComponent
}: ContentFormProps) => {
  const dispatch = useAppDispatch()
  // const [loading, setLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<string | null>('None')
  const [selectedInfo, setSelectedInfo] = useState<null | InfoTextObject>(null)

  // The keys for info object match the keys in InfoTextData
  type InfoTextDataKey = keyof InfoTextData

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ContentFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(zodSchema),
    defaultValues
  })

  const handleSubmitButton = (data: ContentFormInput) => {
    console.log('handleSubmitButton clicked')
    console.log('data in handleSubmitButton: ', data)

    dispatch(
      setInput({
        title: data.title,
        contentType,
        levelSelection: null,
        primaryInputContent: data.primaryInputContent,
        secondaryInputContent: data.secondaryInputContent
      })
    )
  }

  const handleSelectInfo = (infoKey: InfoTextDataKey) => {
    // If info[infoKey] is undefined, store null in state
    setSelectedInfo(info[infoKey] ?? null)
  }

  const currentPrimaryInput = watch('primaryInputContent')
  // const currentSecondaryInput = watch('secondaryInputContent')

  return (
    <section className='item- flex h-full w-full flex-row'>
      <form
        className='flex h-full w-[65%] flex-col justify-between p-4'
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        <div>
          <div className='flex flex-row gap-2'>
            <IconMemoryContent classes='w-7 h-7 paragraph-text' />
            <p className='large-text mb-4'>{contentType}</p>
          </div>
          <div className='flex flex-row'>
            <div className='w-[65%]'>
              <h3 className='paragraph-text mb-2'>1. Add a title:</h3>
              <InputField
                type='text'
                id='inputTitle'
                placeholder=''
                inputClasses='p-1 w-full'
                error={errors.title}
                {...register('title')}
              />
            </div>
            {formType === 'generated' && (
              <div className='w-[35%] pl-8'>
                <div className='flex flex-row items-center justify-between'>
                  <h3 className='paragraph-text mb-2'>
                    2. Select content level:
                  </h3>
                  <DefaultButton
                    handleClick={() => handleSelectInfo('levelSelectionInfo')}
                  >
                    <IconInfo classes='h-5 w-5 primary-text mb-1' />
                  </DefaultButton>
                </div>
                <Dropdown
                  placeholder='Select Level'
                  selectedItem={selectedLevel}
                  setSelectedItem={setSelectedLevel}
                  dropdownItems={levelSelections}
                />
              </div>
            )}
          </div>

          {/* Primary Input */}
          <div className='w-full'>
            <div className='flex flex-row items-center justify-between'>
              <h3 className='paragraph-text mb-2'>
                2. {info.primaryInputInfo.title}:
              </h3>
              <DefaultButton
                handleClick={() => handleSelectInfo('primaryInputInfo')}
              >
                <IconInfo classes='h-5 w-5 primary-text mb-1' />
              </DefaultButton>
            </div>
            <InputField
              type='text'
              id='inputContent'
              placeholder=''
              inputClasses='p-1 w-full'
              error={errors.primaryInputContent}
              {...register('primaryInputContent')}
            />
            {info.secondaryInputInfo && (
              <>
                <div className='flex flex-row items-center justify-between'>
                  <h3 className='paragraph-text mb-2'>
                    3. {info.secondaryInputInfo.title}:
                  </h3>
                  <DefaultButton
                    handleClick={() => handleSelectInfo('secondaryInputInfo')}
                  >
                    <IconInfo classes='h-5 w-5 primary-text mb-1' />
                  </DefaultButton>
                </div>
                <InputField
                  type='text'
                  id='inputContent'
                  placeholder=''
                  inputClasses='p-1 w-full'
                  error={errors.secondaryInputContent}
                  {...register('secondaryInputContent')}
                />
              </>
            )}
          </div>

          {/* Watch Components: */}
          {currentPrimaryInput && watchComponent && (
            <SelectWatchComponent
              watchComponentSelection={watchComponent}
              inputText={currentPrimaryInput}
            />
          )}
        </div>
        <DefaultButton
          ariaLabel='Submit button'
          btnType='submit'
          handleClick={handleSubmit(handleSubmitButton)}
          customClasses='w-32 mt-2 button-border primary-background p-1 hover-effect-primary'
        >
          <p className='button-text'>
            {formType === 'manual' ? 'Create' : 'Generate'}
          </p>
        </DefaultButton>
      </form>
      {/* Tooltip Info Right side */}
      <div className='flex w-[35%] flex-col px-4 py-4'>
        <div className='h-full rounded-lg px-4'>
          <div className='large-text flex flex-row'>
            <h3>{selectedInfo !== null && selectedInfo.title}</h3>
          </div>
          <p className='paragraph-text mt-2'>
            {selectedInfo !== null && selectedInfo.inputInfo}
          </p>
          <p className='paragraph-text mt-2'>
            {selectedInfo !== null && selectedInfo.inputExample}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContentForm
