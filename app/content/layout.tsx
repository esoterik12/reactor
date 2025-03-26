import { AccordionStack } from '@/components/containers/AccordionStack'
import { AccordionSidebarContent } from '@/lib/constants/AccordionSidebarContent'
import { getServerSession } from 'next-auth'
import PageContainer from '@/components/containers/PageContainer'
import InlineError from '@/components/shared/InlineError'
import GoogleSignIn from '@/components/buttons/GoogleSignIn'
import { ContextProvider } from '@/redux/ContextProvider'

const CreatePageLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const serverSession = await getServerSession()

  if (
    !serverSession ||
    !serverSession.user?.name ||
    !serverSession.user.email ||
    !serverSession.user.image
  )
    return (
      <PageContainer customClasses='pb-10'>
        <InlineError classes='p-2 h-full w-full flex flex-grow flex-col items-center justify-center'>
          <p className='secondary-text mb-4'>You are not logged in.</p>
          <GoogleSignIn />
        </InlineError>
      </PageContainer>
    )

  return (
    <ContextProvider>
      <PageContainer customClasses='pb-2 px-4 flex flex-row '>
        <section className='h-full max-w-[270px] min-w-[270px] px-2'>
          <AccordionStack
            username={serverSession.user.name}
            userEmail={serverSession.user.email}
            userImage={serverSession.user.image}
            accordionContent={AccordionSidebarContent}
          />
        </section>
        <section className='h-full w-full pl-4 pr-2'>{children}</section>{' '}
      </PageContainer>
    </ContextProvider>
  )
}

export default CreatePageLayout
