import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { TbHttpDelete } from 'react-icons/tb'
import { PiNotePencilBold, PiUsersThreeDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { Users } from '../type/type'
import { blockUser, usersThunk, deleteUser } from '../redux/slices/userSlice'
import { ImBlocked } from 'react-icons/im'
import { ROLES } from '../../constants'

export default function UsersList() {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(usersThunk())
  }, [dispatch])

  const handleUserDelete = (id: string) => {
    console.log(id)
    dispatch(deleteUser(id))
  }

  const handleUserBlock = (id: Users) => {
    dispatch(blockUser(id))
  }

  return (
    <>
      {isLoading && <h3>Loading Users...</h3>}
      {error && <h3>{error}</h3>}
      <div className="list-of-users">
        <h2>
          <PiUsersThreeDuotone /> Users..
        </h2>

        <table className="table">
          <thead
            // className="text-xl text-white uppercase mt-2 mb-4 border-b border-gray-300 dark:border-gray-600"
            className="table-head">
            <tr>
              <th className="head">Name</th>
              <th className="head">Email</th>
              <th className="head">Role</th>
              <th className="head">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {users.length > 0 &&
              users.map((user) => {
                if (user.role !== ROLES.ADMIN) {
                  return (
                    <tr key={user._id}>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="user-btn">
                          <Link to={`/admin/edit-user/${user._id}`}>
                            <button className="more-dtl-btn">
                              <PiNotePencilBold />
                            </button>
                          </Link>
                          <button
                            className="delete"
                            onClick={() => {
                              handleUserDelete(user._id)
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
                      </td>
                    </tr>
                  )
                }
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}
