import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  customClasses?: string
  screenHeight?: boolean
}

const PageContainer = ({
  children,
  customClasses,
  screenHeight = true
}: PageContainerProps) => {
  return (
    <main
      className={`${customClasses} ${screenHeight ? 'h-[calc(100vh-56px)]' : ''} `}
    >
      {children}
    </main>
  )
}

export default PageContainer
