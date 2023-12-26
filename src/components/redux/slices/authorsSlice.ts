import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Author, AuthorsState } from '../../../types/type'
import api from '../../../api'
import { AxiosError } from 'axios'

// Get All Authors
export const fetchAuthors = createAsyncThunk('authers/get', async () => {
  const res = await api.get('/api/authors')
  return res.data
})

// Create new Author
export const createAuthor = createAsyncThunk(
  'auther/post',
  async (newAuthor: Author, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/authors`, newAuthor)
      console.log(res)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.msg[0].message)
        return rejectWithValue(error.response?.data.msg[0].message)
      }
      console.log(error)
    }
  }
)

// Delete Author
export const deleteAuthor = createAsyncThunk('autherId/delete', async (id: string) => {
  try {
    await api.delete(`/api/authors/${id}`)
    return id
  } catch (error) {
    console.log(error)
  }
})

// Delete Author
export const updateAuthorThunk = createAsyncThunk(
  'autherId/put',
  async (
    { id, updatedAuthor }: { id: string; updatedAuthor: Partial<Author> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/api/authors/${id}`, updatedAuthor)
      console.log(res.data.payload)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg[0].message)
      }
    }
  }
)

const initialState: AuthorsState = {
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
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.isLoading = false
        const newAuthor = action.payload
        state.authors = [...state.authors, newAuthor]
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
        if (typeof action.payload === 'string') {
          state.error = action.payload
          return
        }
        state.error = 'An error occured'
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.isLoading = false
        const authorId = action.payload
        const updatedAuthors = state.authors.filter((author) => author._id !== authorId)
        state.authors = updatedAuthors
        return state
      })
      .addCase(updateAuthorThunk.fulfilled, (state, action) => {
        state.isLoading = false
        const updated = action.payload
        console.log(action.payload)
        const updatedAuthors = state.authors.map((author) => {
          if (author._id === updated._id) {
            return updated
          }
          return author
        })
        state.authors = updatedAuthors
        return state
      })

      .addCase(updateAuthorThunk.rejected, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
        if (typeof action.payload === 'string') {
          state.error = action.payload
          return
        }
        state.error = 'An error occured'
      })
  }
})

export default authorsSlice.reducer

export const { addAuthor, updatedAuthor } = authorsSlice.actions
