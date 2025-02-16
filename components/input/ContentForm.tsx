'use client'
import React, { SetStateAction, useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from './InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { setInput } from '@/redux/slices/inputSlice'
import { useAppDispatch } from '@/redux/hooks'
import {
  ContentFormInput,
  EditMetaDataProps,
  InfoTextData,
  InfoTextObject
} from '@/types/input.types'
import { defaultValues } from '@/lib/constants/content/defaultFormValues'
import { ZodSchema } from 'zod'
import { levelSelections } from '@/lib/constants/LevelSelections'
import { Dropdown } from './Dropdown'
import SelectWatchComponent from './watchComponents/SelectWatchComponent'
import { TextareaInput } from './TextareaInput'
import ContentInfoButton from '../buttons/ContentInfoButton'
import InfoTooltip from '../containers/InfoTooltip'
import processInputContent from '@/lib/actions/processInputContent'
import { AppError } from '@/lib/errors/AppError'

interface ContentFormProps<T> {
  formType: 'manual' | 'generated' | 'curriculum'
  icon: React.ReactNode
  zodSchema: ZodSchema
  info: InfoTextData
  levelSelectionEnabled?: boolean
  contentTitle: string
  contentType: string
  watchComponent?: 'pairs'
  setContent: React.Dispatch<SetStateAction<T | null>>
  setMetaData: React.Dispatch<SetStateAction<EditMetaDataProps>>
}

export function ContentForm<T>({
  formType,
  icon,
  zodSchema,
  info,
  levelSelectionEnabled = true,
  contentTitle,
  contentType,
  watchComponent,
  setContent,
  setMetaData
}: ContentFormProps<T>) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
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

  const handleSubmitButton = async (data: ContentFormInput) => {
    setLoading(true)
    console.log('data in handleSubmitButton: ', data)

    try {
      const generationResults = await processInputContent({
        contentType,
        levelSelection: selectedLevel || 'No level selection',
        primaryInputContent: data.primaryInputContent,
        secondaryInputContent: data.secondaryInputContent,
        textareaInput: data.textareaInputContent,
        numberOfContent: data.numberOfContent || null
      })

      // TODO: This currently sends a lot of data to context, not used at the
      // moment, may be wise to remove
      if (generationResults.code === 200) {
        dispatch(
          setInput({
            title: data.title,
            contentType,
            levelSelection: selectedLevel,
            primaryInputContent: data.primaryInputContent,
            secondaryInputContent: data.secondaryInputContent,
            textareaInput: data.textareaInputContent,
            generatedContent:
              generationResults.result.data || generationResults.result.pairs
          })
        )
        // TODO: generation functions are returning objects with different names
        setContent(
          generationResults.result.data ||
            generationResults.result.pairs ||
            generationResults.result.commands ||
            generationResults.result.questions ||
            generationResults.result.sentencePairings ||
            generationResults.result.sentences
        )
        setMetaData({ title: data.title, contentType })
      } else {
        throw new AppError(400, 'Error generating content.')
      }
    } catch (error) {
      console.log('error in handleSubmitButton in ContentForm.tsx: ', error)
      throw new AppError(400, 'Error generation content.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectInfo = (infoKey: InfoTextDataKey) => {
    // If info[infoKey] is undefined, store null in state
    setSelectedInfo(info[infoKey] ?? null)
  }

  const currentPrimaryInput = watch('primaryInputContent')
  // const currentSecondaryInput = watch('secondaryInputContent')

  return (
    <section className='flex h-full w-full flex-row'>
      <form
        className='flex h-full w-[65%] flex-col justify-between p-4'
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        <div>
          <div className='mb-4 flex flex-row items-center gap-2'>
            {icon}
            <p className='large-text'>{contentTitle}</p>
          </div>
          <div className='flex flex-row'>
            <div className='w-[65%]'>
              <h3 className='label-text mb-0.5'>Title:</h3>
              <InputField
                type='text'
                id='inputTitle'
                placeholder=''
                inputClasses='p-1 w-full'
                error={errors.title}
                {...register('title')}
                isDisabled={loading}
              />
            </div>
            {levelSelectionEnabled && (
              <div className='w-[35%] pl-8'>
                <div className='flex flex-row items-center justify-between'>
                  <h3 className='label-text mb-0.5'>Content level:</h3>
                  <ContentInfoButton
                    handleClick={() => handleSelectInfo('levelSelectionInfo')}
                  />
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
              <h3 className='label-text mb-0.5'>
                {info.primaryInputInfo.title}:
              </h3>
              <ContentInfoButton
                handleClick={() => handleSelectInfo('primaryInputInfo')}
              />
            </div>
            <InputField
              type='text'
              id='primaryInputContent'
              placeholder=''
              inputClasses='p-1 w-full'
              error={errors.primaryInputContent}
              {...register('primaryInputContent')}
              isDisabled={loading}
            />
            {info.secondaryInputInfo && (
              <>
                <div className='flex flex-row items-center justify-between'>
                  <h3 className='label-text mb-0.5'>
                    {info.secondaryInputInfo.title}:
                  </h3>
                  <ContentInfoButton
                    handleClick={() => handleSelectInfo('secondaryInputInfo')}
                  />
                </div>
                <InputField
                  type='text'
                  id='secondaryInputContent'
                  placeholder=''
                  inputClasses='p-1 w-full'
                  error={errors.secondaryInputContent}
                  {...register('secondaryInputContent')}
                  isDisabled={loading}
                />
              </>
            )}
          </div>

          {/* Textarea Paste Input */}
          {info.textareaInputInfo && (
            <>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='label-text mb-0.5'>
                  {info.textareaInputInfo.title}:
                </h3>
                <ContentInfoButton
                  handleClick={() => handleSelectInfo('textareaInputInfo')}
                />
              </div>
              <div>
                <TextareaInput
                  id='textareaInputContent'
                  placeholder=''
                  inputClasses='resize-none w-full h-14 p-1'
                  error={errors.textareaInputContent}
                  {...register('textareaInputContent')}
                  isDisabled={loading}
                />
              </div>
            </>
          )}

          {/* Number of Questions */}
          {info.numberOfContent && (
            <div>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='label-text mb-0.5'>
                  {info.numberOfContent.title}:
                </h3>
                {info.numberOfContent.inputInfo && (
                  <ContentInfoButton
                    handleClick={() => handleSelectInfo('numberOfContent')}
                  />
                )}
              </div>
              <InputField
                type='text'
                id='inputContent'
                placeholder=''
                inputClasses='p-1 w-32'
                error={errors.numberOfContent}
                {...register('numberOfContent')}
                isDisabled={loading}
              />
            </div>
          )}

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
          isDisabled={loading}
        >
          <p className='button-text'>
            {formType === 'manual' ? 'Create' : 'Generate'}
          </p>
        </DefaultButton>
      </form>
      {/* Tooltip Info Right side */}
      <div className='flex w-[35%] flex-col px-4 py-4'>
        <InfoTooltip info={selectedInfo} />
      </div>
    </section>
  )
}
