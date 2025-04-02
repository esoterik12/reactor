import PageContainer from '@/components/containers/PageContainer'

const containerClasses = 'rounded-lg  p-2 dark:bg-zinc-800 bg-white'

export default function Home() {
  return (
    <PageContainer customClasses='px-6 py-2 md:px-8 md:py-4'>
      <>
        {/* <header className=''>
          <h1 className='custom-primary-text'>Welcome</h1>
        </header> */}
        <main className='flex flex-col gap-y-2'>
          <div className={containerClasses}>
            <p>Add heads up heads down</p>
            <p>
              For heads, use missing letters, changed letters, use a blank
              screen for 2-3 seconds while one is removed
            </p>
          </div>
          <div className={containerClasses}>
            <p>A function to differentiate card in sets may be valuable</p>
          </div>
          <div className={containerClasses}>
            <p>Add level 5 curriculum data</p>
          </div>
          <div className={containerClasses}>
            <p>
              Create a standardized textSizes.ts file for react-pdf - check
              Refactoring UI
            </p>
          </div>
          <div className={containerClasses}>
            <p>Add sight words to curriculum selector somehow</p>
          </div>
          <div className={containerClasses}>
            <p>
              Drag and drop activities: sentence scramble, match pairs, sort
              sets
            </p>
          </div>
          <div className={containerClasses}>
            <p>
              Click the answer activities like spot it, click correct spelling
            </p>
          </div>
          <div className={containerClasses}>
            <p>Add reset to edit forms</p>
            <p>Add reset to content form - useForm has a reset function</p>
          </div>
        </main>
      </>
    </PageContainer>
  )
}
