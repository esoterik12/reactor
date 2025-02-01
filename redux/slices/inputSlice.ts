import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ContextProvider is only applied through the content layout.tsx
// This automatically sets the user into state when the content page is opened through the Accordion client side component

export interface ContentInputState {
  user: UserState | null
  title: string | null
  contentType: string | null
  levelSelection: string | null
  primaryInputContent: string | null
  secondaryInputContent: string | null
  textareaInput: string | null
  numberOfContent: number | null
  generatedContent: any
  error: string | null
}

export interface UserState {
  username: string
  userEmail: string
  userImage: string
}

interface SetErrorPayload {
  error: string
}

export interface SetInputPayload {
  title: string | null
  contentType: string | null
  levelSelection: string | null
  primaryInputContent: string | null
  secondaryInputContent?: string | null
  textareaInput?: string | null
  numberOfContent?: number | null
  generatedContent?: any
}

const initialContentInputState: ContentInputState = {
  user: null,
  title: null,
  contentType: null,
  levelSelection: null,
  primaryInputContent: null,
  secondaryInputContent: null,
  textareaInput: null,
  numberOfContent: null,
  generatedContent: null,
  error: null
}

const inputSlice = createSlice({
  name: 'input',
  initialState: initialContentInputState,
  reducers: {
    setInput(state, action: PayloadAction<SetInputPayload>) {
      state.title = action.payload.title
      state.contentType = action.payload.contentType
      state.levelSelection = action.payload.levelSelection
      state.primaryInputContent = action.payload.primaryInputContent
      if (action.payload.secondaryInputContent) {
        state.secondaryInputContent = action.payload.secondaryInputContent
      }
      if (action.payload.textareaInput) {
        state.textareaInput = action.payload.textareaInput
      }
      if (action.payload.numberOfContent) {
        state.numberOfContent = action.payload.numberOfContent
      }
      if (action.payload.generatedContent) {
        state.generatedContent = action.payload.generatedContent
      }
    },
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload
    },
    setError(state, action: PayloadAction<SetErrorPayload>) {
      state.error = action.payload.error
    },
    clearInput(state) {
      state = initialContentInputState
    }
  }
})

export const { setInput, setUser, setError, clearInput } = inputSlice.actions

export default inputSlice
