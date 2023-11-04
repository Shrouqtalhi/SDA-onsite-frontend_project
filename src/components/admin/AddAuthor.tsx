import { useNavigate } from 'react-router'
import { Author } from '../type/type'
import { useDispatch } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'
import { addAuthor } from '../redux/slices/authorsSlice'
import AdminSidebar from './AdminSidebar'

const initValue: Author = {
  id: 0,
  name: ''
}
export default function AddAuthor() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [add, setAdd] = useState<Author>(initValue)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: value })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newAuthor = {
      id: new Date().getTime(),
      name: add.name
    }
    dispatch(addAuthor(newAuthor))
    navigate('/dashboard/admin/authors')
  }
  return (
    <div className="main">
      <AdminSidebar />
      <form onSubmit={handleSubmit} className="add-form">
        <h2>New Author</h2>
        <label htmlFor="title" className="form-lable">
          Author Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={add.name}
          onChange={handleChange}
        />
        <button type="submit" className="add-btn">
          Add Author
        </button>
      </form>
    </div>
  )
}
