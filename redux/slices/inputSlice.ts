import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ContextProvider is only applied through the content layout.tsx
// This automatically sets the user into state when the content page is opened through the Accordion client side component

export interface ContentInputState {
  currentContentId: string | null
  user: UserState | null
  title: string | null
  contentType: string | null
  levelSelection: string | null
  // TODO: Temporary any state
  // This will be objects that can match content types in the future
  inputContent: any
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

const initialContentInputState: ContentInputState = {
  currentContentId: null,
  user: null,
  title: null,
  contentType: null,
  levelSelection: null,
  inputContent: null,
  error: null
}

const inputSlice = createSlice({
  name: 'input',
  initialState: initialContentInputState,
  reducers: {
    setInput(state, action: PayloadAction<ContentInputState>) {
      state.currentContentId = action.payload.currentContentId
      state.title = action.payload.title
      state.contentType = action.payload.contentType
      state.levelSelection = action.payload.levelSelection
      state.inputContent = action.payload.inputContent
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
