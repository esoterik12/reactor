export interface ContentFormInput {
  title: string
  primaryInputContent: string
  secondaryInputContent?: string
  textareaInputContent?: string
  numberOfContent?: number | null
  secondaryNumberOfContent?: number | null
}

// New content info types below
export interface InfoTextData {
  levelSelectionInfo: InfoTextObject
  primaryInputInfo: InfoTextObject
  secondaryInputInfo?: InfoTextObject
  textareaInputInfo?: InfoTextObject
  numberOfContent?: InfoTextObject
  secondaryNumberOfContent?: InfoTextObject
}

export interface InfoTextObject {
  title: string
  inputInfo?: string
  inputExample?: string
}

export interface EditMetaDataProps {
  title: string
  contentType: string
  secondaryInputContent?: string
  numberOfContent?: number | null | undefined
  secondaryNumberOfContent?: number | null | undefined
}
