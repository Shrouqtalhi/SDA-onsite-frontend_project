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
    removeAuthor: (state, action: PayloadAction<Author>) => {
      const removeBook = state.authors.filter((author) => author.id !== action.payload.id)
      state.authors = removeBook
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        ;(state.isLoading = false), (state.authors = action.payload)
        console.log(action.payload)
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message || 'An error occured')
      })
  }
})

export default authorsSlice.reducer

export const { removeAuthor } = authorsSlice.actions
