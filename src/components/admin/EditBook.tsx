import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Book } from '../../types/type'
import { fetchBookById, updateBookThunk } from '../redux/slices/bookSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { fetchAuthors } from '../redux/slices/authorsSlice'

export default function EditBook() {
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const { books } = useSelector((state: RootState) => state.books)
  const { authors } = useSelector((state: RootState) => state.authors)
  const navigate = useNavigate()
  const book = books.find((book) => book._id === params.id)
  const [updateBook, setUpdateBook] = useState<Book | undefined>(book)
  console.log(updateBook)
  useEffect(() => {
    if (books.length === 0) {
      const handleGetBooks = async () => {
        if (params.id) {
          const action = await dispatch(fetchBookById(params.id))
          await dispatch(fetchAuthors())
          setUpdateBook(action.payload)
        }
      }
      handleGetBooks()
    }
  }, [])

  if (!updateBook) {
    return <p>Book not found</p>
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'author') {
      setUpdateBook({ ...updateBook, authorId: [value] })
      return
    }
    setUpdateBook({ ...updateBook, [name]: value })
  }

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdateBook({ ...updateBook, [name]: Number(value) })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (params.id) {
      dispatch(updateBookThunk({ bookId: params.id, updatedBook: updateBook }))
      navigate('/admin/books')
    }
  }
  console.log(updateBook.authorId)
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
          value={updateBook.title}
          onChange={handleChange}
        />

        <label htmlFor="discription" className="form-lable">
          Book Discription:
        </label>
        <input
          type="text"
          name="description"
          placeholder="Book Description"
          value={updateBook.description}
          onChange={handleChange}
        />

        <label htmlFor="discription" className="form-lable">
          Book Copies:
        </label>

        <input
          type="number"
          name="bookCopiesQty"
          placeholder="bookCopiesQty"
          value={updateBook.bookCopiesQty}
          onChange={handleChangeNumber}
        />

        <label htmlFor="discription" className="form-lable">
          Price:
        </label>

        <input
          type="number"
          name="price"
          placeholder="price"
          value={updateBook.price}
          onChange={handleChangeNumber}
        />

        <label htmlFor="author-lisr" className="form-lable">
          Authors List:
        </label>
        <select
          className="authors-list"
          name="author"
          title="author"
          onChange={handleChange}
          value={updateBook.authorId[0]}>
          <option>Select Author</option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.name}
            </option>
          ))}
        </select>
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
