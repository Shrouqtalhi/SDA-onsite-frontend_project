import { useDispatch, useSelector } from 'react-redux'
import UserSidebar from './UserSidebar'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { TbHttpDelete } from 'react-icons/tb'
import { removeFromBorrow } from '../redux/slices/borrowSlice'
import { Book } from '../type/type'

export default function BorrowDetails() {
  const dispatch: AppDispatch = useDispatch()
  const { borrowbooks } = useSelector((state: RootState) => state.borrows)

  const handleBookDelete = (id: Book) => {
    dispatch(removeFromBorrow(id))
  }
  return (
    <div className="books-dtl">
      <ul className="books">
        {borrowbooks.length > 0 &&
          borrowbooks.map((book) => (
            <li key={book._id} className={`book ${!book.isAvailable ? 'sold-out' : ''}`}>
              <img src={book.image} alt={book.title} />
              <span>{!book.isAvailable ? 'SOLD OUT' : book.title}</span>
              <div className="user-btn">
                <button
                  className="delete"
                  onClick={() => {
                    handleBookDelete(book)
                  }}>
                  <label htmlFor="my-bton" title="delete">
                    <TbHttpDelete />
                  </label>
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
