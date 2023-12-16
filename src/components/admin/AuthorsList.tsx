import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { TbHttpDelete } from 'react-icons/tb'
import { PiNotePencilBold } from 'react-icons/pi'
import { BiPencil } from 'react-icons/bi'
import { GiBookshelf } from 'react-icons/gi'
import { deleteAuthor, fetchAuthors } from '../redux/slices/authorsSlice'

export default function AuthorsList() {
  const dispatch: AppDispatch = useDispatch()
  const { authors, isLoading, error } = useSelector((state: RootState) => state.authors)

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(fetchAuthors())
    }
  }, [dispatch])

  const handleAuthorDelete = (id: string) => {
    dispatch(deleteAuthor(id))
  }

  return (
    <div>
      {isLoading && <h3> Loading Authors...</h3>}
      {error && <h3> {error}</h3>}
      <div className="list-of-users">
        <h2>
          <BiPencil />
          Authors..
        </h2>
        <Link to="/admin/add-author">
          <button className="add-new-book">+ New Author</button>
        </Link>

        <table className="table">
          <thead className="table-head">
            <tr>
              <th className="head">Author Name</th>
              <th className="head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 &&
              authors.map((author) => (
                <tr key={author._id}>
                  <td>{author.name}</td>
                  <td>
                    <div className="user-btn">
                      <Link to={`/book/${author._id}`}>
                        <button className="more-dtl-btn">
                          <GiBookshelf />
                        </button>
                      </Link>
                      <Link to={`/admin/edit-author/${author._id}`}>
                        <button className="borrow-btn">
                          <PiNotePencilBold />
                        </button>
                      </Link>
                      <button className="delete" onClick={() => handleAuthorDelete(author._id)}>
                        <TbHttpDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
