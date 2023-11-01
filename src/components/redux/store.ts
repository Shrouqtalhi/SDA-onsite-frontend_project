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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
