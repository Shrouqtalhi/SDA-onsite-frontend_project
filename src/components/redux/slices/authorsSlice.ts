import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Author, InitialStateAuthors } from '../../type/type'

export const fetchAuthors = createAsyncThunk('authers/fetchAuthors', async () => {
  const res = await axios.get('/library/authors.json')
  return res.data
})

const initialState: InitialStateAuthors = {
  authors: [],
  isLoading: false,
  error: null,
  foundBook: null,
  search: ''
}

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor: (state, action: PayloadAction<Author>) => {
      state.authors.push(action.payload)
    },
    updatedAuthor: (state, action: PayloadAction<Author>) => {
      const updatedAuthor = action.payload
      const updated = state.authors.map((author) => {
        if (author.id === updatedAuthor.id) {
          return updatedAuthor
        }
        return author
      })
      state.authors = updated
      return state
    },
    removeAuthor: (state, action: PayloadAction<Author>) => {
      const removeAuthor = state.authors.filter((author) => author.id !== action.payload.id)
      state.authors = removeAuthor
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        ;(state.isLoading = false), (state.authors = action.payload)
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message || 'An error occured')
      })
  }
})

export default authorsSlice.reducer

export const { addAuthor, updatedAuthor, removeAuthor } = authorsSlice.actions
