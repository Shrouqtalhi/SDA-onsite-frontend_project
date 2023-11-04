import { useState } from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { AppDispatch } from '../redux/store'
import { fetchUsers, logout } from '../redux/slices/userSlice'
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
    dispatch(fetchUsers())
    navigate('/login')
  }

  return (
    <nav className="sidebar">
      <Link to="/dashboard/admin">
        <FaHome
          className={activeButton === 'book' ? 'active' : ''}
          onClick={() => handleClick('book')}
        />
      </Link>
      <Link to="/dashboard/admin/authors">
        <BsPencilSquare
          className={activeButton === 'author' ? 'active' : ''}
          onClick={() => handleClick('author')}
        />
      </Link>

      <Link to="/dashboard/admin/borrows">
        <FaUser
          className={activeButton === 'borrow' ? 'active' : ''}
          onClick={() => handleClick('borrow')}
        />
      </Link>
      <Link to="/dashboard/admin/users">
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
