import { ChangeEvent, FormEvent, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Author } from '../type/type'
import { updatedAuthor } from '../redux/slices/authorsSlice'

export default function EditAuthor() {
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { authors } = useSelector((state: RootState) => state.authors)
  const author = authors.find((author) => author.id === Number(params.id))
  const [update, setUpdate] = useState<Author>(author as Author)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdate({ ...update, [name]: value })
    return
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(updatedAuthor(update))
    navigate('/dashboard/admin/authors')
  }

  return (
    <div className="main">
      <AdminSidebar />
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit Author..</h2>

        <label htmlFor="title" className="form-lable">
          Author Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={update.name}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">
          Edit Author
        </button>
      </form>
    </div>
  )
}
