import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Author, InitialStateAuthors } from '../../type/type'
import api from '../../../api'

export const fetchAuthors = createAsyncThunk('authers/fetchAuthors', async () => {
  const res = await api.get('/api/authors')
  return res.data
})
export const deleteAuthor = createAsyncThunk('authers/delete', async (id: string) => {
  try {
    await api.delete(`/api/authors/${id}`)
    return id
  } catch (error) {
    console.log(error)
  }
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
        if (author._id === updatedAuthor._id) {
          return updatedAuthor
        }
        return author
      })
      state.authors = updated
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false
        state.authors = action.payload
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occured'
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.isLoading = false
        const authorId = action.payload
        const updatedAuthors = state.authors.filter((author) => author._id !== authorId)
        state.authors = updatedAuthors
        return state
      })
  }
})

export default authorsSlice.reducer

export const { addAuthor, updatedAuthor } = authorsSlice.actions
