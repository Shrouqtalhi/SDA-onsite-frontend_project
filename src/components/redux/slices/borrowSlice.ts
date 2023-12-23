import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { InitialStateBorrows } from '../../../types/type'

export const fetchBorrows = createAsyncThunk('users/fetchBorrows', async () => {
  const res = await axios.get('/library/borrows.json')
  return res.data
})
export const fetchBooks = createAsyncThunk('users/fetchBooks', async () => {
  const res = await axios.get('/library/books.json')
  return res.data
})

const initialState: InitialStateBorrows = {
  borrows: [],
  borrowbooks: [],
  isLoading: false,
  error: null
}

const borrowSlice = createSlice({
  name: 'borrow',
  initialState,
  reducers: {
    addToBorrow: (state, action) => {
      const book = action.payload
      const isUniuqe = state.borrowbooks.find((borrow) => borrow._id === book.id)
      if (isUniuqe) {
        return state
      }
      state.borrowbooks.push(book)
    },
    removeFromBorrow: (state, action) => {
      const removeBook = state.borrowbooks.filter((book) => book._id !== action.payload.id)
      state.borrowbooks = removeBook
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrows.pending, (state) => {
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(fetchBorrows.fulfilled, (state, action) => {
        ;(state.isLoading = false), (state.borrows = action.payload)
        console.log(action.payload)
      })
      .addCase(fetchBorrows.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message || 'An error occured')
      })
  }
})

export default borrowSlice.reducer

export const { removeFromBorrow, addToBorrow } = borrowSlice.actions
