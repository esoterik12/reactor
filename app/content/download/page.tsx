'use client'
import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { AppError } from '@/lib/errors/AppError'

const DownloadPage = () => {
  const state = useAppSelector(state => state.input.generatedContent)

  if (!state) {
    throw new AppError(400, 'Generated content not found.')
  }

  console.log('generatedContent in download page:', state)

  return <div>DownloadPage</div>
}

export default DownloadPage
