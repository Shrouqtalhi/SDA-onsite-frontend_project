import { ChangeEvent, FormEvent, useState } from 'react'
import { addBook } from '../redux/slices/bookSlice'
import AdminSidebar from './AdminSidebar'
import { Book } from '../type/type'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
const initValue: Book = {
  id: 0,
  image: '',
  title: '',
  description: '',
  authorId: 0,
  isAvailable: true,
  bookCopiesQty: 0
}

export default function AddBook() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [add, setAdd] = useState<Book>(initValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: value })
  }

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: Number(value) })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newBook = {
      id: new Date().getTime(),
      authorId: 0,
      title: add.title,
      description: add.description,
      bookCopiesQty: add.bookCopiesQty,
      isAvailable: true,
      image: add.image
    }

    dispatch(addBook(newBook))
    setAdd(initValue)
    navigate('/dashboard/admin')
  }
  return (
    <div className="main">
      <AdminSidebar />
      <form onSubmit={handleSubmit} className="add-form">
        <h2>New Book</h2>

        <label htmlFor="title" className="form-lable">
          Book Title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={add.title}
          onChange={handleChange}
        />

        <label htmlFor="discription" className="form-lable">
          Book Discription:
        </label>
        <input
          type="text"
          name="description"
          placeholder="Book Description"
          value={add.description}
          onChange={handleChange}
        />

        <label htmlFor="discription" className="form-lable">
          Book Copies:
        </label>

        <input
          type="number"
          name="bookCopiesQty"
          placeholder="bookCopiesQty"
          value={add.bookCopiesQty}
          onChange={handleChangeNumber}
        />

        <label htmlFor="image" className="form-lable">
          Image URL:
        </label>
        <div>
          <input type="text" name="image" id="image" value={add.image} onChange={handleChange} />
        </div>
        <button type="submit" className="add-btn">
          Add Book
        </button>
      </form>
    </div>
  )
}
