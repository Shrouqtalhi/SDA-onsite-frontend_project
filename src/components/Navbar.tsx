import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { TbUserSquare } from 'react-icons/tb'
import { RxDashboard } from 'react-icons/rx'
import { BiLogInCircle, BiSolidBookAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

export default function Navbar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)

  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleClick = (icon: string) => {
    setActiveButton(icon)
  }
  return (
    <nav className="navbar">
      <Link to="/contact">
        <MdEmail
          className={activeButton === 'contact' ? 'active' : ''}
          onClick={() => handleClick('contact')}
        />
        Contact Us
      </Link>
      <Link to="/">
        <BiSolidBookAlt
          className={activeButton === 'home' ? 'active' : ''}
          onClick={() => handleClick('home')}
        />
        Books
      </Link>

      {!isLoggedIn && (
        <>
          <Link to={`/login`}>
            <BiLogInCircle
              className={activeButton === 'login' ? 'active' : ''}
              onClick={() => handleClick('login')}
            />
            Login
          </Link>

          <Link to="/register">
            <TbUserSquare
              className={activeButton === 'register' ? 'active' : ''}
              onClick={() => handleClick('register')}
            />
            Register
          </Link>
        </>
      )}
      {isLoggedIn && (
        <Link to={`/dashboard/${userData?.role}`}>
          <RxDashboard
            className={activeButton === 'dashboard' ? 'active' : ''}
            onClick={() => handleClick('dashboard')}
          />
          {userData?.role}
        </Link>
      )}
    </nav>
  )
}
