import { Route, Routes } from 'react-router'
import UserBooks from '../user/UserBooks'
import UserProfile from '../user/UserProfile'
import BorrowDetails from '../user/BorrowDetails'
import UserBorrows from '../user/UserBorrows'
import UserSidebar from '../user/UserSidebar'

export default function UserLayout() {
  return (
    <div className="main">
      <UserSidebar />
      <Routes>
        <Route path="user" element={<UserBooks />} />
        <Route path="profile" element={<UserProfile />} />
        {/* <Route path="user/borrows" element={<Borrow />} /> */}
        <Route path="borrow-details" element={<BorrowDetails />} />
        <Route path="borrowbook/:bookId/:userId" element={<UserBorrows />} />
        <Route path="books" element={<UserBooks />} />
      </Routes>
    </div>
  )
}
