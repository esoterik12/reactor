'use server'
import { promises as fs } from 'fs'
import { UnitDataJSON } from '../constants/curriculum/curriculumSelectorValues'

export default async function loadUnit({
  level,
  unit
}: {
  level: string
  unit: string
}) {
  const spellingFile = await fs.readFile(
    process.cwd() +
      `/lib/constants/curriculum/level${level}/level${level}_unit${unit}_spelling.json`,
    'utf8'
  )
  const spellingData = JSON.parse(spellingFile)

  const vocabFile = await fs.readFile(
    process.cwd() +
      `/lib/constants/curriculum/level${level}/level${level}_unit${unit}_vocab.json`,
    'utf8'
  )

  const vocabData = JSON.parse(vocabFile)

  const unitData: UnitDataJSON = {
    spelling: spellingData.spelling,
    vocab: vocabData.vocabulary
  }

  return unitData
}
