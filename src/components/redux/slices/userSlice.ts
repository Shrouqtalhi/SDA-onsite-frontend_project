import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InitialStateUsers, Users } from '../../type/type'
import api from '../../../api'
import { AxiosError } from 'axios'

type Credentials = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const fetchUsers = createAsyncThunk('users/fetchusers', async () => {
  const res = await api.get('/api/users')
  return res.data
})
export const fetchUsersRegister = createAsyncThunk(
  'users/register',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/register', credentials)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const fetchUsersLogin = createAsyncThunk(
  'users/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/login', credentials)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

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
        if (user._id === updatedUser._id) {
          return updatedUser
        }
        return user
      })
      state.users = updated
      return state
    },
    removeUser: (state, action: PayloadAction<Users>) => {
      const removeBook = state.users.filter((user) => user._id !== action.payload._id)
      state.users = removeBook
    },
    blockUser: (state, action: PayloadAction<Users>) => {
      const foundUser = state.users.find((user) => user._id === action.payload._id)
      if (foundUser) {
        foundUser.block = !foundUser.block
      }
    },
    updateProfile: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const foundUser = state.users.find((user) => user._id === id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
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
      .addCase(fetchUsersRegister.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsersRegister.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsersRegister.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occured'
      })
      .addCase(fetchUsersLogin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsersLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsersLogin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occured'
      })
  }
})

export const { login, logout, removeUser, blockUser, addUser, updatedUser, updateProfile } =
  usersSlice.actions

export default usersSlice.reducer
