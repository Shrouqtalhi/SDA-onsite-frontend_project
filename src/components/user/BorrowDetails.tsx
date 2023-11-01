import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect } from 'react'
import { fetchBorrows } from '../redux/slices/borrowSlice'

export default function BorrowDetails() {
  const { borrows, error, isLoading, foundUser } = useSelector((state: RootState) => state.borrows)
  const { users } = useSelector((state: RootState) => state.users)
  const { books, foundBook } = useSelector((state: RootState) => state.books)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBorrows())
  }, [dispatch])

  console.log(borrows)

  const user = users.filter((user) => user.id === foundUser?.id)
  const book = books.filter((book) => book.id === foundBook?.id)

  return (
    <div>
      BorrowDetails
      {/* {user & book} */}
    </div>
  )
}
