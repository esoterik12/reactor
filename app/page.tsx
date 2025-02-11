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
        </main>
      </>
    </PageContainer>
  )
}
