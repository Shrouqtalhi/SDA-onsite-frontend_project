import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../pages/Login'
import BookDetails from '../pages/BookDetails'
import Error from '../pages/Error'
import { UserRoute } from './UserRoute'
import { AdminRoute } from './AdminRoute'
import Home from '../pages/Home'
import Register from '../pages/Register'
import ContactUs from '../pages/ContactUs'
import Navbar from '../Navbar'
import AdminLayout from './AdminLayout'
import UserLayout from './UserLayout'
import ResetPassword from '../pages/ResetPassword'
import ForgotPassword from '../pages/ForgotPassword'
import { getDecodedTokenFromStorage } from '../../utils/token'
import { useEffect, useState } from 'react'

export default function Index() {
  const navigate = useNavigate()
  const decodedToken = getDecodedTokenFromStorage()
  const [isTokenExpired, setIsTokenExpired] = useState(false)

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        console.log('Time Expired')
        setIsTokenExpired(true)
      }
    }
  }, [decodedToken])

  if (isTokenExpired) {
    // Toast your session is expired please login again
    // return <Login />
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>

        <Route path="/user" element={<UserRoute />}>
          <Route path="/user/*" element={<UserLayout />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:forgotPasswordCode" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}
