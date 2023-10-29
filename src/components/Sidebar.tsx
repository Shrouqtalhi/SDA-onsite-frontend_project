import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { ImSearch } from 'react-icons/im'
import { BiSolidBookAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function Sidebar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)

  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleClick = (icon: string) => {
    setActiveButton(icon)
  }
  return (
    <nav className="navbar">
      <ImSearch
        className={activeButton === 'search' ? 'active' : ''}
        onClick={() => handleClick('search')}
      />
      <Link to="/contact">
        <BiSolidBookAlt
          className={activeButton === 'contact' ? 'active' : ''}
          onClick={() => handleClick('contact')}
        />
      </Link>
      <Link to="/">
        <BiSolidBookAlt
          className={activeButton === 'home' ? 'active' : ''}
          onClick={() => handleClick('home')}
        />
      </Link>
      {!isLoggedIn && (
        <Link to={`/login`}>
          <FaUser
            className={activeButton === 'admin' ? 'active' : ''}
            onClick={() => handleClick('admin')}
          />
        </Link>
      )}
    </nav>
  )
}
