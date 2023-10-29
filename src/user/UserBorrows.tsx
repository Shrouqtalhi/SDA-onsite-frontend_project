import UserSidebar from './UserSidebar'

export default function UserBorrows() {
  return (
    <div className="main">
      <UserSidebar />
      <div className="add-form">
        <h2>Borrow Book:</h2>
        <label htmlFor="discription">Borrow Date:</label>
        <input type="date" name="borrow" placeholder="Title" />
        <label htmlFor="discription">Return Date:</label>
        <input type="date" name="return" placeholder="Book Description" />
        <button type="submit" className="add-btn">
          Borrow
        </button>
      </div>
    </div>
  )
}
