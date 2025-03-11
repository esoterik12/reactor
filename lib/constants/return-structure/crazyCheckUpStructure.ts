type CommandType =
  | 'doAnAction'
  | 'writeOnPaper'
  | 'speakOrAsk'
  | 'writeOnThisPaper'
  | 'useWhiteboard'
  | 'drawOnThisPaper'
  | 'useScrapPaper'
  | 'findSomething'

type CrazyCheckUpCommand = {
  commandType: CommandType
  command: string
}

interface CrazyCheckUpStructure {
  data: CrazyCheckUpCommand[]
}

export const crazyCheckUpStructure: CrazyCheckUpStructure = {
  data: [
    {
      commandType: 'doAnAction',
      command: 'Move aside to the left and right three times each.'
    },
    {
      commandType: 'writeOnThisPaper',
      command: "Write something special from your country's culture."
    },
    {
      commandType: 'speakOrAsk',
      command: 'Tell your teacher something that you think is not fair.'
    },
    {
      commandType: 'speakOrAsk',
      command: 'Ask two people who they will invite to their birthday.'
    },
    {
      commandType: 'writeOnThisPaper',
      command: 'Write down what language you want to learn next.'
    },
    {
      commandType: 'findSomething',
      command: 'Find something that can be used to learn.'
    },
    {
      commandType: 'useWhiteboard',
      command:
        'Plead with your teacher for a whiteboard marker and draw a picture of a sheep.'
    },
    {
      commandType: 'drawOnThisPaper',
      command: 'Draw an animal that scurries when it runs on this paper.'
    },
    {
      commandType: 'useScrapPaper',
      command:
        'Get a piece of scrap paper and draw four pieces of candy then cut it up and share it with four people.'
    }
  ]
}
