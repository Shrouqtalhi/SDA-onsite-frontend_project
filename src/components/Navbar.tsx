import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { TbUserSquare } from 'react-icons/tb'
import { BiLogInCircle, BiSolidBookAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { FaUserTie } from 'react-icons/fa'
import { ROLES } from '../constants'

export default function Navbar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)

  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleClick = (icon: string) => {
    setActiveButton(icon)
  }
  const isAdmin = isLoggedIn && userData?.role === ROLES.ADMIN

  if (isAdmin) {
    return null
  }

  return (
    <nav className="navbar">
      {isLoggedIn ? (
        <Link
          to={`/${userData?.role}/books`}
          className={` ${isLoggedIn ? 'active' : ''}`}
          onClick={() => handleClick('dashboard')}>
          <FaUserTie /> {userData?.firstName} {userData?.lastName}
        </Link>
      ) : (
        <>
          <Link
            to="/contact"
            className={activeButton === 'contact' ? 'active' : ''}
            onClick={() => handleClick('contact')}>
            <span>
              <MdEmail />
              Contact Us
            </span>
          </Link>
          <Link
            to="/"
            className={activeButton === 'home' ? 'active' : ''}
            onClick={() => handleClick('home')}>
            <span>
              <BiSolidBookAlt />
              Books
            </span>
          </Link>
          <Link
            to={`/login`}
            className={activeButton === 'login' ? 'active' : ''}
            onClick={() => handleClick('login')}>
            <span>
              <BiLogInCircle />
              Login
            </span>
          </Link>

          <Link
            to="/register"
            className={activeButton === 'register' ? 'active' : ''}
            onClick={() => handleClick('register')}>
            <span>
              <TbUserSquare />
              Register
            </span>
          </Link>
        </>
      )}
    </nav>
  )
}
