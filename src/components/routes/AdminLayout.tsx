import { Route, Routes } from 'react-router-dom'
import AdminSidebar from '../admin/AdminSidebar'
import AdminBooks from '../admin/AdminBooks'
import UsersList from '../admin/UsersList'
import Authors from '../admin/AuthorsList'
import AddAuthor from '../admin/AddAuthor'
import EditAuthor from '../admin/EditAuthor'
import AddBook from '../admin/AddBook'
import EditBook from '../admin/EditBook'
import BorrowsList from '../admin/BorrowsList'
import EditUser from '../admin/EditUser'

const AdminLayout = () => {
  return (
    <div className="main">
      <AdminSidebar />
      <Routes>
        <Route path="books" element={<AdminBooks />} />
        <Route path="users" element={<UsersList />} />
        <Route path="authors" element={<Authors />} />
        <Route path="add-author" element={<AddAuthor />} />
        <Route path="edit-author/:id" element={<EditAuthor />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path="add-book" element={<AddBook />} />
        <Route path="edit/:id" element={<EditBook />} />
        <Route path="borrows" element={<BorrowsList />} />
      </Routes>
    </div>
  )
}

export default AdminLayout
