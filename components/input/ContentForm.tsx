'use client'
import React, { SetStateAction, useState } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'
import { InputField } from './InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { FormTypes } from '@/types/form.types'
import InlineError from '../shared/InlineError'

interface ContentFormProps<T> {
  formType: FormTypes
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

    try {
      const generationResults = await processInputContent({
        contentType,
        formType,
        levelSelection: selectedLevel || 'No level selection',
        primaryInputContent: data.primaryInputContent,
        secondaryInputContent: data.secondaryInputContent,
        textareaInput: data.textareaInputContent,
        numberOfContent: data.numberOfContent || null,
        secondaryNumberOfContent: data.secondaryNumberOfContent || null
      })

      if (generationResults.code === 200) {
        // TODO: generation functions are returning objects with different names

        setContent(
          generationResults.result.data ||
            generationResults.result.pairs ||
            generationResults.result.commands ||
            generationResults.result.questions ||
            generationResults.result.sentencePairings ||
            generationResults.result.sentences ||
            generationResults.result
        )
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
    } catch (error) {
      console.log('Error in handleSubmitButton in ContentForm.tsx: ', error)
      setError('Unexpected submission error; please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectInfo = (infoKey: InfoTextDataKey) => {
    // If info[infoKey] is undefined, store null in state
    setSelectedInfo(info[infoKey] ?? null)
  }

  const currentPrimaryInput = watch('primaryInputContent')

  return (
    <section className='flex w-full flex-row'>
      <form
        className='flex w-[65%] flex-col justify-between p-4'
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

          {/* Number of Content / Secondary Number of Content */}
          {info.numberOfContent && (
            <div className='flex flex-row gap-8'>
              <div>
                <div className='flex flex-row items-center justify-between'>
                  <h3 className='label-text mb-1'>
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
                  id='numberOfContent'
                  placeholder=''
                  inputClasses='p-1 w-32'
                  error={errors.numberOfContent}
                  {...register('numberOfContent')}
                  isDisabled={loading}
                />
              </div>
              {info.secondaryNumberOfContent && (
                <div>
                  <div className='flex flex-row items-center justify-between'>
                    <h3 className='label-text mb-1'>
                      {info.secondaryNumberOfContent.title}:
                    </h3>
                    {info.secondaryNumberOfContent.inputInfo && (
                      <ContentInfoButton
                        handleClick={() =>
                          handleSelectInfo('secondaryNumberOfContent')
                        }
                      />
                    )}
                  </div>
                  <InputField
                    type='text'
                    id='secondaryNumberOfContent'
                    placeholder=''
                    inputClasses='p-1 w-32'
                    error={errors.secondaryNumberOfContent}
                    {...register('secondaryNumberOfContent')}
                    isDisabled={loading}
                  />
                </div>
              )}
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
        <div className='flex flex-row items-center gap-4'>
          <DefaultButton
            ariaLabel='Submit button'
            btnType='submit'
            handleClick={handleSubmit(handleSubmitButton)}
            customClasses='w-32 h-9 mt-2 button-border primary-background p-1 hover-effect-primary'
            isDisabled={loading}
          >
            <p className='button-text'>
              {formType === 'generated' ? 'Generate' : 'Create'}
            </p>
          </DefaultButton>
          {error && (
            <InlineError classes='flex h-9 mt-1 items-center justify-center'>
              <p className='secondary-text'>Error: {error}</p>
            </InlineError>
          )}
        </div>
      </form>
      {/* Tooltip Info Right side */}
      <div className='flex w-[35%] flex-col px-4 py-4'>
        <InfoTooltip info={selectedInfo} />
      </div>
    </section>
  )
}
