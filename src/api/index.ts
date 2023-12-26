import axios from 'axios'
import { getToken } from '../utils/token'

const baseURL = process.env.BACKEND_ORIGIN
const api = axios.create({
  baseURL
})

const token = getToken()
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api
