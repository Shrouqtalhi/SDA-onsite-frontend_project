import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { PiNotePencilBold } from 'react-icons/pi'

import { AppDispatch, RootState } from '../redux/store'
import { updateUserProfile } from '../redux/slices/userSlice'

export default function UserProfile() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { userData } = useSelector((state: RootState) => state.users)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  if (!userData) {
    navigate('/login')
    return null
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(updateUserProfile({ id: userData._id, updatedUser: user }))
    setIsOpen(false)
  }

  return (
    <div className="books-dtl">
      <div>
        <h2>
          Name: {userData?.firstName} {userData?.lastName}
        </h2>
        <p>Email: {userData?.email}</p>
        <div className="user-btn">
          <button className="borrow-btn" onClick={handleOpen}>
            <PiNotePencilBold />
          </button>
        </div>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <div className="book">
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
            <button className="add-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
