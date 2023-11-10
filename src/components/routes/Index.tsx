import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import BookDetails from '../pages/BookDetails'
import Error from '../pages/Error'
import UserProfile from '../user/UserProfile'
import UserBooks from '../user/UserBooks'
import { UserRoute } from './UserRoute'
import { AdminRoute } from './AdminRoute'
import Home from '../pages/Home'
import Register from '../pages/Register'
import UserBorrows from '../user/UserBorrows'
import FilterByStatus from '../FilterByStatus'
import BorrowDetails from '../user/BorrowDetails'
import ContactUs from '../pages/ContactUs'
import Navbar from '../Navbar'
import AdminLayout from './AdminLayout'

export default function Index() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>

        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserBooks />} />
          <Route path="user/profile" element={<UserProfile />} />
          {/* <Route path="user/borrows" element={<Borrow />} /> */}
          <Route path="user/borrow-details" element={<BorrowDetails />} />

          <Route path="user/borrowbook/:id" element={<UserBorrows />} />
          <Route path="user/books" element={<UserBooks />} />
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
