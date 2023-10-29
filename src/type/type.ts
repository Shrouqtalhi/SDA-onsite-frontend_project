import { ThunkDispatch } from '@reduxjs/toolkit'
import { fetchAuthors } from '../redux/slices/authorsSlice'
import { RootState } from '../redux/store'

export type Book = {
  id: number
  image: string
  title: string
  description: string
  authorId: number
  isAvailable: boolean
  bookCopiesQty: number
}

export type InitialState = {
  books: Book[]
  isLoading: boolean
  error: null | string
  foundBook: Book | null
  search: string
}

export type Author = {
  id: number
  name: string
}

export type Users = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type InitialStateAuthors = {
  authors: Author[]
  isLoading: boolean
  error: string | null
  foundBook: Author | null
  search: string
}

export type InitialStateUsers = {
  users: Users[]
  isLoading: boolean
  error: string | null
  isLoggedIn: boolean
  userData: Users | null
}

export type fetchAuthersPendingAction = ReturnType<typeof fetchAuthors.pending>
export type fetchAuthersFullfilledAction = ReturnType<typeof fetchAuthors.fulfilled>
export type fetchAuthersRejectedAction = ReturnType<typeof fetchAuthors.rejected>

export type authersAction =
  | fetchAuthersPendingAction
  | fetchAuthersFullfilledAction
  | fetchAuthersRejectedAction

export type autherDispatch = ThunkDispatch<RootState, void, authersAction>
