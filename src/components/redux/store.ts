import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './slices/bookSlice'
import authorsReducer from './slices/authorsSlice'
import userReducer from './slices/userSlice'
import borrowReducer from './slices/borrowSlice'

export const store = configureStore({
  reducer: {
    books: bookReducer,
    authors: authorsReducer,
    users: userReducer,
    borrows: borrowReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
