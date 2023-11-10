import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, login } from '../redux/slices/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'

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
      const foundUser = users.find((userData) => userData.email === user.email)
      if (!foundUser) {
        console.log('Wrong Email or Password')
        return
      }
      if (foundUser.password !== user.password) {
        console.log('Wrong Email or Password')
        return
      }
      if (foundUser.block) {
        console.log('Sorry You are Banned Please Contact Us')
        return
      }

      dispatch(login(foundUser))
      navigate(pathName ? pathName : `/${foundUser.role}`)
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
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email" className="form-lable">
          Email:
        </label>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handeInputChange}
        />
        <label htmlFor="password" className="form-lable">
          Password:
        </label>
        <input
          type="password"
          placeholder="pasword"
          id="password"
          name="password"
          value={user.password}
          onChange={handeInputChange}
        />
        <button className="add-btn" type="submit">
          Login
        </button>
        <span>
          Create Account!{' '}
          <Link to="/register" style={{ color: '#d3ad7f' }}>
            register now
          </Link>
        </span>
      </form>
    </div>
  )
}
