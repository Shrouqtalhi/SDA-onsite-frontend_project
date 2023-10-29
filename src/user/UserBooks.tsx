import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { BsEyeglasses } from 'react-icons/bs'
import { fetchBooks } from '../redux/slices/bookSlice'
import { Link } from 'react-router-dom'
import UserSidebar from './UserSidebar'
import Search from '../components/Search'

export default function UserBooks() {
  const dispatch = useDispatch<AppDispatch>()
  const { books, isLoading, error, search } = useSelector((state: RootState) => state.books)

  const { authors } = useSelector((state: RootState) => state.authors)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  // Search
  const filteredBooks = search
    ? books.filter((book) => {
        const author = authors.find((author) => author.id === book.authorId)
        return (
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          (author && author.name.toLowerCase().includes(search.toLowerCase()))
        )
      })
    : books
  console.log(filteredBooks)

  return (
    <>
      <Search />
      <div className="main">
        <UserSidebar />
        {isLoading && <h3> Loading products...</h3>}
        {error && <h3> {error}</h3>}
        <ul className="books">
          {filteredBooks.length > 0 &&
            filteredBooks.map((book) => (
              <li key={book.id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
                <img src={book.image} alt={book.title} />
                <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
                <div className="user-btn">
                  <Link to={`/book/${book.id}`}>
                    <button className="more-dtl-btn">
                      <GiBookCover />
                    </button>
                  </Link>
                  <Link to="/dashboard/user/borrows">
                    <button className="borrow-btn">
                      <BsEyeglasses />
                    </button>
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}
