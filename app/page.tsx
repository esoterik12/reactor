import PageContainer from '@/components/containers/PageContainer'

export default function Home() {
  return (
    <PageContainer customClasses='px-6 py-2 md:px-12 md:py-4'>
      <>
        <header className=''>
          <h1 className='custom-primary-text'>Welcome</h1>
        </header>
        <main className=''>
          <p>This is an example project.</p>
          <p>ADD RIDDLES.</p>

          <p>Add heads up heads down</p>
          <p>For heads, use missing letters, changed letters, use a blank screen for 2-3 seconds while one is removed</p>
        </main>
      </>
    </PageContainer>
  )
}