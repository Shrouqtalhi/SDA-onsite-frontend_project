import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../types/type-guards'

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decodedUser = jwt_decode(token)
    if (!isDecodedUser(decodedUser)) return null

    return decodedUser
  } catch (error) {
    return null
  }
}

export function getToken() {
  const token = localStorage.getItem('token')
  if (!token) return null
  return token
}

export function getUserFromLocalStorage() {
  const user = localStorage.getItem('user')
  if (!user) return null
  return user
}
