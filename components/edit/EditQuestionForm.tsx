'use client'
import React from 'react'
import {
  useFieldArray,
  UseFormRegister,
  Control,
  FieldErrors,
  UseFieldArrayRemove
} from 'react-hook-form'
import { InputField } from '@/components/input/InputField'
import { EditMultipleChoiceFormValues } from '@/lib/zod/edit/editMultipleChoice.schema'
import DefaultButton from '../buttons/DefaultButton'
import IconXCircle from '../icons/IconXCircle'
import IconDelete from '../icons/IconDelete'

interface EditQuestionFormProps {
  control: Control<EditMultipleChoiceFormValues>
  register: UseFormRegister<EditMultipleChoiceFormValues>
  errors: FieldErrors<EditMultipleChoiceFormValues>
  questionIndex: number
  removeQuestion: UseFieldArrayRemove
}

const EditQuestionForm = ({
  control,
  register,
  errors,
  questionIndex,
  removeQuestion
}: EditQuestionFormProps) => {
  // Set up a nested field array for possibleAnswers for this specific question.
  const {
    fields: possibleAnswerFields,
    append: appendPossibleAnswer,
    remove
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.possibleAnswers`
  })

  return (
    <div className='mb-2 flex flex-col border-b border-zinc-500 px-4 pb-6 pt-2'>
      <div className='flew-row flex w-full items-start justify-between'>
        <InputField
          type='text'
          id={`questions.${questionIndex}.sentenceWithBlank`}
          label={`Question ${questionIndex + 1}`}
          labelClasses='paragraph-text small-text py-1'
          errorType='highlightInput'
          inputClasses='p-1 w-[750px]'
          placeholder='Enter sentence with a blank...'
          {...register(`questions.${questionIndex}.sentenceWithBlank` as const)}
          error={errors.questions?.[questionIndex]?.sentenceWithBlank}
        />
      </div>

      <div className='mt-4 flex w-[850px] flex-row gap-10'>
        <div>
          <p className='paragraph-text small-text py-1 font-medium'>
            Possible Answers
          </p>
          <div className='flex flex-col gap-2'>
            {possibleAnswerFields.map((option, oIndex) => (
              <div key={option.id} className='flex flex-row gap-1'>
                <InputField
                  type='text'
                  inputClasses='p-1 w-[250px] '
                  errorType='highlightInput'
                  id={`questions.${questionIndex}.possibleAnswers.${oIndex}.answer`}
                  placeholder='Enter option...'
                  {...register(
                    `questions.${questionIndex}.possibleAnswers.${oIndex}.answer` as const
                  )}
                  error={
                    errors.questions?.[questionIndex]?.possibleAnswers?.[oIndex]
                      ?.answer
                  }
                />
                <DefaultButton handleClick={() => remove(oIndex)}>
                  <IconXCircle classes='h-5 w-5 muted-transition-effect paragraph-text' />
                </DefaultButton>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-between gap-2'>
          <InputField
            type='text'
            label='Correct Answer'
            labelClasses='tertiary-text py-1 small-text'
            errorType='highlightInput'
            inputClasses='p-1 w-[250px]'
            id={`questions.${questionIndex}.correctAnswer`}
            placeholder='Enter correct answer...'
            {...register(`questions.${questionIndex}.correctAnswer` as const)}
            error={errors.questions?.[questionIndex]?.correctAnswer}
          />
          <div className='flex flex-row gap-2'>
            <DefaultButton
              btnType='button'
              handleClick={() => appendPossibleAnswer({ answer: '' })}
              customClasses='w-[120px] p-1 container-background button-border hover-effect'
            >
              <p className='small-text paragraph-text'>+ Answer</p>
            </DefaultButton>
            <DefaultButton
              btnType='button'
              handleClick={() => removeQuestion(questionIndex)}
              customClasses='w-[120px] p-1 container-background button-border hover-effect flex flex-row items-center justify-center gap-1'
            >
              <IconDelete classes='w-3 h-3 secondary-text' />
              <p className='secondary-text small-text mr-2'>Delete</p>
            </DefaultButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditQuestionForm
