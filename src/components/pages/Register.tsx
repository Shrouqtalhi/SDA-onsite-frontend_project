import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, usersRegister } from '../redux/slices/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'

export default function Register() {
  const dispatch: AppDispatch = useDispatch()

  const initState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    block: false
  }
  const userState = useSelector((state: RootState) => state.users)
  console.log(userState)
  const [credentials, setCredentials] = useState(initState)
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((users) => {
      return { ...users, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(usersRegister(credentials))

    setCredentials(initState)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Register</h2>

        <label htmlFor="name" className="form-lable">
          FirstName:
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="FirstName"
          value={credentials.firstName}
          onChange={handleChange}
        />

        <label htmlFor="name" className="form-lable">
          LastName:
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="lastName"
          value={credentials.lastName}
          onChange={handleChange}
        />

        <label htmlFor="email" className="form-lable">
          Email:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="form-lable">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">
          Register
        </button>
        <span>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#d3ad7f' }}>
            Login
          </Link>
        </span>
        {userState.error && <p style={{ color: 'red' }}>{userState.error}</p>}
        {userState.success && <p style={{ color: 'green' }}>{userState.success}</p>}
      </form>
    </div>
  )
}
