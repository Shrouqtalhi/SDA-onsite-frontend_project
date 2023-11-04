import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { InitialStateUsers, Users } from '../../type/type'
export const fetchUsers = createAsyncThunk('users/fetchusers', async () => {
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
  userData: data.userData,
  block: false,
  foundUser: {} as Users,
  borrowedBooks: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    updatedUser: (state, action: PayloadAction<Users>) => {
      const updatedUser = action.payload
      const updated = state.users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser
        }
        return user
      })
      state.users = updated
      return state
    },
    removeUser: (state, action: PayloadAction<Users>) => {
      const removeBook = state.users.filter((user) => user.id !== action.payload.id)
      state.users = removeBook
    },
    blockUser: (state, action: PayloadAction<Users>) => {
      const foundUser = state.users.find((user) => user.id === action.payload.id)
      if (foundUser) {
        foundUser.block = !foundUser.block
      }
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
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message || 'An error occured')
      })
  }
})

export const { login, logout, removeUser, blockUser, addUser, updatedUser } = usersSlice.actions

export default usersSlice.reducer
