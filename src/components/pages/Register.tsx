import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { addUser, fetchUsers } from '../redux/slices/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

export default function Register() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  const initState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    block: false
  }
  const [user, setUser] = useState(initState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((users) => {
      return { ...users, [e.target.name]: [e.target.value] }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newUser = { id: new Date().getTime(), ...user }

    dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))

    console.log(newUser)
    setUser(initState)
    navigate('/login')
  }
  console.log(users)
  return (
    <div>
      <Navbar />
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
          value={user.firstName}
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
          value={user.lastName}
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
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="form-lable">
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          value={user.password}
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
