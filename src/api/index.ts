import axios from 'axios'
import { getToken } from '../utils/token'

const baseURL = process.env.BACKEND_ORIGIN
const api = axios.create({
  baseURL
})

const token = getToken()
axios.defaults.headers.Authorization = `Bearer ${token}`

export default api
