import IconPaperAirplane from '@/components/icons/IconPaperAirplane'
import IconPuzzle from '@/components/icons/IconPuzzle'
import IconRocket from '@/components/icons/IconRocket'
import IconStars from '@/components/icons/IconStars'
import { AccordionSidebarContentProps } from '@/types/accordion.types'

const root = '/content'

export const AccordionSidebarContent: AccordionSidebarContentProps[] = [
  {
    id: 1,
    title: 'Activities & Games',
    icon: <IconPuzzle classes='h-6 w-6' />,
    links: [
      {
        linkId: '1-1',
        contentTitle: 'Memory Cards',
        link: `${root}/memorycards`
      },
      {
        linkId: '1-2',
        contentTitle: 'Choose Correct Spelling',
        link: `${root}/choosecorrectspelling`
      },
      {
        linkId: '1-3',
        contentTitle: 'Crazy Check Up',
        link: `${root}/crazycheckup`
      },
      {
        linkId: '1-4',
        contentTitle: 'Find Your Partner',
        link: `${root}/findyourpartner`
      },
      {
        linkId: '1-5',
        contentTitle: 'Review Hunt',
        link: `${root}/reviewhunt`
      },
      {
        linkId: '1-6',
        contentTitle: 'Grammar Mistakes',
        link: `${root}/grammarmistakes`
      },
      {
        linkId: '1-7',
        contentTitle: 'Riddles',
        link: `${root}/riddles`
      }
    ]
  },
  {
    id: 2,
    title: 'Worksheets',
    icon: <IconPaperAirplane classes='h-6 w-6' />,
    links: [
      {
        linkId: '2-1',
        contentTitle: 'Scrambled Words',
        link: `${root}/scrambledwords`
      },
      {
        linkId: '2-2',
        contentTitle: 'Scrambled Sentences',
        link: `${root}/scrambledsentences`
      },
      { linkId: '2-3', contentTitle: 'Bingo', link: `${root}/bingo` },
      { linkId: '2-4', contentTitle: 'Wordsearch', link: `${root}/wordsearch` },
      {
        linkId: '2-5',
        contentTitle: 'Interviews',
        link: `${root}/interviews`
      },
      {
        linkId: '2-6',
        contentTitle: 'Cryptogram',
        link: `${root}/cryptogram`
      }
    ]
  },
  {
    id: 3,
    title: 'Projected Games',
    icon: <IconRocket classes='h-6 w-6' />,
    links: [
      { linkId: '3-1', contentTitle: 'Scrambled Words', link: '/' },
      { linkId: '3-2', contentTitle: 'Scrambled Sentences', link: '/' },
      { linkId: '3-3', contentTitle: 'Spot It!', link: '/' },
      { linkId: '3-4', contentTitle: 'Jeopardy', link: '/' },
      { linkId: '3-5', contentTitle: 'Memory Game', link: '/' },
      { linkId: '3-6', contentTitle: 'Minefield', link: '/' },
      { linkId: '3-7', contentTitle: 'Picture Reveal', link: '/' }
    ]
  },
  {
    id: 4,
    title: 'Presentations',
    icon: <IconStars classes='h-6 w-6' />,
    links: [
      { linkId: '4-1', contentTitle: 'Grammar Explainer', link: '/' },
      {
        linkId: '4-2',
        contentTitle: 'Reading Skill Explainer',
        link: '/'
      },
      { linkId: '4-3', contentTitle: 'Phonics Introduction', link: '/' },
      { linkId: '4-4', contentTitle: 'General Presentation', link: '/' },
      { linkId: '4-5', contentTitle: 'Vocabulary Introduction', link: '/' }
    ]
  }
]
