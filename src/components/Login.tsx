import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, login } from '../redux/slices/userSlice'
import UserSidebar from '../user/UserSidebar'
import { useNavigate } from 'react-router'
import Sidebar from './Navbar'

export default function Login({ pathName }: { pathName: string }) {
  const navigate = useNavigate()
  const { users } = useSelector((state: RootState) => state.users)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((state) => {
      return { ...state, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      console.log(user)
      const foundUser = users.find((userData) => userData.email === user.email)
      if (foundUser && foundUser.password === user.password) {
        dispatch(login(foundUser))
        navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
      } else {
        console.log('Something wrong with email or password ')
      }
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <div>
      <Sidebar />
      <form className="books" onSubmit={handleSubmit}>
        <div className="login">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handeInputChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="pasword"
            id="password"
            name="password"
            value={user.password}
            onChange={handeInputChange}
          />
          <button className="more-dtl-btn" type="submit">
            Login
          </button>
          <span>
            Create Account <a>Register now</a>
          </span>
        </div>
      </form>
    </div>
  )
}
