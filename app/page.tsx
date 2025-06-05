import PageContainer from '@/components/containers/PageContainer'
import IconPaperAirplane from '@/components/icons/IconPaperAirplane'
import IconPuzzle from '@/components/icons/IconPuzzle'
import IconRocket from '@/components/icons/IconRocket'
import IconStars from '@/components/icons/IconStars'
import Image from 'next/image'

const sideBarIconClasses = 'text-primary h-6 w-6 primary-text'

const sideBarContent = [
  {
    id: 1,
    icon: <IconPuzzle classes={sideBarIconClasses} />,
    textDescription: 'Printable activities in PDF'
  },
  {
    id: 2,
    icon: <IconPaperAirplane classes={sideBarIconClasses} />,
    textDescription: 'Worksheets for practice & review'
  },
  {
    id: 3,
    icon: <IconRocket classes={sideBarIconClasses} />,
    textDescription: 'Interactive games for your projector'
  },
  {
    id: 4,
    icon: <IconStars classes={sideBarIconClasses} />,
    textDescription: 'More in development...'
  }
]

export default function Home() {
  return (
    <PageContainer customClasses='pb-2 px-4 flex flex-row'>
      {/* Sidebar with quick feature callouts */}
      <section className='shadow-border-sm container-background mx-4 min-h-[calc(100vh-100px)] min-w-[260px] max-w-[260px] rounded-lg p-4'>
        <div className='flex w-full flex-col'>
          <h2 className='paragraph-text text-lg font-semibold'>
            What You Can Create
          </h2>

          {sideBarContent.map(item => (
            <div key={item.id} className='mt-4 flex w-full flex-row'>
              <div className='w-[15%]'>{item.icon}</div>
              <div className='w-[85%]'>{item.textDescription}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main content section */}
      <section className='container-border container-background shadow-border-md ml-4 mr-4 min-h-[calc(100vh-100px)] w-full px-4 py-2'>
        <div className=''>
          <h1 className='header font-bold'>Instant Lesson Content</h1>
          <p className='paragraph-text mb-2'>
            Create classroom resources in seconds and easily edit generated
            content before use.
          </p>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='border-color flex flex-col rounded-lg p-2 shadow-sm'>
              <Image
                src='/images/crazy-checkup-example.jpg'
                alt='Worksheet preview'
                width={340}
                height={220}
                className='mb-2 rounded-md'
              />
              <div>
                <h3 className='large-text font-semibold'>
                  Printable Worksheets
                </h3>
                <p className='paragraph-text text-sm'>
                  Generate PDFs tailored to your curriculum content. No
                  formatting needed.
                </p>
              </div>
            </div>

            <div className='border-color flex flex-col rounded-lg p-2 shadow-sm'>
              <Image
                src='/images/memory-cards-example.jpg'
                alt='Printable activity preview'
                width={340}
                height={220}
                className='mb-2 rounded-md'
              />
              <div>
                <h3 className='large-text font-semibold'>
                  Cut-and-Paste Activities
                </h3>
                <p className='paragraph-text text-sm'>
                  Instantly generate hands-on tasks and visual materials your
                  students will love.
                </p>
              </div>
            </div>

            <div className='border-color flex flex-col rounded-lg p-2 shadow-sm'>
              <Image
                src='/images/game-scrambled-words-example.jpg'
                alt='Interactive game preview'
                width={400}
                height={250}
                className='mb-2 rounded-md'
              />
              <Image
                src='/images/game-spot-it-example.jpg'
                alt='Interactive game preview'
                width={400}
                height={250}
                className='mb-2 rounded-md'
              />
              <h3 className='large-text font-semibold'>Interactive Games</h3>
              <p className='paragraph-text text-sm'>
                Engage your class with games on the big screen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
