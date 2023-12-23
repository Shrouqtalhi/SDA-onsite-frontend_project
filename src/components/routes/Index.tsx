import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import BookDetails from '../pages/BookDetails'
import Error from '../pages/Error'
import { UserRoute } from './UserRoute'
import { AdminRoute } from './AdminRoute'
import Home from '../pages/Home'
import Register from '../pages/Register'
import FilterByStatus from '../FilterByStatus'
import ContactUs from '../pages/ContactUs'
import Navbar from '../Navbar'
import AdminLayout from './AdminLayout'
import UserLayout from './UserLayout'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'

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

        {/* <Route path="/dashboard" element={<UserRoute />}> */}
        <Route path="/user/*" element={<UserLayout />} />
        {/* </Route> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/available-book" element={<FilterByStatus />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:forgotPasswordCode" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}
