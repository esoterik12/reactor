import { ReactElement } from 'react'

interface PageContainerProps {
  children: ReactElement
  customClasses?: string
}

const PageContainer = ({ children, customClasses }: PageContainerProps) => {
  return (
    <main
      className={`${customClasses} 'flex h-[calc(100vh-56px)] flex-col items-center justify-center`}
    >
      {children}
    </main>
  )
}

export default PageContainer