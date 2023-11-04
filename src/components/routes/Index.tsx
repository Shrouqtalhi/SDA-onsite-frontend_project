import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import BookDetails from '../pages/BookDetails'
import Authors from '../admin/AuthorsList'
import Error from '../pages/Error'

import UserProfile from '../user/UserProfile'
import UsersList from '../admin/UsersList'
import AdminBooks from '../admin/AdminBooks'
import UserBooks from '../user/UserBooks'
import AddBook from '../admin/AddBook'
import EditBook from '../admin/EditBook'
import { UserRoute } from './UserRoute'
import { AdminRoute } from './AdminRoute'
import Home from '../pages/Home'
import Register from '../pages/Register'
import UserBorrows from '../user/UserBorrows'
import FilterByStatus from '../FilterByStatus'
import BorrowDetails from '../user/BorrowDetails'
import ContactUs from '../pages/ContactUs'
import EditAuthor from '../admin/EditAuthor'
import AddAuthor from '../admin/AddAuthor'
import BorrowsList from '../admin/BorrowsList'
export default function Index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />

        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserBooks />} />
          <Route path="user/profile" element={<UserProfile />} />
          {/* <Route path="user/borrows" element={<Borrow />} /> */}
          <Route path="user/borrow-details" element={<BorrowDetails />} />
          <Route path="user/borrowbook/:id" element={<UserBorrows />} />
          <Route path="user/books" element={<UserBooks />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminBooks />} />
          <Route path="admin/users" element={<UsersList />} />
          <Route path="admin/authors" element={<Authors />} />
          <Route path="admin/add-author" element={<AddAuthor />} />
          <Route path="admin/edit-author/:id" element={<EditAuthor />} />
          <Route path="admin/add-book" element={<AddBook />} />
          <Route path="admin/edit/:id" element={<EditBook />} />
          <Route path="admin/borrows" element={<BorrowsList />} />
        </Route>

        <Route path="/available-book" element={<FilterByStatus />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login pathName={`/`} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}
