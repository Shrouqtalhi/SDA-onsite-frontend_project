import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Book, InitialState } from '../../type/type'
import api from '../../../api'

export const fetchBooks = createAsyncThunk('books/fetchBook', async () => {
  // const res = await axios.get('/library/books.json')
  const res = await api.get('/api/books')
  return res.data.payload
})

export const fetchBookById = createAsyncThunk('bookId/fetchBook', async (id: string) => {
  const res = await api.get(`/api/books/${id}`)
  return res.data.payload
})

export const deleteBook = createAsyncThunk('bookId/delete', async (id: string) => {
  try {
    await api.delete(`/api/books/${id}`)
    return id
  } catch (error) {
    console.log(error)
  }
})

const initialState: InitialState = {
  books: [],
  isLoading: false,
  error: null,
  foundBook: {} as Book,
  search: ''
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload)
    },
    filterByStatus: (state, action: PayloadAction<{ isAvailable: true }>) => {
      const filterByStatus = state.books.filter(
        (book) => book.isAvailable === action.payload.isAvailable
      )
      state.books = filterByStatus
      return state
    },
    updatedBook: (state, action: PayloadAction<Book>) => {
      const updatedBook = action.payload
      const updated = state.books.map((book) => {
        if (book._id === updatedBook._id) {
          return updatedBook
        }
        return book
      })
      state.books = updated
      return state
    },

    searchBook: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occured'
      })

      .addCase(fetchBookById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isLoading = false
        state.foundBook = action.payload
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occured'
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false
        const bookId = action.payload
        const updatedBooks = state.books.filter((book) => book._id !== bookId)
        state.books = updatedBooks
        return state
      })
  }
})

export default bookSlice.reducer

export const { addBook, searchBook, filterByStatus, updatedBook } = bookSlice.actions
