import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GiBookCover } from 'react-icons/gi'
import { PiNotePencilBold } from 'react-icons/pi'
import { removeBook } from '../redux/slices/bookSlice'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { TbHttpDelete } from 'react-icons/tb'
import { Book } from '../type/type'
import { fetchBorrows } from '../redux/slices/borrowSlice'

export default function BorrowsList() {
  const dispatch = useDispatch<AppDispatch>()
  const { borrows, isLoading, error } = useSelector((state: RootState) => state.borrows)

  useEffect(() => {
    if (borrows.length === 0) {
      dispatch(fetchBorrows())
    }
  }, [dispatch])

  return (
    <div className="main">
      <AdminSidebar />
      {isLoading && <h3> Loading Books...</h3>}
      {error && <h3> {error}</h3>}
      <div className="list-of-users">
        <h2>Borrows..</h2>
        <ul className="user">
          {borrows.length > 0 &&
            borrows.map((borrow) => (
              <li key={borrow.id}>
                <h2>Borrower ID : {borrow.borrowerId}</h2>
                <span>Book ID : {borrow.bookId}</span>
                <div className="borrow-date">
                  <p>
                    Borrow Date: <span>{borrow.borrowDate}</span>
                  </p>
                  <p>
                    Due Date: <span> {borrow.dueDate}</span>
                  </p>
                </div>
                <span>{borrow.returnDate}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
