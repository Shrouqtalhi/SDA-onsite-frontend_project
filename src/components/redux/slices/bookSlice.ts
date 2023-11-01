import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book, InitialState } from '../../type/type'

export const fetchBooks = createAsyncThunk('users/fetchBook', async () => {
  const res = await axios.get('/library/books.json')
  return res.data
})

const initialState: InitialState = {
  books: [],
  isLoading: false,
  error: null,
  foundBook: {} as Book,
  search: '',
  borrowedBooks: []
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
    },
    updatedBook: (state, action: PayloadAction<Book>) => {
      const updatedBook = action.payload
      const books = state.books.map((book) => {
        if (book.id === updatedBook) {
          return updatedBook
        }
        return books
      })
      state.books = books
    },
    removeBook: (state, action: PayloadAction<Book>) => {
      const removeBook = state.books.filter((book) => book.id !== action.payload.id)
      state.books = removeBook
    },
    findBookById: (state, action: PayloadAction<number>) => {
      const bookId = action.payload
      const foundBook = state.books.find((book) => book.id === bookId)

      if (foundBook) {
        state.foundBook = foundBook
      } else {
        console.error(`Book with id ${bookId} is not found`)
      }
    },
    searchBook: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        ;(state.isLoading = false), (state.books = action.payload)
        console.log(action.payload)
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message || 'An error occured')
      })
  }
})

export default bookSlice.reducer

export const { removeBook, findBookById, addBook, searchBook, filterByStatus, updatedBook } =
  bookSlice.actions
