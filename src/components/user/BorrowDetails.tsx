import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getBorrowsByUserId, returnBorrowedBook } from '../redux/slices/borrowSlice'
import { useEffect, useState } from 'react'

export default function BorrowDetails() {
  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const borrowState = state.borrows
  const { borrows } = useSelector((state: RootState) => state.borrows)

  useEffect(() => {
    dispatch(getBorrowsByUserId())
  }, [dispatch])

  const [messages, setMessages] = useState<{ [bookId: string]: string }>({})
  const [returnedBooks, setReturnedBooks] = useState<string[]>([])

  const handleBookDelete = async (id: string) => {
    // Check if the book has already been returned
    if (returnedBooks.includes(id)) {
      setMessage('Book already returned', id)
      return
    }

    const res = await dispatch(returnBorrowedBook(id))
    setMessage(res.payload.message, id)

    setReturnedBooks((prevReturnedBooks) => [...prevReturnedBooks, id])
    dispatch(getBorrowsByUserId())
  }

  const setMessage = (message: string, bookId: string) => {
    setMessages((prevMessages) => ({ ...prevMessages, [bookId]: message }))
  }

  return (
    <div className="books-dtl">
      <ul className="books">
        {borrows.length > 0 &&
          borrows.map((book) => (
            <li key={book._id} className={`book ${book.returnDate ? 'sold-out' : ''}`}>
              <img src={book.bookId.image} alt={book._id} />
              <div className="borrow-dtl">
                <p>Borrow Date:</p>
                <h6>{book.borrowDate}</h6>
                <p>Due Date:</p>
                <h6>{book.dueDate}</h6>
                {book.returnDate && (
                  <>
                    <p style={{ color: '#750505' }}>Return Date:</p>
                    <h6>{book.returnDate}</h6>
                  </>
                )}
              </div>
              <div className="return-btn">
                {!book.returnDate && (
                  <button onClick={() => handleBookDelete(book._id)}>Return</button>
                )}
              </div>
              {messages[book._id] && <p style={{ color: '#green' }}>{messages[book._id]}</p>}
            </li>
          ))}
      </ul>
      {borrowState.error && <p style={{ color: '#750505' }}>{borrowState.error}</p>}
    </div>
  )
}
