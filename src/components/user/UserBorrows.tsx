import { ChangeEvent } from 'react'
import UserSidebar from './UserSidebar'

export default function UserBorrows() {
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const handleSubmit = () => {
    console.log('')
  }

  return (
    <div className="main">
      <UserSidebar />
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Borrow Book:</h2>
        <label htmlFor="discription">Borrow Date:</label>
        <input type="date" name="borrow" placeholder="Title" onChange={handelChange} />
        <label htmlFor="discription">Return Date:</label>
        <input type="date" name="return" placeholder="Book Description" onChange={handelChange} />
        <button type="submit" className="add-btn">
          Borrow
        </button>
      </form>
    </div>
  )
}
