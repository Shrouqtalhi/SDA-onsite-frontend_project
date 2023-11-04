import { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { BiSolidBookAlt } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { logout } from '../redux/slices/userSlice'
import { AiOutlineProfile } from 'react-icons/ai'

export default function UserSidebar() {
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const handleClick = (icon: string) => {
    setActiveButton(icon)
  }

  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <nav className="sidebar">
      <Link to="/dashboard/user/profile">
        <AiOutlineProfile
          className={activeButton === 'profile' ? 'active' : ''}
          onClick={() => handleClick('profile')}
        />
      </Link>
      <Link to="/dashboard/user/books">
        <FaHome
          className={activeButton === 'books' ? 'active' : ''}
          onClick={() => handleClick('books')}
        />
      </Link>

      <Link to="/dashboard/user/borrow-details">
        <BiSolidBookAlt
          className={activeButton === 'borrow' ? 'active' : ''}
          onClick={() => handleClick('borrow')}
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
