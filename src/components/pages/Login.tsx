import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { fetchUsersLogin } from '../redux/slices/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'

export default function Login({ pathName }: { pathName: string }) {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const [error, setError] = useState<null | string>(null)
  const [success, setSuccess] = useState<null | string>(null)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const handeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((state) => {
      return { ...state, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      // const foundUser = users.find((userData) => userData.email === user.email)
      // if (!foundUser) {
      //   // console.log('Wrong Email or Password')
      //   return
      // }

      dispatch(fetchUsersLogin(credentials))

      // if (foundUser.password !== user.password) {
      //   console.log('Wrong Email or Password')
      //   return
      // }
      // if (foundUser.block) {
      //   console.log('Sorry You are Banned Please Contact Us')
      //   return
      // }

      // dispatch(login(foundUser))
      // if (foundUser.role === 'admin') {
      //   navigate(`/admin/books`)
      // } else {
      //   navigate(pathName ? pathName : `/${foundUser.role}`)
      // }
      setError(null)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        setError(error.response?.data.msg)
        setSuccess(null)
      }
    }
    setCredentials({
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
          value={credentials.email}
          onChange={handeInputChange}
        />
        <label htmlFor="password" className="form-lable">
          Password:
        </label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          value={credentials.password}
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
