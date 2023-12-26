import axios from 'axios'
import { getToken } from '../utils/token'

const BASE_URL = import.meta.env.VITE_BACKEND_ORIGIN || 'http://localhost:5002'
const api = axios.create({
  baseURL: BASE_URL
})

const token = getToken()
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
