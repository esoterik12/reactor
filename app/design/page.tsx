'use client'
import DefaultButton from '@/components/buttons/DefaultButton'
import PageContainer from '@/components/containers/PageContainer'

const colors = [
  {
    name: 'header-text',
    display: 'Header',
    color: 'header-text',
    bg: 'bg-zinc-900 dark:bg-zinc-100',
    hex: ''
  },
  {
    name: 'paragraph-text',
    display: 'Paragraph',
    color: 'paragraph-text',
    bg: 'bg-zinc-600 dark:bg-zinc-400',
    hex: ''
  },
  {
    name: 'primary-text',
    display: 'Primary',
    color: 'primary-text',
    bg: 'primary-background',
    hex: ''
  },
  {
    name: 'secondary-text',
    display: 'Secondary',
    color: 'secondary-text',
    bg: 'secondary-background',
    hex: ''
  },
  {
    name: 'tertiary-text',
    display: 'Tertiary',
    color: 'tertiary-text',
    bg: 'tertiary-background',
    hex: ''
  }
]

export default function StyleDesignPage() {
  return (
    <PageContainer customClasses='px-4 py-2'>
      {/* Attention: gap affects Gspacing */}
      <div className='container-border container-background flex flex-row gap-6'>
        {/* Text Section */}
        <section className='flex w-80 flex-col gap-6 p-6'>
          <p className='large-text'>Type Scale</p>
          {/* Headers */}
          <div className='flex flex-row gap-x-4'>
            <h1 className='header-large'>Header 1</h1>
          </div>
          <div className='flex flex-row gap-x-4'>
            <h2 className='header header-text'>Header 2</h2>
            <h2 className='header paragraph-text'>Header 2</h2>
          </div>
          <div className='flex flex-row gap-x-4'>
            <h3 className='subheader header-text'>Header 3</h3>
            <h3 className='subheader paragraph-text'>Header 3</h3>
          </div>
          {/* Paragraph Text */}
          <p className='large-text header-text'>Large Text</p>
          <p className='normal-text paragraph-text'>Paragraph Text</p>
          <p className='small-text paragraph-text'>Small Paragraph Text</p>
        </section>

        {/* Colors Section */}
        <section className='flex w-48 flex-col gap-6 p-6'>
          <p className='large-text'>Colors</p>
          {colors.map(item => (
            <div key={item.name} className='flex flex-row gap-x-4'>
              <div className={`h-6 w-6 rounded-lg ${item.bg}`}></div>
              <p className={`h-6 w-6 rounded-lg ${item.color}`}>
                {item.display}
              </p>
            </div>
          ))}
        </section>

        {/* Buttons */}
        <section className='flex w-48 flex-col gap-4 p-6'>
          <p className='large-text'>Buttons</p>
          <div className='flex flex-col gap-y-4'>
            <DefaultButton customClasses='w-32 p-1 page-background button-border hover-effect '>
              <p>Basic</p>
            </DefaultButton>
            <DefaultButton customClasses='w-32 p-1 container-background button-border hover-effect'>
              <p>Discrete</p>
            </DefaultButton>
            <DefaultButton customClasses='w-32 button-border primary-background p-1 hover-effect-primary'>
              <p className='button-text'>Primary</p>
            </DefaultButton>
            <DefaultButton customClasses='w-32 button-border secondary-background p-1 hover-effect-secondary'>
              <p className='button-text'>Secondary</p>
            </DefaultButton>
            <DefaultButton customClasses='w-32 button-border tertiary-background p-1 hover-effect-tertiary'>
              <p className='button-text'>Tertiary</p>
            </DefaultButton>
          </div>
        </section>
      </div>
    </PageContainer>
  )
}
