import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Book, BooksState } from '../../../types/type'
import api from '../../../api'
import { AxiosError } from 'axios'

// Get All Book
export const fetchBooks = createAsyncThunk('books/get', async () => {
  // const res = await axios.get('/library/books.json')
  const res = await api.get('/api/books')
  console.log(res.data)
  return res.data.payload
})

// Get Book By ID
export const fetchBookById = createAsyncThunk('bookId/bookById', async (id: string) => {
  const res = await api.get(`/api/books/${id}`)
  return res.data.payload
})

// Create New Book
export const createBook = createAsyncThunk(
  'book/post',
  async (newBook: Book, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/books`, newBook)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Update a Book
export const updateBookThunk = createAsyncThunk(
  'book/put',
  async (
    { bookId, updatedBook }: { bookId: string; updatedBook: Partial<Book> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/api/books/${bookId}`, updatedBook)
      return res.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Delete Book
export const deleteBook = createAsyncThunk('bookId/delete', async (id: string) => {
  try {
    await api.delete(`/api/books/${id}`)
    return id
  } catch (error) {
    console.log(error)
  }
})

// Pagination
export const getBookPaginatedThunk = createAsyncThunk('book/pagination', async (page: number) => {
  try {
    const res = await api.get(`/api/books?page=${page}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
})

const initialState: BooksState = {
  originalBooks: [],
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
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        const newBook = action.payload
        state.books = [...state.books, newBook]
        return state
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false
        if (typeof action.payload === 'string') {
          state.error = action.payload
          return
        }
        state.error = 'An error occured'
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false
        const bookId = action.payload
        const updatedBooks = state.books.filter((book) => book._id !== bookId)
        state.books = updatedBooks
        return state
      })

      // ! this one
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        state.isLoading = false
        const updated = action.payload
        console.log(updated)
        const updatedBook = state.books.map((book) => {
          if (book._id === updated._id) {
            return updated
          }
          return book
        })
        state.books = updatedBook
        return state
      })
      .addCase(getBookPaginatedThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = action.payload.payload
      })
  }
})

export default bookSlice.reducer

export const { addBook, searchBook, filterByStatus } = bookSlice.actions
