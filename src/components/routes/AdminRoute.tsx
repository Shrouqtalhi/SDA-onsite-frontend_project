import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useLocation } from 'react-router'
import Login from '../Login'

export const AdminRoute = () => {
  const location = useLocation()

  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  return isLoggedIn && userData?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Login pathName={location.pathname} />
  )
}
