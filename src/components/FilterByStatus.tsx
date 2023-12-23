import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { fetchBooks, filterByStatus } from './redux/slices/bookSlice'
import { Link } from 'react-router-dom'
import { GiBookCover } from 'react-icons/gi'
import { BsEyeglasses } from 'react-icons/bs'
import Search from './Search'

export default function FilterByStatus() {
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, error, books, search } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    dispatch(fetchBooks()).then(() => {
      dispatch(filterByStatus({ isAvailable: true }))
    })
  }, [dispatch])

  const filteredBooks = search
    ? books.filter((book) => {
        return book.title.toLowerCase().includes(search.toLowerCase())
      })
    : books

  return (
    <>
      <Search />
      {isLoading && <h3> Loading products...</h3>}
      {error && <h3> {error}</h3>}
      <ul className="books">
        {filteredBooks.length > 0 &&
          filteredBooks.map((book) => (
            <li key={book._id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
              <img src={book.image} alt={book.title} />
              <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
              <div className="user-btn">
                <Link to={`/book/${book._id}`}>
                  <button className="more-dtl-btn">
                    <GiBookCover />
                  </button>
                </Link>
                <Link to="/user/borrows">
                  <button className="borrow-btn">
                    <BsEyeglasses />
                  </button>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}
