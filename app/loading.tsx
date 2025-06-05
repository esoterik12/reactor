import PageContainer from '@/components/containers/PageContainer'
import { AccordionSidebarContent } from '@/lib/constants/AccordionSidebarContent'

export default function LoadingContentPage() {
  return (
    <PageContainer customClasses='pb-2 px-4 flex flex-row'>
      <section className='mx-4 min-h-[calc(100vh-100px)] min-w-[260px] max-w-[260px]'>
        <div className='flex w-full flex-col'>
          {AccordionSidebarContent.map(item => (
            <div
              key={item.id}
              className='shadow-border-sm container-background mb-2 rounded-lg'
            >
              <header className='flex h-10 cursor-pointer flex-row items-center'>
                <div className='custom-small-text md:custom-text ml-3 flex flex-row items-center gap-2'>
                  <div className=''>{item.icon}</div>
                  <p>{item.title}</p>
                </div>
              </header>
            </div>
          ))}
        </div>
      </section>
      <section className='container-border container-background shadow-border-md ml-4 mr-4 min-h-[calc(100vh-100px)] w-full'></section>
    </PageContainer>
  )
}
