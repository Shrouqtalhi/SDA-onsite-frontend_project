import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { TbHttpDelete } from 'react-icons/tb'
import { getBorrowsByUserId, returnBorrowedBook } from '../redux/slices/borrowSlice'
import { useEffect, useState } from 'react'

export default function BorrowDetails() {
  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const borrowState = state.borrows
  const { borrows } = useSelector((state: RootState) => state.borrows)
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  console.log('==========', borrows)
  useEffect(() => {
    const res = dispatch(getBorrowsByUserId())
    console.log('hayyy res ', res)
  }, [dispatch])
  const handleBookDelete = (id: string) => {
    dispatch(returnBorrowedBook(id))
  }

  return (
    <div className="books-dtl">
      <ul className="books">
        {borrows.length > 0 &&
          borrows.map((book) => (
            <li key={book._id} className="book">
              <img src={book.bookId.image} alt={book._id} />
              <h6>Borrow Date:</h6>
              <h6>{book.borrowDate}</h6>
              <h6>Borrow Date:</h6>
              <h6>{book.dueDate}</h6>
              <div className="return-btn">
                <button
                  onClick={() => {
                    handleBookDelete(book._id)
                  }}>
                  Return
                </button>
              </div>
            </li>
          ))}
      </ul>
      {borrowState.error && <p style={{ color: 'red' }}>{borrowState.error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  )
}
