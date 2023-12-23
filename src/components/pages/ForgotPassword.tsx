import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import { AxiosError } from 'axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/api/users/forgot-password', { email })
      if (res.status === 200) {
        setMessage(res.data.msg)
        setError(null)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.msg[0].message)
        return error.response?.data.msg[0].message || error.response?.data.msg
      }
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="add-form">
        <h3>Forgot Password:</h3>

        <label htmlFor="email" className="form-lable">
          Email:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">
          Submit
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </form>
    </div>
  )
}
