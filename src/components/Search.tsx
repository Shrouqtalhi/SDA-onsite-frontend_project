import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Link, SetURLSearchParams } from 'react-router-dom'
import { AppDispatch } from './redux/store'
import { fetchBooks, getBooksRequestThunk } from './redux/slices/bookSlice'

type Props = {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
}

export default function Search({ searchParams, setSearchParams }: Props) {
  const dispatch: AppDispatch = useDispatch()

  const title = searchParams.get('title') || ''

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchParams.set('title', e.target.value)
    setSearchParams(searchParams)
    dispatch(getBooksRequestThunk(searchParams.toString()))
  }

  const handleGetAllBooks = () => {
    dispatch(fetchBooks())
  }

  return (
    <div className="search-filter-bar">
      <div className="search-input">
        <p>Search:</p>
        <input type="search" value={title} onChange={handleSearch} placeholder="Search here" />
      </div>

      <div className="user-btn">
        <Link to="/user/available-book">
          <button className="more-dtl-btn">Available Books</button>
        </Link>
        <Link to="/user/books">
          <button className="borrow-btn" onClick={() => handleGetAllBooks()}>
            All
          </button>
        </Link>
      </div>
    </div>
  )
}
