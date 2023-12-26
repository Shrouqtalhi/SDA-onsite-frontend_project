import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router'
import Login from '../pages/Login'
import { ROLES } from '../../constants'

export const AdminRoute = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  const isAdmin = userData?.role === ROLES.ADMIN
  return isLoggedIn && isAdmin ? <Outlet /> : <Login />
}
