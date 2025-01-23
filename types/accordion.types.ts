export type AccordionSidebarContentProps = {
  id: number
  title: string
  icon: React.ReactNode
  links: AccordionLink[]
}

export type AccordionLink = {
  linkId: string
  contentTitle: string
  link: string
}