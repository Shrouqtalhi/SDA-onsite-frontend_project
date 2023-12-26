import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Author } from '../../types/type'
import { fetchAuthors, updateAuthorThunk } from '../redux/slices/authorsSlice'

export default function EditAuthor() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { authors } = useSelector((state: RootState) => state.authors)
  const authorState = useSelector((state: RootState) => state.authors)
  const author = authors.find((author) => author._id === params.id)
  const [update, setUpdate] = useState<Author | undefined>(author)

  useEffect(() => {
    if (authors.length === 0) {
      const handleGetAuthors = async () => {
        const action = await dispatch(fetchAuthors())
        const author = action.payload.find((author: Author) => author._id === params.id)
        setUpdate(author)
      }
      handleGetAuthors()
    }
  }, [])
  if (!update) {
    return <p>Author Not found</p>
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdate({ ...update, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (params.id) {
      const res = await dispatch(updateAuthorThunk({ id: params.id, updatedAuthor: update }))
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/admin/authors')
      }
    }
  }

  return (
    <>
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
        {authorState.error && <p style={{ color: 'red' }}>{authorState.error}</p>}
      </form>
    </>
  )
}
