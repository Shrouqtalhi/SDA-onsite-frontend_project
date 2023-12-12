import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { addUser, fetchUsersRegister } from '../redux/slices/userSlice'
import { AppDispatch } from '../redux/store'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'

export default function Register() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const initState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    block: false
  }
  const [credentials, setCredentials] = useState(initState)
  const [error, setError] = useState<null | string>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((users) => {
      return { ...users, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // const newUser = { id: new Date().getTime(), ...user }
    try {
      const newUser = { ...credentials }

      dispatch(fetchUsersRegister(credentials)).then(() => dispatch(addUser(newUser)))
      setCredentials(initState)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        setError(error.response?.data.msg)
      }
      setError('somthing went wrong')
    }
    // navigate('/login')
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
      </form>
    </div>
  )
}
