import { useNavigate } from 'react-router'
import { Author } from '../../types/type'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'
import { createAuthor } from '../redux/slices/authorsSlice'
import { AppDispatch, RootState } from '../redux/store'

const initValue: Author = {
  _id: '',
  name: ''
}
export default function AddAuthor() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const author = useSelector((state: RootState) => state.authors)
  console.log(author)
  const [add, setAdd] = useState<Author>(initValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: value })
  }
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()

      const newAuthor = {
        _id: add._id,
        name: add.name
      }
      const res = await dispatch(createAuthor(newAuthor))
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/admin/authors')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="add-form">
        <h2>New Author</h2>
        <label htmlFor="name" className="form-lable">
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
        {author.error && <p style={{ color: 'red' }}>{author.error}</p>}
      </form>
    </>
  )
}
