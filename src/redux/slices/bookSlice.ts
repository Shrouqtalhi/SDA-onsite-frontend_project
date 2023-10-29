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
  search: ''
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },
    bookSuccess: (state) => {
      state.isLoading = true
    },
    getBookData: (state, action: PayloadAction<Book[]>) => {
      state.isLoading = false
      state.books = action.payload
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
        console.error(`Book with id ${bookId} not found`)
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

export const { bookSuccess, getBookData, removeBook, findBookById, addBook, searchBook } =
  bookSlice.actions
