'use server'
import OpenAI from 'openai'
import { AppError } from '@/lib/errors/AppError'

const openai = new OpenAI({
  apiKey: process.env.OPENAPI_KEY
})

interface GenerateContentProps {
  message: string
  secondaryInput?: string | null
}

export default async function generateContent({
  message,
  secondaryInput = null,
}: GenerateContentProps) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: 'json_object'
      },
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    })

    // Error if the response does not return the correct format
    if (!response.choices[0].message.content) {
      throw new AppError(
        500,
        'Invalid response format from sentence generation API; response returned unexpected format.'
      )
    }

    // Return success and content parsed to JSON
    const jsonContent = JSON.parse(response.choices[0].message.content)
    if (!jsonContent) {
      return {
        message: 'Invalid response format from API; cannot parse to JSON.',
        code: 500
      }
    }

    return {
      message: 'Content generated successfully.',
      code: 200,
      result: JSON.parse(response.choices[0].message.content),
      secondaryInput,
    }
  } catch (error) {
    console.error('Error generating sentence:', error)
    if (error instanceof AppError) {
      return {
        code: error.code,
        error: error.message
      }
    }

    // Generic errors
    return {
      code: 500,
      error: `An unexpected error occurred while ending the session`
    }
  }
}
