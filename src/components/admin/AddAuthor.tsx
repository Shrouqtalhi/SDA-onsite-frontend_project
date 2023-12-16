import { useNavigate } from 'react-router'
import { Author } from '../type/type'
import { useDispatch } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'
import { addAuthor } from '../redux/slices/authorsSlice'

const initValue: Author = {
  _id: '',
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
      _id: add._id,
      name: add.name
    }
    dispatch(addAuthor(newAuthor))
    navigate('/admin/authors')
  }
  return (
    <>
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
    </>
  )
}
