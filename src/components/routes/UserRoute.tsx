import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet, useLocation } from 'react-router'
import Login from '../pages/Login'

export const UserRoute = () => {
  const location = useLocation()
  const { isLoggedIn } = useSelector((state: RootState) => state.users)
  return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />
}
