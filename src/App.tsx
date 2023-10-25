import './App.css'
import Header from './components/Header'
import UsePage from './components/UserPage'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import BookById from './components/BookById'

export default function App() {
  return (
    <div className="container">
      <Header />
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UsePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:id" element={<BookById />} />
        </Routes>
      </div>
    </div>
  )
}
