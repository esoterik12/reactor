// TODO: this will need a more robust data structure
// Each command should also have a commandType that can be used to format
// For example: draw, action, write, board

// export const crazyCheckUpStructure = {
//   data: [
//     'Move aside to the left and right three times each.',
//     "Write something special from your country's culture",
//     'Tell your teacher something that you think is not fair.',
//     'Ask two people who they will invite to their birthday.',
//     'Write down what language you want to learn next.',
//     'Plead with your teach for a board marker and draw a picture of a sheep.',
//     'Draw an animal that scurries when it runs on this paper.',
//     'Get a piece of scrap paper and draw four pieces of candy then cut it up and share it will four people.'
//   ]
// }

type CommandType =
  | 'doAnAction'
  | 'writeOnPaper'
  | 'speakOrAsk'
  | 'writeOnThisPaper'
  | 'useWhiteboard'
  | 'drawOnThisPaper'
  | 'useScrapPaper'

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
