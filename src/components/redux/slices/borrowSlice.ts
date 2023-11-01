import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Borrows, InitialStateBorrows } from '../../type/type'

export const fetchBorrows = createAsyncThunk('users/fetchBorrows', async () => {
  const res = await axios.get('/library/borrows.json')
  return res.data
})

const initialState: InitialStateBorrows = {
  borrows: [],
  isLoading: false,
  error: null,
  foundUser: {} as Borrows
}

const bookSlice = createSlice({
  name: 'borrow',
  initialState,
  reducers: {},
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

export default bookSlice.reducer

// export const {} = bookSlice.actions
