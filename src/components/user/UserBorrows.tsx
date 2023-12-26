import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useParams } from 'react-router-dom'
import { borrowBookThunk } from '../redux/slices/borrowSlice'

export default function UserBorrows() {
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const borrowError = useSelector((state: RootState) => state.borrows.error)
  const [error, setError] = useState<string | null>(borrowError)
  const [success, setSuccess] = useState<string | null>()

  const [borrow, setBorrow] = useState({
    borrowDate: '',
    dueDate: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBorrow({ ...borrow, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Convert input dates to Date objects for comparison
    const currentDateTime = new Date()
    const selectedBorrowDate = new Date(borrow.borrowDate)
    const selectedDueDate = new Date(borrow.dueDate)

    // Check if the selected dates are in the future
    if (selectedBorrowDate < currentDateTime || selectedDueDate < currentDateTime) {
      setError('Please choose dates in the future.')
      return
    }

    // Check if the due date is after the borrow date
    if (selectedDueDate <= selectedBorrowDate) {
      setError('Due date must be after borrow date.')
      return
    }

    // If all validations pass, proceed with dispatching the action
    setError(null)

    const bookId = params.bookId
    const userId = params.userId

    if (bookId && userId) {
      const res = await dispatch(
        borrowBookThunk({
          borrowDate: borrow.borrowDate,
          dueDate: borrow.dueDate,
          bookId,
          userId
        })
      )

      setSuccess(res.payload.message)
    }
  }

  return (
    <div className="add-form">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Borrow Book:</h2>
        <label htmlFor="borrowDate">Borrow Date:</label>
        <input type="date" name="borrowDate" onChange={handleChange} min={getCurrentDate()} />
        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" name="dueDate" onChange={handleChange} min={getCurrentDate()} />
        <button type="submit" className="add-btn">
          Borrow
        </button>
        {error && (
          <div style={{ color: 'red' }} className="error-message">
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: 'green' }} className="error-message">
            {success}
          </div>
        )}
      </form>
    </div>
  )
}

// Helper function to get the current date in the format expected by the input element
function getCurrentDate(): string {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
