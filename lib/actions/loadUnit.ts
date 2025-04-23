'use server'

export default async function loadUnit({
  level,
  unit
}: {
  level: string
  unit: string
}) {
  // these dynamic imports ensure Next.js bundles the JSON files
  const spellingModule = await import(
    `@/lib/constants/curriculum/level${level}/level${level}_unit${unit}_spelling.json`
  )
  const vocabModule = await import(
    `@/lib/constants/curriculum/level${level}/level${level}_unit${unit}_vocab.json`
  )
  return {
    spelling: spellingModule.spelling,
    vocab: vocabModule.vocabulary
  }
}
