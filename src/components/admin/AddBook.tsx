import { ChangeEvent, FormEvent, useState } from 'react'
import { createBook } from '../redux/slices/bookSlice'
import { Book } from '../../types/type'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
const initValue: Book = {
  _id: '',
  image: '',
  title: '',
  description: '',
  authorId: [],
  isAvailable: true,
  bookCopiesQty: 0,
  price: 0
}

export default function AddBook() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [add, setAdd] = useState<Book>(initValue)
  const books = useSelector((state: RootState) => state.books)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: value })
  }

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: Number(value) })
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const newBook = {
        _id: add._id,
        title: add.title,
        description: add.description,
        bookCopiesQty: add.bookCopiesQty,
        authorId: add.authorId,
        isAvailable: true,
        image: add.image,
        price: add.price
      }

      const res = await dispatch(createBook(newBook))
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/admin/books')
        setAdd(initValue)
      }
    } catch (error) {
      console.error('Error creating book:', error)
    } finally {
      setAdd(initValue)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="add-form">
        <h2>New Book</h2>

        <label htmlFor="title" className="form-lable">
          Book Title:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          value={add.title}
          onChange={handleChange}
        />

        <label htmlFor="description" className="form-lable">
          Book Description:
        </label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="Book Description"
          value={add.description}
          onChange={handleChange}
        />

        <label htmlFor="bookCopiesQty" className="form-lable">
          Book Copies:
        </label>

        <input
          id="bookCopiesQty"
          type="number"
          name="bookCopiesQty"
          placeholder="bookCopiesQty"
          value={add.bookCopiesQty}
          onChange={handleChangeNumber}
        />
        <label htmlFor="price" className="form-lable">
          Price:
        </label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="price"
          value={add.price}
          onChange={handleChangeNumber}
        />

        <label htmlFor="image" className="form-lable">
          Image URL:
        </label>
        <div>
          <input id="image" type="text" name="image" value={add.image} onChange={handleChange} />
        </div>
        <button type="submit" className="add-btn">
          Add Book
        </button>
        {books.error && <p style={{ color: 'red' }}>{books.error}</p>}
      </form>
    </>
  )
}
