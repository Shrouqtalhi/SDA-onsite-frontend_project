import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { fetchBooks, getBookPaginatedThunk } from '../redux/slices/bookSlice'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Search from '../Search'
import { BsEyeglasses } from 'react-icons/bs'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { books, isLoading, error, search } = useSelector((state: RootState) => state.books)
  const { authors } = useSelector((state: RootState) => state.authors)
  const [pagination, setPagination] = useState({
    page: 0,
    totalPage: 0
  })

  const page = searchParams.get('page') || 1
  const totalPages = pagination.totalPage

  const handelBooksPagination = async () => {
    try {
      const action = await dispatch(getBookPaginatedThunk(1))
      setPagination({ page: action.payload.page, totalPage: action.payload.totalPage })
      setSearchParams({ page: page.toString() })
    } catch (error) {
      console.log(error)
    }
  }
  const handelBooksPaginationByPage = async (pageNumber: number) => {
    try {
      const action = await dispatch(getBookPaginatedThunk(pageNumber))
      setPagination({ page: action.payload.page, totalPage: action.payload.totalPage })
      setSearchParams({ page: pageNumber.toString() })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks())
    }
    handelBooksPagination()
  }, [dispatch])

  const filteredBooks = search
    ? books.filter((book) => {
        return book.title.toLowerCase().includes(search.toLowerCase())
      })
    : books

  return (
    <>
      <div className="books-dtl">
        <Search />
        {isLoading && <h3> Loading Books...</h3>}
        {error && <h3> {error}</h3>}
        <ul className="books">
          {filteredBooks.map((book) => (
            <li key={book._id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
              <img src={book.image} alt={book.title} />
              <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
              <div className="user-btn">
                <Link to={`/book/${book._id}`}>
                  <button className="more-dtl-btn">
                    <GiBookCover />
                  </button>
                </Link>
                {book.isAvailable && (
                  <button className="borrow-btn" onClick={() => navigate('/login')}>
                    <BsEyeglasses />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination-button">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              className="pagination-button"
              key={pageNumber}
              onClick={() => handelBooksPaginationByPage(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
