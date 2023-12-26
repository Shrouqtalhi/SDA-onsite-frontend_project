import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { clearError, usersLogin } from '../redux/slices/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ROLES } from '../../constants'

export default function Login() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const usersState = useSelector((state: RootState) => state.users)
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [])
  const handeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((state) => {
      return { ...state, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(usersLogin(credentials)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        const user = res.payload.user

        if (user.role === ROLES.ADMIN) {
          navigate(`/admin/books`)
        } else if (user.role === ROLES.USER) {
          navigate('/user/books')
        }
      }
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
            register now!
          </Link>
        </span>
        <span>
          <Link to="/forgot-password">Forgot Password?</Link>
        </span>
        {usersState.error && <p style={{ color: 'red' }}>{usersState.error}</p>}
      </form>
    </div>
  )
}
