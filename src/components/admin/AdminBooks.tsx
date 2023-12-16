import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { PiBooksFill, PiNotePencilBold } from 'react-icons/pi'
import { deleteBook, fetchBooks } from '../redux/slices/bookSlice'
import { Link } from 'react-router-dom'
import { TbHttpDelete } from 'react-icons/tb'

export default function AdminBooks() {
  const dispatch = useDispatch<AppDispatch>()
  const { books, isLoading, error } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks())
    }
  }, [dispatch])

  const handleBookDelete = (id: string) => {
    dispatch(deleteBook(id))
  }

  return (
    <>
      {isLoading && <h3> Loading Books...</h3>}
      {error && <h3> {error}</h3>}

      <div className="books-dtl">
        <h2>
          <PiBooksFill />
          Books..
        </h2>
        <Link to="/admin/add-book">
          <button className="add-new-book">+ Add Book</button>
        </Link>
        <ul className="books">
          {books.length > 0 &&
            books.map((book) => (
              <li key={book._id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
                <img src={book.image} alt={book.title} />
                <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
                <div className="user-btn">
                  <Link to={`/book/${book._id}`}>
                    <button className="more-dtl-btn">
                      <GiBookCover />
                    </button>
                  </Link>
                  <Link to={`/admin/edit/${book._id}`}>
                    <button className="borrow-btn">
                      <PiNotePencilBold />
                    </button>
                  </Link>
                  <button
                    className="delete"
                    onClick={() => {
                      handleBookDelete(book._id)
                    }}>
                    <label htmlFor="my-btn" title="delete">
                      <TbHttpDelete />
                    </label>
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}
