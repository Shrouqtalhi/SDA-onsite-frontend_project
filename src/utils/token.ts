export function getToken() {
  const token = localStorage.getItem('token')
  return token
}

export function getUserFromLocalStorage() {
  const token = localStorage.getItem('user')
  return token
}
