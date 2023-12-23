import { ThunkDispatch } from '@reduxjs/toolkit'
import { fetchAuthors } from '../components/redux/slices/authorsSlice'
import { RootState } from '../components/redux/store'
import { ROLES } from '../constants'

export type DecodedUser = {
  userId: string
  email: string
  role: Role
  iat: number
  exp: number
}

export type Book = {
  _id: string
  image: string
  title: string
  description: string
  authorId: string
  isAvailable: boolean
  bookCopiesQty: number
  price: number //* new
}

export type BooksState = {
  originalBooks: Book[]
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

export type AuthorsState = {
  authors: Author[]
  isLoading: boolean
  error: string | null
  foundBook: Author | null
  search: string
}

export type Role = keyof typeof ROLES

export type User = {
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

export type UsersState = {
  users: User[]
  isLoading: boolean
  success: string | null
  error: string | null
  isLoggedIn: boolean
  // isAdmin: boolean
  // isActive: boolean
  // role: Role
  userData: User | null
  block: boolean
  foundUser: User | null
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
