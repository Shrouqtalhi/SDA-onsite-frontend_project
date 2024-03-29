import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { BsEyeglasses } from 'react-icons/bs'
import { fetchBooks, getBookPaginatedThunk, getBooksRequestThunk } from '../redux/slices/bookSlice'
import { Link, useSearchParams } from 'react-router-dom'
import Search from '../Search'

export default function UserBooks() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { books, isLoading, error } = useSelector((state: RootState) => state.books)
  const { userData } = useSelector((state: RootState) => state.users)
  const [pagination, setPagination] = useState({
    page: 0,
    totalPage: 0
  })

  const page = searchParams.get('page') || 1
  const title = searchParams.get('title') || ''

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
    if (page && title) {
      handleGetBooksByTitle(title, pagination.page)
    } else if (page) {
      handelBooksPagination()
    } else {
      dispatch(fetchBooks())
    }
  }, [dispatch])

  const handleGetBooksByTitle = async (title: string, page: number) => {
    searchParams.set('title ', title)
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)

    dispatch(getBooksRequestThunk(searchParams.toString()))
  }

  return (
    <>
      <div className="books-dtl">
        <Search searchParams={searchParams} setSearchParams={setSearchParams} />
        {isLoading && <h3> Loading products...</h3>}
        {error && <h3> {error}</h3>}
        <ul className="books">
          {books.length > 0 &&
            books.map((book) => (
              <li key={book._id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
                <img src={book.image} alt={book.title} />
                <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
                <span>{book.price} SR</span>
                <div className="user-btn">
                  <Link to={`/book/${book._id}`}>
                    <button className="more-dtl-btn">
                      <GiBookCover />
                    </button>
                  </Link>
                  {book.isAvailable && (
                    <Link to={`/user/borrowbook/${book._id}/${userData?._id}`}>
                      <button className="borrow-btn">
                        <BsEyeglasses />
                      </button>
                    </Link>
                  )}
                </div>
              </li>
            ))}
        </ul>

        <div className="pagination-button">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} onClick={() => handelBooksPaginationByPage(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
