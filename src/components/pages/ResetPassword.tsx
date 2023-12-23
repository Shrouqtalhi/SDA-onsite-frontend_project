import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { clearError } from '../redux/slices/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router'
import api from '../../api'
import { AxiosError } from 'axios'

export default function ResetPassword() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [credentials, setCredentials] = useState({
    password: '',
    confirmedPassword: ''
  })
  const [isMatch, setIsMatch] = useState(true)

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { password, confirmedPassword } = credentials
    console.log(credentials)
    console.log(params.forgotPasswordCode)
    try {
      if (password !== confirmedPassword) {
        setIsMatch(false)
        return
      }

      const res = await api.post('/api/users/reset-password', {
        password: credentials.password,
        forgotPasswordCode: params.forgotPasswordCode
      })
      console.log(res)
      if (res.status === 200) {
        navigate('/login')
      }
      setSuccessMessage(res.data.msg)
      setErrorMessage(null)
      setIsMatch(true)
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.msg[0].message)
        return error.response?.data.msg[0].message || error.response?.data.msg
      }
    }
  }

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Reset Password:</h2>
        <label htmlFor="email" className="form-lable">
          Password:
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handeInputChange}
        />
        <label htmlFor="password" className="form-lable">
          Confirm Password:
        </label>
        <input
          type="password"
          placeholder="Confirmed Password"
          id="confirmedPassword"
          name="confirmedPassword"
          value={credentials.confirmedPassword}
          onChange={handeInputChange}
        />
        <button className="add-btn" type="submit">
          Reset
        </button>
        {!isMatch && <p style={{ color: 'red' }}>Password did not match</p>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </form>
    </div>
  )
}
