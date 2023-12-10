import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book, InitialState } from '../../type/type'
import api from '../../../api'

export const fetchBooks = createAsyncThunk('users/fetchBook', async () => {
  // const res = await axios.get('/library/books.json')
  const res = await api.get('http://localhost:5002/api/books')
  console.log(res.data.payload)
  return res.data.payload
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
    removeBook: (state, action: PayloadAction<Book>) => {
      const removeBook = state.books.filter((book) => book._id !== action.payload._id)
      state.books = removeBook
    },
    findBookById: (state, action: PayloadAction<string>) => {
      const bookId = action.payload
      const foundBook = state.books.find((book) => book._id === bookId)

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
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message || 'An error occured')
      })
  }
})

export default bookSlice.reducer

export const { removeBook, findBookById, addBook, searchBook, filterByStatus, updatedBook } =
  bookSlice.actions
