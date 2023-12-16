import { ThunkDispatch } from '@reduxjs/toolkit'
import { fetchAuthors } from '../redux/slices/authorsSlice'
import { RootState } from '../redux/store'
import { ROLES } from '../../constants'

export type Book = {
  _id: string
  image: string
  title: string
  description: string
  authorId: number
  isAvailable: boolean
  bookCopiesQty: number
  price: number //* new
}

export type InitialState = {
  books: Book[]
  isLoading: boolean
  error: null | string
  foundBook: Book | null
  search: string
}

export type Author = {
  _id: string
  name: string
}

export type InitialStateAuthors = {
  authors: Author[]
  isLoading: boolean
  error: string | null
  foundBook: Author | null
  search: string
}

type Role = keyof typeof ROLES

export type Users = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
  block: boolean
}

export type Borrows = {
  _id: number
  borrowerId: number
  bookId: number
  borrowDate: string
  returnDate: null
  dueDate: string
}

export type InitialStateUsers = {
  users: Users[]
  isLoading: boolean
  success: string | null
  error: string | null
  isLoggedIn: boolean
  userData: Users | null
  block: boolean
  foundUser: Users | null
  borrowedBooks: Book[]
}

export type InitialStateBorrows = {
  borrows: Borrows[]
  borrowbooks: Book[]
  isLoading: boolean
  error: string | null
}

export type fetchAuthersPendingAction = ReturnType<typeof fetchAuthors.pending>
export type fetchAuthersFullfilledAction = ReturnType<typeof fetchAuthors.fulfilled>
export type fetchAuthersRejectedAction = ReturnType<typeof fetchAuthors.rejected>

export type authersAction =
  | fetchAuthersPendingAction
  | fetchAuthersFullfilledAction
  | fetchAuthersRejectedAction

export type autherDispatch = ThunkDispatch<RootState, void, authersAction>
