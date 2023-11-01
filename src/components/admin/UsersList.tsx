import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { TbHttpDelete } from 'react-icons/tb'
import { PiNotePencilBold, PiUsersThreeDuotone, PiUsersThreeLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { Users } from '../type/type'
import { blockUser, fetchUsers, removeUser } from '../redux/slices/userSlice'
import { ImBlocked } from 'react-icons/im'

export default function UsersList() {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleUserDelete = (id: Users) => {
    dispatch(removeUser(id))
  }

  const handleUserBlock = (id: Users) => {
    dispatch(blockUser(id))
    console.log(id)
  }

  return (
    <div className="main">
      <AdminSidebar />
      {isLoading && <h3> Loading Users...</h3>}
      {error && <h3> {error}</h3>}
      <div className="list-of-users">
        <h2>
          <PiUsersThreeDuotone /> List of Users..
        </h2>
        <ul className="user">
          {users.length > 0 &&
            users.map((user) => {
              if (user.role !== 'admin') {
                return (
                  <li key={user.id}>
                    <h5>{`${user.firstName} ${user.lastName}`}</h5>
                    <span>{user.email}</span>
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

                      <button
                        className="delete"
                        onClick={() => {
                          handleUserBlock(user)
                        }}>
                        {user.block ? (
                          <ImBlocked style={{ color: 'red' }} />
                        ) : (
                          <ImBlocked style={{ color: '#41434d' }} />
                        )}
                      </button>
                    </div>
                  </li>
                )
              }
            })}
        </ul>
      </div>
    </div>
  )
}
