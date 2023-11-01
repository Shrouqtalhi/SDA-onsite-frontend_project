import { ChangeEvent, FormEvent, useState } from 'react'
import { addBook } from '../redux/slices/bookSlice'
import AdminSidebar from './AdminSidebar'
import { Book } from '../type/type'
import { updatedBook } from '../redux/slices/bookSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

export default function EditBook() {
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { books } = useSelector((state: RootState) => state.books)
  const book = books.find((book) => book.id === Number(params.id))
  const [updateBook, setUpdateBook] = useState<Book>(book)

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
    console.log('updateBook', updateBook)
    dispatch(updatedBook(updateBook))
    // navigate('/dashboard/admin')
  }

  return (
    <div className="main">
      <AdminSidebar />
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
    </div>
  )
}
