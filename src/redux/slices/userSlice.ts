import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { InitialStateUsers, Users } from '../../type/type'

export const fetchUsers = createAsyncThunk('authers/fetchAuthors', async () => {
  const res = await axios.get('/library/users.json')
  return res.data
})

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: InitialStateUsers = {
  users: [],
  isLoading: false,
  error: null,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUser: (state, action: PayloadAction<Users>) => {
      const removeBook = state.users.filter((user) => user.id !== action.payload.id)
      state.users = removeBook
    },
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        ;(state.isLoading = false), (state.users = action.payload)
        console.log(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message || 'An error occured')
      })
  }
})

export const { login, logout, removeUser } = usersSlice.actions

export default usersSlice.reducer
