import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'

import { useParams } from 'react-router-dom'
import { borrowBookThunk } from '../redux/slices/borrowSlice'

export default function UserBorrows() {
  const dispatch: AppDispatch = useDispatch()
  const params = useParams()
  const [borrow, setBorrow] = useState({
    borrowDate: '',
    dueDate: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBorrow({ ...borrow, [name]: value })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(borrow)
    const bookId = params.bookId
    const userId = params.userId
    if (bookId && userId) {
      dispatch(
        borrowBookThunk({
          borrowDate: borrow.borrowDate,
          dueDate: borrow.dueDate,
          bookId,
          userId
        })
      )
    }
  }

  return (
    <div className="add-form">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Borrow Book:</h2>
        <label htmlFor="borrowDate">Borrow Date:</label>
        <input type="date" name="borrowDate" onChange={handleChange} />
        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" name="dueDate" onChange={handleChange} />
        {/* <Link to="/user/borrow-details"> */}
        <button type="submit" className="add-btn">
          Borrow
        </button>
        {/* </Link> */}
      </form>
    </div>
  )
}
