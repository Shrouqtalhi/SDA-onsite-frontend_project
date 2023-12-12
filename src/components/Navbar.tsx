import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { TbUserSquare } from 'react-icons/tb'
import { BiLogInCircle, BiSolidBookAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { FaUserTie } from 'react-icons/fa'

export default function Navbar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)

  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleClick = (icon: string) => {
    setActiveButton(icon)
  }
  if (!isLoggedIn || (isLoggedIn && userData?.role !== 'admin')) {
    return (
      <nav className="navbar">
        {!isLoggedIn && (
          <>
            <Link
              to="/contact"
              className={activeButton === 'contact' ? 'active' : ''}
              onClick={() => handleClick('contact')}>
              <MdEmail />
              Contact Us
            </Link>
            <Link
              to="/"
              className={activeButton === 'home' ? 'active' : ''}
              onClick={() => handleClick('home')}>
              <BiSolidBookAlt />
              Books
            </Link>
            <Link
              to={`/login`}
              className={activeButton === 'login' ? 'active' : ''}
              onClick={() => handleClick('login')}>
              <BiLogInCircle />
              Login
            </Link>

            <Link
              to="/register"
              className={activeButton === 'register' ? 'active' : ''}
              onClick={() => handleClick('register')}>
              <TbUserSquare />
              Register
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Link
            to={`/${userData?.role}/books`}
            className={activeButton === 'dashboard' ? 'active' : ''}
            onClick={() => handleClick('dashboard')}>
            <FaUserTie />
            {userData?.role}
          </Link>
        )}
      </nav>
    )
  }
  return null
}
