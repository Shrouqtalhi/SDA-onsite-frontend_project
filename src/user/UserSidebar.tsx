import { useState } from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { ImSearch } from 'react-icons/im'
import { BiSolidBookAlt } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { logout } from '../redux/slices/userSlice'

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
      {/* <div className="Admin-profile">
        <h5>User</h5>
        <p>name</p>
        <p>email</p>
      </div> */}
      <ImSearch
        className={activeButton === 'search' ? 'active' : ''}
        onClick={() => handleClick('search')}
      />
      <Link to="/dashboard/user/books">
        <FaHome
          className={activeButton === 'books' ? 'active' : ''}
          onClick={() => handleClick('books')}
        />
      </Link>

      <Link to="/dashboard/user/borrows">
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
