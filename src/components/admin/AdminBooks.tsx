import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { PiNotePencilBold } from 'react-icons/pi'
import { fetchBooks, removeBook } from '../redux/slices/bookSlice'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { TbHttpDelete } from 'react-icons/tb'
import { Book } from '../type/type'

export default function AdminBooks() {
  const dispatch = useDispatch<AppDispatch>()
  const { books, isLoading, error } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  const handleBookDelete = (id: Book) => {
    dispatch(removeBook(id))
  }

  return (
    <>
      <div className="add-new-book">
        <Link to="/dashboard/admin/add-book">
          <button>+ Add Book</button>
        </Link>
      </div>
      <div className="main">
        <AdminSidebar />
        {isLoading && <h3> Loading Books...</h3>}
        {error && <h3> {error}</h3>}
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
                  <Link to="/dashboard/admin/edit">
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
