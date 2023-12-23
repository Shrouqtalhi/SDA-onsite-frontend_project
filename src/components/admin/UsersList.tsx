import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { TbHttpDelete } from 'react-icons/tb'
import { PiNotePencilBold, PiUsersThreeDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { Role, User } from '../../types/type'
import { blockUser, usersThunk, deleteUser, grantRole } from '../redux/slices/userSlice'
import { ImBlocked } from 'react-icons/im'
import { ROLES } from '../../constants'

export default function UsersList() {
  const dispatch: AppDispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)

  const handleGrantRole = (e: ChangeEvent<HTMLSelectElement>, userId: User['_id']) => {
    const role = e.target.value as Role
    dispatch(grantRole({ role, userId }))
    console.log(userId)
  }

  useEffect(() => {
    dispatch(usersThunk())
  }, [dispatch])

  const handleUserDelete = (id: string) => {
    console.log(id)
    dispatch(deleteUser(id))
  }

  const handleUserBlock = (id: User) => {
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
          <thead className="table-head">
            <tr className="head">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
              <th> Grant Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => {
                // if (user.role !== ROLES.ADMIN) {
                return (
                  <tr key={user._id} className="table-body">
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
                    <td>
                      <select
                        name="roles"
                        title="roles"
                        onChange={(e) => handleGrantRole(e, user._id)}>
                        <option>Select Role</option>
                        {Object.keys(ROLES).map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )
                // }
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}
