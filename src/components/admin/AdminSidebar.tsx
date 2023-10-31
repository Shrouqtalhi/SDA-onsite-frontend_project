import { useState } from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, logout } from '../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BsPencilSquare } from 'react-icons/bs'

export default function AdminSidebar() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { users } = useSelector((state: RootState) => state.users)
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
      {/* <div className="user-profile">
        {users.map((user) => (
          <>
            <h5>{user.firstName}</h5>
            <p>name</p>
            <p>email</p>
          </>
        ))}
      </div> */}

      <Link to="/dashboard/admin/books">
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

      {/* <Link to="/dashboard/admin/borrows">
        <FaUser
          className={activeButton === 'borrow' ? 'active' : ''}
          onClick={() => handleClick('borrow')}
        />
      </Link> */}
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
