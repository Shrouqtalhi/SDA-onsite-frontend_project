import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router'
import Login from '../pages/Login'

export const UserRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.users)
  return isLoggedIn ? <Outlet /> : <Login />
}
