'use client'
import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DefaultButton from '@/components/buttons/DefaultButton'
import { editMultipleChoice } from '@/lib/zod/contentEdit.schema'
import { z } from 'zod'
import { EditMultipleChoiceValues } from '@/lib/zod/contentEdit.schema'
import EditQuestionForm from './EditQuestionForm'

interface EditMultipleChoiceProps {
  generatedContent: EditMultipleChoiceValues
}

// Infer the form values from the schema.
type EditMultipleChoiceFormValues = z.infer<typeof editMultipleChoice>

const EditMultipleChoice = ({ generatedContent }: EditMultipleChoiceProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<EditMultipleChoiceFormValues>({
    resolver: zodResolver(editMultipleChoice),
    defaultValues: { questions: generatedContent }
  })

  /*
    useFieldArray is a custom hook provided by React Hook Form that simplifies the process of 
    working with an array of input fields. It keeps track of the current state of each field in the array, and 
    it provides helper functions (like append, remove, etc.) to modify the array dynamically.
    For each item in the defaultQuestions array, useFieldArray creates a corresponding field object
  */
  const { fields, append, remove } = useFieldArray({
    control, // useFieldArray uses the control object (provided by useForm) to subscribe to changes in the questions field.
    name: 'questions'
  })

  const handleSubmitButton = (data: EditMultipleChoiceFormValues) => {
    console.log('Form Data:', data)
  }

  return (
    <div className='container-background flex flex-col rounded-lg'>
      <div className='flex'>
        <p className='z-10 w-[180px] border-b-2 border-sky-500 py-2 text-center'>
          Edit Content
        </p>
      </div>
      <div className='relative z-0 -my-[2px] flex border-b-2 border-zinc-600'></div>

      <form
        className='flex h-full flex-col justify-between'
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        {fields.map((question, index) => (
          <EditQuestionForm
            key={question.id}
            control={control}
            register={register}
            errors={errors}
            questionIndex={index}
            removeQuestion={remove}
          />
        ))}
        <div className='flex space-x-2 p-4'>
          <DefaultButton
            btnType='submit'
            customClasses='w-[120px] button-border primary-background p-1 hover-effect-primary'
          >
            <p>Submit</p>
          </DefaultButton>
          <DefaultButton
            btnType='button'
            handleClick={() =>
              append({
                sentenceWithBlank: '',
                correctAnswer: '',
                possibleAnswers: [
                  { answer: '' },
                  { answer: '' },
                  { answer: '' },
                  { answer: '' }
                ] // Start with one empty option
              })
            }
            customClasses='w-[120px] p-1 container-background button-border hover-effect'
          >
            <p className='paragraph-text'>+ Question</p>
          </DefaultButton>
        </div>
      </form>
    </div>
  )
}

export default EditMultipleChoice
