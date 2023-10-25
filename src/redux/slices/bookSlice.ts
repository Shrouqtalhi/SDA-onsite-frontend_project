import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
  isLodnig: boolean
  error: null
  foundBook: Book | null // Add this property
}

const initialState: InitialState = {
  books: [],
  isLodnig: false,
  error: null,
  foundBook: null
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    bookSuccess: (state) => {
      state.isLodnig = true
    },
    getBookData: (state, action: PayloadAction<Book[]>) => {
      state.isLodnig = false
      state.books = action.payload
      // console.log(action.payload);
    },
    // findData: (state, action) => {
    //   state.books.find()
    // }

    removeBook: (state, action: PayloadAction<Book>) => {
      const removeBook = state.books.filter((book) => book.id !== action.payload.id)
      state.books = removeBook
    },
    findBookById: (state, action: PayloadAction<number>) => {
      const bookId = action.payload
      const foundBook = state.books.find((book) => book.id === bookId)

      if (foundBook) {
        state.foundBook = foundBook
      } else {
        console.error(`Book with id ${bookId} not found`)
      }
    }
  }
})

export default bookSlice.reducer

export const { bookSuccess, getBookData, removeBook, findBookById } = bookSlice.actions
