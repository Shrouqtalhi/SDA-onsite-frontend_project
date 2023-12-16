import { useDispatch, useSelector } from 'react-redux'
import UserSidebar from './UserSidebar'
import { RootState } from '../redux/store'
import { PiNotePencilBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { ChangeEvent, FormEvent, useState } from 'react'
import { updateProfile } from '../redux/slices/userSlice'

export default function UserProfile() {
  const dispatch = useDispatch()
  const { userData } = useSelector((state: RootState) => state.users)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: [e.target.value] }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updateUserData = { id: userData?._id, ...user }

    dispatch(updateProfile(updateUserData))
  }
  return (
    <div className="books">
      <div>
        <p>ID: {userData?._id}</p>
        <h2>
          Name: {userData?.firstName} {userData?.lastName}
        </h2>
        <p>Email: {userData?.email}</p>
        <div className="user-btn">
          <Link to={`/user/profile`}>
            <button className="borrow-btn" onClick={handleOpen}>
              <PiNotePencilBold />
            </button>
          </Link>
        </div>
      </div>
      {isOpen && (
        <form action="" onSubmit={handleSubmit}>
          <div className="book">
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
            <button className="borrow-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
