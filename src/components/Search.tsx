import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from './redux/store'
import { fetchBooks, searchBook } from './redux/slices/bookSlice'

export default function Search() {
  const dispatch: AppDispatch = useDispatch()

  const { search } = useSelector((state: RootState) => state.books)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchBook(e.target.value))
  }

  const handleGetAllBooks = () => {
    dispatch(fetchBooks())
  }

  return (
    <div className="search-filter-bar">
      <div className="search-input">
        <p>Search:</p>
        <input type="search" value={search} onChange={handleSearch} placeholder="Search here" />
      </div>

      <div className="user-btn">
        <Link to="/available-book">
          <button className="more-dtl-btn">Available Books</button>
        </Link>
        <Link to="/">
          <button className="borrow-btn" onClick={() => handleGetAllBooks()}>
            All
          </button>
        </Link>
      </div>
    </div>
  )
}
