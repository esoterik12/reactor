export const reviewHuntAltStructure = {
  data: [
    {
      questionId: 'q1',
      questionType: 'multipleChoice',
      question: 'Which sentence is correct?',
      possibleAnswers: [
        {
          answerId: 'a',
          answerText: 'Harry picked they up.'
        },
        {
          answerId: 'b',
          answerText: 'Harry picked its up.'
        },
        {
          answerId: 'c',
          answerText: 'Harry picked everything up.'
        }
      ],
      correctAnswer: 'c'
    },
    {
      questionId: 'q2',
      questionType: 'multipleChoice',
      question: 'Which sentence is correct?',
      possibleAnswers: [
        {
          answerId: 'a',
          answerText: 'When us get home, us can play all night.'
        },
        {
          answerId: 'b',
          answerText: 'When we get home, we can play all night.'
        },
        {
          answerId: 'c',
          answerText: 'When we get home, us can play all night.'
        }
      ],
      correctAnswer: 'b'
    },
    {
      questionId: 'q3',
      questionType: 'multipleChoice',
      question: 'Which sentence uses a conjunction?',
      possibleAnswers: [
        {
          answerId: 'a',
          answerText: 'He does not want to work with his brother.'
        },
        {
          answerId: 'b',
          answerText: 'He can help you, but you will have to wait.'
        },
        {
          answerId: 'c',
          answerText: 'He is slowly finishing his work at home.'
        }
      ],
      correctAnswer: 'b'
    },
    {
      questionId: 'q4',
      questionType: 'multipleChoice',
      question: 'Which sentence has a past tense verb?',
      possibleAnswers: [
        {
          answerId: 'a',
          answerText: 'When Harry wakes up, he does some exercise.'
        },
        {
          answerId: 'b',
          answerText: 'When will Harry wake up?'
        },
        {
          answerId: 'c',
          answerText: 'When Harry woke up, he ate his breakfast.'
        }
      ],
      correctAnswer: 'c'
    },

    // Sentence Completions
    {
      questionId: 'q5',
      questionType: 'sentenceCompletion',
      sentence: 'We all climbed into Kevin’s car and he took us home.',
      question: 'Which pronoun could replace “Kevin’s”?',
      possibleAnswers: [
        {
          answerId: 'a',
          answerText: 'his'
        },
        {
          answerId: 'b',
          answerText: 'her'
        },
        {
          answerId: 'c',
          answerText: 'he'
        }
      ],
      correctAnswer: 'a'
    },
    {
      questionId: 'q6',
      questionType: 'sentenceCompletion',
      sentence: 'I saw ___ elephant at the zoo.',
      question: 'Which article correctly completes the sentence?',
      possibleAnswers: [
        {
          answerId: 'a',
          answerText: 'a'
        },
        {
          answerId: 'b',
          answerText: 'an'
        },
        {
          answerId: 'c',
          answerText: 'the'
        }
      ],
      correctAnswer: 'b'
    },

    // Written Answer
    {
      questionId: 'q7',
      questionType: 'writtenAnswer',
      sentence: 'After my fight with Alan, Mrs. Amy was very angry with ___.',
      question: 'Which object pronoun can complete this sentence?',
      
    },
    {
      questionId: 'q8',
      questionType: 'writtenAnswer',
      sentence: 'She quickly ran to the store.',
      question: 'Which word is and adverb in this sentence?'
    }
  ]
}
