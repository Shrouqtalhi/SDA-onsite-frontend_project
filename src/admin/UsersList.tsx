import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { TbHttpDelete } from 'react-icons/tb'
import { PiNotePencilBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { Users, autherDispatch } from '../type/type'
import { fetchUsers, removeUser } from '../redux/slices/userSlice'

export default function UsersList() {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleUserDelete = (id: Users) => {
    dispatch(removeUser(id))
  }

  return (
    <div className="main">
      <AdminSidebar />
      {isLoading && <h3> Loading Users...</h3>}
      {error && <h3> {error}</h3>}
      <ul className="books">
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.id} className="users">
              <h4>{`${user.firstName} ${user.lastName}`}</h4>
              <p>{user.email}</p>
              <span>{user.role}</span>
              <div className="user-btn">
                <Link to={`/book/${user.id}`}>
                  <button className="more-dtl-btn">
                    <PiNotePencilBold />
                  </button>
                </Link>
                <button
                  className="delete"
                  onClick={() => {
                    handleUserDelete(user)
                  }}>
                  <TbHttpDelete />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
