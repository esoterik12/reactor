'use client'
import { useState } from 'react'
import ContentTabs from '@/components/containers/ContentTabs'
import React from 'react'
import {
  reviewHuntInfo,
  contentIconStyles,
  reviewHuntSelectorInfo
} from '@/lib/constants/content/contentInfo'
import { baseContentSelectorSchema, huntAndMistakesSchema } from '@/lib/zod/contentInput.schema'
import { ContentForm } from '@/components/input/ContentForm'
import IconReviewHunt from '@/components/icons/content/IconReviewHunt'
import EditMultipleChoice from '@/components/edit/EditMutlipleChoice'
import { EditMultipleChoiceValues } from '@/lib/zod/contentEdit.schema'
import { generateOnlyTabs } from '@/lib/constants/tabOptions'
import { CurriculumSelector } from '@/components/input/CurriculumSelector'

const ReviewHuntPage = () => {
  const [content, setContent] = useState<EditMultipleChoiceValues | null>(null)
  const [metaData, setMetaData] = useState({
    title: '',
    contentType: ''
  })

  const tabContent = [
    <ContentForm
      key='Tab 1'
      icon={<IconReviewHunt classes={contentIconStyles} />}
      formType='generated'
      zodSchema={huntAndMistakesSchema}
      info={reviewHuntInfo}
      contentTitle='Review Hunt'
      contentType='reviewHunt'
      setContent={setContent}
      setMetaData={setMetaData}
    />,
    <CurriculumSelector
      key='Tab 2'
      contentTitle='Review Hunt'
      contentType='reviewHunt'
      icon={<IconReviewHunt classes={contentIconStyles} />}
      setContent={setContent}
      setMetaData={setMetaData}
      zodSchema={baseContentSelectorSchema}
      info={reviewHuntSelectorInfo}
    />,
    <p key='Tab 3'>Tab 3</p>
  ]

  return (
    <>
      {!content ? (
        <ContentTabs tabs={generateOnlyTabs} tabContent={tabContent} />
      ) : (
        <EditMultipleChoice generatedContent={content} metaData={metaData} answerKeyEnabled={true} />
      )}
    </>
  )
}

export default ReviewHuntPage

/*
A subject pronoun takes the place of a noun in the subject of a
sentence. Subject pronouns include I, you, he, she, it, we, and they.
They were excited to go on vacation!
• An object pronoun takes the place of a noun that follows an action
verb or a preposition. Object pronouns include me, you, him, her, it,
us, and them. Mr. Gupta handed us each a copy of the test

Read each sentence and circle the pronoun. Write S on the line if it
is a subject pronoun. Write O if it is an object pronoun.
1. My mom does not like him.
2. I read a chapter every night.
3. Sometimes they go to the zoo together.
4. Will the captain say hello to us ?
5. You can ride in the car with Jessie.
6. The girl did not invite them to the party.


A subject pronoun takes the place of a noun in the subject of a
sentence. An object pronoun takes the place of a noun that follows
an action verb or a preposition.
• A reflexive pronoun is an object pronoun that renames the subject
and ends in -self or -selves. Examples include myself, herself,
yourselves, and themselves.
• A reflexive pronoun is used when the subject and object of a sentence
refer to the same person or thing. Anna fixed the sentence herself.

Circle the correct reflexive pronoun in parentheses to complete
each!sentence.
1. I almost hurt (myself / yourself) while walking down the stairs.
2. The cat licked (itself / themselves) after eating dinner.
3. My dad bought (herself / himself) a hot dog at the game.
4. Lila and Raul did all of the work (ourselves / themselves).
5. Did you both get (yourself / yourselves) some ice cream?
*/
