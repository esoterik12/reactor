import PageContainer from '@/components/containers/PageContainer'
import { AccordionSidebarContent } from '@/lib/constants/AccordionSidebarContent'

export default function LoadingContentPage() {
  return (
    <PageContainer customClasses='py-2 px-2 flex flex-row'>
      <section className='h-full w-[18%] min-w-[200px] border-r border-zinc-300 pr-2 dark:border-zinc-600'>
        <div className='flex w-full flex-col'>
          {AccordionSidebarContent.map(item => (
            <div key={item.id} className='container-background mb-2 rounded-lg'>
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
    </PageContainer>
  )
}
