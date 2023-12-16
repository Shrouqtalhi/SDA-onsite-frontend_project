import { useState } from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { FaHandHoldingDollar } from 'react-icons/fa6'

import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { AppDispatch } from '../redux/store'
import { usersThunk, logout } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { BsPencilSquare } from 'react-icons/bs'

export default function AdminSidebar() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const handleClick = (icon: string) => {
    setActiveButton(icon)
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(usersThunk())
    // localStorage.removeItem('token')
    // localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="sidebar">
      <Link to="/admin/books">
        <FaHome
          className={activeButton === 'book' ? 'active' : ''}
          onClick={() => handleClick('book')}
        />
      </Link>
      <Link to="/admin/authors">
        <BsPencilSquare
          className={activeButton === 'author' ? 'active' : ''}
          onClick={() => handleClick('author')}
        />
      </Link>

      <Link to="/admin/borrows">
        <FaHandHoldingDollar
          className={activeButton === 'borrow' ? 'active' : ''}
          onClick={() => handleClick('borrow')}
        />
      </Link>
      <Link to="/admin/users">
        <FaUser
          className={activeButton === 'users' ? 'active' : ''}
          onClick={() => handleClick('users')}
        />
      </Link>
      <HiOutlineLogout
        className={activeButton === 'logout' ? 'active' : ''}
        onClick={() => {
          handleLogout()
        }}
      />
    </nav>
  )
}
