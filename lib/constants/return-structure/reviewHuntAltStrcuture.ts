/* 
TODO: A more effective review hunt would involve quesitons more
closely related to the quiz structure as shown below 
To accomplish this, the generator would need to use two different formats,
one for just simple vocab from the curriculum selector, and one for grammar content
*/

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
      correctAnswerId: 'c'
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
      correctAnswerId: 'b'
    },
    {
      questionId: 'q3',
      questionType: 'writtenAnswer',
      sentence: 'We all climbed into Kevin’s car and he took us home.',
      question: 'Which pronoun could replace “Kevin’s car”?'
    },
    {
      questionId: 'q4',
      questionType: 'writtenAnswer',
      sentence: 'After my fight with Alan, Mrs. Amy was very angry with ___.',
      question: 'Which object pronoun can complete this sentence?'
    }
  ]
}
