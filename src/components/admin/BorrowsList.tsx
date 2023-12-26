import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
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
    <>
      {isLoading && <h3> Loading Books...</h3>}
      {error && <h3> {error}</h3>}
      <div className="list-of-users">
        <h2>Borrows..</h2>
        <ul className="user">
          {borrows.length > 0 &&
            borrows.map((borrow) => (
              <li key={borrow._id}>
                <h3>Borrower ID :</h3>
                <span>{borrow._id}</span>
                {/* {borrow.bookId.map((book) => (
                  <span key={book._id}>Book ID : {book.description}</span>
                ))} */}
                <div className="borrow-date">
                  <p>
                    Borrow Date: <span>{borrow.borrowDate}</span>
                  </p>
                  <p>
                    Due Date: <span> {borrow.dueDate}</span>
                  </p>
                  <p>
                    Return Date:<span>{borrow.returnDate}</span>
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}
