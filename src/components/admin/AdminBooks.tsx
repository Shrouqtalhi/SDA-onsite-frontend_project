import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { PiBooksFill, PiNotePencilBold } from 'react-icons/pi'
import { fetchBooks, removeBook } from '../redux/slices/bookSlice'
import { Link } from 'react-router-dom'
import { TbHttpDelete } from 'react-icons/tb'
import { Book } from '../type/type'

export default function AdminBooks() {
  const dispatch = useDispatch<AppDispatch>()
  const { books, isLoading, error } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks())
    }
  }, [dispatch])

  const handleBookDelete = (id: Book) => {
    dispatch(removeBook(id))
  }

  return (
    <>
      {isLoading && <h3> Loading Books...</h3>}
      {error && <h3> {error}</h3>}

      <div className="text-btn">
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
              <li key={book.id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
                <img src={book.image} alt={book.title} />
                <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
                <div className="user-btn">
                  <Link to={`/book/${book.id}`}>
                    <button className="more-dtl-btn">
                      <GiBookCover />
                    </button>
                  </Link>
                  <Link to={`/admin/edit/${book.id}`}>
                    <button className="borrow-btn">
                      <PiNotePencilBold />
                    </button>
                  </Link>
                  <button
                    className="delete"
                    onClick={() => {
                      handleBookDelete(book)
                    }}>
                    <label htmlFor="my-bton" title="delete">
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
