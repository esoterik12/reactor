export interface ContentGuide {
  contentTitle: string
  description: string
  whyUseIt: string
  imageLink: string
  imageCaption: string
  generationOptions: GenerationOptions[]
}

export interface GenerationOptions {
  type: string
  description: string
  example?: string
}
