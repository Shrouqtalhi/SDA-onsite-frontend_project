import { ChangeEvent, FormEvent, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { Book } from '../type/type'
import { updatedBook } from '../redux/slices/bookSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

export default function EditBook() {
  const { books } = useSelector((state: RootState) => state.books)
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const book = books.find((book) => book.id === Number(params.id))
  const [updateBook, setUpdateBook] = useState<Book>(book as Book)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdateBook({ ...updateBook, [name]: value })
    return
  }

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdateBook({ ...updateBook, [name]: Number(value) })

    return
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(updatedBook(updateBook))
    navigate('/admin/books')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Edit Book..</h2>

        <label htmlFor="title" className="form-lable">
          Book Title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={updateBook?.title}
          onChange={handleChange}
        />

        <label htmlFor="discription" className="form-lable">
          Book Discription:
        </label>
        <input
          type="text"
          name="description"
          placeholder="Book Description"
          value={updateBook?.description}
          onChange={handleChange}
        />

        <label htmlFor="discription" className="form-lable">
          Book Copies:
        </label>

        <input
          type="number"
          name="bookCopiesQty"
          placeholder="bookCopiesQty"
          value={updateBook?.bookCopiesQty}
          onChange={handleChangeNumber}
        />

        <label htmlFor="image" className="form-lable">
          Image URL:
        </label>
        <div>
          <input type="text" name="image" id="image" onChange={handleChange} />
        </div>

        <button type="submit" className="add-btn">
          Edit Book
        </button>
      </form>
    </>
  )
}
