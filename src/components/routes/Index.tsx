import { Route, Routes } from 'react-router-dom'
import Login from '../Login'
import BookDetails from '../pages/BookDetails'
import AdminDashbord from '../pages/AdminDashbord'
import Authors from '../admin/AuthorsList'
import Error from '../pages/Error'
import UserDashbord from '../pages/UserDashbord'
import Borrow from '../admin/AdminBorrows'
import UserProfile from '../pages/UserProfile'
import AdminBorrows from '../admin/AdminBorrows'
import UsersList from '../admin/UsersList'
import AdminBooks from '../admin/AdminBooks'
import UserBooks from '../user/UserBooks'
import AddBook from '../admin/AddBook'
import EditBook from '../admin/EditBook'
import { UserRoute } from './UserRoute'
import { AdminRoute } from './AdminRoute'
import Books from '../pages/Home'
import Register from '../pages/Register'
import UserBorrows from '../user/UserBorrows'
import FilterByStatus from '../FilterByStatus'
export default function Index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/book/:id" element={<BookDetails />} />

        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserBooks />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/borrows" element={<Borrow />} />
          <Route path="user/borrowbook" element={<UserBorrows />} />
          <Route path="user/books" element={<UserBooks />} />
          <Route path="user/available-book" element={<FilterByStatus />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          {/* <Route path="admin" element={<AdminDashbord />} /> */}
          <Route path="admin/authors" element={<Authors />} />
          <Route path="admin/add-book" element={<AddBook />} />
          <Route path="admin" element={<AdminBooks />} />
          <Route path="admin/edit" element={<EditBook />} />
          <Route path="admin/borrows" element={<AdminBorrows />} />
          <Route path="admin/users" element={<UsersList />} />
        </Route>

        <Route path="/login" element={<Login pathName={`/`} />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/borrow" element={<Borrow />} /> */}

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}
