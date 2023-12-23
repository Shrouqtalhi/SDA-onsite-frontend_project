import { ChangeEvent, FormEvent, useState } from 'react'
import UserSidebar from './UserSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { Link } from 'react-router-dom'
import { Book, Borrows } from '../../types/type'

export default function UserBorrows() {
  const state = useSelector((state: RootState) => state)
  console.log('state', state)
  const books = state.books
  const users = state.users
  const borrows = state.borrows
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // setAdd({ ...add, [name]: value })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // dispatch(addToBorrow())
  }

  return (
    <div className="main">
      <UserSidebar />
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Borrow Book:</h2>
        <label htmlFor="borrowDate">Borrow Date:</label>
        <input type="date" name="borrow" placeholder="Title" onChange={handleChange} />
        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" name="return" placeholder="Book Description" onChange={handleChange} />
        {/* <Link to="/dashboard/user/borrow-details"> */}
        <button type="submit" className="add-btn">
          Borrow
        </button>
        {/* </Link> */}
      </form>
    </div>
  )
}
