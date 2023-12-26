import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { User } from '../../types/type'
import { updatedUser } from '../redux/slices/userSlice'

export default function EditUser() {
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { users } = useSelector((state: RootState) => state.users)
  const user = users.find((user) => user._id === params.id)
  const [update, setUpdate] = useState<User>(user as User)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdate({ ...update, [name]: value })
    return
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(updatedUser(update))
    navigate('/admin/users')
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit User..</h2>

        <label htmlFor="title" className="form-lable">
          User Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={update.email}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">
          Edit User
        </button>
      </form>
    </>
  )
}
