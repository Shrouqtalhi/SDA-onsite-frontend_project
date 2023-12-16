import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InitialStateUsers, Users } from '../../type/type'
import api from '../../../api'
import { AxiosError } from 'axios'
import { getToken, getUserFromLocalStorage } from '../../../utils/token'

type Credentials = {
  firstName: string
  lastName: string
  email: string
  password: string
}

// Get All users
export const usersThunk = createAsyncThunk('users/fetchusers', async () => {
  try {
    const res = await api.get('/api/users')
    return res.data.users
  } catch (error) {
    console.log(error)
  }
})

// Delete user by ID
export const deleteUser = createAsyncThunk('users/delete', async (id: string) => {
  try {
    await api.delete(`/api/users/${id}`)
    return id
  } catch (error) {
    console.log(error)
  }
})

// Register
export const usersRegister = createAsyncThunk(
  'users/register',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/register', credentials)
      return res.data
    } catch (error) {
      // console.log(error)
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Login
export const usersLogin = createAsyncThunk(
  'users/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/login', credentials)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

const isLoggedIn = getToken() ? true : false
const storedUser = getUserFromLocalStorage() ? JSON.parse(getUserFromLocalStorage() || '') : null

const initialState: InitialStateUsers = {
  users: [],
  isLoading: false,
  success: null,
  error: null,
  isLoggedIn: isLoggedIn,
  userData: storedUser,
  block: false,
  foundUser: {} as Users,
  borrowedBooks: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
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
      .addCase(usersRegister.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(usersRegister.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = action.payload.msg as string
      })
      .addCase(usersRegister.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
        state.error = (action.payload as string) || 'An error occured'
      })
      // .addCase(fetchUsersLogin.pending, (state) => {
      //   state.isLoading = true
      //   state.error = null
      // })
      .addCase(usersLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.foundUser = action.payload.user
        state.isLoggedIn = isLoggedIn
        state.userData = storedUser
      })
      .addCase(usersLogin.rejected, (state, action) => {
        state.isLoading = false
        // if(typeof(action.payload )=== )
        state.error = (action.payload as string) || 'An error occured'
        console.log('user slice error ', action.payload)
      })
      // .addCase(fetchUsers.pending, (state) => {
      //   state.isLoading = true
      //   state.error = null
      // })
      .addCase(usersThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      // .addCase(fetchUsers.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.error = action.error.message || 'An error occured'
      // })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        const userId = action.payload
        const updatedUsers = state.users.filter((user) => user._id !== userId)
        state.users = updatedUsers
        return state
      })
  }
})

export const { login, logout, blockUser, updatedUser, updateProfile } = usersSlice.actions

export default usersSlice.reducer
