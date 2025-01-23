import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  customClasses?: string
}

const PageContainer = ({ children, customClasses }: PageContainerProps) => {
  return (
    <main
      className={`${customClasses} h-[calc(100vh-56px)]`}
    >
      {children}
    </main>
  )
}

export default PageContainer
