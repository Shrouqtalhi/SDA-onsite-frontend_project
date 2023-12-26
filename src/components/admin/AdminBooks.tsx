import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { PiBooksFill, PiNotePencilBold } from 'react-icons/pi'
import { deleteBook, fetchBooks, getBookPaginatedThunk } from '../redux/slices/bookSlice'
import { Link, useSearchParams } from 'react-router-dom'
import { TbHttpDelete } from 'react-icons/tb'

export default function AdminBooks() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { books, isLoading } = useSelector((state: RootState) => state.books)
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
      handelBooksPagination()
    }
  }, [dispatch])

  const handleBookDelete = (id: string) => {
    dispatch(deleteBook(id))
  }

  return (
    <>
      {isLoading && <h3> Loading Books...</h3>}
      <div className="books-dtl">
        <h2>
          <PiBooksFill />
          Books..
        </h2>
        <div>
          <Link to="/admin/add-book">
            <button className="add-new-book">+ Add Book</button>
          </Link>
        </div>
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
