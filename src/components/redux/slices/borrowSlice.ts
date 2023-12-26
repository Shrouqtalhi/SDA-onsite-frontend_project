import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Book, InitialStateBorrows, User } from '../../../types/type'
import api from '../../../api'
import { calculateDaysBetweenDates } from '../../../utils/dates'
import { AxiosError } from 'axios'

// GET All Boorrows
export const fetchBorrows = createAsyncThunk('users/fetchBorrows', async () => {
  const res = await api.get('/api/borrows')
  return res.data
})

// Create
export const borrowBookThunk = createAsyncThunk(
  'users/post',
  async (
    {
      borrowDate,
      dueDate,
      bookId,
      userId
    }: {
      borrowDate: string
      dueDate: string
      bookId: string
      userId: string
    },
    { rejectWithValue }
  ) => {
    try {
      const numberOfDays = calculateDaysBetweenDates(borrowDate, dueDate)

      const res = await api.post('/api/borrows', {
        numberOfDays,
        bookId,
        userId
      })
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.msg)
        return rejectWithValue(error.response?.data.msg)
      }
      console.log(error)
    }
  }
)

//GET All borrows By userId
export const getBorrowsByUserId = createAsyncThunk('users/getById', async () => {
  const res = await api.get('/api/borrows/history')
  console.log(res.data)
  return res.data
})

export const returnBorrowedBook = createAsyncThunk(
  'users/return',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/borrows/return/${id}`)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
      console.log(error)
    }
  }
)

export const deleteBorrwedBook = createAsyncThunk('users/delete', async (id: string) => {
  try {
    const res = await api.delete(`/api/borrows/${id}`)
    console.log('delete', res)
    return res.data
  } catch (error) {
    console.log(error)
  }
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
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBorrows.fulfilled, (state, action) => {
        state.isLoading = false
        state.borrows = action.payload
        console.log(action.payload)
      })
      // .addCase(fetchBorrows.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.error = action.error.message || 'An error occured'
      // })
      .addCase(borrowBookThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.borrows = action.payload
      })
      .addCase(borrowBookThunk.rejected, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
        if (typeof action.payload === 'string') {
          state.error = action.payload
          return
        }
        state.error = 'An error occured'
      })
      .addCase(getBorrowsByUserId.fulfilled, (state, action) => {
        state.isLoading = false
        state.borrows = action.payload
      })
      .addCase(deleteBorrwedBook.fulfilled, (state, action) => {
        state.isLoading = false
        const deletedBook = action.payload
        state.borrows = state.borrows.filter((borrow) => borrow._id !== deletedBook)
        console.log('Book returned successfully:', deletedBook)
      })
      .addCase(returnBorrowedBook.fulfilled, (state, action) => {
        state.isLoading = false
        const returnedBookId = action.payload
        const updatedBorrows = state.borrows.map((borrow) => {
          if (borrow._id === returnedBookId) {
            return returnedBookId
          }
          return borrow
        })
        state.borrows = updatedBorrows
        return state
      })
  }
})

export default borrowSlice.reducer

export const { removeFromBorrow, addToBorrow } = borrowSlice.actions
