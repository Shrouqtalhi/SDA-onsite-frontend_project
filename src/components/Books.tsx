import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { BsEyeglasses } from 'react-icons/bs'
import { fetchBooks, searchBook } from '../redux/slices/bookSlice'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Books() {
  const dispatch = useDispatch<AppDispatch>()
  const { books, isLoading, error, search } = useSelector((state: RootState) => state.books)

  const { authors } = useSelector((state: RootState) => state.authors)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchBook(e.target.value))
  }

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  console.log(search)
  const filteredBooks = search
    ? books.filter((book) => {
        const matchingAuthor = authors.find((author) => author.id === book.authorId)
        return (
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          (matchingAuthor && matchingAuthor.name.toLowerCase().includes(search.toLowerCase()))
        )
      })
    : books
  console.log(filteredBooks)

  return (
    <>
      <Sidebar />
      <div className="search-input">
        <input
          type="text"
          placeholder="Search by book name"
          value={search}
          onChange={handleSearch}
        />
      </div>
      {isLoading && <h3> Loading Books...</h3>}
      {error && <h3> {error}</h3>}
      <ul className="books">
        {filteredBooks.map((book) => (
          <li key={book.id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
            <img src={book.image} alt={book.title} />
            <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
            <div className="user-btn">
              <Link to={`/book/${book.id}`}>
                <button className="more-dtl-btn">
                  <GiBookCover />
                </button>
              </Link>
              <Link to="/login">
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
