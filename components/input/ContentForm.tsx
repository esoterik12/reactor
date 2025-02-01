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
import { defaultValues } from '@/lib/constants/content/defaultFormValues'
import { ZodSchema } from 'zod'
import { levelSelections } from '@/lib/constants/LevelSelections'
import { Dropdown } from './Dropdown'
import SelectWatchComponent from './watchComponents/SelectWatchComponent'
import { TextareaInput } from './TextareaInput'
import ContentInfoButton from '../buttons/ContentInfoButton'
import InfoTooltip from '../containers/InfoTooltip'
import { useRouter } from 'next/navigation'
import processInputContent from '@/lib/actions/processInputContent'
import { AppError } from '@/lib/errors/AppError'

interface ContentFormProps {
  formType: 'manual' | 'generated' | 'curriculum'
  icon: React.ReactNode
  zodSchema: ZodSchema
  info: InfoTextData
  contentTitle: string
  contentType: string
  watchComponent?: 'pairs'
}

const ContentForm = ({
  formType,
  icon,
  zodSchema,
  info,
  contentTitle,
  contentType,
  watchComponent
}: ContentFormProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
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

  const handleSubmitButton = async (data: ContentFormInput) => {
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

      if (generationResults.code === 200) {
        dispatch(
          setInput({
            title: data.title,
            contentType,
            levelSelection: selectedLevel,
            primaryInputContent: data.primaryInputContent,
            secondaryInputContent: data.secondaryInputContent,
            textareaInput: data.textareaInputContent,
            generatedContent: generationResults.result
          })
        )
      } else {
        throw new AppError(400, 'Error generation content.')
      }
    } catch (error) {
      console.log('error in handleSubmitButton in ContentForm.tsx: ', error)
      throw new AppError(400, 'Error generation content.')
    } finally {
      router.push('/content/download')
    }
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
          <div className='mb-4 flex flex-row items-center gap-2'>
            {icon}
            <p className='large-text'>{contentTitle}</p>
          </div>
          <div className='flex flex-row'>
            <div className='w-[65%]'>
              <h3 className='paragraph-text mb-2'>Title:</h3>
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
                  <h3 className='paragraph-text mb-2'>Content level:</h3>
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
              <h3 className='paragraph-text mb-2'>
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
            />
            {info.secondaryInputInfo && (
              <>
                <div className='flex flex-row items-center justify-between'>
                  <h3 className='paragraph-text mb-2'>
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
                />
              </>
            )}
          </div>

          {/* Textarea Paste Input */}
          {info.textareaInputInfo && (
            <>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='paragraph-text mb-2'>
                  {info.textareaInputInfo.title}:
                </h3>
                <ContentInfoButton
                  handleClick={() => handleSelectInfo('textareaInputInfo')}
                />
              </div>
              <div>
                <TextareaInput
                  id='textareaInput'
                  placeholder=''
                  inputClasses='resize-none w-full h-14 p-1'
                  error={errors.textareaInputContent}
                  {...register('textareaInputContent')}
                />
              </div>
            </>
          )}

          {/* Number of Questions */}
          {info.numberOfContent && (
            <div>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='paragraph-text mb-2'>
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

export default ContentForm
